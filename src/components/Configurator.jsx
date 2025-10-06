import React from 'react'
import Step from './Step'
import Summary from './Summary'

const Configurator = ({
  data,
  selections,
  onSelection,
  currentStep,
  onStepChange,
  totalPrice,
  isStepCompleted,
  canProceedToStep
}) => {
  const handleStepClick = (stepId) => {
    if (canProceedToStep(stepId)) {
      onStepChange(stepId)
    }
  }

  return (
    <div className="configurator">
      {data.steps.map((step, index) => (
        <div key={step.id}>
          <div
            className={`step ${currentStep === step.id ? 'active' : ''} ${
              isStepCompleted(step.id) ? 'completed' : ''
            }`}
            onClick={() => handleStepClick(step.id)}
            style={{ cursor: canProceedToStep(step.id) ? 'pointer' : 'not-allowed' }}
          >
            <div className="step-title">
              {step.title}
              {isStepCompleted(step.id) && ' ✓'}
            </div>
            
            {currentStep === step.id && (
              <Step
                step={step}
                selections={selections[step.id]}
                onSelection={(optionId, isMultiSelect) => 
                  onSelection(step.id, optionId, isMultiSelect)
                }
              />
            )}
          </div>
        </div>
      ))}
      
      <Summary
        data={data}
        selections={selections}
        totalPrice={totalPrice}
        onAddToCart={() => {
          // This would integrate with BigCommerce API
          console.log('Adding to cart:', { selections, totalPrice })
        }}
      />
    </div>
  )
}

export default Configurator
