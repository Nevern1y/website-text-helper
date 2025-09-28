import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { incrementUsage, recordAIRequest } from "@/lib/server/database"

function buildPlaceholderImage(prompt: string, style: string | undefined) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6366f1" />
        <stop offset="100%" stop-color="#22d3ee" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" fill="url(#gradient)" rx="32" />
    <text x="50%" y="45%" font-family="Inter, sans-serif" font-size="36" fill="#ffffff" text-anchor="middle" opacity="0.85">
      ${style ?? "AI Helper"}
    </text>
    <text x="50%" y="70%" font-family="Inter, sans-serif" font-size="22" fill="#ffffff" text-anchor="middle" opacity="0.75">
      ${prompt.slice(0, 60)}
    </text>
  </svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body || typeof body.prompt !== "string") {
      return NextResponse.json({ error: "Введите промпт для генерации" }, { status: 400 })
    }

    const images = Array.from({ length: body.count && Number.isInteger(body.count) ? Math.max(1, Math.min(4, body.count)) : 1 }).map(
      (_, index) => ({
        id: `${index}`,
        url: buildPlaceholderImage(body.prompt, typeof body.style === "string" ? body.style : undefined),
      }),
    )

    recordAIRequest({
      userId: user.id,
      type: "image_generation",
      inputData: body,
      outputData: { images },
      status: "completed",
    })
    incrementUsage(user.id, 512)

    return NextResponse.json({ images })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
