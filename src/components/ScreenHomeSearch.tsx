import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  BookOpen, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  RotateCcw,
  Landmark,
  Compass,
  FilePlus2
} from 'lucide-react';
import { HeritageItem, HeritageType, ActiveTab } from '../types';
import { HeritageImage } from './HeritageImage';

interface ScreenHomeSearchProps {
  items: HeritageItem[];
  onSelectItem: (item: HeritageItem) => void;
  onAskAIWithItem: (item: HeritageItem) => void;
  savedItemIds: string[];
  onToggleSave: (id: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const ScreenHomeSearch: React.FC<ScreenHomeSearchProps> = ({
  items,
  onSelectItem,
  onAskAIWithItem,
  savedItemIds,
  onToggleSave,
  onNavigateTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Tất cả');
  const [selectedSite, setSelectedSite] = useState<string>('Tất cả');
  const [selectedEra, setSelectedEra] = useState<string>('Tất cả');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Extract unique monuments and eras for filters
  const monuments = useMemo(() => {
    const list = Array.from(new Set(items.map((i) => i.di_tich_lien_quan)));
    return ['Tất cả', ...list];
  }, [items]);

  const eras = [
    'Tất cả',
    'Thời Lý',
    'Thời Hậu Lê / Lê Sơ',
    'Thời Lê Trung Hưng',
    'Thời Nguyễn',
    'Thế kỷ 20',
  ];

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Type filter
      if (selectedType !== 'Tất cả' && item.loai_hinh !== selectedType) {
        return false;
      }
      // Site filter
      if (selectedSite !== 'Tất cả' && item.di_tich_lien_quan !== selectedSite) {
        return false;
      }
      // Era filter matching keyword
      if (selectedEra !== 'Tất cả') {
        const nienDai = item.nien_dai.toLowerCase();
        if (selectedEra === 'Thời Lý' && !nienDai.includes('lý')) return false;
        if (selectedEra === 'Thời Hậu Lê / Lê Sơ' && !nienDai.includes('lê') && !nienDai.includes('1442') && !nienDai.includes('1433')) return false;
        if (selectedEra === 'Thời Lê Trung Hưng' && !nienDai.includes('trung hưng') && !nienDai.includes('1653') && !nienDai.includes('1654') && !nienDai.includes('1666') && !nienDai.includes('1770') && !nienDai.includes('1692')) return false;
        if (selectedEra === 'Thời Nguyễn' && !nienDai.includes('nguyễn') && !nienDai.includes('gia long') && !nienDai.includes('tự đức') && !nienDai.includes('thiệu trị') && !nienDai.includes('khải định') && !nienDai.includes('1805') && !nienDai.includes('1865')) return false;
        if (selectedEra === 'Thế kỷ 20' && !nienDai.includes('thế kỷ 20') && !nienDai.includes('1917')) return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = item.ten_tu_lieu.toLowerCase().includes(query);
        const matchesHanNom = item.chu_goc_han_nom.toLowerCase().includes(query);
        const matchesPhienAm = item.phien_am_han_viet.toLowerCase().includes(query);
        const matchesDichNghia = item.dich_nghia.toLowerCase().includes(query);
        const matchesDiTich = item.di_tich_lien_quan.toLowerCase().includes(query);
        const matchesDiaDiem = item.dia_diem.toLowerCase().includes(query);
        const matchesNienDai = item.nien_dai.toLowerCase().includes(query);
        return matchesName || matchesHanNom || matchesPhienAm || matchesDichNghia || matchesDiTich || matchesDiaDiem || matchesNienDai;
      }
      return true;
    });
  }, [items, selectedType, selectedSite, selectedEra, searchTerm]);

  // Statistics
  const vanBiaCount = items.filter((i) => i.loai_hinh === 'Văn bia').length;
  const hoanhPhiCount = items.filter((i) => i.loai_hinh === 'Hoành phi').length;
  const cauDoiCount = items.filter((i) => i.loai_hinh === 'Câu đối').length;
  const missingSourceCount = items.filter((i) => !i.nguon_tu_lieu || i.nguon_tu_lieu.trim() === '').length;

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('Tất cả');
    setSelectedSite('Tất cả');
    setSelectedEra('Tất cả');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#691912] via-[#8B261D] to-[#54120D] text-amber-50 shadow-xl border border-amber-500/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-semibold tracking-wide">
              <Compass className="w-3.5 h-3.5" />
              <span>DỰ ÁN XÃ HỘI PHI LỢI NHUẬN • MÃ ĐỀ TÀI: A05</span>
            </div>
            <h1 className="font-serif-heritage text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 leading-tight">
              Kho Tư Liệu Số Hoá Văn Bia, Hoành Phi & Câu Đối Việt Nam
            </h1>
            <p className="text-amber-200/90 text-sm sm:text-base leading-relaxed font-light">
              Cầu nối văn hoá giúp học sinh, sinh viên và du khách dễ dàng tra cứu, đọc phiên âm Hán-Việt, 
              hiểu dịch nghĩa chuẩn xác và khám phá linh hồn văn hiến ngàn năm tại các di tích lịch sử.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
              <button
                onClick={() => onNavigateTab('create')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-[#691912] font-bold text-xs sm:text-sm rounded-lg shadow-md transition transform hover:-translate-y-0.5"
              >
                <FilePlus2 className="w-4 h-4 text-[#691912]" />
                <span>+ Tạo hồ sơ số hoá mới</span>
              </button>
              <button
                onClick={() => onNavigateTab('ai-assistant')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#54120D]/90 hover:bg-[#54120D] text-amber-200 border border-amber-400/40 font-semibold text-xs sm:text-sm rounded-lg shadow transition"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Trợ lý AI tra cứu</span>
              </button>
              <button
                onClick={() => onNavigateTab('about')}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#54120D]/60 hover:bg-[#54120D] text-amber-200/90 border border-amber-400/20 font-medium text-xs sm:text-sm rounded-lg transition"
              >
                <Landmark className="w-4 h-4 text-amber-300" />
                <span>Về đề tài A05</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3 min-w-[280px]">
            <div className="bg-black/25 backdrop-blur-sm p-3 rounded-xl border border-amber-400/20 text-center">
              <span className="block text-2xl font-bold font-serif-heritage text-amber-300">{items.length}</span>
              <span className="text-[11px] text-amber-100/80">Tư liệu đã số hoá</span>
            </div>
            <div className="bg-black/25 backdrop-blur-sm p-3 rounded-xl border border-amber-400/20 text-center">
              <span className="block text-2xl font-bold font-serif-heritage text-amber-300">{vanBiaCount}</span>
              <span className="text-[11px] text-amber-100/80">Văn bia lịch sử</span>
            </div>
            <div className="bg-black/25 backdrop-blur-sm p-3 rounded-xl border border-amber-400/20 text-center">
              <span className="block text-2xl font-bold font-serif-heritage text-amber-300">{hoanhPhiCount}</span>
              <span className="text-[11px] text-amber-100/80">Hoành phi đại tự</span>
            </div>
            <div className="bg-black/25 backdrop-blur-sm p-3 rounded-xl border border-amber-400/20 text-center">
              <span className="block text-2xl font-bold font-serif-heritage text-amber-300">{cauDoiCount}</span>
              <span className="text-[11px] text-amber-100/80">Câu đối cổ truyền</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Control Center */}
      <div className="bg-[#FFFDF9] rounded-xl p-4 sm:p-5 shadow-sm border border-[#E8DFC8] space-y-4">
        {/* Main Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-stone-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tra cứu từ khoá (vd: 'Hiền tài', 'Khuê Văn Các', 'Thái Hoà', 'Lê Lợi', 'Đền Hùng', 'chữ Hán'...)"
            className="w-full pl-11 pr-24 py-3 bg-[#FAF7F2] border border-[#D5C9B3] rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#8B261D] focus:border-transparent text-sm transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-2 px-2.5 my-1.5 text-xs text-stone-500 hover:text-stone-800 bg-stone-200/80 rounded"
            >
              Xoá
            </button>
          )}
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-stone-200/60">
          {/* Quick Type Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            <span className="text-xs font-semibold text-stone-600 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#8B261D]" /> Loại hình:
            </span>
            {['Tất cả', 'Văn bia', 'Hoành phi', 'Câu đối'].map((type) => {
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    isSelected
                      ? 'bg-[#8B261D] text-amber-100 shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Right Toolbar: View Mode & Mobile Filter Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B261D]" />
              <span>Bộ lọc di tích ({selectedSite !== 'Tất cả' || selectedEra !== 'Tất cả' ? '1+' : '0'})</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-stone-300 rounded-lg p-0.5 bg-stone-50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${
                  viewMode === 'grid' ? 'bg-[#8B261D] text-white' : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Hiển thị dạng thẻ ảnh"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded ${
                  viewMode === 'table' ? 'bg-[#8B261D] text-white' : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Hiển thị dạng bảng chi tiết"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Filters (Desktop always, Mobile collapsable) */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 ${showFiltersMobile ? 'block' : 'hidden sm:grid'}`}>
          {/* Di tích Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1 uppercase tracking-wider">
              Di tích / Danh thắng
            </label>
            <select
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              className="w-full p-2 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
            >
              {monuments.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Niên đại / Thời kỳ Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1 uppercase tracking-wider">
              Niên đại / Thời kỳ
            </label>
            <select
              value={selectedEra}
              onChange={(e) => setSelectedEra(e.target.value)}
              className="w-full p-2 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
            >
              {eras.map((era) => (
                <option key={era} value={era}>
                  {era}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Action */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full py-2 px-3 border border-stone-300 hover:bg-stone-100 text-stone-600 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại bộ lọc</span>
            </button>
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(selectedType !== 'Tất cả' || selectedSite !== 'Tất cả' || selectedEra !== 'Tất cả' || searchTerm) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-stone-500">
            <span>Đang lọc:</span>
            {searchTerm && (
              <span className="bg-amber-100 text-[#8B261D] px-2 py-0.5 rounded font-mono">
                Từ khoá: "{searchTerm}"
              </span>
            )}
            {selectedType !== 'Tất cả' && (
              <span className="bg-stone-200 text-stone-700 px-2 py-0.5 rounded">
                Loại: {selectedType}
              </span>
            )}
            {selectedSite !== 'Tất cả' && (
              <span className="bg-stone-200 text-stone-700 px-2 py-0.5 rounded">
                Di tích: {selectedSite}
              </span>
            )}
            {selectedEra !== 'Tất cả' && (
              <span className="bg-stone-200 text-stone-700 px-2 py-0.5 rounded">
                Thời kỳ: {selectedEra}
              </span>
            )}
            <span className="font-semibold text-stone-800">
              ({filteredItems.length} kết quả phù hợp)
            </span>
          </div>
        )}
      </div>

      {/* Missing source system alert banner if applicable */}
      {missingSourceCount > 0 && (
        <div className="p-3.5 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-800">Quy chuẩn dữ liệu A05: </span>
            Hệ thống phát hiện có <span className="font-bold underline">{missingSourceCount}</span> bản ghi đang trong quá trình điền dã chưa hoàn tất thẩm định nguồn thư tịch. 
            Theo tiêu chuẩn dự án, những thẻ này được gắn nhãn cảnh báo màu cam <span className="inline-block bg-orange-500 text-white font-bold px-1.5 py-0.2 rounded text-[10px]">Cảnh báo thiếu nguồn</span> để người dùng và hội đồng thẩm định nhận biết rõ ràng.
          </div>
        </div>
      )}

      {/* Main Content View: Grid or Table */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-stone-300 p-8">
          <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif-heritage text-lg font-bold text-stone-700">Không tìm thấy tư liệu phù hợp</h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto mt-1 mb-4">
            Vui lòng thử tìm với từ khoá khác hoặc đặt lại bộ lọc để xem toàn bộ danh mục văn bia, hoành phi, câu đối đã nạp.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#8B261D] text-amber-100 rounded-lg text-xs font-semibold hover:bg-[#A32F24] transition"
          >
            Xem tất cả {items.length} bản ghi
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isMissingSource = !item.nguon_tu_lieu || item.nguon_tu_lieu.trim() === '';
            const isSaved = savedItemIds.includes(item.id);

            // Badge color based on type
            const typeBadgeStyle =
              item.loai_hinh === 'Văn bia'
                ? 'bg-rose-900 text-rose-100'
                : item.loai_hinh === 'Hoành phi'
                ? 'bg-amber-800 text-amber-100'
                : 'bg-emerald-900 text-emerald-100';

            return (
              <div
                key={item.id}
                className="group bg-[#FFFDF9] rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-[#E8DFC8] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image and Caption Container */}
                <div>
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden rounded-t-xl">
                    <HeritageImage
                      src={item.anh_tu_lieu}
                      alt={item.ten_tu_lieu}
                      type={item.loai_hinh}
                      title={item.ten_tu_lieu}
                      monument={item.di_tich_lien_quan}
                      character={item.chu_goc_han_nom}
                      size="card"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Top badging */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 items-center pointer-events-none">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold tracking-wide ${typeBadgeStyle}`}>
                        {item.loai_hinh}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-black/60 backdrop-blur-md text-amber-200 font-mono">
                        {item.id}
                      </span>
                    </div>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(item.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-amber-300 backdrop-blur-sm transition"
                      title={isSaved ? 'Bỏ lưu' : 'Lưu tư liệu này'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4 text-white/90" />}
                    </button>

                    {/* MANDATORY WARNING BADGE IF MISSING SOURCE */}
                    {isMissingSource && (
                      <div className="absolute bottom-2 left-2 right-2 bg-orange-600 text-white px-2 py-1 rounded shadow-lg text-[11px] font-bold flex items-center justify-center gap-1.5 border border-orange-400">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-200 shrink-0" />
                        <span>CẢNH BÁO: BẢN GHI THIẾU NGUỒN TƯ LIỆU</span>
                      </div>
                    )}
                  </div>

                  {/* Image Caption & Source directly below the image */}
                  <div className="px-3.5 py-2 bg-[#F5EFE4] text-[11px] text-stone-600 border-b border-[#E8DFC8] space-y-0.5">
                    <div className="flex items-center gap-1 truncate font-medium text-stone-700">
                      <MapPin className="w-3 h-3 text-[#8B261D] shrink-0" />
                      <span className="truncate">{item.di_tich_lien_quan} ({item.dia_diem})</span>
                    </div>
                    <div className="flex items-center gap-1 truncate text-stone-500">
                      <Calendar className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{item.nien_dai}</span>
                    </div>
                    {/* Source citation */}
                    <div className="truncate text-[10px]">
                      {isMissingSource ? (
                        <span className="text-orange-700 font-bold bg-orange-100 px-1 py-0.2 rounded">
                          ⚠️ Chưa có nguồn thư tịch
                        </span>
                      ) : (
                        <span className="text-stone-500">
                          <span className="font-semibold text-stone-600">Nguồn: </span>
                          {item.nguon_tu_lieu}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <h3 
                      onClick={() => onSelectItem(item)}
                      className="font-serif-heritage text-base font-bold text-[#691912] group-hover:text-[#B93826] transition cursor-pointer line-clamp-1"
                    >
                      {item.ten_tu_lieu}
                    </h3>

                    {/* Original Characters Preview */}
                    <div className="bg-[#FBF8F1] p-2.5 rounded-lg border border-[#E3D9C3] font-hannom text-stone-800 text-base leading-relaxed tracking-wider overflow-hidden max-h-16 line-clamp-2">
                      {item.chu_goc_han_nom}
                    </div>

                    {/* Sino-Vietnamese transliteration */}
                    <div className="text-xs text-stone-700 font-medium italic line-clamp-2">
                      <span className="font-semibold text-[#8B261D] not-italic">Phiên âm: </span>
                      {item.phien_am_han_viet}
                    </div>

                    {/* Vietnamese translation */}
                    <div className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      <span className="font-semibold text-stone-800">Dịch nghĩa: </span>
                      {item.dich_nghia}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 pt-0 space-y-2">
                  <div className="pt-2 border-t border-[#E8DFC8] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="flex-1 py-1.5 px-3 bg-[#8B261D] hover:bg-[#A32F24] text-amber-100 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onAskAIWithItem(item)}
                      className="py-1.5 px-3 bg-amber-100 hover:bg-amber-200 text-[#8B261D] rounded-lg text-xs font-semibold flex items-center gap-1 border border-amber-300 transition"
                      title="Hỏi trợ lý AI về tư liệu này"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span className="hidden sm:inline">Hỏi AI</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-xl shadow-sm border border-[#E8DFC8] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#6B1811] text-amber-100 font-semibold uppercase text-[10px] tracking-wider border-b border-amber-900">
                  <th className="py-3 px-3">Mã & Ảnh</th>
                  <th className="py-3 px-3">Tên tư liệu & Loại hình</th>
                  <th className="py-3 px-3">Di tích & Niên đại</th>
                  <th className="py-3 px-3">Chữ gốc Hán - Nôm</th>
                  <th className="py-3 px-3">Phiên âm Hán-Việt</th>
                  <th className="py-3 px-3">Nguồn tư liệu</th>
                  <th className="py-3 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredItems.map((item) => {
                  const isMissingSource = !item.nguon_tu_lieu || item.nguon_tu_lieu.trim() === '';
                  return (
                    <tr 
                      key={item.id} 
                      className="hover:bg-amber-50/50 transition cursor-pointer"
                      onClick={() => onSelectItem(item)}
                    >
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <HeritageImage
                            src={item.anh_tu_lieu}
                            alt={item.ten_tu_lieu}
                            type={item.loai_hinh}
                            title={item.ten_tu_lieu}
                            size="thumb"
                            containerClassName="w-12 h-10 rounded border border-stone-200 shrink-0"
                          />
                          <span className="font-mono text-[10px] text-stone-500">{item.id}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-serif-heritage font-bold text-stone-800 text-sm">
                          {item.ten_tu_lieu}
                        </div>
                        <span className="inline-block mt-0.5 px-2 py-0.2 rounded text-[10px] font-semibold bg-stone-100 text-[#8B261D] border border-stone-200">
                          {item.loai_hinh}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 max-w-[180px]">
                        <div className="font-medium text-stone-700 truncate">{item.di_tich_lien_quan}</div>
                        <div className="text-stone-500 text-[11px] truncate">{item.nien_dai}</div>
                      </td>
                      <td className="py-2.5 px-3 font-hannom text-stone-800 text-sm max-w-[150px] truncate">
                        {item.chu_goc_han_nom}
                      </td>
                      <td className="py-2.5 px-3 italic text-stone-600 max-w-[180px] truncate">
                        {item.phien_am_han_viet}
                      </td>
                      <td className="py-2.5 px-3 max-w-[200px]">
                        {isMissingSource ? (
                          <span className="inline-flex items-center gap-1 bg-orange-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                            <AlertTriangle className="w-3 h-3" />
                            Thiếu nguồn tư liệu
                          </span>
                        ) : (
                          <span className="text-stone-600 text-[11px] line-clamp-2">
                            {item.nguon_tu_lieu}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onSelectItem(item)}
                            className="px-2.5 py-1 bg-[#8B261D] hover:bg-[#A32F24] text-amber-100 rounded text-xs font-medium"
                          >
                            Xem
                          </button>
                          <button
                            onClick={() => onAskAIWithItem(item)}
                            className="p-1 bg-amber-100 hover:bg-amber-200 text-[#8B261D] rounded border border-amber-300"
                            title="Hỏi AI"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
