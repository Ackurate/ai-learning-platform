// Gọi LLM qua NVIDIA NIM (API tương thích OpenAI).
// Cấu hình trong .env: LLM_BASE_URL, LLM_API_KEY, LLM_MODEL

const BASE_URL = process.env.LLM_BASE_URL || 'https://integrate.api.nvidia.com/v1';
const API_KEY = process.env.LLM_API_KEY;
const MODEL = process.env.LLM_MODEL || 'nvidia/nemotron-3-ultra-550b-a55b';
const TIMEOUT_MS = Number(process.env.LLM_TIMEOUT_MS) || 60000;

const SYSTEM_PROMPT = `Bạn là trợ giảng lập trình C++ cho người mới học. Trả lời bằng tiếng Việt, rõ ràng, ngắn gọn.
Quy tắc:
- Giải thích khái niệm bằng ví dụ C++ ngắn, dễ hiểu.
- Nếu người học đang làm quiz, KHÔNG nói thẳng đáp án đúng. Hãy gợi ý hướng suy nghĩ và hỏi lại để người học tự tìm ra.
- Nếu không chắc chắn, nói rõ là không chắc chắn thay vì đoán.
- Chỉ trả lời trong phạm vi lập trình C++ cơ bản; từ chối lịch sự các câu hỏi ngoài phạm vi.`;

/**
 * Hỏi LLM về một câu hỏi lập trình.
 * @param {object} params
 * @param {string} params.question  Câu hỏi của người học
 * @param {string} [params.context] Ngữ cảnh (tên chương, nội dung câu quiz).
 *                                  KHÔNG đưa correct_answer vào đây khi quiz chưa nộp.
 * @returns {Promise<string>} Nội dung trả lời
 */
export async function askLLM({ question, context = '' }) {
  if (!API_KEY) {
    throw new Error('Thiếu LLM_API_KEY trong file .env');
  }

  const userContent = context
    ? `Ngữ cảnh:\n${context}\n\nCâu hỏi của người học:\n${question}`
    : question;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(`${BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
        temperature: 0.2,
        max_tokens: 1024,
      }),
      signal: controller.signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('LLM phản hồi quá lâu, vui lòng thử lại');
    }
    throw new Error(`Không kết nối được LLM: ${err.message}`);
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`LLM trả lỗi ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? '';

  // Một số model suy luận trả về phần "<think>...</think>"; bỏ đi trước khi hiển thị cho người học.
  return content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
}