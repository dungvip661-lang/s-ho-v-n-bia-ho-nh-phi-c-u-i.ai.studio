import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Library,
  Info,
  Menu,
  X,
  Bookmark,
  Scroll,
  FilePlus2,
  ChevronDown,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSaved,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryItems = [
    {
      id: 'search' as ActiveTab,
      label: 'Tra cứu di sản',
      icon: Search,
      sublabel: 'Màn hình 1',
    },
    {
      id: 'detail' as ActiveTab,
      label: 'Chi tiết tư liệu',
      icon: Scroll,
      sublabel: 'Màn hình 2',
    },
    {
      id: 'create' as ActiveTab,
      label: 'Tạo hồ sơ số hoá',
      icon: FilePlus2,
      sublabel: 'Biểu mẫu A05',
    },
    {
      id: 'ai-assistant' as ActiveTab,
      label: 'Trợ lý AI',
      icon: Sparkles,
      sublabel: 'Màn hình 3',
    },
  ];

  const secondaryItems = [
    {
      id: 'sources' as ActiveTab,
      label: 'Nguồn tư liệu',
      icon: Library,
      sublabel: 'Màn hình 4',
    },
    {
      id: 'about' as ActiveTab,
      label: 'Giới thiệu dự án',
      icon: Info,
      sublabel: 'Màn hình 5',
    },
  ];

  const allItems = [...primaryItems, ...secondaryItems];
  const activeSecondary = secondaryItems.find((item) => item.id === activeTab);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#8B261D] text-amber-50 shadow-md border-b-2 border-[#D4AF37]">
      {/* Thanh thông tin dự án đầy đủ, thon gọn */}
      <div className="bg-[#6B1811] text-[11px] text-amber-200/90 py-1 px-4 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5">
          <div className="flex items-center gap-2 min-w-0">
            <span className="bg-[#B93826] text-amber-100 font-semibold px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase shrink-0">
              Mã đề tài: A05
            </span>
            <span className="truncate">
              Dự án xã hội phi lợi nhuận: Số hoá văn bia, hoành phi, câu đối
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] shrink-0">
            <span className="text-amber-100 font-medium">Phạm Tiến Dũng (PH61229)</span>
            <span className="text-amber-400/50 hidden sm:inline">|</span>
            <span className="text-amber-300 hidden sm:inline">
              Nhóm 2 - Đợt 15 (FPT Polytechnic x IMTA TECH)
            </span>
          </div>
        </div>
      </div>

      {/* Thanh điều hướng chính */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-3">
          {/* Logo & Tên hệ thống */}
          <button
            type="button"
            onClick={() => setActiveTab('search')}
            className="flex items-center gap-2.5 group text-left shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 p-0.5 shadow flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#8B261D] rounded-[6px] flex items-center justify-center border border-amber-300/40">
                <span className="font-hannom text-amber-300 text-lg font-bold leading-none">
                  文
                </span>
              </div>
            </div>
            <div className="min-w-0">
              <h1 className="font-serif-heritage font-bold text-sm sm:text-base tracking-wide text-amber-100 group-hover:text-amber-300 transition leading-tight truncate">
                Số Hoá Văn Bia, Hoành Phi, Câu Đối
              </h1>
              <p className="text-[10px] text-amber-200/75 hidden xl:block truncate">
                Phiên âm • Dịch nghĩa • Giá trị văn hoá di tích Việt Nam
              </p>
            </div>
          </button>

          {/* Menu Desktop: 4 mục chính + 1 menu tự chọn (Màn hình 4 & 5) */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {primaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-400 text-[#6B1811] font-semibold shadow-sm'
                      : 'text-amber-100/90 hover:bg-[#A32F24] hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#6B1811]' : 'text-amber-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Menu tự chọn cho các mục phụ */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all whitespace-nowrap ${
                  activeSecondary
                    ? 'bg-amber-400 text-[#6B1811] font-semibold shadow-sm'
                    : 'text-amber-100/90 hover:bg-[#A32F24] hover:text-white'
                }`}
              >
                <span>{activeSecondary ? activeSecondary.label : 'Thêm'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    moreOpen ? 'rotate-180' : ''
                  } ${activeSecondary ? 'text-[#6B1811]' : 'text-amber-300'}`}
                />
              </button>

              {moreOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#781F17] border border-amber-400/30 shadow-xl py-1.5 z-50">
                  {secondaryItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id);
                          setMoreOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm transition ${
                          isActive
                            ? 'bg-amber-400 text-[#6B1811] font-semibold'
                            : 'text-amber-100 hover:bg-[#8B261D]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? 'text-[#6B1811]' : 'text-amber-300'
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>
                        <span className="text-[10px] opacity-75 font-mono">{item.sublabel}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Nút Đã lưu & Menu Tablet/Mobile */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenSaved}
              title="Danh sách tư liệu đã lưu"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#6B1811] hover:bg-[#57120C] text-amber-200 border border-amber-400/30 text-xs transition whitespace-nowrap"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">Đã lưu</span>
              <span className="bg-amber-400 text-[#6B1811] font-bold px-1.5 py-0.5 rounded-full text-[10px] leading-none">
                {savedCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-1.5 rounded-lg bg-[#6B1811] text-amber-200 hover:text-white focus:outline-none"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu cho Tablet & Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#781F17] border-t border-amber-800/60 px-4 pt-2 pb-3 space-y-1">
          {allItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-amber-400 text-[#6B1811] font-bold'
                    : 'text-amber-100 hover:bg-[#8B261D]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-[#6B1811]' : 'text-amber-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                <span className="text-[10px] opacity-75 font-mono">{item.sublabel}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};