import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { saveFile } from "@/lib/server/database"

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body || typeof body.filename !== "string" || typeof body.mimeType !== "string" || typeof body.content !== "string") {
      return NextResponse.json({ error: "Передайте имя файла, тип и содержимое" }, { status: 400 })
    }

    const file = saveFile({
      userId: user.id,
      filename: body.filename,
      originalName: body.originalName && typeof body.originalName === "string" ? body.originalName : body.filename,
      mimeType: body.mimeType,
      sizeBytes: Buffer.from(body.content, "base64").byteLength,
      storagePath: `memory://${body.filename}`,
    })

    return NextResponse.json({ file }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
