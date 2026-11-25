import React from 'react';
import { 
  Library, 
  ExternalLink, 
  BookMarked, 
  Users, 
  FileCheck, 
  ShieldCheck, 
  CheckCircle,
  Building2,
  GraduationCap,
  Globe2
} from 'lucide-react';

export const ScreenSources: React.FC = () => {
  const officialSources = [
    {
      title: 'Viện Nghiên cứu Hán Nôm (Viện Hàn lâm Khoa học Xã hội Việt Nam)',
      description: 'Cơ quan nghiên cứu và lưu trữ bản dập văn bia, văn bản Hán Nôm quốc gia lớn nhất Việt Nam. Cung cấp quy chuẩn phiên âm và bản dịch khảo cứu học thuật.',
      url: 'http://www.hannom.org.vn/',
      category: 'Cơ quan Lưu trữ Quốc gia',
      badge: 'Chính thống',
    },
    {
      title: 'Trung tâm Hoạt động Văn hoá Khoa học Văn Miếu - Quốc Tử Giám',
      description: 'Đơn vị quản lý trực tiếp Quần thể di tích Văn Miếu và 82 tấm Bia Tiến sĩ triều Lê - Mạc (Di sản tư liệu thế giới UNESCO).',
      url: 'http://vanmieu.gov.vn/',
      category: 'Khu Di tích Quốc gia Đặc biệt',
      badge: 'UNESCO MOW',
    },
    {
      title: 'Cục Di sản Văn hoá (Bộ Văn hoá, Thể thao và Du lịch)',
      description: 'Cơ quan quản lý nhà nước về hệ thống di tích, bảo vật quốc gia và di sản văn hoá vật thể, phi vật thể toàn quốc.',
      url: 'http://dsvh.gov.vn/',
      category: 'Quản lý Di sản Nhà nước',
      badge: 'Chính thống',
    },
    {
      title: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
      description: 'Hồ sơ Di sản tư liệu thế giới khu vực Châu Á - Thái Bình Dương: "Hệ thống thơ văn trên kiến trúc cung đình Huế" (khắc khảm trên điện Thái Hoà, Triệu Miếu, Long An...).',
      url: 'https://hueworldheritage.org.vn/',
      category: 'Di sản Thế giới',
      badge: 'UNESCO MOW',
    },
    {
      title: 'Thư viện Quốc gia Việt Nam - Bộ sưu tập Hán Nôm số hóa',
      description: 'Kho tư liệu số hóa các bản dập văn khắc, thác bản bia ký, thần tích, hương ước làng xã cổ truyền Việt Nam.',
      url: 'http://nlv.gov.vn/',
      category: 'Thư viện Quốc gia',
      badge: 'Số hoá số 1',
    },
    {
      title: 'Khu di tích Lịch sử Quốc gia đặc biệt Đền Hùng',
      description: 'Hồ sơ văn bia, hoành phi, câu đối tại các đền Hạ, Trung, Thượng, Giếng trên núi Nghĩa Lĩnh, Phú Thọ.',
      url: 'https://denhung.phutho.gov.vn/',
      category: 'Di tích Lịch sử Quốc gia',
      badge: 'Chính thống',
    },
  ];

  const academicBooks = [
    {
      title: 'Tuyển tập "Văn khắc Hán Nôm Việt Nam"',
      author: 'GS. Hà Văn Tấn chủ biên',
      publisher: 'NXB Khoa học Xã hội, Hà Nội',
      note: 'Bộ công trình đồ sộ tập hợp hàng ngàn văn bia từ thời Lý, Trần, Lê đến thời Nguyễn với bản phiên âm và đối chiếu chuẩn xác.',
    },
    {
      title: 'Văn bia thời Lê sơ và Lê Trung Hưng',
      author: 'PGS.TS. Đinh Khắc Thuân',
      publisher: 'NXB Khoa học Xã hội',
      note: 'Tài liệu nền tảng phân tích cấu trúc, văn phong, chức năng xã hội và giá trị sử liệu của các bia tiến sĩ và bia chùa Bắc Bộ.',
    },
    {
      title: 'Kho tàng Văn bia Thăng Long - Hà Nội (Tập 1 & Tập 2)',
      author: 'GS. Vũ Khiêu (Chủ biên), GS. Phan Huy Lê',
      publisher: 'NXB Hà Nội',
      note: 'Khảo sát toàn diện hệ thống văn khắc trên địa bàn thủ đô ngàn năm văn hiến, phục vụ đại lễ 1000 năm Thăng Long.',
    },
    {
      title: 'Hoành phi, Câu đối Thăng Long - Hà Nội',
      author: 'Sở Văn hoá Thông tin Hà Nội',
      publisher: 'NXB Văn hoá Thông tin',
      note: 'Tuyển tập dịch nghĩa, chú giải các đại tự, liên đối tại các đình, đền, chùa cổ Hà Nội.',
    },
  ];

  const communitySources = [
    {
      name: 'Nhóm nghiên cứu Đề tài A05 (Phạm Tiến Dũng - PH61229)',
      role: 'Điền dã & Thu thập ảnh chụp hiện vật thực địa',
      detail: 'Trực tiếp thực địa ghi nhận ảnh chụp độ phân giải cao tại Văn Miếu, Chùa Thầy, Đền Ngọc Sơn, Đền Hùng, đối chiếu chữ khắc với các cụ thủ từ và ban quản lý.',
    },
    {
      name: 'Cộng đồng Chữ Nôm & Di sản Văn hoá Trẻ',
      role: 'Hỗ trợ dò chữ mòn và phản biện học thuật',
      detail: 'Hỗ trợ nhận diện các dị thể chữ Hán cổ, đối chiếu Khang Hy Tự Điển và Từ điển Chữ Nôm Trích Dẫn để đảm bảo tính xác thực.',
    },
    {
      name: 'Giảng viên & Cố vấn chuyên môn FPT Polytechnic x IMTA TECH',
      role: 'Thẩm định cấu trúc dữ liệu và giải pháp công nghệ',
      detail: 'Hướng dẫn chuẩn hoá lược đồ cơ sở dữ liệu disan.json, quy chuẩn hiển thị nhãn cảnh báo thiếu nguồn và cơ chế chống suy đoán bịa đặt AI.',
    },
  ];

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8B261D] uppercase tracking-wider">
          <Library className="w-4 h-4" />
          <span>DANH MỤC THAM KHẢO & CƠ SỞ TƯ LIỆU HỌC THUẬT</span>
        </div>
        <h1 className="font-serif-heritage text-2xl sm:text-3xl font-bold text-[#691912]">
          Nguồn Tư Liệu Chính Thống & Nguồn Cộng Đồng
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Nhằm đảm bảo tính chuẩn xác lịch sử, tính tôn nghiêm của không gian tâm linh và bản quyền di sản, 
          mọi bản ghi trong hệ thống Đề tài A05 đều bắt buộc phải ghi rõ nguồn gốc xuất xứ, minh bạch hóa dữ liệu 
          và cung cấp liên kết kiểm chứng mở được cho cộng đồng.
        </p>
      </div>

      {/* Section 1: Official Institutions with External Links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-heritage text-lg sm:text-xl font-bold text-[#691912] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#8B261D]" />
            <span>1. Cơ Quan Quản Lý & Lưu Trữ Di Sản Chính Thống</span>
          </h2>
          <span className="text-xs text-stone-500">Kèm liên kết trực tiếp</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {officialSources.map((src, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] rounded-xl p-5 border border-[#E8DFC8] hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-600 border border-stone-200">
                    {src.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B261D] text-amber-100">
                    {src.badge}
                  </span>
                </div>
                <h3 className="font-serif-heritage font-bold text-stone-900 text-sm sm:text-base">
                  {src.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {src.description}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-200">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B261D] hover:text-[#B93826] transition"
                >
                  <span>Mở cổng thông tin lưu trữ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Classical Academic Bibliography */}
      <div className="space-y-4">
        <h2 className="font-serif-heritage text-lg sm:text-xl font-bold text-[#691912] flex items-center gap-2">
          <BookMarked className="w-5 h-5 text-[#8B261D]" />
          <span>2. Công Trình Khảo Cứu & Thư Tịch Hán Nôm Tiêu Biểu</span>
        </h2>

        <div className="bg-[#FFFDF9] rounded-xl border border-[#E8DFC8] divide-y divide-stone-200 overflow-hidden shadow-sm">
          {academicBooks.map((book, idx) => (
            <div key={idx} className="p-4 sm:p-5 hover:bg-stone-50/60 transition space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif-heritage font-bold text-stone-900 text-sm sm:text-base">
                  {book.title}
                </h3>
                <span className="text-xs font-medium text-[#8B261D] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {book.author}
                </span>
              </div>
              <div className="text-[11px] text-stone-500 font-mono">
                Xuất bản: {book.publisher}
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                {book.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Community & Field Survey Contributions */}
      <div className="space-y-4">
        <h2 className="font-serif-heritage text-lg sm:text-xl font-bold text-[#691912] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#8B261D]" />
          <span>3. Nguồn Đóng Góp Cộng Đồng & Điền Dã Thực Địa</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {communitySources.map((item, idx) => (
            <div key={idx} className="bg-[#FFFDF9] rounded-xl p-4 sm:p-5 border border-[#E8DFC8] shadow-sm space-y-2">
              <div className="text-xs font-bold text-[#8B261D] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{item.role}</span>
              </div>
              <h3 className="font-serif-heritage font-bold text-stone-900 text-sm">
                {item.name}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: 4-Step Verification Workflow */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E8DFC8] space-y-4">
        <h2 className="font-serif-heritage text-base sm:text-lg font-bold text-[#691912] flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-[#8B261D]" />
          <span>Quy Trình 4 Bước Thẩm Định Nguồn & Số Hoá Dữ Liệu A05</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1">
            <span className="font-bold text-[#8B261D] block">Bước 1: Chụp ảnh hiện vật</span>
            <p className="text-stone-600">Ghi nhận ảnh thực địa góc thẳng, ánh sáng tự nhiên hoặc thác bản dập mực truyền thống.</p>
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1">
            <span className="font-bold text-[#8B261D] block">Bước 2: Đối chiếu tự điển</span>
            <p className="text-stone-600">Tra cứu từng tự dạng qua Khang Hy Tự Điển, Từ điển Hán-Việt Thiều Chửu, Trần Văn Chánh.</p>
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1">
            <span className="font-bold text-[#8B261D] block">Bước 3: Dịch chú lịch sử</span>
            <p className="text-stone-600">Bản dịch nghĩa bám sát bối cảnh niên đại vua ban, sắc chỉ hoặc thần tích văn bia.</p>
          </div>
          <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1">
            <span className="font-bold text-[#8B261D] block">Bước 4: Kiểm duyệt nguồn</span>
            <p className="text-stone-600">Bắt buộc đối chiếu nguồn viện nghiên cứu trước khi xoá nhãn cảnh báo cam.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
