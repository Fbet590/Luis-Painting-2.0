import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log("[v0] Received form data:", body)
    
    const webhookResponse = await fetch(
      "https://services.leadconnectorhq.com/hooks/sTrbD95zmguyI0X5YZS4/webhook-trigger/z36Jvv5YFs4a7jAIwBSm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
    
    console.log("[v0] Webhook response status:", webhookResponse.status)
    
    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text()
      console.error("[v0] Webhook error response:", errorText)
      return NextResponse.json(
        { success: false, error: "Webhook request failed" },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
