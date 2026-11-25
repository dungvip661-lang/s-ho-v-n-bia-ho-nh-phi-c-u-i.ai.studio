import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Share2, 
  AlertTriangle, 
  Bookmark, 
  BookmarkCheck, 
  ShieldCheck, 
  UserCheck, 
  FileText,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { HeritageItem, ActiveTab } from '../types';
import { HeritageImage } from './HeritageImage';

interface ScreenDetailProps {
  item: HeritageItem;
  allItems: HeritageItem[];
  onSelectItem: (item: HeritageItem) => void;
  onBackToSearch: () => void;
  onAskAIWithItem: (item: HeritageItem) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ScreenDetail: React.FC<ScreenDetailProps> = ({
  item,
  allItems,
  onSelectItem,
  onBackToSearch,
  onAskAIWithItem,
  isSaved,
  onToggleSave,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isMissingSource = !item.nguon_tu_lieu || item.nguon_tu_lieu.trim() === '';

  // Current item index for prev/next
  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  // Copy helper
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  // Audio Speech Synthesis for Vietnamese text
  const handleToggleSpeak = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng đọc âm thanh.');
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${item.ten_tu_lieu}. Loại hình ${item.loai_hinh}. Di tích ${item.di_tich_lien_quan}. Phiên âm Hán Việt: ${item.phien_am_han_viet}. Bản dịch nghĩa tiếng Việt: ${item.dich_nghia}. Ý nghĩa: ${item.y_nghia_noi_dung}`;
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Top Navigation & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF9] p-3 rounded-xl border border-[#E8DFC8] shadow-sm">
        <button
          onClick={onBackToSearch}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition"
        >
          <ArrowLeft className="w-4 h-4 text-[#8B261D]" />
          <span>Quay lại danh mục tra cứu</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Audio read button */}
          <button
            onClick={handleToggleSpeak}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
              isPlayingAudio
                ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-300'
            }`}
            title="Đọc to nội dung phiên âm & dịch nghĩa"
          >
            {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5 text-[#8B261D]" />}
            <span>{isPlayingAudio ? 'Dừng đọc' : 'Nghe đọc'}</span>
          </button>

          {/* Save Bookmark */}
          <button
            onClick={() => onToggleSave(item.id)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
              isSaved
                ? 'bg-amber-100 text-[#8B261D] border-amber-300'
                : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-300'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" /> : <Bookmark className="w-3.5 h-3.5 text-stone-500" />}
            <span>{isSaved ? 'Đã lưu' : 'Lưu tư liệu'}</span>
          </button>

          {/* Ask AI button */}
          <button
            onClick={() => onAskAIWithItem(item)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-[#691912] rounded-lg shadow-sm transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hỏi AI về hiện vật</span>
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-6">
        {/* Title and Badges */}
        <div className="space-y-3 border-b border-[#E8DFC8] pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8B261D] text-amber-100 uppercase tracking-wider">
              {item.loai_hinh}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-stone-200 text-stone-700">
              Mã số: {item.id}
            </span>
            {isMissingSource && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-600 text-white flex items-center gap-1 border border-orange-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                CẢNH BÁO THIẾU NGUỒN TƯ LIỆU
              </span>
            )}
          </div>

          <h1 className="font-serif-heritage text-2xl sm:text-3xl font-bold text-[#691912] leading-snug">
            {item.ten_tu_lieu}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-stone-600">
            <div className="flex items-center gap-1.5 font-medium text-stone-800">
              <MapPin className="w-4 h-4 text-[#8B261D] shrink-0" />
              <span>{item.di_tich_lien_quan} ({item.dia_diem})</span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-600">
              <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{item.nien_dai}</span>
            </div>
          </div>
        </div>

        {/* Authentic Artifact Image with Mandatory Caption & Source */}
        <div className="space-y-2">
          <div className="relative rounded-xl overflow-hidden bg-stone-900 border border-stone-300">
            <HeritageImage
              src={item.anh_tu_lieu}
              alt={item.ten_tu_lieu}
              type={item.loai_hinh}
              title={item.ten_tu_lieu}
              monument={`${item.di_tich_lien_quan} (${item.dia_diem})`}
              character={item.chu_goc_han_nom}
              size="detail"
              className="max-h-[500px] object-contain mx-auto"
            />
          </div>

          {/* MANDATORY CAPTION, DATE & SOURCE DIRECTLY BELOW IMAGE */}
          <div className="bg-[#F5EFE4] p-3 rounded-lg border border-[#E3D9C3] text-xs text-stone-700 space-y-1">
            <div className="font-medium text-stone-800">
              <span className="font-bold text-[#8B261D]">Ảnh hiện vật: </span>
              {item.ten_tu_lieu} tại {item.di_tich_lien_quan}
            </div>
            <div className="text-stone-600">
              <span className="font-semibold">Niên đại: </span>
              {item.nien_dai}
            </div>
            <div>
              <span className="font-semibold">Nguồn tư liệu ảnh & hiện vật: </span>
              {isMissingSource ? (
                <span className="bg-orange-100 text-orange-800 font-bold px-1.5 py-0.2 rounded">
                  ⚠️ Chưa có trường nguồn tư liệu (đang xác minh hồ sơ điền dã)
                </span>
              ) : (
                <span className="text-stone-700 font-medium">{item.nguon_tu_lieu}</span>
              )}
            </div>
          </div>
        </div>

        {/* Dual Panel: Chữ Gốc Hán Nôm vs Phiên Âm & Dịch Nghĩa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Left Column: Chữ Gốc Hán / Nôm in Traditional Calligraphy Frame */}
          <div className="bg-[#FAF6ED] rounded-xl p-5 border-2 border-[#D8C7A5] relative shadow-inner flex flex-col justify-between">
            {/* Corner Decorative Seal */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded border-2 border-red-700/60 bg-red-50 flex items-center justify-center text-red-800 font-hannom text-xs font-bold pointer-events-none select-none opacity-80">
              印
            </div>

            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D8C7A5]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B261D] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Chữ gốc (Hán / Nôm)
                </span>
                <button
                  onClick={() => handleCopy(item.chu_goc_han_nom, 'hannom')}
                  className="inline-flex items-center gap-1 text-[11px] text-stone-600 hover:text-stone-900 bg-white/70 px-2 py-0.5 rounded border border-stone-300"
                >
                  {copiedType === 'hannom' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'hannom' ? 'Đã sao chép' : 'Sao chép chữ Hán'}</span>
                </button>
              </div>

              {/* Text Area */}
              <div className="font-hannom text-xl sm:text-2xl text-stone-900 leading-relaxed tracking-wider py-4 whitespace-pre-line text-center md:text-left select-all">
                {item.chu_goc_han_nom}
              </div>
            </div>

            <div className="pt-3 border-t border-dashed border-[#D8C7A5] text-[11px] text-stone-500 italic">
              * Khắc họa nguyên tác theo thư pháp và bản khắc hiện vật tại di tích.
            </div>
          </div>

          {/* Right Column: Phiên âm Hán-Việt & Dịch nghĩa tiếng Việt */}
          <div className="space-y-4">
            {/* Phiên âm Hán-Việt */}
            <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200/80 space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-amber-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B261D]">
                  Bản phiên âm Hán - Việt
                </span>
                <button
                  onClick={() => handleCopy(item.phien_am_han_viet, 'phienam')}
                  className="inline-flex items-center gap-1 text-[11px] text-stone-600 hover:text-stone-900 bg-white px-2 py-0.5 rounded border border-amber-300"
                >
                  {copiedType === 'phienam' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'phienam' ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              </div>
              <p className="font-serif-heritage italic text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {item.phien_am_han_viet}
              </p>
            </div>

            {/* Bản dịch nghĩa tiếng Việt */}
            <div className="bg-white rounded-xl p-4 border border-stone-200 space-y-2 shadow-sm">
              <div className="flex items-center justify-between pb-1 border-b border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Bản dịch nghĩa tiếng Việt
                </span>
                <button
                  onClick={() => handleCopy(item.dich_nghia, 'dichnghia')}
                  className="inline-flex items-center gap-1 text-[11px] text-stone-600 hover:text-stone-900 bg-stone-50 px-2 py-0.5 rounded border border-stone-300"
                >
                  {copiedType === 'dichnghia' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'dichnghia' ? 'Đã sao chép' : 'Sao chép'}</span>
                </button>
              </div>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {item.dich_nghia}
              </p>
            </div>
          </div>
        </div>

        {/* Section: Ý nghĩa lịch sử & Giá trị văn hóa - nghệ thuật */}
        <div className="bg-[#FAF7F2] rounded-xl p-5 border border-[#E8DFC8] space-y-2">
          <h3 className="font-serif-heritage font-bold text-base text-[#691912] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8B261D]" />
            <span>Ý nghĩa lịch sử & Giá trị văn hoá - nghệ thuật</span>
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed text-justify">
            {item.y_nghia_noi_dung}
          </p>
        </div>

        {/* Metadata & Attribution Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {/* Trường Nguồn tư liệu (BẮT BUỘC) */}
          <div className={`p-4 rounded-xl border ${
            isMissingSource ? 'bg-orange-50 border-orange-300' : 'bg-stone-50 border-stone-200'
          }`}>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B261D]" />
              Nguồn tư liệu (Bắt buộc)
            </span>
            {isMissingSource ? (
              <div className="text-xs text-orange-700 font-bold bg-orange-100 p-2 rounded border border-orange-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>CHƯA CÓ NGUỒN - CẦN BỔ SUNG THẨM ĐỊNH</span>
              </div>
            ) : (
              <p className="text-xs font-medium text-stone-800 leading-relaxed">
                {item.nguon_tu_lieu}
              </p>
            )}
          </div>

          {/* Người cung cấp / thu thập tư liệu */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-stone-600" />
              Người cung cấp / thu thập
            </span>
            <p className="text-xs font-semibold text-stone-800 leading-relaxed">
              {item.nguoi_cung_cap_thu_thap}
            </p>
            <span className="text-[10px] text-stone-500 mt-1 block">
              Ghi nhận quyền tác giả & công tác điền dã
            </span>
          </div>

          {/* Phạm vi sử dụng */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 sm:col-span-2 md:col-span-1">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-stone-600" />
              Phạm vi sử dụng
            </span>
            <p className="text-xs text-stone-700 leading-relaxed">
              {item.pham_vi_su_dung}
            </p>
            <span className="text-[10px] text-emerald-700 font-medium mt-1 block">
              ✓ Giấy phép phi lợi nhuận giáo dục
            </span>
          </div>
        </div>

        {/* Bottom Quick Switchers (Previous & Next item) */}
        <div className="pt-6 border-t border-[#E8DFC8] flex items-center justify-between gap-3">
          {prevItem ? (
            <button
              onClick={() => onSelectItem(prevItem)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-300 text-xs text-stone-700 hover:bg-stone-100 transition max-w-[45%]"
            >
              <ChevronLeft className="w-4 h-4 text-[#8B261D]" />
              <div className="text-left truncate">
                <span className="block text-[10px] text-stone-400">Hiện vật trước</span>
                <span className="font-semibold truncate block">{prevItem.ten_tu_lieu}</span>
              </div>
            </button>
          ) : (
            <div></div>
          )}

          {nextItem ? (
            <button
              onClick={() => onSelectItem(nextItem)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-stone-300 text-xs text-stone-700 hover:bg-stone-100 transition max-w-[45%] text-right ml-auto"
            >
              <div className="text-right truncate">
                <span className="block text-[10px] text-stone-400">Hiện vật kế tiếp</span>
                <span className="font-semibold truncate block">{nextItem.ten_tu_lieu}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8B261D]" />
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
