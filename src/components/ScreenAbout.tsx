import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  HeartHandshake, 
  Sparkles, 
  Scroll, 
  ShieldCheck, 
  Landmark,
  Compass,
  FileText
} from 'lucide-react';

export const ScreenAbout: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contributeForm, setContributeForm] = useState({
    name: '',
    contact: '',
    siteName: '',
    location: '',
    type: 'Văn bia',
    description: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributeForm.name || !contributeForm.siteName) return;
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Hero Project Information Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#691912] via-[#8B261D] to-[#4F100B] text-amber-50 shadow-xl border border-amber-500/40 p-6 sm:p-8">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>DỰ ÁN XÃ HỘI PHI LỢI NHUẬN • MÃ ĐỀ TÀI: A05</span>
          </div>

          <h1 className="font-serif-heritage text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100">
            Số Hoá Văn Bia, Hoành Phi, Câu Đối
          </h1>

          <p className="text-amber-200/90 text-sm sm:text-base max-w-3xl leading-relaxed font-light">
            Dự án công nghệ bảo tồn di sản văn hoá dân tộc, số hoá hệ thống văn tự Hán Nôm cổ truyền 
            nhằm đưa tri thức tiền nhân đến gần hơn với thế hệ trẻ, học sinh, sinh viên và du khách quốc tế.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg border border-amber-300/30 text-amber-200">
              Chương trình Thực tập sinh Đợt 15
            </span>
            <span className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg border border-amber-300/30 text-amber-200">
              FPT Polytechnic x IMTA TECH
            </span>
          </div>
        </div>
      </div>

      {/* Author & Academic Profile Card */}
      <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-6">
        <h2 className="font-serif-heritage text-lg sm:text-xl font-bold text-[#691912] flex items-center gap-2 border-b border-[#E8DFC8] pb-3">
          <User className="w-5 h-5 text-[#8B261D]" />
          <span>Thông Tin Tác Giả & Đơn Vị Thực Hiện</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3.5 p-4 bg-[#FAF7F2] rounded-xl border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-[#8B261D] text-amber-300 flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                  Họ và tên tác giả
                </span>
                <span className="text-base sm:text-lg font-bold text-stone-900 font-serif-heritage">
                  Phạm Tiến Dũng
                </span>
                <span className="block text-xs font-mono text-[#8B261D] mt-0.5">
                  Mã sinh viên: PH61229
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 bg-[#FAF7F2] rounded-xl border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                  Lớp / Nhóm thực tập
                </span>
                <span className="text-base font-bold text-stone-900">
                  Nhóm 2 - Đợt 15
                </span>
                <span className="block text-xs text-stone-600 mt-0.5">
                  FPT Polytechnic Hà Nội
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3.5 p-4 bg-[#FAF7F2] rounded-xl border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                  Chương trình hợp tác
                </span>
                <span className="text-base font-bold text-stone-900">
                  FPT Polytechnic x IMTA TECH
                </span>
                <span className="block text-xs text-emerald-800 font-medium mt-0.5">
                  Dự án xã hội phi lợi nhuận vì cộng đồng
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 bg-[#FAF7F2] rounded-xl border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-indigo-700 text-white flex items-center justify-center shrink-0">
                <Scroll className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider block">
                  Tên đề tài & Mã số
                </span>
                <span className="text-base font-bold text-stone-900 font-serif-heritage">
                  Số hoá văn bia, hoành phi, câu đối
                </span>
                <span className="block text-xs font-mono text-indigo-700 font-semibold mt-0.5">
                  Mã đề tài chính thức: A05
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scope and Current Limitations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scope Completed */}
        <div className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DFC8] shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 font-bold font-serif-heritage text-base sm:text-lg border-b border-stone-200 pb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Phạm Vi Di Sản Đã Thực Hiện</span>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
              <span>
                <b>Văn Miếu - Quốc Tử Giám (Hà Nội):</b> Số hoá bia Tiến sĩ tiêu biểu khoa 1442 ("Hiền tài là nguyên khí quốc gia"), hoành phi Đại Thành Điện "Vạn Thế Sư Biểu", hoành phi Khuê Văn Các và đôi câu đối Tiền đường.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
              <span>
                <b>Đền Ngọc Sơn (Hồ Hoàn Kiếm):</b> Hoành phi Đắc Nguyệt Lâu, Trấn Ba Đình và câu đối kinh điển của Phương Đình Nguyễn Văn Siêu.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
              <span>
                <b>Chùa Cổ Bắc Bộ:</b> Văn bia Chùa Thầy (Thiên Phúc Tự), hoành phi Từ Lương Thạch Tự (Quốc Oai), Văn bia trùng tu Chùa Keo (Vũ Thư, Thái Bình), hoành phi Liên Hoa Đài Chùa Một Cột.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
              <span>
                <b>Văn khắc Cung đình & Lăng tẩm:</b> Điện Thái Hoà (Đại Nội Huế - UNESCO MOW), Bia Vĩnh Lăng Lam Kinh do Nguyễn Trãi soạn (Thanh Hoá), Động Hương Tích (Chùa Hương).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
              <span>
                <b>Khu di tích Lịch sử Đền Hùng (Phú Thọ):</b> Hoành phi "Quốc Tổ Triệu Cơ" và câu đối cột đá Đền Thượng hơn 4000 năm văn hiến.
              </span>
            </li>
          </ul>
        </div>

        {/* Limitations & Future Work */}
        <div className="bg-[#FFFDF9] rounded-2xl p-6 border border-[#E8DFC8] shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-800 font-bold font-serif-heritage text-base sm:text-lg border-b border-stone-200 pb-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>Những Hạn Chế & Nội Dung Chưa Làm Được</span>
          </div>

          <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0"></span>
              <span>
                <b>Quy mô số lượng:</b> Mới tập trung số hoá sâu 18 bản ghi tiêu biểu đại diện; chưa thể bao phủ toàn bộ 82 tấm Bia Tiến sĩ Văn Miếu và hàng ngàn văn bia đình làng trên toàn quốc.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0"></span>
              <span>
                <b>Tình trạng phong hoá mòn khuyết:</b> Nhiều văn bia thời Trần, Lê sơ bị mòn chữ, nứt vỡ do chiến tranh và thời tiết, cần kỹ thuật quét laser 3D và giám định tia hồng ngoại chưa có điều kiện thực hiện trong phạm vi đồ án.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0"></span>
              <span>
                <b>Hán Nôm tự động OCR:</b> Mô hình nhận diện ký tự chữ Nôm cổ viết tay trên gỗ sơn thếp vàng chưa đạt độ chính xác 100%, hiện vẫn phải dựa vào đối chiếu thủ công của chuyên gia.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0"></span>
              <span>
                <b>Thẩm định nguồn điền dã:</b> Một số bản ghi cộng đồng gửi về (như trường hợp đình Thổ Hà) đang trong tiến trình tra cứu đối chiếu thư tịch nên tạm thời hiển thị nhãn cảnh báo cam để đảm bảo trung thực.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Community Contribution Form */}
      <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-5">
        <div className="border-b border-[#E8DFC8] pb-3">
          <h2 className="font-serif-heritage text-lg sm:text-xl font-bold text-[#691912] flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#8B261D]" />
            <span>Đóng Góp Tư Liệu Di Sản Cho Dự Án A05</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Bạn có ảnh chụp hoặc phát hiện văn bia, hoành phi, câu đối quý tại đình, chùa, nhà thờ họ quê hương? 
            Hãy gửi thông tin để Ban biên tập Đề tài A05 thẩm định và bổ sung vào kho tư liệu số hoá cộng đồng.
          </p>
        </div>

        {formSubmitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-emerald-900 font-serif-heritage text-base">
              Cảm ơn bạn đã đóng góp tư liệu di sản!
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto">
              Thông tin của bạn đã được ghi nhận vào hàng đợi thẩm định của nhóm nghiên cứu A05 (Phạm Tiến Dũng - PH61229). Chúng tôi sẽ đối chiếu thư tịch và thông báo khi bản ghi được số hoá chính thức.
            </p>
            <button
              onClick={() => {
                setFormSubmitted(false);
                setContributeForm({
                  name: '',
                  contact: '',
                  siteName: '',
                  location: '',
                  type: 'Văn bia',
                  description: '',
                });
              }}
              className="mt-3 px-4 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition"
            >
              Gửi thêm tư liệu khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Họ và tên người đóng góp *
                </label>
                <input
                  type="text"
                  required
                  value={contributeForm.name}
                  onChange={(e) => setContributeForm({ ...contributeForm, name: e.target.value })}
                  placeholder="Vd: Nguyễn Văn A"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#8B261D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Số điện thoại hoặc Email liên hệ
                </label>
                <input
                  type="text"
                  value={contributeForm.contact}
                  onChange={(e) => setContributeForm({ ...contributeForm, contact: e.target.value })}
                  placeholder="Vd: 0912xxxxxx / email@example.com"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#8B261D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tên di tích / Đình / Chùa / Nhà thờ họ *
                </label>
                <input
                  type="text"
                  required
                  value={contributeForm.siteName}
                  onChange={(e) => setContributeForm({ ...contributeForm, siteName: e.target.value })}
                  placeholder="Vd: Đền Quán Thánh / Chùa Trấn Quốc..."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#8B261D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Địa điểm (Xã/Huyện/Tỉnh)
                </label>
                <input
                  type="text"
                  value={contributeForm.location}
                  onChange={(e) => setContributeForm({ ...contributeForm, location: e.target.value })}
                  placeholder="Vd: Ba Đình, Hà Nội"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#8B261D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Loại hình di sản
                </label>
                <select
                  value={contributeForm.type}
                  onChange={(e) => setContributeForm({ ...contributeForm, type: e.target.value })}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#8B261D] focus:outline-none"
                >
                  <option value="Văn bia">Văn bia</option>
                  <option value="Hoành phi">Hoành phi</option>
                  <option value="Câu đối">Câu đối</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Tình trạng hiện vật & Nguồn tư liệu (nếu có)
                </label>
                <input
                  type="text"
                  value={contributeForm.description}
                  onChange={(e) => setContributeForm({ ...contributeForm, description: e.target.value })}
                  placeholder="Vd: Còn nguyên vẹn, dập năm 2024, theo thần tích làng..."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-[#8B261D] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B261D] hover:bg-[#A32F24] text-amber-100 font-semibold rounded-lg text-xs sm:text-sm shadow-sm transition"
              >
                <Send className="w-4 h-4" />
                <span>Gửi đề xuất tư liệu mới</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
