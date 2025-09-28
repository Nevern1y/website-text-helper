import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { addMarketingIdea, incrementUsage, listMarketingIdeas, recordAIRequest } from "@/lib/server/database"

function buildIdea(topic: string, channel: string, audience?: string) {
  const base = `Акцент на теме «${topic}»`
  const channelText = `Канал: ${channel}.`
  const audienceText = audience ? `Целевая аудитория: ${audience}.` : ""
  return [base, channelText, audienceText, "Предложение: расскажите кейс с реальными цифрами и предложите бесплатный чек-лист."].filter(Boolean).join(" ")
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body || typeof body.topic !== "string" || typeof body.channel !== "string") {
      return NextResponse.json({ error: "Укажите тему и канал продвижения" }, { status: 400 })
    }

    const ideaText = buildIdea(body.topic, body.channel, typeof body.audience === "string" ? body.audience : undefined)
    const idea = addMarketingIdea(user.id, {
      topic: body.topic,
      channel: body.channel,
      idea: ideaText,
    })

    recordAIRequest({
      userId: user.id,
      type: "marketing_idea",
      inputData: body,
      outputData: { idea: ideaText },
      status: "completed",
    })
    incrementUsage(user.id, 80)

    return NextResponse.json({ idea, history: listMarketingIdeas(user.id) })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
