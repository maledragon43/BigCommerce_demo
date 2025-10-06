import React, { useState } from 'react'
import OptionCard from './OptionCard'

const Step = ({ step, selections, onSelection }) => {
  const [selectedSleeveLength, setSelectedSleeveLength] = useState(null)

  const handleOptionClick = (optionId) => {
    if (step.type === 'accessories') {
      // Handle multi-select for accessories
      onSelection(optionId, true)
    } else {
      // Handle single select
      onSelection(optionId, false)
    }
  }

  const handleSleeveLengthSelect = (lengthId) => {
    setSelectedSleeveLength(lengthId)
  }

  const renderAccessories = () => {
    return step.categories.map(category => (
      <div key={category.id} className="accessory-category">
        <h4>{category.name}</h4>
        <p className="category-description">{category.description}</p>
        
        {category.id === 'sound-redirect-sleeve' ? (
          <div className="sleeve-configuration">
            <div className="length-selection">
              <h5>Choose Length:</h5>
              <div className="option-grid">
                {category.options.map(option => (
                  <OptionCard
                    key={option.id}
                    option={option}
                    isSelected={selections && selections.includes(option.id)}
                    onClick={() => {
                      handleOptionClick(option.id)
                      handleSleeveLengthSelect(option.id)
                    }}
                  />
                ))}
              </div>
            </div>
            
            {selectedSleeveLength && category.styles[selectedSleeveLength] && (
              <div className="style-selection">
                <h5>Choose Style:</h5>
                <div className="option-grid">
                  {category.styles[selectedSleeveLength].map(style => (
                    <OptionCard
                      key={style.id}
                      option={style}
                      isSelected={selections && selections.includes(style.id)}
                      onClick={() => handleOptionClick(style.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="option-grid">
            {category.options.map(option => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={selections && selections.includes(option.id)}
                onClick={() => handleOptionClick(option.id)}
              />
            ))}
          </div>
        )}
      </div>
    ))
  }

  const renderSingleSelect = () => {
    return (
      <div className="option-grid">
        {step.options.map(option => (
          <OptionCard
            key={option.id}
            option={option}
            isSelected={selections === option.id}
            onClick={() => handleOptionClick(option.id)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="step-content">
      {step.type === 'accessories' ? renderAccessories() : renderSingleSelect()}
    </div>
  )
}

export default Step
