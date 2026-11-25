import React, { useState } from 'react';
import { 
  FilePlus2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  MapPin, 
  Calendar, 
  UserCheck, 
  ShieldCheck, 
  Scroll, 
  RotateCcw,
  BookOpen,
  ArrowRight,
  Info,
  Layers,
  HelpCircle
} from 'lucide-react';
import { HeritageItem, HeritageType, ActiveTab } from '../types';
import { HeritageImage } from './HeritageImage';

interface ScreenCreateProps {
  onCreated: (item: HeritageItem) => void;
  onNavigateTab: (tab: ActiveTab) => void;
  existingCount: number;
}

export const ScreenCreate: React.FC<ScreenCreateProps> = ({
  onCreated,
  onNavigateTab,
  existingCount,
}) => {
  const [formData, setFormData] = useState<Partial<HeritageItem>>({
    id: `VB-A05-${String(existingCount + 1).padStart(2, '0')}`,
    ten_tu_lieu: '',
    loai_hinh: 'Văn bia',
    di_tich_lien_quan: '',
    dia_diem: '',
    nien_dai: '',
    chu_goc_han_nom: '',
    phien_am_han_viet: '',
    dich_nghia: '',
    y_nghia_noi_dung: '',
    anh_tu_lieu: '',
    nguon_tu_lieu: '',
    nguoi_cung_cap_thu_thap: 'Phạm Tiến Dũng (PH61229) & Nhóm nghiên cứu A05',
    pham_vi_su_dung: 'Phục vụ học tập, nghiên cứu phi lợi nhuận & bảo tồn di sản văn hoá',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<HeritageItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  // Quick preset templates for convenient testing
  const samplePresets = [
    {
      name: 'Văn bia: Bia chùa Trấn Quốc',
      data: {
        ten_tu_lieu: 'Khai Quốc Tự Bi Ký (Bia Trùng tu Chùa Trấn Quốc)',
        loai_hinh: 'Văn bia' as HeritageType,
        di_tich_lien_quan: 'Chùa Trấn Quốc (Khai Quốc Tự)',
        dia_diem: 'Đường Thanh Niên, Tây Hồ, Hà Nội',
        nien_dai: 'Niên hiệu Cảnh Hưng thứ 6 (1745) - Trùng tu thời Nguyễn',
        chu_goc_han_nom: '開國古剎，西湖勝景。香火綿延，佑國祐民。',
        phien_am_han_viet: 'Khai Quốc cổ sát, Tây Hồ thắng cảnh. Hương hoả miên diên, hựu quốc hựu dân.',
        dich_nghia: 'Ngôi chùa cổ Khai Quốc, thắng cảnh hàng đầu chốn hồ Tây. Khói hương nối đời đời không dứt, che chở đất nước và phù trợ muôn dân.',
        y_nghia_noi_dung: 'Chùa Trấn Quốc được khởi dựng từ thời tiền Lý Nam Đế (thế kỷ thứ 6), là ngôi chùa cổ kính nhất Thăng Long - Hà Nội. Văn bia ghi lại công đức trùng tu tôn tạo qua các triều đại.',
        anh_tu_lieu: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
        nguon_tu_lieu: 'Viện Nghiên cứu Hán Nôm & Ban Quản lý Di tích chùa Trấn Quốc',
        nguoi_cung_cap_thu_thap: 'Phạm Tiến Dũng (PH61229) - Điền dã Tây Hồ',
        pham_vi_su_dung: 'Học tập, bảo tồn di sản Phật giáo Đại Việt',
      },
    },
    {
      name: 'Hoành phi: Đại Hùng Bảo Điện',
      data: {
        ten_tu_lieu: 'Hoành phi Đại Hùng Bảo Điện (大雄寶殿)',
        loai_hinh: 'Hoành phi' as HeritageType,
        di_tich_lien_quan: 'Chùa Quán Sứ',
        dia_diem: 'Hoàn Kiếm, Hà Nội',
        nien_dai: 'Đầu thế kỷ 20',
        chu_goc_han_nom: '大雄寶殿',
        phien_am_han_viet: 'Đại Hùng Bảo Điện',
        dich_nghia: 'Tòa chính điện tôn nghiêm quý báu thờ Đức Phật Thích Ca (Đại Hùng: Bậc Đại Hùng Đại Lực diệt trừ phiền não vô minh).',
        y_nghia_noi_dung: 'Bức đại tự sơn son thếp vàng trang trọng bậc nhất tại chính điện chùa Quán Sứ - trụ sở Trung ương Giáo hội Phật giáo Việt Nam.',
        anh_tu_lieu: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        nguon_tu_lieu: 'Hồ sơ Giáo hội Phật giáo Việt Nam & Cục Di sản Văn hoá',
        nguoi_cung_cap_thu_thap: 'Nhóm nghiên cứu A05 (Phạm Tiến Dũng)',
        pham_vi_su_dung: 'Giáo dục truyền thống Phật giáo và văn hoá dân tộc',
      },
    },
    {
      name: 'Câu đối: Đền Quán Thánh',
      data: {
        ten_tu_lieu: 'Đôi câu đối Huyền Thiên Trấn Vũ Đền Quán Thánh',
        loai_hinh: 'Câu đối' as HeritageType,
        di_tich_lien_quan: 'Đền Quán Thánh (Trấn Vũ Quán)',
        dia_diem: 'Quán Thánh, Ba Đình, Hà Nội',
        nien_dai: 'Thời Nguyễn (Thế kỷ 19)',
        chu_goc_han_nom: '萬古英靈鎮朔方\n千秋香火保昇平',
        phien_am_han_viet: 'Vạn cổ anh linh trấn sóc phương;\nThiên thu hương hoả bảo thăng bình.',
        dich_nghia: 'Muôn thuở khí thiêng anh linh trấn giữ phương Bắc;\nNgàn năm hương khói kính cẩn giữ gìn cảnh thái bình thịnh trị.',
        y_nghia_noi_dung: 'Tôn vinh đức Huyền Thiên Trấn Vũ - vị thần trấn giữ phương Bắc của Thăng Long Tứ Trấn, bảo vệ kinh thành khỏi tà ma giặc giã.',
        anh_tu_lieu: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80',
        nguon_tu_lieu: 'Tuyển tập hoành phi câu đối Thăng Long Tứ Trấn - Sở VHTT Hà Nội',
        nguoi_cung_cap_thu_thap: 'Phạm Tiến Dũng (PH61229)',
        pham_vi_su_dung: 'Nghiên cứu tín ngưỡng dân gian Thăng Long',
      },
    },
  ];

  const handleApplyPreset = (presetData: any) => {
    const prefix = presetData.loai_hinh === 'Văn bia' ? 'VB' : presetData.loai_hinh === 'Hoành phi' ? 'HP' : 'CD';
    setFormData((prev) => ({
      ...prev,
      id: `${prefix}-A05-${String(existingCount + 1).padStart(2, '0')}`,
      ...presetData,
    }));
    setErrorMessage(null);
  };

  const handleTypeChange = (newType: HeritageType) => {
    const prefix = newType === 'Văn bia' ? 'VB' : newType === 'Hoành phi' ? 'HP' : 'CD';
    setFormData((prev) => ({
      ...prev,
      loai_hinh: newType,
      id: `${prefix}-A05-${String(existingCount + 1).padStart(2, '0')}`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.ten_tu_lieu?.trim()) {
      setErrorMessage('Vui lòng nhập "Tên tư liệu di sản".');
      return;
    }
    if (!formData.di_tich_lien_quan?.trim()) {
      setErrorMessage('Vui lòng nhập "Tên di tích liên quan".');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/disan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Lỗi khi lưu trữ hồ sơ số hoá.');
      }

      const result = await response.json();
      const createdItem: HeritageItem = result.data;
      
      setSubmitSuccess(createdItem);
      onCreated(createdItem);
    } catch (err: any) {
      console.error('Submit error:', err);
      setErrorMessage(err.message || 'Không thể tạo hồ sơ số hoá di sản. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    const nextId = `VB-A05-${String(existingCount + 2).padStart(2, '0')}`;
    setFormData({
      id: nextId,
      ten_tu_lieu: '',
      loai_hinh: 'Văn bia',
      di_tich_lien_quan: '',
      dia_diem: '',
      nien_dai: '',
      chu_goc_han_nom: '',
      phien_am_han_viet: '',
      dich_nghia: '',
      y_nghia_noi_dung: '',
      anh_tu_lieu: '',
      nguon_tu_lieu: '',
      nguoi_cung_cap_thu_thap: 'Phạm Tiến Dũng (PH61229) & Nhóm nghiên cứu A05',
      pham_vi_su_dung: 'Phục vụ học tập, nghiên cứu phi lợi nhuận & bảo tồn di sản văn hoá',
    });
    setSubmitSuccess(null);
    setErrorMessage(null);
  };

  const isMissingSource = !formData.nguon_tu_lieu || formData.nguon_tu_lieu.trim() === '';

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#691912] via-[#8B261D] to-[#4F100B] text-amber-50 shadow-xl border border-amber-500/40 p-6 sm:p-8">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <FilePlus2 className="w-4 h-4" />
            <span>MẪU THIẾT LẬP HỒ SƠ DI SẢN • ĐỀ TÀI A05</span>
          </div>

          <h1 className="font-serif-heritage text-2xl sm:text-3xl font-bold text-amber-100">
            Biểu Mẫu Tạo Hồ Sơ Số Hoá Văn Bia, Hoành Phi, Câu Đối
          </h1>

          <p className="text-amber-200/90 text-sm sm:text-base max-w-3xl leading-relaxed font-light">
            Cho phép nhóm nghiên cứu, học sinh, sinh viên và cộng đồng nhập liệu, biên tập chữ Hán - Nôm, 
            phiên âm Hán-Việt, dịch nghĩa và bổ sung bản ghi mới trực tiếp vào cơ sở dữ liệu <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-300 font-mono">disan.json</code> của hệ thống.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg border border-amber-300/30 text-amber-200">
              Quy chuẩn 14 trường thông tin bắt buộc
            </span>
            <span className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg border border-amber-300/30 text-amber-200">
              Kiểm tra nhãn cảnh báo thiếu nguồn tự động
            </span>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {submitSuccess && (
        <div className="p-5 bg-emerald-50 border-2 border-emerald-400 rounded-2xl shadow-md space-y-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1">
              <h3 className="font-serif-heritage font-bold text-emerald-900 text-base">
                Tạo hồ sơ số hoá di sản thành công!
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Bản ghi <b className="text-emerald-950 font-mono font-bold">[{submitSuccess.id}] - {submitSuccess.ten_tu_lieu}</b> đã được lưu trữ vĩnh viễn vào tệp <code className="bg-emerald-100 px-1 py-0.5 rounded">disan.json</code> và cập nhật đồng bộ lên toàn bộ 5 màn hình hệ thống (bao gồm cả trợ lý AI tra cứu).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald-200">
            <button
              onClick={() => onNavigateTab('detail')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow transition"
            >
              <span>Xem chi tiết hiện vật vừa tạo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('search')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-medium transition"
            >
              <span>Về danh sách tra cứu</span>
            </button>
            <button
              onClick={handleResetForm}
              className="inline-flex items-center gap-1 px-3 py-2 text-stone-600 hover:text-stone-900 text-xs ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Tiếp tục tạo hồ sơ khác</span>
            </button>
          </div>
        </div>
      )}

      {/* Error Notification Alert */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl text-xs text-rose-800 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Lỗi nhập liệu: </span>
            {errorMessage}
          </div>
        </div>
      )}

      {/* Quick Presets Section */}
      <div className="bg-[#FFFDF9] rounded-xl p-4 border border-[#E8DFC8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-stone-700">
          <Sparkles className="w-4 h-4 text-[#8B261D]" />
          <span className="font-bold text-[#8B261D]">Mẫu điền nhanh (Presets):</span>
          <span className="text-stone-500 hidden md:inline">Chọn mẫu có sẵn để tự động điền các trường mẫu:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset.data)}
              className="px-2.5 py-1 text-xs bg-amber-50 hover:bg-amber-100 text-[#8B261D] border border-amber-300/80 rounded-lg font-medium transition shadow-sm"
            >
              + {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form & Live Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Container (7 cols) */}
        <div className="lg:col-span-7 bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DFC8] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-3">
            <h2 className="font-serif-heritage text-lg font-bold text-[#691912] flex items-center gap-2">
              <Scroll className="w-5 h-5 text-[#8B261D]" />
              <span>Nội Dung Hồ Sơ Di Sản</span>
            </h2>
            <span className="text-[11px] text-stone-500">
              Các trường có dấu (<span className="text-red-600 font-bold">*</span>) là bắt buộc
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Loại hình & Mã tư liệu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Loại hình di sản <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Văn bia', 'Hoành phi', 'Câu đối'] as HeritageType[]).map((t) => {
                    const isSelected = formData.loai_hinh === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleTypeChange(t)}
                        className={`py-2 px-2 rounded-lg text-xs font-semibold border transition text-center ${
                          isSelected
                            ? 'bg-[#8B261D] text-amber-100 border-[#8B261D] shadow-sm'
                            : 'bg-[#FAF7F2] text-stone-700 hover:bg-stone-200 border-stone-300'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Mã định danh (ID) <span className="text-stone-400 font-normal">(tự động sinh)</span>
                </label>
                <input
                  type="text"
                  value={formData.id || ''}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="Vd: VB-A05-01"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs font-mono text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
                />
              </div>
            </div>

            {/* Row 2: Tên tư liệu */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Tên tư liệu di sản <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.ten_tu_lieu || ''}
                onChange={(e) => setFormData({ ...formData, ten_tu_lieu: e.target.value })}
                placeholder="Vd: Bia Tiến sĩ khoa Nhâm Tuất 1442 / Hoành phi Vạn Thế Sư Biểu..."
                className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs font-serif-heritage text-stone-900 font-semibold focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
              />
            </div>

            {/* Row 3: Di tích liên quan & Địa điểm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Di tích liên quan <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.di_tich_lien_quan || ''}
                  onChange={(e) => setFormData({ ...formData, di_tich_lien_quan: e.target.value })}
                  placeholder="Vd: Văn Miếu - Quốc Tử Giám / Đền Ngọc Sơn..."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Địa điểm (Quận/Huyện, Tỉnh/Thành)
                </label>
                <input
                  type="text"
                  value={formData.dia_diem || ''}
                  onChange={(e) => setFormData({ ...formData, dia_diem: e.target.value })}
                  placeholder="Vd: Đống Đa, Hà Nội"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
                />
              </div>
            </div>

            {/* Row 4: Niên đại */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Niên đại / Năm khởi dựng / Trùng tu
              </label>
              <input
                type="text"
                value={formData.nien_dai || ''}
                onChange={(e) => setFormData({ ...formData, nien_dai: e.target.value })}
                placeholder="Vd: Dựng năm Thịnh Đức thứ 1 (1653) / Thời Nguyễn (Thế kỷ 19)..."
                className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
              />
            </div>

            {/* Row 5: Chữ gốc Hán - Nôm */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-stone-700">
                  Chữ gốc (Hán / Nôm)
                </label>
                <span className="text-[10px] text-stone-500 font-mono">
                  Phông Noto Serif TC / Hán Nôm
                </span>
              </div>
              <textarea
                rows={3}
                value={formData.chu_goc_han_nom || ''}
                onChange={(e) => setFormData({ ...formData, chu_goc_han_nom: e.target.value })}
                placeholder="Nhập nguyên tác chữ Hán hoặc chữ Nôm khắc trên hiện vật (vd: 萬世師表 / 國之元氣...)..."
                className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-sm font-hannom text-stone-900 tracking-wider leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
              />
            </div>

            {/* Row 6: Bản phiên âm Hán-Việt */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Bản phiên âm Hán - Việt
              </label>
              <textarea
                rows={2}
                value={formData.phien_am_han_viet || ''}
                onChange={(e) => setFormData({ ...formData, phien_am_han_viet: e.target.value })}
                placeholder="Vd: Hiền tài quốc gia chi nguyên khí... / Vạn thế sư biểu..."
                className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs italic text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
              />
            </div>

            {/* Row 7: Bản dịch nghĩa tiếng Việt */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Bản dịch nghĩa tiếng Việt
              </label>
              <textarea
                rows={3}
                value={formData.dich_nghia || ''}
                onChange={(e) => setFormData({ ...formData, dich_nghia: e.target.value })}
                placeholder="Bản dịch thuần Việt rõ ràng, mạch lạc cho người dân và học sinh..."
                className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs text-stone-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
              />
            </div>

            {/* Row 8: Ý nghĩa lịch sử & nghệ thuật */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Ý nghĩa lịch sử / Bối cảnh văn hoá / Giá trị nghệ thuật
              </label>
              <textarea
                rows={3}
                value={formData.y_nghia_noi_dung || ''}
                onChange={(e) => setFormData({ ...formData, y_nghia_noi_dung: e.target.value })}
                placeholder="Phân tích tư tưởng, tác giả soạn thảo, thông điệp răn dạy hậu thế hoặc xếp hạng di tích..."
                className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs text-stone-800 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
              />
            </div>

            {/* Row 9: Đường dẫn ảnh tư liệu */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Đường dẫn ảnh hiện vật thực tế (URL)
              </label>
              <input
                type="url"
                value={formData.anh_tu_lieu || ''}
                onChange={(e) => setFormData({ ...formData, anh_tu_lieu: e.target.value })}
                placeholder="https://images.unsplash.com/... hoặc link ảnh tư liệu thực tế (được hỗ trợ tự động khung thay thế khi lỗi)"
                className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs font-mono text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                * Tuân thủ quy chuẩn: Chỉ dùng ảnh chụp hiện vật thực tế, hệ thống tự động gắn cơ chế chống lỗi khung hình.
              </p>
            </div>

            {/* Row 10: Nguồn tư liệu (BẮT BUỘC THEO QUY CHUẨN A05) */}
            <div className={`p-3.5 rounded-xl border ${
              isMissingSource ? 'bg-orange-50 border-orange-300' : 'bg-[#FAF7F2] border-stone-300'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8B261D]" />
                  <span>Nguồn tư liệu (Bắt buộc thẩm định)</span>
                </label>
                {isMissingSource && (
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded border border-orange-300">
                    ⚠️ Sẽ gắn nhãn cam: Cảnh báo thiếu nguồn
                  </span>
                )}
              </div>
              <input
                type="text"
                value={formData.nguon_tu_lieu || ''}
                onChange={(e) => setFormData({ ...formData, nguon_tu_lieu: e.target.value })}
                placeholder="Vd: Viện Nghiên cứu Hán Nôm / Văn khắc Hán Nôm Việt Nam / Hồ sơ Cục Di sản..."
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                Theo quy định A05: Nếu để trống trường nguồn, bản ghi sẽ tự động hiển thị nhãn cảnh báo màu cam trên toàn bộ giao diện.
              </p>
            </div>

            {/* Row 11: Người cung cấp / thu thập tư liệu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Người cung cấp / thu thập tư liệu
                </label>
                <input
                  type="text"
                  value={formData.nguoi_cung_cap_thu_thap || ''}
                  onChange={(e) => setFormData({ ...formData, nguoi_cung_cap_thu_thap: e.target.value })}
                  placeholder="Vd: Phạm Tiến Dũng (PH61229) & ..."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Phạm vi sử dụng
                </label>
                <input
                  type="text"
                  value={formData.pham_vi_su_dung || ''}
                  onChange={(e) => setFormData({ ...formData, pham_vi_su_dung: e.target.value })}
                  placeholder="Vd: Phục vụ học tập, nghiên cứu phi lợi nhuận..."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#8B261D]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-2 border border-stone-300 text-stone-600 hover:bg-stone-100 rounded-lg text-xs font-medium flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại biểu mẫu</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#8B261D] hover:bg-[#A32F24] disabled:opacity-60 text-amber-100 font-semibold rounded-lg text-xs sm:text-sm flex items-center gap-2 shadow-md transition transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-amber-200 border-t-transparent rounded-full animate-spin"></span>
                    <span>Đang lưu hồ sơ vào disan.json...</span>
                  </>
                ) : (
                  <>
                    <FilePlus2 className="w-4 h-4 text-amber-300" />
                    <span>Lưu hồ sơ số hoá di sản</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Container (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-20 space-y-4">
            <div className="flex items-center justify-between bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DFC8]">
              <span className="text-xs font-bold text-[#8B261D] flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                Xem trước thẻ hiển thị thực tế
              </span>
              <span className="text-[11px] text-stone-500 font-mono">
                Mã số: {formData.id || 'VB-MẪU'}
              </span>
            </div>

            {/* The Live Rendered Card */}
            <div className="bg-[#FFFDF9] rounded-xl overflow-hidden shadow-md border border-[#E8DFC8] flex flex-col justify-between">
              <div>
                {/* Image Container with HeritageImage Component */}
                <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                  <HeritageImage
                    src={formData.anh_tu_lieu || ''}
                    alt={formData.ten_tu_lieu || 'Xem trước tư liệu'}
                    type={formData.loai_hinh as HeritageType}
                    title={formData.ten_tu_lieu || 'Tiêu đề tư liệu'}
                    monument={formData.di_tich_lien_quan || 'Tên di tích'}
                    character={formData.chu_goc_han_nom || ''}
                    size="card"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#8B261D] text-amber-100 shadow">
                      {formData.loai_hinh}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-black/60 backdrop-blur-md text-amber-200 font-mono">
                      {formData.id}
                    </span>
                  </div>

                  {/* Orange warning badge if missing source */}
                  {isMissingSource && (
                    <div className="absolute bottom-2 left-2 right-2 bg-orange-600 text-white px-2 py-1 rounded shadow-lg text-[10px] font-bold flex items-center justify-center gap-1.5 border border-orange-400">
                      <AlertTriangle className="w-3 h-3 text-amber-200 shrink-0" />
                      <span>CẢNH BÁO: BẢN GHI THIẾU NGUỒN TƯ LIỆU</span>
                    </div>
                  )}
                </div>

                {/* Caption directly under image */}
                <div className="px-3.5 py-2 bg-[#F5EFE4] text-[11px] text-stone-600 border-b border-[#E8DFC8] space-y-0.5">
                  <div className="flex items-center gap-1 truncate font-medium text-stone-700">
                    <MapPin className="w-3 h-3 text-[#8B261D] shrink-0" />
                    <span className="truncate">{formData.di_tich_lien_quan || 'Chưa nhập di tích'} ({formData.dia_diem || 'Địa điểm'})</span>
                  </div>
                  <div className="flex items-center gap-1 truncate text-stone-500">
                    <Calendar className="w-3 h-3 text-stone-400 shrink-0" />
                    <span className="truncate">{formData.nien_dai || 'Niên đại chưa rõ'}</span>
                  </div>
                  <div className="truncate text-[10px]">
                    {isMissingSource ? (
                      <span className="text-orange-700 font-bold bg-orange-100 px-1 py-0.2 rounded">
                        ⚠️ Chưa có nguồn thư tịch
                      </span>
                    ) : (
                      <span className="text-stone-600">
                        <span className="font-semibold text-stone-700">Nguồn: </span>
                        {formData.nguon_tu_lieu}
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-2.5">
                  <h3 className="font-serif-heritage text-base font-bold text-[#691912] line-clamp-1">
                    {formData.ten_tu_lieu || 'Tiêu đề văn bia / hoành phi / câu đối'}
                  </h3>

                  {/* Chinese / Nom Original */}
                  <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E3D9C3] font-hannom text-stone-900 text-base leading-relaxed tracking-wider line-clamp-2 min-h-[46px] flex items-center">
                    {formData.chu_goc_han_nom || 'Chữ Hán / Nôm nguyên bản...'}
                  </div>

                  {/* Sino-Vietnamese transliteration */}
                  <div className="text-xs text-stone-700 italic line-clamp-2">
                    <span className="font-semibold text-[#8B261D] not-italic">Phiên âm: </span>
                    {formData.phien_am_han_viet || 'Bản phiên âm Hán-Việt...'}
                  </div>

                  {/* Vietnamese Translation */}
                  <div className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    <span className="font-semibold text-stone-800">Dịch nghĩa: </span>
                    {formData.dich_nghia || 'Bản dịch nghĩa tiếng Việt...'}
                  </div>
                </div>
              </div>

              {/* Attribution Footer */}
              <div className="px-4 py-2.5 bg-stone-50 border-t border-[#E8DFC8] text-[10px] text-stone-500 flex items-center justify-between">
                <span className="truncate">Người thu thập: {formData.nguoi_cung_cap_thu_thap || 'A05'}</span>
                <span className="text-emerald-700 font-bold shrink-0">✓ Đề tài A05</span>
              </div>
            </div>

            {/* Academic Standards Box */}
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs text-amber-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Tiêu chuẩn thẩm định số hoá Đề tài A05:</span>
              </div>
              <ul className="space-y-1 text-[11px] text-amber-800 list-disc list-inside">
                <li>Bản ghi ngay sau khi bấm lưu sẽ có mặt trên thanh tra cứu và trợ lý AI.</li>
                <li>Hệ thống lưu giữ đầy đủ 14 trường thông tin chuẩn hoá.</li>
                <li>Không tạo ảnh giả lập AI; chỉ liên kết ảnh hiện vật thực địa.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
