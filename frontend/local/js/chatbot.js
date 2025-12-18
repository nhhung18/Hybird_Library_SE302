// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');

    // Toggle chatbot visibility
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            if (chatbotContainer.style.display === 'none') {
                chatbotContainer.style.display = 'flex';
                chatbotInput.focus();
            } else {
                chatbotContainer.style.display = 'none';
            }
        });
    }

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.style.display = 'none';
        });
    }

    // Send message
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function sendMessage() {
        const message = chatbotInput.value.trim();
        
        if (!message) return;

        // Add user message to chat
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user-message';
        userMessageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
        chatbotMessages.appendChild(userMessageDiv);

        // Clear input
        chatbotInput.value = '';

        // Scroll to bottom
        setTimeout(() => {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 100);

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(message.toLowerCase());
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot-message';
            botMessageDiv.innerHTML = `<p>${botResponse}</p>`;
            chatbotMessages.appendChild(botMessageDiv);

            // Scroll to bottom
            setTimeout(() => {
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 100);
        }, 500);

        // Save to localStorage
        saveChatMessage({
            type: 'user',
            message: message,
            timestamp: new Date().toLocaleString('vi-VN')
        });
    }

    function getBotResponse(message) {
        // Simple keyword matching for responses
        if (message.includes('xin chào') || message.includes('hello') || message.includes('hi')) {
            return 'Xin chào! 👋 Tôi có thể giúp bạn điều gì hôm nay?';
        }
        
        if (message.includes('tìm') || message.includes('search') || message.includes('sách')) {
            return '📚 Bạn có thể tìm sách bằng cách sử dụng thanh tìm kiếm ở phía trên. Hãy nhập tên sách hoặc tác giả bạn muốn tìm!';
        }
        
        if (message.includes('giờ') || message.includes('mở cửa') || message.includes('đóng cửa')) {
            return '⏰ Thư viện HAB mở cửa từ 8:00 sáng đến 21:00 tối, thứ Hai đến Chủ Nhật. Chúng tôi đóng cửa vào ngày lễ!';
        }
        
        if (message.includes('mượn') || message.includes('borrow') || message.includes('hạn')) {
            return '📖 Bạn có thể mượn tối đa 5 cuốn sách cùng một lúc. Thời hạn mượn là 14 ngày. Nếu bạn muốn gia hạn, vui lòng liên hệ với thủ thư!';
        }
        
        if (message.includes('khiếu nại') || message.includes('góp ý') || message.includes('phàn nàn') || message.includes('complaint')) {
            return '📝 Cảm ơn bạn đã gửi khiếu nại! Chúng tôi sẽ xem xét và phản hồi trong vòng 24-48 giờ. Bạn có thể liên hệ với chúng tôi qua email hoặc gọi điện trực tiếp.';
        }
        
        if (message.includes('liên hệ') || message.includes('contact') || message.includes('số điện thoại') || message.includes('email')) {
            return '📞 Bạn có thể liên hệ với chúng tôi:\n📧 Email: library@hab.vn\n☎️ Điện thoại: 0901-234-567\n💬 Chat hỗ trợ: 24/7';
        }
        
        if (message.includes('thẻ') || message.includes('card') || message.includes('đăng ký')) {
            return '🎫 Để đăng ký thẻ mượn, vui lòng truy cập trang "Đăng Ký Thẻ" trong tài khoản của bạn. Có 3 gói thẻ: Tiêu Chuẩn, Bạc và Vàng. Chi phí bắt đầu từ 500,000đ/năm.';
        }
        
        if (message.includes('giá') || message.includes('bao nhiêu') || message.includes('price') || message.includes('cost')) {
            return '💰 Giá sách thư viện rất cạnh tranh! Các gói thẻ mượn bắt đầu từ 500,000đ/năm. Bạn có muốn biết thêm chi tiết không?';
        }
        
        if (message.includes('cảm ơn') || message.includes('thank')) {
            return 'Bạn được đón chào! 😊 Nếu bạn có thêm câu hỏi nào, hãy liên hệ với tôi bất kỳ lúc nào!';
        }
        
        if (message.includes('tạm biệt') || message.includes('bye') || message.includes('goodbye')) {
            return 'Tạm biệt! 👋 Hẹn gặp lại bạn lần sau!';
        }

        // Default response
        return '😊 Cảm ơn câu hỏi của bạn! Nếu bạn có khiếu nại hoặc cần hỗ trợ thêm, vui lòng liên hệ với đội hỗ trợ của chúng tôi qua email hoặc điện thoại. Chúng tôi sẽ sớm phản hồi!';
    }

    function saveChatMessage(msg) {
        let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.push(msg);
        // Keep only last 50 messages
        if (chatHistory.length > 50) {
            chatHistory = chatHistory.slice(-50);
        }
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
});
