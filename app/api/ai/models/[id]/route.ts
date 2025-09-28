import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { deleteAIModel } from "@/lib/server/database"

type Params = {
  params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const user = requireAuth(request)
    const success = deleteAIModel(user.id, params.id)
    if (!success) {
      return NextResponse.json({ error: "Модель не найдена" }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
