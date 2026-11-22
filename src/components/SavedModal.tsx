import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, ExternalLink } from 'lucide-react';
import { HeritageItem } from '../types';
import { HeritageImage } from './HeritageImage';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: HeritageItem[];
  onSelectItem: (item: HeritageItem) => void;
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedItems,
  onSelectItem,
  onRemoveSaved,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FFFDF9] rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E8DFC8]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFC8] flex items-center justify-between bg-[#FAF7F2] rounded-t-2xl">
          <div className="flex items-center gap-2 text-[#691912] font-serif-heritage font-bold text-base sm:text-lg">
            <Bookmark className="w-5 h-5 text-amber-600" />
            <span>Tư Liệu Đã Lưu ({savedItems.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedItems.length === 0 ? (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm">Bạn chưa lưu tư liệu nào.</p>
              <p className="text-xs text-stone-400">
                Nhấn vào biểu tượng dấu trang trên các thẻ hiện vật để lưu lại đọc sau.
              </p>
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-400 transition"
              >
                <HeritageImage
                  src={item.anh_tu_lieu}
                  alt={item.ten_tu_lieu}
                  type={item.loai_hinh}
                  title={item.ten_tu_lieu}
                  size="thumb"
                  containerClassName="w-14 h-12 rounded-lg border border-stone-200 shrink-0"
                />
                <div 
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                >
                  <span className="text-[10px] font-bold text-[#8B261D] uppercase">
                    {item.loai_hinh}
                  </span>
                  <h4 className="font-serif-heritage font-bold text-stone-900 text-xs sm:text-sm truncate">
                    {item.ten_tu_lieu}
                  </h4>
                  <p className="text-[11px] text-stone-500 truncate">
                    {item.di_tich_lien_quan}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="p-1.5 text-stone-600 hover:text-[#8B261D] hover:bg-stone-100 rounded"
                    title="Xem chi tiết"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveSaved(item.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-stone-100 rounded"
                    title="Bỏ lưu"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        {savedItems.length > 0 && (
          <div className="p-3 border-t border-[#E8DFC8] bg-[#FAF7F2] rounded-b-2xl flex justify-between items-center text-xs">
            <button
              onClick={onClearAll}
              className="text-stone-500 hover:text-rose-600 transition"
            >
              Xoá toàn bộ
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#8B261D] text-amber-100 font-semibold rounded-lg hover:bg-[#A32F24] transition"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
