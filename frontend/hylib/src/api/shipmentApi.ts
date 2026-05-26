import axiosClient from './axiosClient';
import { Shipment } from '../types';

export const shipmentApi = {
  getAllShipments: () => {
    return axiosClient.get('/shipments');
  },
  
  createShipment: (data: Partial<Shipment>) => {
    return axiosClient.post('/shipments', data);
  },

  updateShipment: (id: number, data: Partial<Shipment>) => {
    return axiosClient.put(`/shipments/${id}`, data);
  },

  deleteShipment: (id: number) => {
    return axiosClient.delete(`/shipments/${id}`);
  }
};
