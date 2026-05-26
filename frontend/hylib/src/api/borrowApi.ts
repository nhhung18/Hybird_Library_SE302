import axiosClient from './axiosClient';
import { BorrowRecord } from '../types';

export const borrowApi = {
  getAllBorrowRecords: () => {
    return axiosClient.get('/borrow');
  },
  
  createBorrowRecord: (data: Partial<BorrowRecord>) => {
    return axiosClient.post('/borrow', data);
  },

  updateBorrowRecord: (id: number, data: Partial<BorrowRecord>) => {
    return axiosClient.put(`/borrow/${id}`, data);
  },

  deleteBorrowRecord: (id: number) => {
    return axiosClient.delete(`/borrow/${id}`);
  }
};
