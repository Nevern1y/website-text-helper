import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import {
  addChatMessage,
  ensureChatHistory,
  getChatHistory,
  incrementUsage,
  recordAIRequest,
} from "@/lib/server/database"

function buildAssistantReply(message: string, historyLength: number) {
  return [
    `Спасибо за сообщение! Я зафиксировал ваш запрос: «${message}».`,
    "Вот что я могу предложить:",
    historyLength > 3 ? "• У нас уже сложилась хорошая история диалога — продолжаем в том же духе." : "• Это один из первых запросов, поэтому я уточняю детали.",
    "• Попробуйте сформулировать конечную цель, чтобы я подготовил точный ответ.",
  ].join("\n")
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body || typeof body.message !== "string") {
      return NextResponse.json({ error: "Введите сообщение" }, { status: 400 })
    }

    ensureChatHistory(user.id)
    addChatMessage(user.id, { role: "user", content: body.message })
    const history = getChatHistory(user.id)
    const assistantMessage = buildAssistantReply(body.message, history.length)
    addChatMessage(user.id, { role: "assistant", content: assistantMessage })

    recordAIRequest({
      userId: user.id,
      type: "chat",
      inputData: { message: body.message },
      outputData: { reply: assistantMessage },
      status: "completed",
    })
    incrementUsage(user.id, 64)

    return NextResponse.json({ messages: getChatHistory(user.id) })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
