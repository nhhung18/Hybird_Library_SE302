import axiosClient from './axiosClient';
import { PenaltyCost } from '../types';

export const penaltyApi = {
  getAllPenalties: () => {
    return axiosClient.get('/penalty-costs');
  },
  
  createPenalty: (data: Partial<PenaltyCost>) => {
    return axiosClient.post('/penalty-costs', data);
  },

  updatePenalty: (id: number, data: Partial<PenaltyCost>) => {
    return axiosClient.put(`/penalty-costs/${id}`, data);
  },

  deletePenalty: (id: number) => {
    return axiosClient.delete(`/penalty-costs/${id}`);
  }
};
