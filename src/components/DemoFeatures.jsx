import React, { useState } from 'react'

const DemoFeatures = () => {
  const [activeFeature, setActiveFeature] = useState('configurator')

  const features = [
    {
      id: 'configurator',
      title: 'Interactive Configurator',
      description: 'Multi-step product configuration with conditional logic',
      demo: 'Try selecting different options to see real-time updates'
    },
    {
      id: 'pricing',
      title: 'Dynamic Pricing',
      description: 'Real-time price calculation as you build your kit',
      demo: 'Watch the total price update as you make selections'
    },
    {
      id: 'multi-select',
      title: 'Multi-Select Accessories',
      description: 'Choose multiple accessories with dependent options',
      demo: 'Select Sound Redirect Sleeve, then choose length and style'
    },
    {
      id: 'mobile',
      title: 'Mobile Responsive',
      description: 'Fully responsive design that works on all devices',
      demo: 'Resize your browser or view on mobile to see responsive design'
    },
    {
      id: 'sharing',
      title: 'Shareable URLs',
      description: 'Generate shareable links for specific configurations',
      demo: 'Complete a configuration and click "Add to Cart" to see the shareable URL'
    },
    {
      id: 'integration',
      title: 'BigCommerce Integration',
      description: 'Ready for BigCommerce API integration with SKU mapping',
      demo: 'Check browser console to see API calls and SKU mapping'
    }
  ]

  return (
    <div className="demo-features">
      <h2>Demo Features Showcase</h2>
      <p>This configurator demonstrates advanced e-commerce functionality:</p>
      
      <div className="features-grid">
        {features.map(feature => (
          <div 
            key={feature.id}
            className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
            onClick={() => setActiveFeature(feature.id)}
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <div className="demo-instruction">
              <strong>Demo:</strong> {feature.demo}
            </div>
          </div>
        ))}
      </div>
      
      <div className="technical-details">
        <h3>Technical Implementation</h3>
        <ul>
          <li><strong>React 18</strong> - Modern component architecture</li>
          <li><strong>Conditional Logic</strong> - Dynamic option dependencies</li>
          <li><strong>State Management</strong> - Complex selection state handling</li>
          <li><strong>API Integration</strong> - BigCommerce Storefront API ready</li>
          <li><strong>SKU Mapping</strong> - Product variant mapping system</li>
          <li><strong>Inventory Tracking</strong> - Individual component inventory</li>
          <li><strong>Mobile First</strong> - Responsive CSS Grid layout</li>
          <li><strong>URL State</strong> - Shareable configuration URLs</li>
        </ul>
      </div>
      
      <div className="capabilities-showcase">
        <h3>Developer Capabilities Demonstrated</h3>
        <div className="capabilities-grid">
          <div className="capability">
            <h4>🎯 Complex State Management</h4>
            <p>Handles multi-step selections with conditional dependencies</p>
          </div>
          <div className="capability">
            <h4>🛒 E-commerce Integration</h4>
            <p>BigCommerce API integration with cart and inventory management</p>
          </div>
          <div className="capability">
            <h4>📱 Mobile Responsive</h4>
            <p>Fully responsive design that works on all screen sizes</p>
          </div>
          <div className="capability">
            <h4>⚡ Real-time Updates</h4>
            <p>Dynamic pricing and option updates without page reloads</p>
          </div>
          <div className="capability">
            <h4>🔗 Shareable URLs</h4>
            <p>URL-based state management for configuration sharing</p>
          </div>
          <div className="capability">
            <h4>📊 Data Management</h4>
            <p>JSON-driven configuration system for easy admin management</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoFeatures
