import React, { useState, useEffect } from 'react'
import Configurator from './components/Configurator'
import { configuratorData } from './data/configuratorData'

function App() {
  const [selections, setSelections] = useState({})
  const [currentStep, setCurrentStep] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)

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
      }
    } else {
      return stepData.options.find(option => option.id === optionId)
    }
    return null
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
      />
    </div>
  )
}

export default App
