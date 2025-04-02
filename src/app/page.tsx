'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ShoppingBag, User, ArrowRight } from 'lucide-react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-muted">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Slipper Distribution</h1>
        <p className="text-muted-foreground mb-8">
          Digital order management system for slipper distribution sales representatives
        </p>

        <div className="grid gap-4">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Sales Interface</h2>
              <p className="text-muted-foreground mb-4">
                Browse products, collect orders from shops, and submit them instantly
              </p>
              <Link href="/sales" className="w-full">
                <Button className="w-full">
                  Enter Sales Portal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
              <p className="text-muted-foreground mb-4">
                Manage products, review orders, and analyze sales performance
              </p>
              <Link href="/admin" className="w-full">
                <Button variant="outline" className="w-full">
                  Admin Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
