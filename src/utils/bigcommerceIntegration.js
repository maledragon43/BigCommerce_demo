// BigCommerce Integration Utilities
// This file contains the logic for integrating with BigCommerce APIs

export class BigCommerceConfigurator {
  constructor(storeHash = null, accessToken = null) {
    this.storeHash = storeHash || process.env.BIGCOMMERCE_STORE_HASH
    this.accessToken = accessToken || process.env.BIGCOMMERCE_ACCESS_TOKEN
    this.isDemoMode = !this.storeHash || !this.accessToken
    this.baseUrl = this.storeHash ? `https://api.bigcommerce.com/stores/${this.storeHash}/v3` : null
  }

  // Map configuration selections to BigCommerce product variants
  mapSelectionsToVariants(selections, configuratorData) {
    const variants = []
    const cartItems = []
    
    Object.entries(selections).forEach(([stepId, selection]) => {
      const step = configuratorData.steps.find(s => s.id === stepId)
      if (!step) return
      
      if (Array.isArray(selection)) {
        // Multi-select accessories
        selection.forEach(optionId => {
          const option = this.findOptionById(step, optionId)
          if (option) {
            variants.push({
              productId: option.bigcommerceProductId,
              variantId: option.bigcommerceVariantId,
              quantity: 1,
              sku: option.sku,
              name: option.name,
              price: option.price
            })
          }
        })
      } else {
        // Single select
        const option = this.findOptionById(step, selection)
        if (option) {
          variants.push({
            productId: option.bigcommerceProductId,
            variantId: option.bigcommerceVariantId,
            quantity: 1,
            sku: option.sku,
            name: option.name,
            price: option.price
          })
        }
      }
    })
    
    return variants
  }

  findOptionById(step, optionId) {
    if (step.type === 'accessories') {
      for (const category of step.categories) {
        for (const option of category.options) {
          if (option.id === optionId) return option
        }
        // Check styles
        if (category.styles) {
          for (const styles of Object.values(category.styles)) {
            const style = styles.find(s => s.id === optionId)
            if (style) return style
          }
        }
      }
    } else {
      return step.options.find(option => option.id === optionId)
    }
    return null
  }

  // Add configured kit to BigCommerce cart
  async addToCart(variants, customerId = null) {
    if (this.isDemoMode) {
      console.log('Demo Mode: Simulating cart addition', variants)
      return {
        id: 'demo-cart-' + Date.now(),
        line_items: variants,
        total_price: variants.reduce((sum, v) => sum + (v.price * v.quantity), 0)
      }
    }

    const cartItems = variants.map(variant => ({
      product_id: variant.productId,
      variant_id: variant.variantId,
      quantity: variant.quantity,
      list_price: variant.price
    }))

    const cartData = {
      line_items: cartItems,
      customer_id: customerId
    }

    try {
      const response = await fetch(`${this.baseUrl}/carts`, {
        method: 'POST',
        headers: {
          'X-Auth-Token': this.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartData)
      })

      if (!response.ok) {
        throw new Error(`BigCommerce API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw error
    }
  }

  // Update inventory for individual SKUs
  async updateInventory(sku, quantityChange) {
    if (this.isDemoMode) {
      console.log(`Demo Mode: Simulating inventory update for SKU ${sku}, change: ${quantityChange}`)
      return { success: true, sku, quantityChange }
    }

    try {
      // First, find the product by SKU
      const productsResponse = await fetch(
        `${this.baseUrl}/catalog/products?sku=${sku}`,
        {
          headers: {
            'X-Auth-Token': this.accessToken
          }
        }
      )

      if (!productsResponse.ok) {
        throw new Error(`Failed to find product with SKU: ${sku}`)
      }

      const products = await productsResponse.json()
      if (products.data.length === 0) {
        throw new Error(`Product not found with SKU: ${sku}`)
      }

      const product = products.data[0]
      
      // Update inventory
      const inventoryResponse = await fetch(
        `${this.baseUrl}/catalog/products/${product.id}/inventory`,
        {
          method: 'PUT',
          headers: {
            'X-Auth-Token': this.accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inventory_level: product.inventory_level - quantityChange
          })
        }
      )

      if (!inventoryResponse.ok) {
        throw new Error(`Failed to update inventory for SKU: ${sku}`)
      }

      return await inventoryResponse.json()
    } catch (error) {
      console.error(`Error updating inventory for SKU ${sku}:`, error)
      throw error
    }
  }

  // Process order and update all component inventories
  async processOrder(orderId, configurationSelections) {
    const variants = this.mapSelectionsToVariants(configurationSelections)
    
    // Update inventory for each component
    const inventoryUpdates = variants.map(variant => 
      this.updateInventory(variant.sku, variant.quantity)
    )

    try {
      await Promise.all(inventoryUpdates)
      console.log('All inventory updates completed successfully')
    } catch (error) {
      console.error('Error processing order inventory updates:', error)
      throw error
    }
  }

  // Generate shareable configuration URL
  generateShareableUrl(selections) {
    const encodedSelections = btoa(JSON.stringify(selections))
    return `${window.location.origin}${window.location.pathname}?config=${encodedSelections}`
  }

  // Load configuration from URL
  loadConfigurationFromUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    const configParam = urlParams.get('config')
    
    if (configParam) {
      try {
        return JSON.parse(atob(configParam))
      } catch (error) {
        console.error('Error loading configuration from URL:', error)
        return null
      }
    }
    
    return null
  }
}

// Configuration data structure for admin editing
export const createAdminConfig = (configuratorData) => {
  return {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    steps: configuratorData.steps.map(step => ({
      id: step.id,
      title: step.title,
      type: step.type,
      options: step.options ? step.options.map(option => ({
        id: option.id,
        name: option.name,
        price: option.price,
        sku: option.sku,
        description: option.description,
        bigcommerceProductId: option.bigcommerceProductId || null,
        bigcommerceVariantId: option.bigcommerceVariantId || null,
        inventoryId: option.inventoryId || null
      })) : null,
      categories: step.categories ? step.categories.map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        options: category.options.map(option => ({
          id: option.id,
          name: option.name,
          price: option.price,
          sku: option.sku,
          description: option.description,
          bigcommerceProductId: option.bigcommerceProductId || null,
          bigcommerceVariantId: option.bigcommerceVariantId || null,
          inventoryId: option.inventoryId || null
        })),
        styles: category.styles || null
      })) : null
    }))
  }
})

// Export configuration to CSV for admin use
export const exportToCSV = (adminConfig) => {
  const csvData = []
  
  adminConfig.steps.forEach(step => {
    if (step.options) {
      step.options.forEach(option => {
        csvData.push({
          step: step.id,
          type: 'option',
          id: option.id,
          name: option.name,
          price: option.price,
          sku: option.sku,
          bigcommerceProductId: option.bigcommerceProductId,
          bigcommerceVariantId: option.bigcommerceVariantId,
          inventoryId: option.inventoryId
        })
      })
    }
    
    if (step.categories) {
      step.categories.forEach(category => {
        category.options.forEach(option => {
          csvData.push({
            step: step.id,
            category: category.id,
            type: 'accessory',
            id: option.id,
            name: option.name,
            price: option.price,
            sku: option.sku,
            bigcommerceProductId: option.bigcommerceProductId,
            bigcommerceVariantId: option.bigcommerceVariantId,
            inventoryId: option.inventoryId
          })
        })
      })
    }
  })
  
  return csvData
}
