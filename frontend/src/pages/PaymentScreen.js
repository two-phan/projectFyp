import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormContainer from '../components/FormContainer';

function PaymentScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderCreate = useSelector((state) => state.orderCreate);
    const order = orderCreate?.order;
    const error = orderCreate?.error;

    const [paymentData, setPaymentData] = useState(null);
    const [paymentError, setPaymentError] = useState('');

    useEffect(() => {
        if (!order) {
            navigate('/placeorder');
            return;
        }

        const fetchPaymentData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : ''}`,
                    },
                };
                const { data } = await axios.get(`/api/orders/esewa/initiate/${order.id}/`, config);
                setPaymentData(data);
            } catch (err) {
                setPaymentError('Failed to initiate payment');
            }
        };

        fetchPaymentData();
    }, [order, navigate]);

    if (!paymentData) {
        return <p>Loading payment...</p>;
    }

    return (
        <FormContainer>
            <h1>eSewa Payment</h1>
            {paymentError && <Alert variant="danger">{paymentError}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form
                action="https://uat.esewa.com.np/epay/main"
                method="POST"
            >
                <input type="hidden" name="tAmt" value={paymentData.total_amount} />
                <input type="hidden" name="amt" value={paymentData.total_amount} />
                <input type="hidden" name="txAmt" value="0" />
                <input type="hidden" name="psc" value="0" />
                <input type="hidden" name="pdc" value="0" />
                <input type="hidden" name="scd" value={paymentData.merchant_code} />
                <input type="hidden" name="pid" value={paymentData.transaction_id} />
                <input type="hidden" name="su" value={paymentData.success_url} />
                <input type="hidden" name="fu" value={paymentData.failure_url} />
                <Button type="submit" variant="success">
                    Pay with eSewa
                </Button>
            </Form>
        </FormContainer>
    );
}

export default PaymentScreen;