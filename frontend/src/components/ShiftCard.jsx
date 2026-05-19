import React from 'react';

export default function ShiftCard({ location, title, avatars = [], isEmpty, onClick }) {
  if (isEmpty) {
    return (
      <div className="h-full w-full min-h-[120px] rounded-xl border border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center transition-colors">
      </div>
    );
  }

  // Map locations to specific colors
  const getLocationStyle = (loc) => {
    switch(loc) {
      case 'Quầy Lễ tân':
        return 'bg-blue-100 text-blue-800';
      case 'Khu Tự học':
        return 'bg-gray-100 text-gray-800';
      case 'Kho sách':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full h-full min-h-[120px] flex flex-col"
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
             <div key={idx} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${avatar.name}`} alt={avatar.name} className="w-full h-full object-cover"/>
             </div>
          ))}
          {avatars.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-gray-600">
              +{avatars.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
