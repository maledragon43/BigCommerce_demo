import React from 'react'

const OptionCard = ({ option, isSelected, onClick }) => {
  return (
    <div
      className={`option-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
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
  )
}

export default OptionCard
