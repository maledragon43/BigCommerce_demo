import React, { useState, useEffect } from 'react'
import Configurator from './components/Configurator'
import DemoFeatures from './components/DemoFeatures'
import { configuratorData } from './data/configuratorData'
import { BigCommerceConfigurator } from './utils/bigcommerceIntegration'

function App() {
  const [selections, setSelections] = useState({})
  const [currentStep, setCurrentStep] = useState('base-device')
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [cartResult, setCartResult] = useState(null)
  const [shareableUrl, setShareableUrl] = useState('')

  // Initialize BigCommerce configurator
  const bcConfigurator = new BigCommerceConfigurator()

  const handleSelection = (step, optionId, isMultiSelect = false) => {
    setSelections(prev => {
      const newSelections = { ...prev }
      
      if (isMultiSelect) {
        if (!newSelections[step]) {
          newSelections[step] = []
        }
        
        const currentSelections = newSelections[step] || []
        if (currentSelections.includes(optionId)) {
          newSelections[step] = currentSelections.filter(id => id !== optionId)
        } else {
          newSelections[step] = [...currentSelections, optionId]
        }
      } else {
        newSelections[step] = optionId
      }
      
      return newSelections
    })
  }

  const calculateTotalPrice = () => {
    let total = 0
    
    Object.entries(selections).forEach(([step, selection]) => {
      if (Array.isArray(selection)) {
        selection.forEach(optionId => {
          const option = findOptionById(step, optionId)
          if (option) total += option.price
        })
      } else {
        const option = findOptionById(step, selection)
        if (option) total += option.price
      }
    })
    
    setTotalPrice(total)
  }

  const findOptionById = (step, optionId) => {
    const stepData = configuratorData.steps.find(s => s.id === step)
    if (!stepData) return null
    
    if (stepData.type === 'accessories') {
      for (const category of stepData.categories) {
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
      return stepData.options.find(option => option.id === optionId)
    }
    return null
  }

  const handleAddToCart = async () => {
    setIsLoading(true)
    setCartResult(null)
    
    try {
      // Map selections to variants
      const variants = bcConfigurator.mapSelectionsToVariants(selections, configuratorData)
      
      // Add to cart (demo mode or real)
      const cartResult = await bcConfigurator.addToCart(variants)
      
      setCartResult(cartResult)
      
      // Generate shareable URL
      const shareUrl = bcConfigurator.generateShareableUrl(selections)
      setShareableUrl(shareUrl)
      
      console.log('Configuration added to cart:', cartResult)
      console.log('Shareable URL:', shareUrl)
      
    } catch (error) {
      console.error('Error adding to cart:', error)
      setCartResult({ error: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const loadConfigurationFromUrl = () => {
    const urlConfig = bcConfigurator.loadConfigurationFromUrl()
    if (urlConfig) {
      setSelections(urlConfig)
      console.log('Configuration loaded from URL:', urlConfig)
    }
  }

  useEffect(() => {
    calculateTotalPrice()
  }, [selections])

  useEffect(() => {
    // Load configuration from URL on mount
    loadConfigurationFromUrl()
  }, [])

  const isStepCompleted = (stepId) => {
    const stepData = configuratorData.steps.find(s => s.id === stepId)
    if (!stepData) return false
    
    if (stepData.type === 'accessories') {
      return selections[stepId] && selections[stepId].length > 0
    } else {
      return selections[stepId] !== undefined
    }
  }

  const canProceedToStep = (stepId) => {
    const stepIndex = configuratorData.steps.findIndex(s => s.id === stepId)
    if (stepIndex === 0) return true
    
    const previousStep = configuratorData.steps[stepIndex - 1]
    return isStepCompleted(previousStep.id)
  }

  return (
    <div className="app">
      <Configurator
        data={configuratorData}
        selections={selections}
        onSelection={handleSelection}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        totalPrice={totalPrice}
        isStepCompleted={isStepCompleted}
        canProceedToStep={canProceedToStep}
        onAddToCart={handleAddToCart}
        isLoading={isLoading}
        cartResult={cartResult}
        shareableUrl={shareableUrl}
      />
      
      <DemoFeatures />
    </div>
  )
}

export default App
