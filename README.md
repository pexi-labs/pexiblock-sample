# PEXIBLOCK React Integration Sample

A modern React.js sample application that integrates with the PEXIBLOCK payment API through a secure backend server.

## Overview

This is a production-ready React sample that demonstrates:
- Secure PEXIBLOCK API integration via Django backend
- Protected API credentials (server-side only)
- Professional, responsive UI with Tailwind principles
- Real-time payment form with validation
- Iframe-based payment checkout
- Comprehensive error handling and user feedback
- Mobile-optimized design

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Python 3.8+ with Django
- PEXIBLOCK API credentials (API Key, API Secret)

### Installation

1. **Clone or extract the project**
```bash
cd sample-guide
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Create `.env.local` file**
```bash
cat > .env.local << EOF
VITE_BACKEND_URL=https://api.pexiblock.com

# PEXIBLOCK API Credentials
# These are the same credentials you used in Postman
VITE_PEXIBLOCK_API_KEY=<provided-api-key>
VITE_PEXIBLOCK_API_SECRET=<provided-api-secret-key>

EOF
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
pexiblock-guide/
├── src/
│   ├── components/
│   │   ├── PexiblockCheckout.jsx      # Main payment component
│   │   └── PexiblockCheckout.css      # Component styles
│   ├── hooks/
│   │   └── usePexiblockPayment.js     # Payment logic hook
│   ├── App.jsx                         # Root component
│   ├── App.css                         # App styles
│   ├── main.jsx                        # React entry point
│   └── index.css                       # Global styles
├── .env.local                          # Backend URL and credentials (git ignored)
├── index.html                          # HTML entry point
├── vite.config.js                      # Vite configuration
├── package.json                        # Dependencies
└── README.md                           # This file
```

## Configuration

### Frontend Environment Variables

Create a `.env.local` file (not tracked in git) with your backend URL and credentials:

```env
# Backend Configuration
VITE_BACKEND_URL=https://api.pexiblock.com

# PEXIBLOCK API Credentials
VITE_PEXIBLOCK_API_KEY=your_api_key_here
VITE_PEXIBLOCK_API_SECRET=your_api_secret_here
```

### Getting Your PEXIBLOCK Credentials

Credentials should be configured on the backend server. Contact the PEXIBLOCK team for your API credentials.

## Key Features

### 1. Payment Form
- Amount input with currency selection
- Customer details collection (email, name, phone)
- Real-time form validation
- Comprehensive error messaging

### 2. Secure Backend Integration
- Calls backend API endpoint securely
- API credentials are never exposed to frontend
- Backend server handles all PEXIBLOCK API communication

### 3. Payment Iframe
- Embedded payment checkout interface
- Responsive design implementation
- Mobile-optimized layout
- Loading state indicators

### 4. Error Handling
- Network error detection and handling
- API error display and reporting
- User-friendly error messaging
- Detailed console logging for troubleshooting

## Architecture

```
┌──────────────────────┐
│   React App          │
│  (This Sample)       │
└──────────┬───────────┘
           │
           │ HTTP Request
           │ (with payment data)
           ▼
┌──────────────────────┐
│   Django Backend     │
│  (Secure)            │
└──────────┬───────────┘
           │
           │ Direct API Call
           │ (with credentials)
           ▼
┌──────────────────────┐
│  PEXIBLOCK API       │
│  create payment      │
└──────────┬───────────┘
           │
           │ payment_url
           │
           ▼
