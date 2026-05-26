import axiosClient from './axiosClient';

export const userApi = {
  /**
   * Fetch all users
   * Corresponding to GET /api/users in UserController.java
   */
  getAllUsers: () => {
    return axiosClient.get('/users');
  },

  /**
   * Add a new user
   */
  createUser: (data: any) => {
    return axiosClient.post('/users', data);
  },

  /**
   * Update user details or role
   */
  updateUser: (id: number, data: any) => {
    return axiosClient.put(`/users/${id}`, data);
  },

  /**
   * Delete a user
   */
  deleteUser: (id: number) => {
    return axiosClient.delete(`/users/${id}`);
  },
};
