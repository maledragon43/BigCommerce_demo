# BigCommerce Product Configurator

A custom product configurator for BigCommerce that enables customers to build custom "kit" products through multiple dependent selection layers with conditional logic, multi-select accessories, dynamic pricing, and individual inventory tracking.

## Features

### Core Functionality
- **Layered Selection Flow**: Base device → Material/Finish → Accessories
- **Multi-select Accessories**: Sound Redirect Sleeve, Hub Adapter, GAL-PAL
- **Conditional Logic**: Dynamic style options based on sleeve length
- **Dynamic Pricing**: Real-time price calculation
- **SKU Mapping**: Maps to existing BigCommerce product/variant IDs
- **Inventory Tracking**: Individual component inventory management

### Technical Features
- **Admin-editable Configuration**: JSON/CSV driven option management
- **Mobile Responsive**: Works on all device sizes
- **BigCommerce Integration**: Native checkout flow compatibility
- **Shareable URLs**: Configuration permalinks
- **CSV Export**: Configuration-to-SKU mapping export

## Quick Start

### Installation
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

## Configuration Structure

The configurator uses a JSON-based configuration system that allows non-developers to manage options:

```javascript
{
  "steps": [
    {
      "id": "base-device",
      "title": "Choose Base Device",
      "type": "single",
      "options": [...]
    },
    {
      "id": "accessories",
      "title": "Choose Accessories",
      "type": "accessories",
      "categories": [...]
    }
  ]
}
```

## BigCommerce Integration

### SKU Mapping
Each option maps to BigCommerce products via:
- `bigcommerceProductId`: The product ID in BigCommerce
- `bigcommerceVariantId`: The variant ID (if applicable)
- `inventoryId`: For inventory tracking

### Inventory Management
When a configured kit is purchased:
1. Individual component inventories are decremented
2. Each SKU is tracked separately
3. Real-time inventory updates via BigCommerce API

### Cart Integration
```javascript
const configurator = new BigCommerceConfigurator(storeHash, accessToken)
const variants = configurator.mapSelectionsToVariants(selections, configData)
await configurator.addToCart(variants)
```

## Admin Management

### Adding New Options
1. Edit `src/data/configuratorData.js`
2. Add new options with proper SKU mapping
3. Deploy changes

### CSV Export
```javascript
import { exportToCSV, createAdminConfig } from './src/utils/bigcommerceIntegration.js'

const adminConfig = createAdminConfig(configuratorData)
const csvData = exportToCSV(adminConfig)
```

## Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `BIGCOMMERCE_STORE_HASH`
   - `BIGCOMMERCE_ACCESS_TOKEN`
3. Deploy

### BigCommerce Integration
1. Add the configurator script to your Stencil theme
2. Configure API credentials
3. Map SKUs to your product catalog

## Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
- Test all selection combinations
- Verify SKU mapping accuracy
- Validate inventory updates
- Test mobile responsiveness

## Support

### 30-Day Bug Fix Window
- Bug fixes included in initial price
- Support for configuration issues
- Documentation updates

### Post-Launch Support
- 1-hour onboarding call
- 30-minute support session
- Documentation and training materials

## Architecture

### Tech Stack
- **Frontend**: React 18, Vite
- **Styling**: CSS3 with responsive design
- **Integration**: BigCommerce Storefront API
- **Deployment**: Vercel (or any static hosting)

### Key Components
- `Configurator`: Main orchestrator component
- `Step`: Individual selection step handler
- `OptionCard`: Reusable option display
- `Summary`: Configuration summary and cart integration
- `BigCommerceConfigurator`: API integration class

## File Structure
```
src/
├── components/
│   ├── Configurator.jsx
│   ├── Step.jsx
│   ├── OptionCard.jsx
│   └── Summary.jsx
├── data/
│   └── configuratorData.js
├── utils/
│   └── bigcommerceIntegration.js
├── App.jsx
└── main.jsx
```

## License   

Developed by Fauzan Riza Azhar for BigCommerce product configuration.

## Contact

For support or questions about this configurator implementation, please refer to the documentation or contact the development team.
