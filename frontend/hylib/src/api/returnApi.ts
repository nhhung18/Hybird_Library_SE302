import axiosClient from './axiosClient';
import { ReturnRecord } from '../types';

export const returnApi = {
  getAllReturnRecords: () => {
    return axiosClient.get('/return');
  },
  
  getReturnRecordById: (id: number) => {
    return axiosClient.get(`/return/${id}`);
  },

  createReturnRecord: (data: Partial<ReturnRecord>) => {
    return axiosClient.post('/return', data);
  },

  updateReturnRecord: (id: number, data: Partial<ReturnRecord>) => {
    return axiosClient.put(`/return/${id}`, data);
  },

  deleteReturnRecord: (id: number) => {
    return axiosClient.delete(`/return/${id}`);
  }
};
