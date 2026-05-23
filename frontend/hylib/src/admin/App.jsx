import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import ShiftManagement from './pages/ShiftManagement';
import PaymentManagement from './pages/PaymentManagement';
import UserManagement from './pages/UserManagement';
import BorrowingManagement from './pages/BorrowingManagement';
import SupportManagement from './pages/SupportManagement';
import TicketDetails from './pages/TicketDetails';
import MembershipCardManagement from './pages/MembershipCardManagement';
import BookManagement from './pages/BookManagement';
import CreateBook from './pages/CreateBook';
import PenaltyManagement from './pages/PenaltyManagement';
import PenaltyDetails from './pages/PenaltyDetails';
export default function AdminApp() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f9fafb] font-sans text-gray-900 antialiased selection:bg-blue-100 selection:text-[#0066cc]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeManagement />} />
          <Route path="/shifts" element={<ShiftManagement />} />
          <Route path="/payments" element={<PaymentManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/borrowing" element={<BorrowingManagement />} />
          <Route path="/support" element={<SupportManagement />} />
          <Route path="/support/:id" element={<TicketDetails />} />
          <Route path="/membership-cards" element={<MembershipCardManagement />} />
          <Route path="/books" element={<BookManagement />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/fines" element={<PenaltyManagement />} />
          <Route path="/fines/:id" element={<PenaltyDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
