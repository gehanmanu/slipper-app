'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus } from 'lucide-react'

interface ProductSize {
  size: string
  stock: number
}

interface ProductCardProps {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  sizes: ProductSize[]
  onAddToOrder: (productId: number, size: string, quantity: number, price: number) => void
}

export function ProductCard({ id, name, description, price, imageUrl, sizes, onAddToOrder }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(0)

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    setQuantity(1)
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToOrder = () => {
    if (selectedSize && quantity > 0) {
      onAddToOrder(id, selectedSize, quantity, price)
      setSelectedSize('')
      setQuantity(0)
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="p-4">
        <div className="relative w-full h-48 mb-2 rounded-md overflow-hidden">
          <Image 
            src={imageUrl || '/images/placeholder.jpg'} 
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-xl font-bold mb-2">${price.toFixed(2)}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {sizes.map((sizeOption) => (
            <Badge 
              key={sizeOption.size}
              variant={selectedSize === sizeOption.size ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleSizeSelect(sizeOption.size)}
            >
              {sizeOption.size}
            </Badge>
          ))}
        </div>
        
        {selectedSize && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="font-medium">
              Total: ${(price * quantity).toFixed(2)}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          disabled={!selectedSize || quantity === 0}
          onClick={handleAddToOrder}
        >
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  )
}
