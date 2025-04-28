"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Search, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Mock data for demonstration
const BANKS = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Kotak Mahindra Bank",
  "IndusInd Bank",
  "Yes Bank",
  "Federal Bank",
  "IDBI Bank",
  "RBL Bank",
]

// Mock data structure for states and branches
const BANK_DATA = {
  "State Bank of India": {
    Maharashtra: ["Mumbai Main", "Pune Camp", "Nagpur Civil Lines", "Thane", "Nashik"],
    Delhi: ["Connaught Place", "Karol Bagh", "Dwarka", "Lajpat Nagar", "Rohini"],
    Karnataka: ["Bangalore MG Road", "Mysore Main", "Hubli", "Mangalore", "Belgaum"],
    "Tamil Nadu": ["Chennai Mount Road", "Coimbatore RS Puram", "Madurai", "Salem", "Trichy"],
  },
  "HDFC Bank": {
    Maharashtra: ["Mumbai Fort", "Pune FC Road", "Nashik College Road", "Aurangabad", "Kolhapur"],
    Delhi: ["Nehru Place", "Rajouri Garden", "Vasant Kunj", "Pitampura", "Greater Kailash"],
    Karnataka: ["Bangalore Indiranagar", "Mysore Sayyaji Rao Road", "Mangalore City", "Udupi", "Shimoga"],
    Gujarat: ["Ahmedabad CG Road", "Vadodara Alkapuri", "Surat Ghod Dod Road", "Rajkot", "Jamnagar"],
  },
  "ICICI Bank": {
    Maharashtra: ["Mumbai Bandra", "Pune Aundh", "Nagpur Dharampeth", "Navi Mumbai", "Solapur"],
    Delhi: ["Chandni Chowk", "South Extension", "Janakpuri", "Preet Vihar", "Model Town"],
    Telangana: ["Hyderabad Banjara Hills", "Secunderabad", "Warangal", "Karimnagar", "Nizamabad"],
    "West Bengal": ["Kolkata Park Street", "Howrah", "Siliguri", "Durgapur", "Asansol"],
  },
  "Axis Bank": {
    Maharashtra: ["Mumbai Worli", "Pune Shivaji Nagar", "Nagpur Sadar", "Amravati", "Jalgaon"],
    Karnataka: ["Bangalore Koramangala", "Mangalore Balmatta", "Hubli Deshpande Nagar", "Dharwad", "Gulbarga"],
    Gujarat: ["Ahmedabad Navrangpura", "Surat Adajan", "Vadodara Race Course", "Bhavnagar", "Anand"],
    Kerala: ["Kochi Marine Drive", "Trivandrum MG Road", "Calicut", "Thrissur", "Kottayam"],
  },
}

