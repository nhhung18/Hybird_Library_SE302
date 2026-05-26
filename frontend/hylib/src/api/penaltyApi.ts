import axiosClient from './axiosClient';
import { PenaltyCost } from '../types';

export const penaltyApi = {
  getAllPenalties: () => {
    return axiosClient.get('/penalties');
  },
  
  createPenalty: (data: Partial<PenaltyCost>) => {
    return axiosClient.post('/penalties', data);
  },

  updatePenalty: (id: number, data: Partial<PenaltyCost>) => {
    return axiosClient.put(`/penalties/${id}`, data);
  },

  deletePenalty: (id: number) => {
    return axiosClient.delete(`/penalties/${id}`);
  }
};
