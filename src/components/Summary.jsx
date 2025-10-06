import React from 'react'

const Summary = ({ data, selections, totalPrice, onAddToCart, isLoading, cartResult, shareableUrl }) => {
  const getSelectedOptions = () => {
    const selectedItems = []
    
    Object.entries(selections).forEach(([stepId, selection]) => {
      const step = data.steps.find(s => s.id === stepId)
      if (!step) return
      
      if (Array.isArray(selection)) {
        // Multi-select (accessories)
        selection.forEach(optionId => {
          if (step.type === 'accessories') {
            // Find the option in categories
            for (const category of step.categories) {
              const option = category.options.find(opt => opt.id === optionId)
              if (option) {
                selectedItems.push({
                  name: `${category.name} - ${option.name}`,
                  price: option.price,
                  sku: option.sku
                })
              }
              
              // Check styles
              if (category.styles) {
                for (const [lengthId, styles] of Object.entries(category.styles)) {
                  const style = styles.find(s => s.id === optionId)
                  if (style) {
                    selectedItems.push({
                      name: `${category.name} - ${style.name} Style`,
                      price: style.price,
                      sku: style.sku
                    })
                  }
                }
              }
            }
          }
        })
      } else {
        // Single select
        const option = step.options.find(opt => opt.id === selection)
        if (option) {
          selectedItems.push({
            name: option.name,
            price: option.price,
            sku: option.sku
          })
        }
      }
    })
    
    return selectedItems
  }

  const selectedOptions = getSelectedOptions()
  const isConfigurationComplete = selectedOptions.length > 0

  return (
    <div className="summary">
      <h3>Configuration Summary</h3>
      
      {selectedOptions.length > 0 ? (
        <>
          {selectedOptions.map((item, index) => (
            <div key={index} className="summary-item">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          
          <div className="total-price">
            <span>Total: ${totalPrice.toFixed(2)}</span>
          </div>
          
          <button
            className="add-to-cart"
            onClick={onAddToCart}
            disabled={!isConfigurationComplete || isLoading}
          >
            {isLoading ? 'Adding to Cart...' : `Add to Cart - $${totalPrice.toFixed(2)}`}
          </button>
          
          {cartResult && (
            <div className="cart-result" style={{ 
              marginTop: '15px', 
              padding: '10px', 
              backgroundColor: cartResult.error ? '#ffebee' : '#e8f5e8',
              border: `1px solid ${cartResult.error ? '#f44336' : '#4caf50'}`,
              borderRadius: '4px'
            }}>
              {cartResult.error ? (
                <div style={{ color: '#d32f2f' }}>
                  <strong>Error:</strong> {cartResult.error}
                </div>
              ) : (
                <div style={{ color: '#2e7d32' }}>
                  <strong>Success!</strong> Configuration added to cart.
                  <br />
                  <small>Cart ID: {cartResult.id}</small>
                </div>
              )}
            </div>
          )}
          
          {shareableUrl && (
            <div className="shareable-url" style={{ 
              marginTop: '15px', 
              padding: '10px', 
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}>
              <strong>Shareable URL:</strong>
              <br />
              <a href={shareableUrl} target="_blank" rel="noopener noreferrer" style={{ 
                color: '#1976d2', 
                wordBreak: 'break-all',
                fontSize: '12px'
              }}>
                {shareableUrl}
              </a>
            </div>
          )}
          
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            Demo Mode: This simulates adding to cart. Configure BigCommerce credentials for real integration.
          </div>
        </>
      ) : (
        <p>Please complete your configuration to see the summary.</p>
      )}
    </div>
  )
}

export default Summary