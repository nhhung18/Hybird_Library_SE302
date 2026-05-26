import axiosClient from './axiosClient';
import { BorrowRecord } from '../types';

export const borrowApi = {
  getAllBorrowRecords: () => {
    return axiosClient.get('/borrow-records');
  },
  
  createBorrowRecord: (data: Partial<BorrowRecord>) => {
    return axiosClient.post('/borrow-records', data);
  },

  updateBorrowRecord: (id: number, data: Partial<BorrowRecord>) => {
    return axiosClient.put(`/borrow-records/${id}`, data);
  },

  deleteBorrowRecord: (id: number) => {
    return axiosClient.delete(`/borrow-records/${id}`);
  }
};
