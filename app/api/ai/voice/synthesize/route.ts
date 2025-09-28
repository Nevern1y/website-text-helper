import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { incrementUsage, recordAIRequest } from "@/lib/server/database"

const DEMO_AUDIO_BASE64 =
  "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"

const AVAILABLE_VOICES = ["female-ru", "male-ru", "female-en", "male-en"] as const
const AVAILABLE_VOICE_SET = new Set<string>(AVAILABLE_VOICES)

const NORMALIZED_SPEEDS = ["slow", "normal", "fast"] as const
const NORMALIZED_SPEED_SET = new Set<string>(NORMALIZED_SPEEDS)

type VoiceOption = (typeof AVAILABLE_VOICES)[number]
type SpeedOption = (typeof NORMALIZED_SPEEDS)[number]

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body || typeof body.text !== "string" || !body.text.trim()) {
      return NextResponse.json({ error: "Передайте текст для озвучивания" }, { status: 400 })
    }

    const voice =
      typeof body.voice === "string" && AVAILABLE_VOICE_SET.has(body.voice)
        ? (body.voice as VoiceOption)
        : "female-ru"

    const speed =
      typeof body.speed === "string" && NORMALIZED_SPEED_SET.has(body.speed)
        ? (body.speed as SpeedOption)
        : "normal"

    recordAIRequest({
      userId: user.id,
      type: "voice_synthesis",
      inputData: {
        textPreview: body.text.slice(0, 280),
        voice,
        speed,
      },
      outputData: {
        audioBytes: DEMO_AUDIO_BASE64.length,
      },
      status: "completed",
    })

    incrementUsage(user.id, Math.max(32, Math.ceil(body.text.length / 4)))

    return NextResponse.json({
      audio: DEMO_AUDIO_BASE64,
      voice,
      speed,
    })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
