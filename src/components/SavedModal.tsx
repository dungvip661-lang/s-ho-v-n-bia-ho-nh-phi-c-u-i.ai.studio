import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#FFFDF9] rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E8DFC8] overflow-hidden">
        {/* Modal Header */}
        <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-[#E8DFC8] flex items-center justify-between bg-[#FAF7F2] shrink-0">
          <div className="flex items-center gap-2 text-[#691912] font-serif-heritage font-bold text-base sm:text-lg">
            <Bookmark className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Tư Liệu Đã Lưu ({savedItems.length})</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng danh sách tư liệu đã lưu"
            className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-4 space-y-2.5">
          {savedItems.length === 0 ? (
            <div className="text-center py-12 text-stone-500 space-y-2">
              <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="text-sm font-medium">Bạn chưa lưu tư liệu nào.</p>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                Nhấn vào biểu tượng dấu trang trên các thẻ hiện vật để lưu lại tra cứu và đọc chi tiết sau.
              </p>
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start sm:items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-400 transition overflow-hidden"
              >
                {/* Ảnh thumbnail gọn gàng, khoá kích thước */}
                <div
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="w-16 h-14 sm:w-20 sm:h-16 rounded-lg border border-stone-200 overflow-hidden shrink-0 cursor-pointer bg-stone-100"
                >
                  <HeritageImage
                    src={item.anh_tu_lieu}
                    alt={item.ten_tu_lieu}
                    type={item.loai_hinh}
                    title={item.ten_tu_lieu}
                    size="thumb"
                    containerClassName="w-full h-full object-cover"
                  />
                </div>

                {/* Thông tin chi tiết tư liệu */}
                <div
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="flex-1 min-w-0 cursor-pointer space-y-0.5"
                >
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-[#8B261D] uppercase">
                      {item.loai_hinh}
                    </span>
                    {item.nien_dai && (
                      <span className="text-[11px] text-stone-500">
                        • Niên đại: <strong className="font-medium text-stone-700">{item.nien_dai}</strong>
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif-heritage font-bold text-stone-900 text-sm leading-snug line-clamp-1">
                    {item.ten_tu_lieu}
                  </h4>

                  <p className="text-xs text-stone-600 line-clamp-1">
                    Di tích: {item.di_tich_lien_quan}
                  </p>

                  {item.dich_nghia && (
  <p className="text-[11px] text-stone-500 italic line-clamp-1">
    {item.dich_nghia}
  </p>
)}
                </div>

                {/* Cụm nút thao tác */}
                <div className="flex items-center gap-1 shrink-0 self-center">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectItem(item);
                      onClose();
                    }}
                    className="p-2 text-stone-600 hover:text-[#8B261D] hover:bg-amber-50 rounded-lg transition"
                    title="Xem chi tiết"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveSaved(item.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
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
          <div className="px-4 py-3 border-t border-[#E8DFC8] bg-[#FAF7F2] flex justify-between items-center text-xs shrink-0">
            <button
              type="button"
              onClick={onClearAll}
              className="text-stone-500 hover:text-rose-600 font-medium transition"
            >
              Xoá toàn bộ
            </button>
            <button
              type="button"
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