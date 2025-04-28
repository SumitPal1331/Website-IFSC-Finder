import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IFSCLookupForm from "@/components/ifsc-lookup-form"
import BankDetailsForm from "@/components/bank-details-form"
import { ArrowRight, Building2, MapPin } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background/50 to-background dark:from-background dark:to-background/80">
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Building2 className="h-8 w-8 text-emerald-600 dark:text-emerald-500" />
                <span>Indian Bank Finder</span>
              </h1>
              <p className="text-muted-foreground mt-2">Find IFSC codes or bank details with ease</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-md overflow-hidden border border-border">
          <div className="p-6">
            <Tabs defaultValue="ifsc" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="ifsc">Find IFSC Code</TabsTrigger>
                <TabsTrigger value="details">Get Bank Details</TabsTrigger>
              </TabsList>

              <TabsContent value="ifsc" className="space-y-4 animate-in fade-in-50 duration-300">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">Find IFSC Code by Bank Details</h2>
                  <p className="text-muted-foreground">Enter the bank name, state, and branch to find the IFSC code</p>
                </div>
                <IFSCLookupForm />
              </TabsContent>

              <TabsContent value="details" className="space-y-4 animate-in fade-in-50 duration-300">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">Get Bank Details by IFSC Code</h2>
                  <p className="text-muted-foreground">Enter the IFSC code to get complete bank details</p>
                </div>
                <BankDetailsForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground mb-4">What is an IFSC Code?</h2>
          <div className="bg-card rounded-xl shadow-md p-6 border border-border">
            <p className="text-foreground mb-4">
              IFSC (Indian Financial System Code) is an 11-character code assigned by the Reserve Bank of India to
              identify bank branches in India uniquely.
            </p>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Format: AAAA0BBBBBB</h3>
                <p className="text-muted-foreground text-sm">
                  First 4 characters: Bank code, 5th character: 0, Last 6 characters: Branch code
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
              <span className="font-medium">Learn more about IFSC codes</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted/50 dark:bg-muted/20 text-muted-foreground py-8 mt-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                Indian Bank Finder
              </h2>
              <p className="text-sm mt-1">Find IFSC codes and bank details instantly</p>
            </div>
            <div className="text-sm">
              <p>© {new Date().getFullYear()} Indian Bank Finder. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
