import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { incrementUsage, recordAIRequest } from "@/lib/server/database"

function analyzeText(text: string) {
  const sentences = text.split(/[.!?]+/).filter((item) => item.trim().length > 0)
  const words = text
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean)
  const characters = text.replace(/\s/g, "").length
  const readingTimeMinutes = Math.max(1, Math.round(words.length / 200))
  const uniqueWords = new Set(words.map((word) => word.toLowerCase())).size

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    readingTimeMinutes,
    uniqueWords,
    characterCount: characters,
    readability: words.length / Math.max(1, sentences.length),
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body || typeof body.text !== "string") {
      return NextResponse.json({ error: "Введите текст для анализа" }, { status: 400 })
    }

    const metrics = analyzeText(body.text)
    recordAIRequest({
      userId: user.id,
      type: "text_analysis",
      inputData: { text: body.text.slice(0, 2000) },
      outputData: metrics,
      status: "completed",
    })
    incrementUsage(user.id, 128)

    return NextResponse.json({ metrics, suggestions: buildSuggestions(metrics) })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}

function buildSuggestions(metrics: ReturnType<typeof analyzeText>) {
  const suggestions: string[] = []
  if (metrics.readability > 20) {
    suggestions.push("Предложения слишком длинные — попробуйте разбить их на более короткие.")
  }
  if (metrics.uniqueWords / Math.max(1, metrics.wordCount) < 0.3) {
    suggestions.push("Добавьте больше разнообразной лексики, чтобы избежать повторов.")
  }
  if (metrics.wordCount < 120) {
    suggestions.push("Раскройте тему подробнее — текст получится убедительнее.")
  }
  if (suggestions.length === 0) {
    suggestions.push("Текст выглядит отлично! Можно переходить к публикации.")
  }
  return suggestions
}
