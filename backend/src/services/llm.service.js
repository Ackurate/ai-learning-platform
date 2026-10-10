// Gọi LLM API. Mặc định dùng định dạng Messages API của Anthropic.
// Nếu đổi nhà cung cấp khác, chỉ cần sửa file này.

const API_URL = 'https://api.anthropic.com/v1/messages'

const SYSTEM_PROMPT = `Bạn là trợ giảng lập trình cơ bản, tập trung vào ngôn ngữ C++, trả lời bằng tiếng Việt.
- Giải thích ngắn gọn, dễ hiểu, có ví dụ code nhỏ khi cần.
- Khi học viên đang làm sai một câu quiz, hãy gợi ý hướng suy nghĩ, không nói thẳng đáp án.
- Nếu câu hỏi không liên quan đến lập trình, lịch sự từ chối và đưa cuộc trò chuyện về bài học.
- Nếu không chắc chắn, hãy nói rõ thay vì đoán.`

export async function askLLM({ question, context = '' }) {
  if (!process.env.LLM_API_KEY) {
    throw Object.assign(new Error('Chưa cấu hình LLM_API_KEY trong backend/.env'), { status: 503 })
  }

  const userContent = context ? `Ngữ cảnh bài học:\n${context}\n\nCâu hỏi của học viên:\n${question}` : question

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.LLM_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: process.env.LLM_MODEL,
      max_tokens: 800,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userContent }],
    }),
  })

  if (!res.ok) {
    throw Object.assign(new Error('Dịch vụ AI đang lỗi, thử lại sau'), { status: 502 })
  }

  const data = await res.json()
  return data.content?.[0]?.text ?? ''
}
