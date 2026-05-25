import React from 'react';
import ShiftCard from './ShiftCard';

interface ShiftCalendarProps {
  shifts?: any[];
  weekOffset?: number;
  onShiftClick?: (shift: any) => void;
}

export default function ShiftCalendar({ shifts = [], weekOffset = 0, onShiftClick }: ShiftCalendarProps) {
  const getMonday = (d: Date | string | number) => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const startOfWeek = getMonday(new Date());
  startOfWeek.setDate(startOfWeek.getDate() + (weekOffset * 7));

  const days = [0, 1, 2, 3, 4, 5, 6].map(i => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const dayName = i === 6 ? 'Chủ nhật' : `Thứ ${i + 2}`;
    const dateStr = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    
    const today = new Date();
    const isToday = d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();

    return { name: dayName, date: dateStr, isActive: isToday };
  });

  const timeSlots = [
    { id: 'Sáng', label: 'Sáng', time: '08:00 - 14:00' },
    { id: 'Chiều', label: 'Chiều', time: '14:00 - 20:00' },
    { id: 'Tối', label: 'Tối', time: '20:00 - 02:00' }
  ];

  const getShiftsForCell = (dayIndex: number, timeSlotId: string) => {
    const dbDayOfWeek = dayIndex + 2; // dayIndex 0 is Monday, which is 2 (Thứ 2) in dynamic calendar mapping
    return shifts.filter(s => s.dayOfWeek === dbDayOfWeek && s.timeSlot.toLowerCase() === timeSlotId.toLowerCase());
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 mt-6 overflow-hidden font-sans">
      {/* Header Row */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="col-span-1 border-r border-gray-200 py-4 flex flex-col items-center justify-center bg-[#f8f9fb]">
           <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">THỜI GIAN</span>
        </div>
        {days.map((day, idx) => (
          <div 
            key={idx} 
            className={`col-span-1 border-r border-gray-200 last:border-r-0 py-4 flex flex-col items-center justify-center ${day.isActive ? 'bg-[#f0f7ff]' : ''}`}
          >
            <span className={`text-sm font-bold ${day.isActive ? 'text-[#0056b3]' : 'text-gray-900'}`}>{day.name}</span>
            <span className={`text-xs ${day.isActive ? 'text-[#0056b3]' : 'text-gray-500'}`}>{day.date}</span>
          </div>
        ))}
      </div>

      {/* Grid Rows */}
      {timeSlots.map((slot, slotIdx) => (
        <div key={slotIdx} className="grid grid-cols-8 border-b border-gray-200 last:border-b-0">
          {/* Time column */}
          <div className="col-span-1 border-r border-gray-200 py-8 flex flex-col items-center justify-center bg-[#f8f9fb]">
             <span className="text-sm font-bold text-gray-900">{slot.label}</span>
             <span className="text-xs text-gray-500 mt-1">{slot.time}</span>
          </div>
          
          {/* Day columns */}
          {days.map((day, dayIdx) => {
             const cellShifts = getShiftsForCell(dayIdx, slot.id);
              
             return (
               <div 
                 key={dayIdx} 
                 className={`col-span-1 border-r border-gray-200 last:border-r-0 p-3 min-h-[150px] ${day.isActive ? 'bg-[#f8fbff]' : ''}`}
               >
                  {cellShifts.length > 0 ? (
                    <div className="space-y-3">
                      {cellShifts.map((shift, i) => (
                        <ShiftCard 
                          key={i}
                          location={shift.location}
                          title={shift.title}
                          avatars={shift.avatars || shift.assignedEmployees}
                          onClick={() => onShiftClick && onShiftClick(shift)}
                        />
                      ))}
                    </div>
                  ) : (
                    <ShiftCard isEmpty={true} />
                  )}
               </div>
             )
          })}
        </div>
      ))}
    </div>
  );
}
