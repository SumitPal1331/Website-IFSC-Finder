import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background/50 to-background dark:from-background dark:to-background/80 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full">
            <Building2 className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>

        <p className="text-muted-foreground">Oops! 😕 The bank branch you're looking for doesn't seem to exist.</p>

        <Button asChild className="mt-4">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
