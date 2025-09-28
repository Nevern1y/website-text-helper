import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { deleteFile, getFile } from "@/lib/server/database"

type Params = {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const user = requireAuth(request)
    const file = getFile(user.id, params.id)
    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 404 })
    }
    return NextResponse.json({ file })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const user = requireAuth(request)
    const success = deleteFile(user.id, params.id)
    if (!success) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
