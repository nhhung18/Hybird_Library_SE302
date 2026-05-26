import axiosClient from './axiosClient';
import { PaymentTransaction } from '../types';

export const paymentApi = {
  getAllPayments: () => {
    return axiosClient.get('/payment-transactions');
  },
  
  createPayment: (data: Partial<PaymentTransaction>) => {
    return axiosClient.post('/payment-transactions', data);
  },

  updatePayment: (id: number, data: Partial<PaymentTransaction>) => {
    return axiosClient.put(`/payment-transactions/${id}`, data);
  },

  deletePayment: (id: number) => {
    return axiosClient.delete(`/payment-transactions/${id}`);
  }
};
