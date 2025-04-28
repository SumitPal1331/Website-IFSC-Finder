import { NextResponse } from "next/server"

// This would be a real API endpoint in a production app
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ifsc = searchParams.get("ifsc")

  if (!ifsc) {
    return NextResponse.json({ error: "IFSC code is required" }, { status: 400 })
  }

  try {
    // In a real app, you would fetch from Razorpay API or your database
    // Example: const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`);

    // For demo, we'll return mock data
    const bankCode = ifsc.substring(0, 4)
    let bankName = "Unknown Bank"

    switch (bankCode) {
      case "SBIN":
        bankName = "State Bank of India"
        break
      case "HDFC":
        bankName = "HDFC Bank"
        break
      case "ICIC":
        bankName = "ICICI Bank"
        break
      case "UTIB":
        bankName = "Axis Bank"
        break
    }

    const mockData = {
      BANK: bankName,
      IFSC: ifsc,
      BRANCH: "Sample Branch",
      ADDRESS: "123, Main Street, Sample City, Sample State - 123456",
      CITY: "Sample City",
      STATE: "Sample State",
      CONTACT: "+91 1234567890",
      MICR: "123456789",
      UPI: true,
      RTGS: true,
      NEFT: true,
      IMPS: true,
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error fetching IFSC data:", error)
    return NextResponse.json({ error: "Failed to fetch bank details" }, { status: 500 })
  }
}
