import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/server/auth"
import { listAIModels, upsertAIModel } from "@/lib/server/database"

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const models = listAIModels(user.id)
    return NextResponse.json({ models })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    const body = await request.json().catch(() => undefined)
    if (!body || typeof body.provider !== "string" || typeof body.modelName !== "string") {
      return NextResponse.json({ error: "Укажите провайдера и название модели" }, { status: 400 })
    }

    const model = upsertAIModel(user.id, {
      provider: body.provider,
      modelName: body.modelName,
      apiKey: typeof body.apiKey === "string" ? body.apiKey : undefined,
      endpointUrl: typeof body.endpointUrl === "string" ? body.endpointUrl : undefined,
      parameters: typeof body.parameters === "object" && body.parameters ? body.parameters : {},
      isActive: typeof body.isActive === "boolean" ? body.isActive : true,
    })

    return NextResponse.json({ model }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Требуется авторизация" }, { status: 401 })
  }
}
