import React, { useState } from 'react'
import { usePexiblockPayment } from '../hooks/usePexiblockPayment'
import './PexiblockCheckout.css'

export const PexiblockCheckout = () => {
    const { createPayment, paymentUrl, paymentReference, loading, error, resetPayment } = usePexiblockPayment()

    const [formData, setFormData] = useState({
        total_amount: '100.00',
        currency_code: 'USD',
        customer_details: {
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
        },
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target

        if (name.startsWith('customer_')) {
            const field = name.replace('customer_', '')
            setFormData(prev => ({
                ...prev,
                customer_details: {
                    ...prev.customer_details,
                    [field]: value
                }
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate form data
        if (!formData.customer_details.email || !formData.customer_details.first_name ||
            !formData.customer_details.last_name || !formData.customer_details.phone) {
            alert('Please fill in all required fields')
            return
        }

        await createPayment(formData)
    }

    // Iframe View
    if (paymentUrl) {
        return (
            <div className="payment-container">
                <div className="payment-card">
                    <div className="payment-header">
                        <h2>Complete Your Payment</h2>
                        <button
                            className="close-btn"
                            onClick={resetPayment}
                            aria-label="Close payment"
                        >
                            ×
                        </button>
                    </div>

                    {paymentReference && (
                        <div className="payment-reference">
                            <small>Reference: {paymentReference}</small>
                        </div>
                    )}

                    <div className="iframe-container">
                        <iframe
                            src={paymentUrl}
                            title="PEXIBLOCK Checkout"
                            className="payment-iframe"
                            frameBorder="0"
                            allowFullScreen
                            allow="payment"
                        ></iframe>
                    </div>

                    <button
                        className="back-btn"
                        onClick={resetPayment}
                    >
                        ← Back to Payment Form
                    </button>
                </div>
            </div>
        )
    }

    // Form View
    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="payment-header">
                    <div>
                        <h2>Card to Crypto Payment</h2>
                        <p className="subtitle">Secure payment powered by PEXIBLOCK</p>
                    </div>
                </div>

                {error && (
                    <div className="error-message" role="alert">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="payment-form">
                    <div className="form-group">
                        <label htmlFor="amount">Amount (USD)</label>
                        <input
                            id="amount"
                            type="number"
                            name="total_amount"
                            value={formData.total_amount}
                            onChange={handleInputChange}
                            placeholder="100.00"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="currency">Currency</label>
                        <select
                            id="currency"
                            name="currency_code"
                            value={formData.currency_code}
                            onChange={handleInputChange}
                        >
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="KES">KES - Kenyan Shilling</option>
                            <option value="ZAR">ZAR - South African Rand</option>
                        </select>
                    </div>

                    <fieldset className="form-group">
                        <legend>Customer Details</legend>

                        <input
                            id="email"
                            type="email"
                            name="customer_email"
                            value={formData.customer_details.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            required
                            aria-label="Email"
                        />

                        <div className="form-row">
                            <input
                                id="firstName"
                                type="text"
                                name="customer_first_name"
                                value={formData.customer_details.first_name}
                                onChange={handleInputChange}
                                placeholder="First Name"
                                required
                                aria-label="First Name"
                            />
                            <input
                                id="lastName"
                                type="text"
                                name="customer_last_name"
                                value={formData.customer_details.last_name}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                required
                                aria-label="Last Name"
                            />
                        </div>

                        <input
                            id="phone"
                            type="tel"
                            name="customer_phone"
                            value={formData.customer_details.phone}
                            onChange={handleInputChange}
                            placeholder="+254748885672"
                            required
                            aria-label="Phone"
                        />
                    </fieldset>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Creating Payment...
                            </>
                        ) : (
                            'Proceed to Checkout'
                        )}
                    </button>
                </form>

                <p className="security-note">
                    🔒 Your payment information is encrypted and secure.
                </p>

                <div className="info-box">
                    <p><strong>Note:</strong> This app securely communicates with PEXIBLOCK through your backend server. Your API credentials are protected and never exposed to the frontend.</p>
                </div>
            </div>
        </div>
    )
}
