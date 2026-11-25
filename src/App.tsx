import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ScreenHomeSearch } from './components/ScreenHomeSearch';
import { ScreenDetail } from './components/ScreenDetail';
import { ScreenCreate } from './components/ScreenCreate';
import { ScreenAI } from './components/ScreenAI';
import { ScreenSources } from './components/ScreenSources';
import { ScreenAbout } from './components/ScreenAbout';
import { SavedModal } from './components/SavedModal';
import { HeritageItem, ActiveTab } from './types';
import rawData from './data/disan.json';

export default function App() {
  const [items, setItems] = useState<HeritageItem[]>(rawData as HeritageItem[]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('search');
  const [selectedItem, setSelectedItem] = useState<HeritageItem>((rawData as HeritageItem[])[0]);
  const [prefilledAIPrompt, setPrefilledAIPrompt] = useState<string>('');
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Saved items stored in localStorage
  const [savedItemIds, setSavedItemIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('disan_saved_ids');
      return stored ? JSON.parse(stored) : ['VB-VM01', 'HP-VM01'];
    } catch {
      return ['VB-VM01', 'HP-VM01'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('disan_saved_ids', JSON.stringify(savedItemIds));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedItemIds]);

  // Attempt to fetch fresh data from server API if available
  useEffect(() => {
    fetch('/api/disan')
      .then((res) => res.json())
      .then((json) => {
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          setItems(json.data);
        }
      })
      .catch((err) => {
        // Fallback to imported rawData
        console.log('Using local dataset', err);
      });
  }, []);

  const handleToggleSave = (id: string) => {
    setSavedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClearAllSaved = () => {
    setSavedItemIds([]);
  };

  const handleSelectItem = (item: HeritageItem) => {
    setSelectedItem(item);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreatedItem = (newItem: HeritageItem) => {
    // Add to state and set as selected detail view
    setItems((prev) => [newItem, ...prev.filter((i) => i.id !== newItem.id)]);
    setSelectedItem(newItem);
  };

  const handleAskAIWithItem = (item: HeritageItem) => {
    setPrefilledAIPrompt(`Hãy giải thích chi tiết ý nghĩa nội dung, câu chữ chữ Hán và bối cảnh lịch sử của tư liệu: "${item.ten_tu_lieu}" (${item.loai_hinh} tại ${item.di_tich_lien_quan})?`);
    setActiveTab('ai-assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedItems = items.filter((item) => savedItemIds.includes(item.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C241D]">
      {/* Navbar with Screens Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedItemIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'search' && (
          <ScreenHomeSearch
            items={items}
            onSelectItem={handleSelectItem}
            onAskAIWithItem={handleAskAIWithItem}
            savedItemIds={savedItemIds}
            onToggleSave={handleToggleSave}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'detail' && (
          <ScreenDetail
            item={selectedItem}
            allItems={items}
            onSelectItem={setSelectedItem}
            onBackToSearch={() => setActiveTab('search')}
            onAskAIWithItem={handleAskAIWithItem}
            isSaved={savedItemIds.includes(selectedItem.id)}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'create' && (
          <ScreenCreate
            onCreated={handleCreatedItem}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            existingCount={items.length}
          />
        )}

        {activeTab === 'ai-assistant' && (
          <ScreenAI
            onSelectItem={handleSelectItem}
            allItems={items}
            prefilledPrompt={prefilledAIPrompt}
            onClearPrefilledPrompt={() => setPrefilledAIPrompt('')}
          />
        )}

        {activeTab === 'sources' && <ScreenSources />}

        {activeTab === 'about' && <ScreenAbout />}
      </main>

      {/* Saved Items Modal */}
      <SavedModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedItems={savedItems}
        onSelectItem={handleSelectItem}
        onRemoveSaved={handleToggleSave}
        onClearAll={handleClearAllSaved}
      />

      {/* Footer with Project Identification & Academic Attribution */}
      <footer className="mt-12 bg-[#3A1410] text-amber-100/90 border-t-2 border-[#D4AF37] pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-hannom text-amber-400 text-lg">銘</span>
                <h4 className="font-serif-heritage font-bold text-amber-200 text-sm">
                  Dự Án Số Hoá Văn Bia, Hoành Phi, Câu Đối
                </h4>
              </div>
              <p className="text-amber-100/75">
                Dự án xã hội phi lợi nhuận phục vụ học tập, nghiên cứu và bảo tồn văn hoá truyền thống Việt Nam. 
                Tôn vinh giá trị văn hiến và đạo lý "Uống nước nhớ nguồn".
              </p>
              <div className="mt-2 text-amber-300 font-mono text-[11px]">
                Mã đề tài chính thức: A05
              </div>
            </div>

            <div>
              <h4 className="font-serif-heritage font-bold text-amber-200 text-sm mb-2">
                Tác Giả & Đơn Vị Phụ Trách
              </h4>
              <ul className="space-y-1 text-amber-100/75">
                <li><b className="text-amber-100">Họ và tên:</b> Phạm Tiến Dũng</li>
                <li><b className="text-amber-100">Mã sinh viên:</b> PH61229</li>
                <li><b className="text-amber-100">Nhóm:</b> Nhóm 2 - Đợt 15</li>
                <li><b className="text-amber-100">Chương trình:</b> Thực tập sinh Đợt 15 FPT Polytechnic x IMTA TECH</li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif-heritage font-bold text-amber-200 text-sm mb-2">
                Cam Kết Dữ Liệu & Ràng Buộc AI
              </h4>
              <p className="text-amber-100/75">
                Toàn bộ dữ liệu được số hoá dựa trên các ấn bản Viện Nghiên cứu Hán Nôm và khảo sát điền dã di tích. 
                Trợ lý Gemini hoạt động ở chế độ đối chiếu trung thực từ <code className="text-amber-300">disan.json</code>, tuyệt đối không suy đoán bịa đặt thông tin di sản.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-amber-900/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-amber-200/60">
            <div>
              © 2026 Bản quyền thuộc Dự án Số hoá Di sản A05 (Phạm Tiến Dũng - PH61229).
            </div>
            <div className="flex items-center gap-4">
              <span>Hà Nội • Thừa Thiên Huế • Thái Bình • Phú Thọ</span>
              <span>•</span>
              <span className="text-amber-400">FPT Polytechnic x IMTA TECH</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
