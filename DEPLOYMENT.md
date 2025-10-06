# Vercel Deployment Guide

## Quick Deploy (No Environment Variables Required)

The configurator can be deployed to Vercel without any environment variables for demo purposes. The BigCommerce integration will work in "demo mode" until you configure the API credentials.

### Step 1: Deploy to Vercel

1. **Fork this repository** to your GitHub account
2. **Go to [Vercel.com](https://vercel.com)** and sign in
3. **Click "New Project"**
4. **Import your forked repository**
5. **Deploy with default settings**

The deployment will work immediately without any configuration!

### Step 2: Configure BigCommerce Integration (Optional)

If you want to connect to a real BigCommerce store:

#### Option A: Via Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `BIGCOMMERCE_STORE_HASH` = your store hash
   - `BIGCOMMERCE_ACCESS_TOKEN` = your API token
4. **Redeploy** your project

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add BIGCOMMERCE_STORE_HASH
vercel env add BIGCOMMERCE_ACCESS_TOKEN

# Deploy
vercel --prod
```

## Getting BigCommerce Credentials

### Store Hash
1. Log into your BigCommerce store admin
2. Go to **Settings** → **API Accounts**
3. Your Store Hash is in the URL: `https://store-{STORE_HASH}.mybigcommerce.com`

### API Access Token
1. In BigCommerce admin, go to **Settings** → **API Accounts**
2. Click **Create API Account**
3. Set permissions:
   - **Products**: Read/Write
   - **Carts**: Read/Write
   - **Inventory**: Read/Write
   - **Customers**: Read
4. Copy the generated token

## Demo Mode vs Production Mode

### Demo Mode (Default)
- Works without BigCommerce credentials
- Shows sample data and pricing
- Perfect for testing and demonstrations
- No real inventory tracking

### Production Mode
- Requires valid BigCommerce credentials
- Real inventory management
- Actual cart integration
- Live SKU mapping

## Testing the Deployment

1. **Visit your Vercel URL** (e.g., `https://your-project.vercel.app`)
2. **Test the configurator flow**:
   - Select base device (Muzzle Brake or Flash Hider)
   - Choose material finish
   - Add accessories (multi-select)
   - For Sound Redirect Sleeve: choose length, then style
3. **Verify mobile responsiveness** on different screen sizes
4. **Check the summary** shows correct pricing and SKUs

## Troubleshooting

### Common Issues

**"Environment Variable not found"**
- This is normal for demo mode
- The configurator will work without these variables
- Add them only if you want real BigCommerce integration

**"Build failed"**
- Check that all dependencies are in package.json
- Ensure the build command is correct
- Check the Vercel build logs for specific errors

**"Configurator not loading"**
- Check browser console for JavaScript errors
- Verify the build output includes all assets
- Test locally first with `npm run dev`

## Next Steps After Deployment

1. **Test all functionality** in the deployed environment
2. **Configure BigCommerce credentials** if needed
3. **Map your actual SKUs** in the configuration
4. **Customize styling** to match your brand
5. **Add to your BigCommerce store** via Stencil theme integration

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Review the Vercel deployment logs
3. Test locally first with `npm run dev`
4. Contact support with specific error messages

---

**The configurator is now ready for deployment! 🚀**
