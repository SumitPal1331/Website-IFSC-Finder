import { NextResponse } from "next/server"

// This would be a real API endpoint in a production app
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const bank = searchParams.get("bank")
  const state = searchParams.get("state")
  const branch = searchParams.get("branch")

  if (!bank || !state || !branch) {
    return NextResponse.json({ error: "Bank, state, and branch are required" }, { status: 400 })
  }

  try {
    // In a real app, you would fetch from your database or an external API

    // For demo, we'll return mock data
    const bankCode = bank.substring(0, 4).toUpperCase()
    const mockData = [
      {
        bank: bank,
        branch: branch,
        state: state,
        ifsc: `${bankCode}0${Math.floor(Math.random() * 900000) + 100000}`,
        address: `${Math.floor(Math.random() * 100) + 1}, Main Street, ${branch}, ${state}`,
      },
    ]

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching bank data:", error)
    return NextResponse.json({ error: "Failed to fetch IFSC codes" }, { status: 500 })
  }
}
