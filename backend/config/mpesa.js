const axios = require('axios');

const getAccessToken = async () => {
    const auth = Buffer.from(
        `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64');

    try {
        const response = await axios.get(
            process.env.MPESA_ENVIRONMENT === 'production'
                ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
                : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${auth}`
                }
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error('M-Pesa Token Error:', error.response?.data || error.message);
        throw error;
    }
};

const initiateSTKPush = async ({ phoneNumber, amount, orderId }) => {
    try {
        const accessToken = await getAccessToken();

        // For Buy Goods Till (CustomerBuyGoodsOnline), we use a different password format
        // Actually, for Buy Goods Till, the password is not required in the same way
        // We'll use the shortcode as password (or use a simpler approach)

        const timestamp = new Date()
            .toISOString()
            .replace(/[-T:Z.]/g, '')
            .slice(0, 14);

        // For Buy Goods Till, the password is often just the shortcode
        // or you can use a static password if provided by Safaricom
        let password;

        if (process.env.MPESA_PASSKEY && process.env.MPESA_PASSKEY !== 'N/A') {
            // If passkey is provided (for Lipa Na M-Pesa Online)
            password = Buffer.from(
                `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
            ).toString('base64');
        } else {
            // For Buy Goods Till, use the shortcode as password
            // Some implementations use a fixed password or the shortcode
            password = Buffer.from(
                `${process.env.MPESA_SHORTCODE}${timestamp}`
            ).toString('base64');
        }

        const payload = {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerBuyGoodsOnline', // For Buy Goods Till
            Amount: Math.round(amount),
            PartyA: phoneNumber,
            PartyB: process.env.MPESA_SHORTCODE, // Your Till Number
            PhoneNumber: phoneNumber,
            CallBackURL: process.env.MPESA_CALLBACK_URL,
            AccountReference: orderId,
            TransactionDesc: `Technical Drawers Order ${orderId}`
        };

        console.log('STK Push requested for order:', orderId);

        const response = await axios.post(
            process.env.MPESA_ENVIRONMENT === 'production'
                ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
                : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('STK Push Error:', error.response?.data || error.message);
        throw error;
    }
};

// Query STK Push status
const querySTKStatus = async (checkoutRequestID) => {
    try {
        const accessToken = await getAccessToken();

        const timestamp = new Date()
            .toISOString()
            .replace(/[-T:Z.]/g, '')
            .slice(0, 14);

        let password;
        if (process.env.MPESA_PASSKEY && process.env.MPESA_PASSKEY !== 'N/A') {
            password = Buffer.from(
                `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
            ).toString('base64');
        } else {
            password = Buffer.from(
                `${process.env.MPESA_SHORTCODE}${timestamp}`
            ).toString('base64');
        }

        const payload = {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            CheckoutRequestID: checkoutRequestID
        };

        const response = await axios.post(
            process.env.MPESA_ENVIRONMENT === 'production'
                ? 'https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query'
                : 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Query Status Error:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = {
    getAccessToken,
    initiateSTKPush,
    querySTKStatus
};