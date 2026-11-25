export type HeritageType = 'Văn bia' | 'Hoành phi' | 'Câu đối';

export interface HeritageItem {
  id: string;
  ten_tu_lieu: string;
  loai_hinh: HeritageType;
  di_tich_lien_quan: string;
  dia_diem: string;
  nien_dai: string;
  chu_goc_han_nom: string;
  phien_am_han_viet: string;
  dich_nghia: string;
  y_nghia_noi_dung: string;
  anh_tu_lieu: string;
  nguon_tu_lieu: string;
  nguoi_cung_cap_thu_thap: string;
  pham_vi_su_dung: string;
}

export type ActiveTab = 'search' | 'detail' | 'create' | 'ai-assistant' | 'sources' | 'about';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  referencedItem?: HeritageItem;
}
