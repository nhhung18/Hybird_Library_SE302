export interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'warning' | 'success' | 'info';
  targetPage?: string;
  targetId?: string;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  avatar: string;
}

export interface BorrowedBook extends Book {
  type: 'Ebook' | 'Offline';
  expiryDate: string;
  renewCount: string;
  status: string;
  statusColor?: string;
  paymentStatus?: string;
  actions: string[];
}
