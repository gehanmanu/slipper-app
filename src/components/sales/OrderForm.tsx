'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ShoppingBag, MapPin, X } from 'lucide-react'

interface OrderItem {
  productId: number
  productName: string
  size: string
  quantity: number
  price: number
  subtotal: number
}

interface OrderFormProps {
  shopId: number
  shopName: string
  orderItems: OrderItem[]
  onRemoveItem: (index: number) => void
  onSubmitOrder: (orderData: any) => Promise<void>
  onCancelOrder: () => void
}

export function OrderForm({ 
  shopId, 
  shopName, 
  orderItems, 
  onRemoveItem, 
  onSubmitOrder, 
  onCancelOrder 
}: OrderFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Cheque'>('Cash')
  const [notes, setNotes] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0)

  useEffect(() => {
    // Get current location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude},${longitude}`)
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocation('Location unavailable')
        }
      )
    } else {
      setLocation('Geolocation not supported')
    }
  }, [])

  const handleSubmit = async () => {
    if (orderItems.length === 0) {
      setError('Cannot submit an empty order')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const orderData = {
        shopId,
        paymentMethod,
        notes,
        location,
        totalAmount,
        orderItems: orderItems.map(item => ({
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal
        }))
      }

      await onSubmitOrder(orderData)
    } catch (err) {
      setError('Failed to submit order. Please try again.')
      console.error('Order submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <ShoppingBag className="mr-2 h-5 w-5" />
          Order for {shopName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {location || 'Getting location...'}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <Label className="text-base font-medium">Order Items</Label>
          {orderItems.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No items added to order yet
            </div>
          ) : (
            <ScrollArea className="h-[200px] mt-2 border rounded-md p-2">
              {orderItems.map((item, index) => (
                <div key={`${item.productId}-${item.size}-${index}`} className="flex justify-between items-center py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.size} | Qty: {item.quantity} | ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="font-medium mr-3">${item.subtotal.toFixed(2)}</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onRemoveItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
          <div className="flex justify-between items-center mt-4 font-bold text-lg">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="payment-method">Payment Method</Label>
            <RadioGroup 
              id="payment-method" 
              value={paymentMethod} 
              onValueChange={(value) => setPaymentMethod(value as 'Cash' | 'Cheque')}
              className="flex space-x-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Cash" id="cash" />
                <Label htmlFor="cash">Cash</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Cheque" id="cheque" />
                <Label htmlFor="cheque">Cheque</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Add any special instructions or notes here" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button 
              variant="default" 
              className="flex-1"
              disabled={isSubmitting || orderItems.length === 0}
              onClick={handleSubmit}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Order'}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onCancelOrder}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
