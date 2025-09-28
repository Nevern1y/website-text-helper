import { NextResponse } from "next/server"
import { clearLoginSession } from "@/lib/server/auth"

export async function POST() {
  clearLoginSession()
  return NextResponse.json({ success: true })
}
