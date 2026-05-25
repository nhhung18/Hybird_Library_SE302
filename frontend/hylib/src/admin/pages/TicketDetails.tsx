import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ArrowLeft, User, Bot, Bold, Italic, List, Paperclip, Send, Calendar, Monitor, Briefcase, SendHorizonal } from 'lucide-react';

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('supportTickets');
    if (saved) return JSON.parse(saved);
    return [];
  });

  const ticketIndex = tickets.findIndex(t => t.id === id || t.id === `#${id}`);
  
  const ticket = ticketIndex !== -1 ? tickets[ticketIndex] : {
    id: `#${id}`,
    title: 'Chi tiết thẻ hỗ trợ',
    status: 'Đang xử lý'
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (ticketIndex !== -1) {
      const newTickets = [...tickets];
      newTickets[ticketIndex].status = newStatus;
      setTickets(newTickets);
      localStorage.setItem('supportTickets', JSON.stringify(newTickets));
    }
  };

  const user = {
    name: 'Michael Kim',
    email: 'michael.kim@example.com',
    initials: 'MK',
    totalTickets: 12,
    resolvedTickets: 11
  };

  const [replyText, setReplyText] = useState('');
  const [markAsResolved, setMarkAsResolved] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'Xin chào, tôi đang cố gắng đăng nhập vào tài khoản của mình trên hệ thống thư viện nhưng liên tục nhận được thông báo lỗi "Tài khoản tạm khóa". Tôi cần mượn một số sách cho dự án cuối tuần này. Có thể giúp tôi kiểm tra được không? Cảm ơn.',
      time: '10:24 AM, Today'
    },
    {
      sender: 'system',
      text: `Cảm ơn bạn đã liên hệ Athenaeum Support. Yêu cầu của bạn đã được ghi nhận với mã ${ticket.id}. Đội ngũ hỗ trợ sẽ kiểm tra và phản hồi trong thời gian sớm nhất (thường trong vòng 2-4 giờ làm việc).`,
      time: '10:25 AM, Today'
    }
  ]);

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    const newMessage = {
      sender: 'admin',
      text: replyText,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ', Today'
    };
    
    setMessages([...messages, newMessage]);
    setReplyText('');

    if (markAsResolved) {
      handleStatusChange({ target: { value: 'Đã xử lý' } });
      setMarkAsResolved(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fb]">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden relative">
        <Header />
        
        <div className="p-10 flex-1 overflow-y-auto flex flex-col">
          
          {/* Top Bar */}
          <div className="mb-6">
            <button 
              onClick={() => navigate('/support')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium mb-4"
            >
              <ArrowLeft size={16} />
              Back to Tickets
            </button>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Ticket {ticket.id}</h1>
                <p className="text-gray-500 text-sm font-medium">{ticket.title}</p>
              </div>
              
              <div className="relative">
                <select 
                  value={ticket.status}
                  onChange={handleStatusChange}
                  className="appearance-none bg-white border border-gray-200 rounded-full px-5 py-2.5 pr-10 text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer shadow-sm"
                >
                  <option value="Mới">Mới</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã xử lý">Đã xử lý</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="flex gap-6 flex-1 min-h-0">
            
            {/* Left Column (Chat Area) */}
            <div className="flex-1 flex flex-col gap-6 overflow-hidden">
              
              {/* Chat History */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-8 flex-1 overflow-y-auto">
                
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-4 ${msg.sender !== 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'user' ? 'bg-gray-200 text-gray-500' : 'bg-[#e6f0fa] text-[#0056b3]'
                    }`}>
                      {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                    </div>
                    <div className={`flex-1 flex flex-col ${msg.sender !== 'user' ? 'items-end' : ''}`}>
                      <div className={`flex items-center gap-2 mb-2 ${msg.sender !== 'user' ? 'flex-row-reverse' : ''}`}>
                        <span className={`font-bold text-sm ${msg.sender !== 'user' ? 'text-[#0056b3]' : 'text-gray-900'}`}>
                          {msg.sender === 'user' ? user.name : (msg.sender === 'system' ? 'System Auto-Reply' : 'Admin')}
                        </span>
                        <span className="text-xs font-bold text-gray-400">{msg.time}</span>
                      </div>
                      <div className={`p-5 text-[14px] leading-relaxed shadow-sm max-w-[85%] ${
                        msg.sender === 'user' 
                          ? 'bg-gray-100 rounded-2xl rounded-tl-none text-gray-800' 
                          : 'bg-white border border-gray-200 rounded-2xl rounded-tr-none text-gray-700 text-left'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}

              </div>

              {/* Reply Box */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden shrink-0">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">PHẢN HỒI KHÁCH HÀNG</h3>
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md p-1 shadow-sm">
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Bold size={16} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Italic size={16} /></button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><List size={16} /></button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"><Paperclip size={16} /></button>
                  </div>
                </div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Nhập nội dung phản hồi..."
                  className="w-full p-5 text-sm focus:outline-none min-h-[120px] resize-none text-gray-700 placeholder-gray-400"
                ></textarea>
                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div 
                      onClick={() => setMarkAsResolved(!markAsResolved)}
                      className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${markAsResolved ? 'bg-blue-500 border-blue-500' : 'border-gray-300 group-hover:border-blue-500'}`}
                    >
                      {markAsResolved && <span className="text-white text-[10px]">✓</span>}
                    </div>
                    <span 
                      onClick={() => setMarkAsResolved(!markAsResolved)}
                      className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors"
                    >
                      Đánh dấu là Đã xử lý sau khi gửi
                    </span>
                  </label>
                  <button 
                    onClick={handleSendReply}
                    className="flex items-center gap-2 bg-[#0056b3] hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold text-sm transition-colors shadow-md"
                  >
                    Gửi phản hồi <SendHorizonal size={16} />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="w-[320px] flex flex-col gap-6 shrink-0">
              
              {/* Profile Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#0056b3] text-white flex items-center justify-center text-3xl font-bold mb-4 shadow-inner">
                  {user.initials}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <p className="text-sm text-gray-500 font-medium mb-6">{user.email}</p>
                
                <div className="flex gap-2 mb-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-bold">Thành viên</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-bold">Reader</span>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Tổng Tickets</p>
                    <p className="text-2xl font-black text-gray-900">{user.totalTickets}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase mb-1">Đã xử lý</p>
                    <p className="text-2xl font-black text-[#0056b3]">{user.resolvedTickets}</p>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-6">THÔNG TIN TICKET</h3>
                
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4 items-start">
                    <Calendar size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase mb-0.5">Ngày tạo</p>
                      <p className="text-sm font-medium text-gray-900">Oct 24, 2023 - 10:24 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <Briefcase size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase mb-0.5">Danh mục</p>
                      <p className="text-sm font-medium text-gray-900">Tài khoản & Đăng nhập</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Monitor size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-gray-500 uppercase mb-0.5">Thiết bị/Trình duyệt</p>
                      <p className="text-sm font-medium text-gray-900">macOS / Safari 16</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
