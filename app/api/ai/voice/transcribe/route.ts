import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { incrementUsage, recordAIRequest } from "@/lib/server/database"

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body || typeof body.audio !== "string") {
      return NextResponse.json({ error: "Передайте аудио в формате base64" }, { status: 400 })
    }

    const transcript = "Распознанный текст (демо): платформа успешно обрабатывает голосовые команды."
    recordAIRequest({
      userId: user.id,
      type: "voice_transcription",
      inputData: { audioLength: body.audio.length },
      outputData: { transcript },
      status: "completed",
    })
    incrementUsage(user.id, 96)

    return NextResponse.json({ transcript })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
