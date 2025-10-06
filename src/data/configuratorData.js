export const configuratorData = {
  steps: [
    {
      id: 'base-device',
      title: 'Choose Base Device',
      type: 'single',
      options: [
        {
          id: 'muzzle-brake',
          name: 'Muzzle Brake',
          price: 89.99,
          sku: 'MB-001',
          description: 'High-performance muzzle brake for recoil reduction'
        },
        {
          id: 'flash-hider',
          name: 'Flash Hider',
          price: 79.99,
          sku: 'FH-001',
          description: 'Effective flash suppression device'
        }
      ]
    },
    {
      id: 'material-finish',
      title: 'Choose Material/Finish',
      type: 'single',
      options: [
        {
          id: 'black-nitride',
          name: 'Black Nitride',
          price: 15.00,
          sku: 'BN-001',
          description: 'Durable black nitride finish'
        },
        {
          id: 'polished-stainless',
          name: 'Polished Stainless',
          price: 25.00,
          sku: 'PS-001',
          description: 'Premium polished stainless steel finish'
        }
      ]
    },
    {
      id: 'accessories',
      title: 'Choose Accessories (Multi-select)',
      type: 'accessories',
      categories: [
        {
          id: 'sound-redirect-sleeve',
          name: 'Sound Redirect Sleeve',
          description: 'Choose length and style for sound redirection',
          options: [
            {
              id: 'sleeve-2in',
              name: '2" Redirect Sleeve',
              price: 45.99,
              sku: 'SRS-2',
              description: '2 inch redirect sleeve'
            },
            {
              id: 'sleeve-4in',
              name: '4" Redirect Sleeve',
              price: 55.99,
              sku: 'SRS-4',
              description: '4 inch redirect sleeve'
            },
            {
              id: 'sleeve-6in',
              name: '6" Redirect Sleeve',
              price: 65.99,
              sku: 'SRS-6',
              description: '6 inch redirect sleeve'
            },
            {
              id: 'sleeve-8in',
              name: '8" Redirect Sleeve',
              price: 75.99,
              sku: 'SRS-8',
              description: '8 inch redirect sleeve'
            },
            {
              id: 'sleeve-10in',
              name: '10" Redirect Sleeve',
              price: 85.99,
              sku: 'SRS-10',
              description: '10 inch redirect sleeve'
            },
            {
              id: 'sleeve-12in',
              name: '12" Redirect Sleeve',
              price: 95.99,
              sku: 'SRS-12',
              description: '12 inch redirect sleeve'
            }
          ],
          styles: {
            'sleeve-2in': [
              { id: 'style-2in-standard', name: 'Standard', price: 0, sku: 'SRS-2-STD' },
              { id: 'style-2in-tactical', name: 'Tactical', price: 5.00, sku: 'SRS-2-TAC' }
            ],
            'sleeve-4in': [
              { id: 'style-4in-standard', name: 'Standard', price: 0, sku: 'SRS-4-STD' },
              { id: 'style-4in-tactical', name: 'Tactical', price: 5.00, sku: 'SRS-4-TAC' }
            ],
            'sleeve-6in': [
              { id: 'style-6in-standard', name: 'Standard', price: 0, sku: 'SRS-6-STD' },
              { id: 'style-6in-tactical', name: 'Tactical', price: 5.00, sku: 'SRS-6-TAC' },
              { id: 'style-6in-twisted', name: 'Twisted', price: 8.00, sku: 'SRS-6-TWI' },
              { id: 'style-6in-vented', name: 'Vented', price: 10.00, sku: 'SRS-6-VEN' }
            ],
            'sleeve-8in': [
              { id: 'style-8in-standard', name: 'Standard', price: 0, sku: 'SRS-8-STD' },
              { id: 'style-8in-tactical', name: 'Tactical', price: 5.00, sku: 'SRS-8-TAC' },
              { id: 'style-8in-twisted', name: 'Twisted', price: 8.00, sku: 'SRS-8-TWI' }
            ],
            'sleeve-10in': [
              { id: 'style-10in-standard', name: 'Standard', price: 0, sku: 'SRS-10-STD' },
              { id: 'style-10in-tactical', name: 'Tactical', price: 5.00, sku: 'SRS-10-TAC' }
            ],
            'sleeve-12in': [
              { id: 'style-12in-standard', name: 'Standard', price: 0, sku: 'SRS-12-STD' },
              { id: 'style-12in-tactical', name: 'Tactical', price: 5.00, sku: 'SRS-12-TAC' }
            ]
          }
        },
        {
          id: 'hub-adapter',
          name: 'Hub Adapter',
          description: 'Choose material for hub adapter',
          options: [
            {
              id: 'hub-black-nitride',
              name: 'Hub Adapter - Black Nitride',
              price: 29.99,
              sku: 'HA-BN',
              description: 'Black nitride hub adapter'
            },
            {
              id: 'hub-polished-stainless',
              name: 'Hub Adapter - Polished Stainless',
              price: 39.99,
              sku: 'HA-PS',
              description: 'Polished stainless hub adapter'
            }
          ]
        },
        {
          id: 'gal-pal',
          name: 'GAL-PAL (Golf Ball Launcher)',
          description: 'Choose style for golf ball launcher',
          options: [
            {
              id: 'gal-pal-dimpled',
              name: 'GAL-PAL - Dimpled',
              price: 149.99,
              sku: 'GAL-DIM',
              description: 'Aluminum anodized dimpled style'
            },
            {
              id: 'gal-pal-grooved',
              name: 'GAL-PAL - Grooved',
              price: 149.99,
              sku: 'GAL-GRO',
              description: 'Aluminum anodized grooved style'
            }
          ]
        }
      ]
    }
  ]
}
