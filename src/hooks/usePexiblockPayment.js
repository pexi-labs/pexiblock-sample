import { useState } from 'react'
import axios from 'axios'

export const usePexiblockPayment = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [paymentUrl, setPaymentUrl] = useState(null)
  const [paymentReference, setPaymentReference] = useState(null)

  const createPayment = async (paymentData) => {
    setLoading(true)
    setError(null)
    
    try {
      // Use backend API endpoint
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const apiEndpoint = `${backendUrl}/api/payment/create/`
      
      // Get API credentials from environment variables
      const apiKey = import.meta.env.VITE_PEXIBLOCK_API_KEY
      const apiSecret = import.meta.env.VITE_PEXIBLOCK_API_SECRET

      if (!apiKey || !apiSecret) {
        throw new Error('Missing API credentials. Please check your .env file for VITE_PEXIBLOCK_API_KEY and VITE_PEXIBLOCK_API_SECRET')
      }

      console.log('Backend URL:', backendUrl)
      console.log('API Endpoint:', apiEndpoint)
      console.log('API Key:', apiKey ? '✓ Set' : '✗ Missing')
      console.log('API Secret:', apiSecret ? '✓ Set' : '✗ Missing')
      console.log('Payment Data:', paymentData)

      // Prepare payment payload - exactly as Postman sends it
      const payload = {
        total_amount: paymentData.total_amount,
        currency_code: paymentData.currency_code,
        payment_method: 'card',
        external_reference: paymentData.external_reference || `REF-${Date.now()}`,
        customer_details: paymentData.customer_details,
        metadata: paymentData.metadata || { test: false }
      }

      console.log('Request Payload:', payload)

      // Make API call to backend WITH API credentials in headers (like Postman)
      const response = await axios.post(apiEndpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
          'X-API-Secret': apiSecret,
        },
        withCredentials: false
      })

      console.log('Response:', response.data)
      console.log('Response Status:', response.status)

      if (response.data.success && response.data.payment_url) {
        setPaymentUrl(response.data.payment_url)
        setPaymentReference(response.data.reference)
        return {
          success: true,
          payment_url: response.data.payment_url,
          reference: response.data.reference || response.data.external_reference,
          message: response.data.message || 'Payment session created successfully'
        }
      } else if (response.data.success) {
        // Backend returned success but no payment_url (might be in different format)
        console.log('Backend returned success but no payment_url. Full response:', response.data)
        setPaymentUrl(response.data.payment_url || response.data.url)
        setPaymentReference(response.data.reference || response.data.external_reference)
        return {
          success: true,
          payment_url: response.data.payment_url || response.data.url,
          reference: response.data.reference || response.data.external_reference,
          message: response.data.message || 'Payment session created successfully'
        }
      } else {
        throw new Error(response.data.message || 'No payment URL received from backend')
      }

    } catch (err) {
      const errorMsg = 
        err.response?.data?.error || 
        err.response?.data?.message || 
        err.message || 
        'Failed to create payment session'
      
      setError(errorMsg)
      console.error('Payment Creation Error:', err)
      console.error('Error Code:', err.code)
      console.error('Error Message:', err.message)
      console.error('Backend Response Data:', err.response?.data)
      console.error('Backend Status:', err.response?.status)
      console.error('Backend Headers:', err.response?.headers)
      
      // Additional diagnostics for network errors
      if (err.code === 'ERR_NETWORK') {
        console.error('🔴 NETWORK ERROR - Backend may not be running!')
        console.error('Please check:')
        console.error('1. Is Django backend running on http://localhost:8000?')
        console.error('2. Did the backend crash?')
        console.error('3. Is the backend at a different port?')
        console.error('4. Are CORS headers configured correctly?')
      }
      
      if (err.code === 'ERR_BAD_REQUEST') {
        console.error('🔴 BAD REQUEST - Backend rejected the request')
        console.error('Check the request payload format')
      }
      
      return {
        success: false,
        error: errorMsg
      }
    } finally {
      setLoading(false)
    }
  }

  const resetPayment = () => {
    setPaymentUrl(null)
    setError(null)
    setPaymentReference(null)
  }

  return {
    createPayment,
    paymentUrl,
    paymentReference,
    loading,
    error,
    resetPayment
  }
}