┌──────────────────────┐
│   Frontend Iframe    │
│  Checkout Page       │
└──────────────────────┘
```

## Security Considerations

### Best Practices Implemented

1. **Credential Protection**: API credentials are stored on the backend only
2. **Frontend Isolation**: Frontend application never receives or exposes API keys or secrets
3. **Backend Proxy Pattern**: All PEXIBLOCK API calls are routed through the backend server
4. **HTTPS Protocol**: Production deployments utilize HTTPS encryption
5. **Environment Isolation**: Credentials are managed through environment variables, not hardcoded in source code

### Additional Security Recommendations

1. **Rate Limiting**: Implement rate limiting on your backend API endpoints
2. **CORS Configuration**: Restrict cross-origin requests to known and trusted origins
3. **Webhook Handlers**: Implement webhook handlers for payment confirmation events
4. **API Key Rotation**: Establish a regular schedule for rotating API credentials
5. **Request Validation**: Validate all incoming requests on the backend server

## Usage

### Payment Flow

1. User enters payment details in the form
2. User selects "Proceed to Checkout"
3. Frontend transmits data to backend API
4. Backend creates payment session with PEXIBLOCK API
5. Frontend receives payment_url from backend
6. Payment checkout iframe is loaded and displayed
7. User completes payment within the iframe
8. User can return to form or close the payment interface

### Payment Reference Handling

The payment reference is displayed during the checkout process:
```jsx
Reference: {paymentReference}
```

You can use this reference to:
- Track payments in your database
- Implement webhook listeners for payment status updates
- Query payment status from PEXIBLOCK

## Responsive Design

The application is fully responsive across all device sizes:
- **Desktop**: Full payment card with 600px maximum width
- **Tablet**: Optimized layout with adjusted spacing
- **Mobile**: Touch-friendly interface with reduced iframe height

## Development

### Available Scripts

```bash
# Start development server (frontend on port 5173, backend on port 8000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and development server
- **Axios** - HTTP client library
- **CSS3** - Styling with gradients and animations
- **Django** - Backend server (separate application)

### Customization

#### Modify Currency Options
Edit `src/components/PexiblockCheckout.jsx`:
```jsx
<option value="YOUR_CODE">YOUR_CURRENCY - Currency Name</option>
```

#### Change Styling
Edit `src/components/PexiblockCheckout.css` or `src/index.css`

#### Add Custom Fields
Extend the `usePexiblockPayment` hook to include additional metadata:
```js
metadata: {
  source: 'react-backend',
  custom_field: 'value'
}
```

## Troubleshooting

### Issue: Backend API Not Responding
**Solution:**
- Verify Django backend is running on `https://api.pexiblock.com`
- Review backend logs for error messages
- Confirm backend has PEXIBLOCK credentials configured
- Check CORS configuration on backend server

### Issue: Missing API Credentials Error
**Solution:**
- Verify backend has `PEXIBLOCK_API_KEY` and `PEXIBLOCK_API_SECRET` environment variables
- Restart the backend server after updating credentials
- Confirm credentials are correct in PEXIBLOCK Dashboard

### Issue: CORS Errors
**Solution:**
- Review backend CORS configuration settings
- Ensure frontend URL is whitelisted in backend settings
- Verify Content-Type headers are correctly configured

### Issue: Payment URL Not Loading
**Solution:**
- Check browser console for error messages
- Verify backend API endpoint is accessible
- Ensure PEXIBLOCK API endpoint is reachable from backend
- Review network requests in browser DevTools

### Issue: Iframe Not Displaying
**Solution:**
- Verify payment_url is being received from backend
- Check browser console for iframe sandbox errors
- Ensure PEXIBLOCK payment page is accessible
- Validate backend response format

## Additional Resources

- PEXIBLOCK API Documentation: https://api.pexiblock.com/docs
- React Documentation: https://react.dev
- Vite Documentation: https://vitejs.dev
- Django Documentation: https://docs.djangoproject.com

## Support

For issues or questions, please:
1. Review the troubleshooting section above
2. Check backend logs for detailed error information
3. Review browser DevTools console for client-side errors
4. Contact PEXIBLOCK support at: support@pexiblock.com

## License

MIT License - This sample is provided for use in your projects.

## Next Steps

1. **Setup Backend**: Configure Django backend with PEXIBLOCK credentials
2. **Testing**: Conduct testing with real PEXIBLOCK credentials
3. **Customization**: Modify styles and form fields to match your brand guidelines
4. **Webhook Implementation**: Implement webhook handlers for payment confirmations on backend
5. **Deployment**: Deploy both frontend and backend with appropriate security measures

---

For comprehensive integration support, contact the PEXIBLOCK team.
