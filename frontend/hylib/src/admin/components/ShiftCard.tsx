import React from 'react';

interface ShiftCardProps {
  key?: React.Key;
  location?: string;
  title?: string;
  avatars?: any[];
  isEmpty?: boolean;
  onClick?: () => void;
}

export default function ShiftCard({ location = '', title = '', avatars = [], isEmpty = false, onClick }: ShiftCardProps) {
  if (isEmpty) {
    return (
      <div className="h-full w-full min-h-[120px] rounded-xl border border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center transition-colors">
      </div>
    );
  }

  const getLocationStyle = (loc: string) => {
    switch(loc) {
      case 'Quầy Lễ tân':
        return 'bg-blue-50 border border-blue-200 text-[#0066cc]';
      case 'Khu Tự học':
        return 'bg-gray-50 border border-gray-200 text-gray-700';
      case 'Kho sách':
        return 'bg-teal-50 border border-teal-200 text-teal-700';
      default:
        return 'bg-gray-50 border border-gray-200 text-gray-700';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full h-full min-h-[120px] flex flex-col font-sans"
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-bold px-2 py-1 rounded-md max-w-[80%] uppercase ${getLocationStyle(location)}`}>
          {location}
        </span>
      </div>
      <h3 className="font-bold text-gray-900 text-sm mb-4">{title}</h3>
      
      <div className="mt-auto flex items-center">
        <div className="flex -space-x-2">
          {avatars.slice(0, 3).map((avatar, idx) => (
             <div key={idx} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${avatar.name || avatar}`} alt={avatar.name || avatar} className="w-full h-full object-cover"/>
             </div>
          ))}
          {avatars.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-[9px] font-bold text-gray-600 shadow-sm">
              +{avatars.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
