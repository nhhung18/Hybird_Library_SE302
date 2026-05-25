import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ShiftCalendar from '../components/ShiftCalendar';
import ShiftExchangeRequests from '../components/ShiftExchangeRequests';
import AddShiftModal from '../components/AddShiftModal';
import ShiftDetailsModal from '../components/ShiftDetailsModal';

interface Shift {
  id: number;
  title: string;
  location: string;
  dayOfWeek: number;
  timeSlot: string;
  avatars: string[];
}

export default function ShiftManagement() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [activeTab, setActiveTab] = useState('Lịch biểu');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

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
    <div className="flex h-screen bg-[#f8f9fb] font-sans">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header title="Quản lý Ca Làm việc" />
        
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
          {/* Page Header */}
          <div className="mb-6 shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ca làm việc</h1>
            
            <div className="flex justify-between items-center mt-4">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 gap-8">
                {['Lịch biểu', 'Xét duyệt đổi ca'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[14px] font-bold transition-all relative ${
                      activeTab === tab 
                        ? 'text-[#0066cc]' 
                        : 'text-gray-400 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0066cc] rounded-t-full"></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Controls aligned perfectly on the right */}
              <div className="flex items-center gap-3">
                {activeTab === 'Lịch biểu' && (
                  <div className="flex items-center gap-3 px-3 py-1.5 border border-gray-200 rounded-full bg-white text-xs font-semibold text-gray-600 shadow-sm">
                    <button onClick={() => setWeekOffset(prev => prev - 1)} className="text-gray-400 hover:text-gray-900 transition-colors"><ChevronLeft size={14} /></button>
                    <span className="w-16 text-center">{getWeekText()}</span>
                    <button onClick={() => setWeekOffset(prev => prev + 1)} className="text-gray-400 hover:text-gray-900 transition-colors"><ChevronRight size={14} /></button>
                  </div>
                )}
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] text-white px-5 py-2 rounded-full font-bold text-sm transition-colors shadow-md"
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
                <div className="overflow-y-auto custom-scrollbar flex-1 border border-gray-200 rounded-xl bg-white p-4 shadow-sm">
                   <ShiftCalendar 
                     shifts={weekOffset === 0 ? shifts : []} 
                     weekOffset={weekOffset} 
                     onShiftClick={(shift: any) => setSelectedShift(shift)}
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
