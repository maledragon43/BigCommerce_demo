import React, { useState, useEffect } from 'react'
import { configuratorData } from './data/configuratorData'

function App() {
  const [selections, setSelections] = useState({})
  const [currentStep, setCurrentStep] = useState('base-device')
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [cartResult, setCartResult] = useState(null)
  const [shareableUrl, setShareableUrl] = useState('')

  console.log('App component rendering')
  console.log('Current step:', currentStep)
  console.log('Configurator data:', configuratorData)

  const handleSelection = (step, optionId, isMultiSelect = false) => {
    console.log('Selection made:', { step, optionId, isMultiSelect })
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
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const cartResult = {
        id: 'demo-cart-' + Date.now(),
        total_price: totalPrice
      }
      
      setCartResult(cartResult)
      
      const shareUrl = `${window.location.origin}${window.location.pathname}?config=${btoa(JSON.stringify(selections))}`
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

  useEffect(() => {
    calculateTotalPrice()
  }, [selections])

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

  const renderStep = (step) => {
    const isActive = currentStep === step.id
    const isCompleted = isStepCompleted(step.id)
    const canProceed = canProceedToStep(step.id)

    return (
      <div key={step.id}>
        <div
          className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
          onClick={() => canProceed && setCurrentStep(step.id)}
          style={{ cursor: canProceed ? 'pointer' : 'not-allowed' }}
        >
          <div className="step-title">
            {step.title}
            {isCompleted && ' ✓'}
          </div>
          
          {isActive && (
            <div className="step-content">
              {step.type === 'accessories' ? renderAccessories(step) : renderSingleSelect(step)}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderSingleSelect = (step) => {
    return (
      <div className="option-grid">
        {step.options.map(option => (
          <div
            key={option.id}
            className={`option-card ${selections[step.id] === option.id ? 'selected' : ''}`}
            onClick={() => handleSelection(step.id, option.id, false)}
          >
            <div className="option-name">{option.name}</div>
            {option.description && (
              <div className="option-description">{option.description}</div>
            )}
            <div className="option-price">${option.price.toFixed(2)}</div>
            {option.sku && (
              <div className="option-sku">SKU: {option.sku}</div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderAccessories = (step) => {
    return step.categories.map(category => (
      <div key={category.id} className="accessory-category">
        <h4>{category.name}</h4>
        <p className="category-description">{category.description}</p>
        
        <div className="option-grid">
          {category.options.map(option => (
            <div
              key={option.id}
              className={`option-card ${selections[step.id] && selections[step.id].includes(option.id) ? 'selected' : ''}`}
              onClick={() => handleSelection(step.id, option.id, true)}
            >
              <div className="option-name">{option.name}</div>
              <div className="option-price">${option.price.toFixed(2)}</div>
              <div className="option-sku">SKU: {option.sku}</div>
            </div>
          ))}
        </div>
      </div>
    ))
  }

  const getSelectedOptions = () => {
    const selectedItems = []
    
    Object.entries(selections).forEach(([stepId, selection]) => {
      const step = configuratorData.steps.find(s => s.id === stepId)
      if (!step) return
      
      if (Array.isArray(selection)) {
        selection.forEach(optionId => {
          if (step.type === 'accessories') {
            for (const category of step.categories) {
              const option = category.options.find(opt => opt.id === optionId)
              if (option) {
                selectedItems.push({
                  name: `${category.name} - ${option.name}`,
                  price: option.price,
                  sku: option.sku
                })
              }
            }
          }
        })
      } else {
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
    <div className="app">
      <div className="configurator">
        <div style={{ padding: '20px', backgroundColor: '#f0f8ff', marginBottom: '20px', borderRadius: '8px' }}>
          <h3>🚀 Interactive Configurator Demo</h3>
          <p>This is a fully functional BigCommerce product configurator. Try selecting options below!</p>
          <p><strong>Current Step:</strong> {currentStep}</p>
          <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
        </div>
        
        {configuratorData.steps.map(step => renderStep(step))}
        
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
                onClick={handleAddToCart}
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
      </div>
    </div>
  )
}

export default App