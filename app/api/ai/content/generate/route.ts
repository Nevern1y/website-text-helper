import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { incrementUsage, recordAIRequest } from "@/lib/server/database"

function buildContent({
  topic,
  contentType,
  tone,
  length,
}: {
  topic: string
  contentType: string
  tone?: string
  length?: string
}) {
  const toneLabel = tone ? `Тон: ${tone}.` : ""
  const lengthLabel =
    length === "short"
      ? "Краткое содержание"
      : length === "long"
        ? "Расширенный материал"
        : "Сбалансированный формат"

  const sections = [
    `# ${topic}\n\n${lengthLabel}. ${toneLabel}`,
    "## Введение\n\n" +
      `Раскрываем тему «${topic}» с акцентом на практическую ценность. Подготавливаем читателя к ключевым выводам и объясняем, почему вопрос важен именно сейчас.`,
    "## Основные идеи\n\n" +
      `1. Основное преимущество: «${topic}» открывает новые возможности и помогает принимать решения быстрее.\n2. Практическое применение: Опишите два-три сценария, где тема приносит максимальную выгоду.\n3. Советы по внедрению: Дайте пошаговый план, который можно адаптировать под разные команды.`,
    "## Заключение\n\n" +
      `Подведите итог и сформулируйте призыв к действию — предложите читателю сделать следующий шаг, например, протестировать идею или обсудить ее с коллегами.`,
  ]

  return sections.join("\n\n")
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body || typeof body.topic !== "string" || typeof body.contentType !== "string") {
      return NextResponse.json({ error: "Укажите тему и тип контента" }, { status: 400 })
    }

    const content = buildContent({
      topic: body.topic,
      contentType: body.contentType,
      tone: typeof body.tone === "string" ? body.tone : undefined,
      length: typeof body.length === "string" ? body.length : undefined,
    })

    recordAIRequest({
      userId: user.id,
      type: "content_generation",
      inputData: body,
      outputData: { content },
      status: "completed",
    })
    incrementUsage(user.id, 256)

    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
