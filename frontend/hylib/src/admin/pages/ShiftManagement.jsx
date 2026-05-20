import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ShiftCalendar from '../components/ShiftCalendar';
import ShiftExchangeRequests from '../components/ShiftExchangeRequests';
import AddShiftModal from '../components/AddShiftModal';
import ShiftDetailsModal from '../components/ShiftDetailsModal';

export default function ShiftManagement() {
  const [shifts, setShifts] = useState([]);
  const [activeTab, setActiveTab] = useState('Lịch biểu');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedShift, setSelectedShift] = useState(null);

  const fetchShifts = () => {
    axios.get('http://localhost:8080/api/v1/shifts')
      .then(response => setShifts(response.data))
      .catch(error => {
        console.error("Error fetching shifts:", error);
        // Fallback mock data
        setShifts([
          { id: 1, title: 'Ca Sáng', location: 'Quầy Lễ tân', dayOfWeek: 2, timeSlot: 'Sáng', avatars: ['https://i.pravatar.cc/150?u=1'] },
          { id: 2, title: 'Ca Chiều', location: 'Kho sách', dayOfWeek: 3, timeSlot: 'Chiều', avatars: ['https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3'] },
          { id: 3, title: 'Ca Tối', location: 'Khu Tự học', dayOfWeek: 4, timeSlot: 'Tối', avatars: ['https://i.pravatar.cc/150?u=4'] },
          { id: 4, title: 'Ca Sáng cuối tuần', location: 'Quầy Lễ tân', dayOfWeek: 7, timeSlot: 'Sáng', avatars: ['https://i.pravatar.cc/150?u=5', 'https://i.pravatar.cc/150?u=6'] }
        ]);
      });
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  const getWeekText = () => {
    if (weekOffset === 0) return 'Tuần này';
    if (weekOffset === -1) return 'Tuần trước';
    if (weekOffset === 1) return 'Tuần sau';
    if (weekOffset < -1) return `${Math.abs(weekOffset)} tuần trước`;
    return `${weekOffset} tuần sau`;
  };

  return (
    <div className="flex h-screen bg-[#f8f9fb]">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header */}
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Quản lý Ca làm</h1>
            
            <div className="flex justify-between items-end border-b border-gray-200">
               {/* Tabs */}
               <div className="flex gap-8">
                  <button 
                     onClick={() => setActiveTab('Lịch biểu')}
                     className={`pb-4 px-1 text-[15px] font-medium transition-colors relative ${activeTab === 'Lịch biểu' ? 'text-[#0056b3]' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                     Lịch biểu
                     {activeTab === 'Lịch biểu' && (
                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0056b3] rounded-t-full"></div>
                     )}
                  </button>
                  <button 
                     onClick={() => setActiveTab('Xét duyệt đổi ca')}
                     className={`pb-4 px-1 text-[15px] font-medium transition-colors relative ${activeTab === 'Xét duyệt đổi ca' ? 'text-[#0056b3]' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                     Xét duyệt đổi ca
                     {activeTab === 'Xét duyệt đổi ca' && (
                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0056b3] rounded-t-full"></div>
                     )}
                  </button>
               </div>

               {/* Controls */}
               <div className="flex items-center gap-4 pb-3">
                  <div className="flex items-center gap-3 px-4 py-2 border border-gray-200 rounded-full bg-white text-sm font-medium text-gray-700">
                     <button onClick={() => setWeekOffset(prev => prev - 1)} className="text-gray-400 hover:text-gray-900 transition-colors"><ChevronLeft size={16} /></button>
                     <span className="w-20 text-center">{getWeekText()}</span>
                     <button onClick={() => setWeekOffset(prev => prev + 1)} className="text-gray-400 hover:text-gray-900 transition-colors"><ChevronRight size={16} /></button>
                  </div>
                  <button 
                     onClick={() => setIsAddModalOpen(true)}
                     className="flex items-center gap-2 bg-[#0056b3] hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                     <Plus size={18} />
                     Thêm ca làm
                  </button>
               </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
             {activeTab === 'Lịch biểu' ? (
                <div className="overflow-y-auto">
                   <ShiftCalendar 
                     shifts={weekOffset === 0 ? shifts : []} 
                     weekOffset={weekOffset} 
                     onShiftClick={(shift) => setSelectedShift(shift)}
                   />
                </div>
             ) : (
                <ShiftExchangeRequests />
             )}
          </div>

        </div>
      </main>

      <AddShiftModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={fetchShifts}
      />
      
      <ShiftDetailsModal 
        shift={selectedShift} 
        onClose={() => setSelectedShift(null)} 
      />
    </div>
  );
}
