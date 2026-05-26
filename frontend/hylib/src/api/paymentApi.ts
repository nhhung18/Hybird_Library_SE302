import axiosClient from './axiosClient';
import { PaymentTransaction } from '../types';

export const paymentApi = {
  getAllPayments: () => {
    return axiosClient.get('/payments');
  },
  
  createPayment: (data: Partial<PaymentTransaction>) => {
    return axiosClient.post('/payments', data);
  },

  updatePayment: (id: number, data: Partial<PaymentTransaction>) => {
    return axiosClient.put(`/payments/${id}`, data);
  },

  deletePayment: (id: number) => {
    return axiosClient.delete(`/payments/${id}`);
  }
};
