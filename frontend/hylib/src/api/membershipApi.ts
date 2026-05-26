import axiosClient from './axiosClient';
import { MembershipPlan } from '../types';

export const membershipApi = {
  getAllMembershipPlans: () => {
    return axiosClient.get('/membership-plans');
  },
  
  createMembershipPlan: (data: Partial<MembershipPlan>) => {
    return axiosClient.post('/membership-plans', data);
  },

  updateMembershipPlan: (id: number, data: Partial<MembershipPlan>) => {
    return axiosClient.put(`/membership-plans/${id}`, data);
  },

  deleteMembershipPlan: (id: number) => {
    return axiosClient.delete(`/membership-plans/${id}`);
  }
};
