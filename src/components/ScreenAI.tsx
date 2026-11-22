import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  ShieldCheck, 
  AlertCircle, 
  BookOpen, 
  User, 
  Bot, 
  ExternalLink,
  Info,
  CornerDownLeft,
  CheckCircle2
} from 'lucide-react';
import { HeritageItem, ChatMessage, ActiveTab } from '../types';

interface ScreenAIProps {
  onSelectItem: (item: HeritageItem) => void;
  allItems: HeritageItem[];
  prefilledPrompt?: string;
  onClearPrefilledPrompt?: () => void;
}

export const ScreenAI: React.FC<ScreenAIProps> = ({
  onSelectItem,
  allItems,
  prefilledPrompt,
  onClearPrefilledPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Kính chào Quý độc giả, học sinh, sinh viên và du khách!\n\nTôi là **Trợ lý Tra cứu Di sản A05**, được tích hợp công nghệ Gemini nhằm giải thích ý nghĩa, dịch nghĩa câu chữ, tra cứu niên đại và định vị hiện vật văn bia, hoành phi, câu đối tại các di tích Việt Nam.\n\n🛡️ **Cam kết học thuật nghiêm ngặt:**\n- Mọi câu trả lời được đối chiếu trung thực từ cơ sở dữ liệu \`disan.json\`.\n- Mỗi câu trả lời **luôn dẫn chiếu Tên bản ghi và Nguồn tư liệu** chính thức.\n- Nếu thông tin chưa có trong hệ thống, tôi sẽ thông báo trung thực *"Chưa có tư liệu về nội dung này trong hệ thống"*, tuyệt đối không suy đoán hoặc bịa thông tin về di sản.\n\nBạn có thể chọn câu hỏi gợi ý bên dưới hoặc nhập câu hỏi bằng tiếng Việt!`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested Prompts
  const suggestedQuestions = [
    'Bài bia Tiến sĩ khoa Nhâm Tuất 1442 tại Văn Miếu có ý nghĩa gì?',
    'Bức hoành phi "Vạn Thế Sư Biểu" tại Văn Miếu giải nghĩa như thế nào?',
    'Đôi câu đối nổi tiếng ở Đền Ngọc Sơn ca ngợi cảnh sắc gì?',
    'Tại Đền Hùng có những câu đối hay hoành phi nào đã được số hoá?',
    'Văn bia nào do Đại thi hào Nguyễn Trãi soạn thảo?',
    'Tháp Eiffel ở Paris xây dựng năm nào? (Thử nghiệm câu hỏi ngoài dữ liệu)',
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle prefilled prompt from other screens
  useEffect(() => {
    if (prefilledPrompt) {
      setInputPrompt(prefilledPrompt);
      if (onClearPrefilledPrompt) onClearPrefilledPrompt();
    }
  }, [prefilledPrompt, onClearPrefilledPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Lỗi kết nối máy chủ');
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply || 'Chưa có tư liệu về nội dung này trong hệ thống.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        referencedItem: data.referencedItem,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `Rất tiếc, đã xảy ra gián đoạn kết nối máy chủ. Bạn có thể kiểm tra danh sách tra cứu hoặc thử lại sau giây lát.\n\n*(Ghi chú: ${err.message || 'Lỗi mạng'})*`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: `Đã làm mới cuộc hội thoại tra cứu. Bạn muốn tìm hiểu thông tin về văn bia, hoành phi hay câu đối nào trong hệ thống A05?`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E8DFC8] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-[#8B261D] p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#8B261D] rounded-[10px] flex items-center justify-center text-amber-300">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif-heritage text-lg sm:text-xl font-bold text-[#691912]">
                Trợ Lý AI Tra Cứu Di Sản (Mã Đề Tài A05)
              </h2>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold border border-emerald-300">
                Gemini AI
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Hỏi đáp tự nhiên về chữ Hán-Nôm, phiên âm, dịch nghĩa, niên đại & vị trí hiện vật
            </p>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs transition"
          title="Làm mới đoạn hội thoại"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Làm mới hội thoại</span>
        </button>
      </div>

      {/* Strict Compliance Banner */}
      <div className="bg-amber-50/80 border border-amber-300/80 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-amber-900">Ràng buộc học thuật: </span>
          <span>
            Hệ thống tuân thủ nguyên tắc trung thực tuyệt đối. AI chỉ tra cứu trong tệp <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-900">disan.json</code>, bắt buộc dẫn chiếu <b>Tên bản ghi</b> và <b>Nguồn tư liệu</b>. Nếu câu hỏi không nằm trong phạm vi tư liệu đã nạp, AI sẽ trả lời rõ ràng: <i>"Chưa có tư liệu về nội dung này trong hệ thống"</i>.
          </span>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#E8DFC8] shadow-sm flex flex-col h-[520px]">
        {/* Scrollable Message List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isBot = msg.role === 'model';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-lg bg-[#8B261D] text-amber-300 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'bg-[#FAF7F2] text-stone-800 border border-[#E8DFC8] shadow-sm'
                      : 'bg-[#8B261D] text-amber-50 shadow-sm'
                  }`}
                >
                  {/* Message Sender & Time */}
                  <div className="flex items-center justify-between gap-4 mb-2 text-[10px] opacity-75 border-b border-black/5 pb-1">
                    <span className="font-bold">
                      {isBot ? 'Trợ lý Di sản A05 (Gemini)' : 'Người dùng'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  {/* Message Content with Markdown-like Paragraphs */}
                  <div className="space-y-2 whitespace-pre-line font-normal">
                    {msg.content}
                  </div>

                  {/* If item link is found */}
                  {msg.referencedItem && (
                    <div className="mt-3 pt-2 border-t border-[#E8DFC8] flex items-center justify-between gap-2">
                      <span className="text-[11px] text-stone-600 font-medium">
                        Hiện vật liên quan: <b>{msg.referencedItem.ten_tu_lieu}</b>
                      </span>
                      <button
                        onClick={() => onSelectItem(msg.referencedItem!)}
                        className="px-2.5 py-1 bg-[#8B261D] hover:bg-[#A32F24] text-white rounded text-xs font-semibold flex items-center gap-1"
                      >
                        <span>Xem chi tiết</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-lg bg-stone-700 text-stone-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-stone-500 italic py-2">
              <div className="w-8 h-8 rounded-lg bg-[#8B261D] text-amber-300 flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#FAF7F2] border border-[#E8DFC8] px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#8B261D] animate-ping"></span>
                <span>Trợ lý đang tra cứu trong disan.json và đối chiếu thư tịch...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions Pills */}
        <div className="px-4 py-2.5 bg-[#FAF7F2] border-t border-[#E8DFC8] overflow-x-auto">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[11px] font-bold text-stone-600 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#8B261D]" /> Gợi ý:
            </span>
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full text-xs bg-white hover:bg-amber-100 text-stone-700 hover:text-[#8B261D] border border-stone-200 transition text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E8DFC8] rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Đặt câu hỏi về ý nghĩa, phiên âm, niên đại di sản (vd: Bài bia Nhâm Tuất 1442 nghĩa là gì?)..."
              disabled={isLoading}
              className="flex-1 py-2.5 px-4 bg-[#FAF7F2] border border-stone-300 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8B261D] text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="px-4 py-2.5 bg-[#8B261D] hover:bg-[#A32F24] disabled:opacity-50 text-amber-100 font-semibold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition"
            >
              <span>Gửi</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
