import axiosClient from './axiosClient';
import { Category } from '../types';

export const categoryApi = {
  getAllCategories: () => {
    return axiosClient.get('/categories');
  },
  
  createCategory: (data: Partial<Category>) => {
    return axiosClient.post('/categories', data);
  },

  updateCategory: (id: number, data: Partial<Category>) => {
    return axiosClient.put(`/categories/${id}`, data);
  },

  deleteCategory: (id: number) => {
    return axiosClient.delete(`/categories/${id}`);
  }
};
