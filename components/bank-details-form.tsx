"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Search, AlertCircle, CheckCircle2, Copy, CheckCheck } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function BankDetailsForm() {
  const [ifscCode, setIfscCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ifscCode) {
      setError("Please enter an IFSC code")
      setSuccess(false)
      return
    }

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      setError("Invalid IFSC code format. It should be like SBIN0123456")
      setSuccess(false)
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      // In a real app, this would be an API call to your backend or directly to Razorpay API
      // For demo purposes, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock result
      const bankCode = ifscCode.substring(0, 4)
      let bankName = ""

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
        default:
          bankName = "Unknown Bank"
      }

      setResult({
        bank: bankName,
        ifsc: ifscCode,
        branch: "Sample Branch",
        address: "123, Main Street, Sample City, Sample State - 123456",
        city: "Sample City",
        state: "Sample State",
        contact: "+91 1234567890",
        micr: "123456789",
        upi: true,
        rtgs: true,
        neft: true,
        imps: true,
      })
      setSuccess(true)

      // Scroll to results after a short delay
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } catch (err) {
      setError("Failed to fetch bank details. Please try again.")
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="ifsc">IFSC Code</Label>
          <Input
            id="ifsc"
            placeholder="Enter IFSC code (e.g., SBIN0123456)"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            maxLength={11}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">
            IFSC code is an 11-character code with first 4 characters representing the bank, 5th character is 0, and
            last 6 characters representing the branch
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="animate-in slide-in-from-top-5 duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Get Bank Details
            </>
          )}
        </Button>
      </form>

      {result && (
        <div className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-5 duration-500" ref={resultRef}>
          {success && (
            <Alert className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Bank details found successfully!</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Bank Details</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  View Full Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Bank Details</DialogTitle>
                  <DialogDescription>
                    Complete information for {result.bank} - {result.branch}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Bank</Label>
                    <div className="col-span-3">{result.bank}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">IFSC</Label>
                    <div className="col-span-3 font-mono">{result.ifsc}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Branch</Label>
                    <div className="col-span-3">{result.branch}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Address</Label>
                    <div className="col-span-3">{result.address}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">City</Label>
                    <div className="col-span-3">{result.city}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">State</Label>
                    <div className="col-span-3">{result.state}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Contact</Label>
                    <div className="col-span-3">{result.contact}</div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">MICR</Label>
                    <div className="col-span-3">{result.micr}</div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="p-4 border border-border hover:shadow-md transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Bank Name</p>
                <p className="font-medium text-foreground">{result.bank}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">IFSC Code</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono font-medium text-emerald-600 dark:text-emerald-500">{result.ifsc}</p>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => copyToClipboard(result.ifsc)}
                  >
                    {copied ? <CheckCheck className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Branch</p>
                <p className="font-medium text-foreground">{result.branch}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">MICR Code</p>
                <p className="font-medium text-foreground font-mono">{result.micr}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium text-foreground">{result.address}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium text-foreground">{result.city}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">State</p>
                <p className="font-medium text-foreground">{result.state}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="font-medium text-foreground">{result.contact}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Services</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {result.upi && (
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100"
                    >
                      UPI
                    </Badge>
                  )}
                  {result.rtgs && (
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100"
                    >
                      RTGS
                    </Badge>
                  )}
                  {result.neft && (
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100"
                    >
                      NEFT
                    </Badge>
                  )}
                  {result.imps && (
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100"
                    >
                      IMPS
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
