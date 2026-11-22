import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize GoogleGenAI client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Read heritage records from disan.json
const disanFilePath = path.resolve(process.cwd(), 'src/data/disan.json');
function getDisanRecords(): any[] {
  try {
    const raw = fs.readFileSync(disanFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading disan.json:', e);
    return [];
  }
}

// API: Get all heritage records
app.get('/api/disan', (_req, res) => {
  const records = getDisanRecords();
  res.json({
    status: 'success',
    total: records.length,
    data: records,
  });
});

// API: Create new heritage record
app.post('/api/disan', (req, res) => {
  try {
    const newItem = req.body;
    if (!newItem.ten_tu_lieu || !newItem.loai_hinh || !newItem.di_tich_lien_quan) {
      return res.status(400).json({ error: 'Thiếu thông tin bắt buộc (Tên tư liệu, Loại hình, Di tích liên quan).' });
    }

    const records = getDisanRecords();
    
    // Auto-generate ID if not provided
    if (!newItem.id) {
      const prefix = newItem.loai_hinh === 'Văn bia' ? 'VB' : newItem.loai_hinh === 'Hoành phi' ? 'HP' : 'CD';
      newItem.id = `${prefix}-NEW${Date.now().toString().slice(-4)}`;
    }

    // Default values if empty
    newItem.dia_diem = newItem.dia_diem || 'Đang cập nhật';
    newItem.nien_dai = newItem.nien_dai || 'Đang xác minh';
    newItem.chu_goc_han_nom = newItem.chu_goc_han_nom || '';
    newItem.phien_am_han_viet = newItem.phien_am_han_viet || '';
    newItem.dich_nghia = newItem.dich_nghia || '';
    newItem.y_nghia_noi_dung = newItem.y_nghia_noi_dung || '';
    newItem.anh_tu_lieu = newItem.anh_tu_lieu || '';
    newItem.nguon_tu_lieu = newItem.nguon_tu_lieu || '';
    newItem.nguoi_cung_cap_thu_thap = newItem.nguoi_cung_cap_thu_thap || 'Cộng đồng số hoá di sản';
    newItem.pham_vi_su_dung = newItem.pham_vi_su_dung || 'Nghiên cứu, học tập phi lợi nhuận (A05)';

    // Prepend to list
    records.unshift(newItem);

    // Save to disan.json
    fs.writeFileSync(disanFilePath, JSON.stringify(records, null, 2), 'utf-8');

    return res.status(201).json({
      status: 'success',
      message: 'Hồ sơ số hóa di sản đã được lưu trữ thành công vào hệ thống!',
      data: newItem,
      total: records.length,
    });
  } catch (error: any) {
    console.error('Error creating disan record:', error);
    return res.status(500).json({ error: 'Không thể lưu hồ sơ di sản lúc này.', details: error.message });
  }
});

// API: AI Assistant Q&A grounded strictly in disan.json
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Nội dung câu hỏi không hợp lệ.' });
    }

    const disanRecords = getDisanRecords();

    if (!ai) {
      // Graceful fallback if GEMINI_API_KEY is not configured yet
      // Perform local intelligent search on disanRecords
      const query = message.toLowerCase().trim();
      const matched = disanRecords.filter((item) =>
        item.ten_tu_lieu.toLowerCase().includes(query) ||
        item.di_tich_lien_quan.toLowerCase().includes(query) ||
        item.phien_am_han_viet.toLowerCase().includes(query) ||
        item.dich_nghia.toLowerCase().includes(query) ||
        item.y_nghia_noi_dung.toLowerCase().includes(query)
      );

      if (matched.length > 0) {
        const item = matched[0];
        return res.json({
          reply: `Dựa trên dữ liệu hệ thống Đề tài A05, tìm thấy tư liệu liên quan:\n\n**${item.ten_tu_lieu}** (${item.loai_hinh} tại ${item.di_tich_lien_quan}, ${item.dia_diem}).\n\n- **Chữ gốc**: ${item.chu_goc_han_nom}\n- **Phiên âm Hán-Việt**: ${item.phien_am_han_viet}\n- **Dịch nghĩa**: ${item.dich_nghia}\n- **Ý nghĩa & bối cảnh**: ${item.y_nghia_noi_dung}\n\n*Dẫn chiếu:* **Tên bản ghi**: ${item.ten_tu_lieu} | **Nguồn tư liệu**: ${item.nguon_tu_lieu || 'Đang cập nhật'}.`,
          referencedItem: item,
        });
      } else {
        return res.json({
          reply: 'Chưa có tư liệu về nội dung này trong hệ thống. Hệ thống A05 chỉ cung cấp thông tin trung thực dựa trên kho tư liệu văn bia, hoành phi, câu đối đã được số hóa và xác thực.',
        });
      }
    }

    // Prepare system instruction with the entire verified disan database
    const systemInstruction = `Bạn là Trợ lý AI chuyên trách cho Dự án xã hội phi lợi nhuận "Số hoá văn bia, hoành phi, câu đối" (Mã đề tài: A05 - FPT Polytechnic x IMTA TECH, tác giả: Phạm Tiến Dũng - PH61229).

Nhiệm vụ của bạn:
1. Đọc câu hỏi của người dùng và tra cứu CHÍNH XÁC trong kho dữ liệu disan.json được cung cấp dưới đây để giải thích ý nghĩa, dịch nghĩa, câu chữ, niên đại hoặc chỉ rõ vị trí hiện vật.
2. Trả lời dựa HOÀN TOÀN và TRUNG THỰC trên dữ liệu đã nạp.
3. BẮT BUỘC DẪN CHIẾU: Trong mỗi câu trả lời, bạn PHẢI nêu rõ:
   - Tên bản ghi: [Tên tư liệu chính xác]
   - Nguồn tư liệu: [Nguồn tư liệu trích dẫn từ bản ghi]
4. RÀNG BUỘC NGHIÊM NGẶT (Strict Constraints):
   - KHÔNG ĐƯỢC TỰ SUY ĐOÁN HOẶC BỊA THÔNG TIN VỀ DI SẢN: Nếu câu hỏi của người dùng hỏi về di tích, văn bia, hoành phi hay câu đối mà thông tin KHÔNG CÓ trong tệp dữ liệu disan.json dưới đây, bạn PHẢI trả lời rõ ràng chính xác câu: "Chưa có tư liệu về nội dung này trong hệ thống". Tuyệt đối không được tự bịa niên đại, tên tác giả, chữ Hán hay ý nghĩa.
   - Ngôn ngữ: Tiếng Việt chuẩn mực, trang trọng, tôn kính văn hoá truyền thống và di sản tổ tiên.

DƯỚI ĐÂY LÀ TOÀN BỘ KHO DỮ LIỆU CHÍNH THỨC CỦA ĐỀ TÀI A05 (disan.json):
${JSON.stringify(disanRecords, null, 2)}
`;

    // Build contents from optional history
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const turn of history.slice(-6)) {
        if (turn.role === 'user' || turn.role === 'model') {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text || turn.content || '' }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for factual fidelity
      },
    });

    const reply = response.text || 'Chưa có tư liệu về nội dung này trong hệ thống.';
    return res.json({ reply });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return res.status(500).json({
      error: 'Không thể kết nối với dịch vụ AI lúc này. Vui lòng thử lại.',
      details: err.message,
    });
  }
});

// Setup Vite middleware in Dev or Static files in Production
async function setupVite() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (Production: ${isProduction})`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
});
