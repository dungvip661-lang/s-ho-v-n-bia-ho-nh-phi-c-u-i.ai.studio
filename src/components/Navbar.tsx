import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Library, 
  Info, 
  Menu, 
  X, 
  Bookmark, 
  Scroll,
  ShieldCheck,
  FilePlus2
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

  const navItems = [
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
      label: 'Trợ lý tra cứu AI',
      icon: Sparkles,
      sublabel: 'Màn hình 3',
    },
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

  return (
    <header className="sticky top-0 z-50 bg-[#8B261D] text-amber-50 shadow-md border-b-2 border-[#D4AF37]">
      {/* Top Banner with Project Metadata */}
      <div className="bg-[#6B1811] text-[11px] sm:text-xs text-amber-200/90 py-1 px-4 border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#B93826] text-amber-100 font-semibold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
              Mã đề tài: A05
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="truncate">Dự án xã hội phi lợi nhuận: Số hoá văn bia, hoành phi, câu đối</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-amber-100 font-medium">Phạm Tiến Dũng (PH61229)</span>
            <span className="text-amber-400/60 hidden md:inline">|</span>
            <span className="text-amber-300 hidden md:inline">Nhóm 2 - Đợt 15 (FPT Polytechnic x IMTA TECH)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <button
            onClick={() => setActiveTab('search')}
            className="flex items-center gap-3 group text-left transition"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#8B261D] rounded-[6px] flex items-center justify-center border border-amber-300/40">
                <span className="font-hannom text-amber-300 text-xl font-bold">文</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-heritage font-bold text-base sm:text-lg tracking-wide text-amber-100 group-hover:text-amber-300 transition leading-tight">
                  Số Hoá Văn Bia, Hoành Phi, Câu Đối
                </h1>
              </div>
              <p className="text-[11px] text-amber-200/75 hidden sm:block">
                Hệ thống tra cứu phiên âm, dịch nghĩa & giá trị văn hoá di tích Việt Nam
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-400 text-[#6B1811] font-semibold shadow-inner'
                      : 'text-amber-100/90 hover:bg-[#A32F24] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#6B1811]' : 'text-amber-300'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#6B1811] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Saved bookmark count & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSaved}
              title="Danh sách tư liệu đã lưu"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6B1811] hover:bg-[#57120C] text-amber-200 border border-amber-400/30 text-xs transition"
            >
              <Bookmark className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Đã lưu</span>
              <span className="bg-amber-400 text-[#6B1811] font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {savedCount}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#6B1811] text-amber-200 hover:text-white focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#781F17] border-t border-amber-800/60 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition ${
                  isActive
                    ? 'bg-amber-400 text-[#6B1811] font-bold'
                    : 'text-amber-100 hover:bg-[#8B261D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-amber-300" />
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
