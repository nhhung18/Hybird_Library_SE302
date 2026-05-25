import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CreateUserModal from '../components/CreateUserModal';
import UpdateRoleModal from '../components/UpdateRoleModal';
import BorrowHistoryModal from '../components/BorrowHistoryModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { Search, ChevronDown, Shield, History, Plus, ChevronLeft, ChevronRight, Trash2, Filter } from 'lucide-react';

export default function UserManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateRoleModalOpen, setIsUpdateRoleModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [filterType, setFilterType] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const [users, setUsers] = useState([
    {
      id: '#USR-001',
      name: 'Nguyễn Văn A',
      email: 'nva@email.com',
      type: 'Độc giả',
      date: '12/10/2023',
      isActive: false
    },
    {
      id: '#USR-002',
      name: 'Trần Thị B',
      email: 'ttb@email.com',
      type: 'VIP',
      date: '05/11/2023',
      isActive: false
    },
    {
      id: '#USR-003',
      name: 'Lê Văn C',
      email: 'lvc@email.com',
      type: 'Khách',
      date: '20/12/2023',
      isActive: false
    },
    {
      id: '#USR-004',
      name: 'Alexei Vane',
      email: 'example@email.com',
      type: 'Khách',
      date: '13/05/2023',
      isActive: true
    }
  ]);

  const handleAddUser = (newUser) => {
    setUsers([newUser, ...users]);
  };

  const toggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleUpdateRole = (updatedUser) => {
    setUsers(users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
    }
  };

  const openUpdateRoleModal = (user) => {
    setSelectedUser(user);
    setIsUpdateRoleModalOpen(true);
  };

  const openHistoryModal = (user) => {
    setSelectedUser(user);
    setIsHistoryModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const getAccountTypeStyle = (type) => {
    switch (type) {
      case 'Độc giả':
        return 'bg-blue-50 text-[#0056b3]';
      case 'VIP':
        return 'bg-[#fff8e1] text-[#f57f17]';
      case 'Khách':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = filterType === 'Tất cả' || user.type === filterType;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex h-screen bg-[#f8f9fb]">
      <Sidebar />

      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header />

        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header */}
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Người dùng</h1>

            <div className="flex justify-between items-center">
              <div className="flex-1"></div>
              <div className="flex gap-3 items-center">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] transition-all shadow-sm"
                  />
                </div>

                <div className="relative inline-block">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-full pl-10 pr-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm focus:outline-none focus:border-[#0066cc] cursor-pointer"
                  >
                    <option value="Tất cả">Lọc: Tất cả</option>
                    <option value="Độc giả">Độc giả</option>
                    <option value="VIP">VIP</option>
                    <option value="Khách">Khách</option>
                  </select>
                  <Filter size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <ChevronDown size={14} className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>

                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 py-2 rounded-full font-medium transition-colors flex items-center gap-2 text-sm shadow-md"
                >
                  <Plus size={18} />
                  Thêm người dùng
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col h-full shadow-sm">
              <div className="overflow-x-auto flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="sticky top-0 z-10 bg-white shadow-sm">
                    <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-5">ID</th>
                      <th className="px-6 py-5">TÊN NGƯỜI DÙNG</th>
                      <th className="px-6 py-5">LOẠI TÀI KHOẢN</th>
                      <th className="px-6 py-5">NGÀY ĐĂNG KÝ</th>
                      <th className="px-6 py-5">TRẠNG THÁI</th>
                      <th className="px-6 py-5 text-center">THAO TÁC</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-gray-700">
                    {filteredUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                        <td className="px-6 py-5 font-bold text-gray-500">{user.id}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-bold text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${getAccountTypeStyle(user.type)}`}>
                            {user.type}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-gray-500 font-medium">{user.date}</td>
                        <td className="px-6 py-5">
                          <div className="relative inline-block">
                            <select
                              value={user.isActive ? 'active' : 'inactive'}
                              onChange={() => toggleStatus(user.id)}
                              className={`appearance-none outline-none cursor-pointer text-xs font-bold rounded-full px-3 py-1.5 pr-8 border transition-colors ${
                                user.isActive 
                                  ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                              }`}
                            >
                              <option value="active">Hoạt động</option>
                              <option value="inactive">Ngừng HĐ</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                              <ChevronDown size={14} className={user.isActive ? 'text-green-600' : 'text-gray-500'} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-4 text-gray-400">
                            <button onClick={() => openUpdateRoleModal(user)} className="hover:text-gray-600 transition-colors" title="Cập nhật quyền"><Shield size={18} /></button>
                            <button onClick={() => openHistoryModal(user)} className="hover:text-gray-600 transition-colors" title="Lịch sử mượn trả"><History size={18} /></button>
                            <button onClick={() => openDeleteModal(user)} className="hover:text-red-500 transition-colors" title="Xoá người dùng"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500 bg-white">
                <span>Hiển thị 1 đến {filteredUsers.length} trong số {filteredUsers.length} người dùng</span>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"><ChevronLeft size={16} /></button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0056b3] text-white font-medium">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors">3</button>
                  <span>...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleAddUser}
      />

      <UpdateRoleModal
        isOpen={isUpdateRoleModalOpen}
        onClose={() => setIsUpdateRoleModalOpen(false)}
        user={selectedUser}
        onSave={handleUpdateRole}
      />

      <BorrowHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        user={selectedUser}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