export default function IFSCLookupForm() {
  const isMobile = useMobile()
  const [bank, setBank] = useState("")
  const [state, setState] = useState("")
  const [branch, setBranch] = useState("")
  const [branchInput, setBranchInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [openBranchSuggestions, setOpenBranchSuggestions] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  // Get available states based on selected bank
  const availableStates = bank ? Object.keys(BANK_DATA[bank as keyof typeof BANK_DATA] || {}) : []

  // Get available branches based on selected bank and state
  const availableBranches =
    bank && state
      ? BANK_DATA[bank as keyof typeof BANK_DATA]?.[state as keyof (typeof BANK_DATA)[keyof typeof BANK_DATA]] || []
      : []

  // Filter branches based on input
  const filteredBranches = availableBranches.filter((b) => b.toLowerCase().includes(branchInput.toLowerCase()))

  // Reset dependent fields when parent selection changes
  useEffect(() => {
    setState("")
    setBranch("")
    setBranchInput("")
  }, [bank])

  useEffect(() => {
    setBranch("")
    setBranchInput("")
  }, [state])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!bank || !state || !branch) {
      setError("Please complete all selections")
      setSuccess(false)
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock results
      setResults([
        {
          bank: bank,
          branch: branch,
          state: state,
          ifsc: `${bank.substring(0, 4).toUpperCase()}0${Math.floor(Math.random() * 900000) + 100000}`,
          address: `${Math.floor(Math.random() * 100) + 1}, Main Street, ${branch}, ${state}`,
        },
      ])
      setSuccess(true)

      // Scroll to results after a short delay
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } catch (err) {
      setError("Failed to fetch IFSC codes. Please try again.")
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Select Bank */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              1
            </div>
            <Label htmlFor="bank" className="font-medium">
              Select Bank
            </Label>
          </div>
          <Select value={bank} onValueChange={setBank}>
            <SelectTrigger id="bank">
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              {BANKS.map((bankName) => (
                <SelectItem key={bankName} value={bankName}>
                  {bankName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Step 2: Select State */}
        <div className={cn("space-y-2 transition-all duration-300", !bank ? "opacity-50" : "opacity-100")}>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              2
            </div>
            <Label htmlFor="state" className="font-medium">
              Select State
            </Label>
          </div>
          <Select value={state} onValueChange={setState} disabled={!bank}>
            <SelectTrigger id="state">
              <SelectValue placeholder={bank ? "Select state" : "First select a bank"} />
            </SelectTrigger>
            <SelectContent>
              {availableStates.length > 0 ? (
                availableStates.map((stateName) => (
                  <SelectItem key={stateName} value={stateName}>
                    {stateName}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>
                  No states available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          {bank && availableStates.length === 0 && (
            <p className="text-xs text-amber-600 dark:text-amber-400">No states available for this bank</p>
          )}
        </div>

        {/* Step 3: Select Branch */}
        <div className={cn("space-y-2 transition-all duration-300", !bank || !state ? "opacity-50" : "opacity-100")}>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
              3
            </div>
            <Label htmlFor="branch" className="font-medium">
              Select Branch
            </Label>
          </div>
          <Popover
            open={openBranchSuggestions && !!bank && !!state}
            onOpenChange={(open) => bank && state && setOpenBranchSuggestions(open)}
          >
            <PopoverTrigger asChild>
              <Input
                id="branch"
                placeholder={bank && state ? "Enter branch name" : "First select bank and state"}
                value={branchInput}
                onChange={(e) => {
                  setBranchInput(e.target.value)
                  if (e.target.value) {
                    setOpenBranchSuggestions(true)
                  }
                }}
                className="w-full"
                disabled={!bank || !state}
                onClick={() => bank && state && setOpenBranchSuggestions(true)}
              />
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Command>
                <CommandInput placeholder="Search branch..." />
                <CommandList>
                  <CommandEmpty>No branch found in {state}</CommandEmpty>
                  <CommandGroup>
                    {filteredBranches.map((branchName) => (
                      <CommandItem
                        key={branchName}
                        onSelect={() => {
                          setBranch(branchName)
                          setBranchInput(branchName)
                          setOpenBranchSuggestions(false)
                        }}
                      >
                        {branchName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {bank && state && availableBranches.length === 0 && (
            <p className="text-xs text-amber-600 dark:text-amber-400">No branches available for this bank in {state}</p>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="animate-in slide-in-from-top-5 duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full mt-4" disabled={loading || !bank || !state || !branch}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Find IFSC Code
            </>
          )}
        </Button>
      </form>

      {results.length > 0 && (
        <div className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-5 duration-500" ref={resultRef}>
          {success && (
            <Alert className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>IFSC code found successfully!</AlertDescription>
            </Alert>
          )}

          <h3 className="font-medium text-foreground">Search Results</h3>
          {results.map((result, index) => (
            <Card key={index} className="p-4 border border-border hover:shadow-md transition-shadow duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Bank</p>
                  <p className="font-medium text-foreground">{result.bank}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <p className="font-medium text-foreground">{result.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium text-foreground">{result.state}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IFSC Code</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-emerald-600 dark:text-emerald-500">{result.ifsc}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => {
                        navigator.clipboard.writeText(result.ifsc)
                        // You could add a toast notification here
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                {!isMobile && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium text-foreground">{result.address}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
