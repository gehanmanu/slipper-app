'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/sales/ProductCard'
import { OrderForm } from '@/components/sales/OrderForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingBag, Store, Search } from 'lucide-react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  sizes: { size: string; stock: number }[]
}

interface Shop {
  id: number
  name: string
  address: string
  contactPerson: string
}

interface OrderItem {
  productId: number
  productName: string
  size: string
  quantity: number
  price: number
  subtotal: number
}

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [shops, setShops] = useState<Shop[]>([])
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('products')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // Fetch products and shops on component mount
  useEffect(() => {
    // Simulated data fetch - in a real app, this would be an API call
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Simulated products data
        const productsData: Product[] = [
          {
            id: 1,
            name: 'Classic Flip Flops',
            description: 'Comfortable everyday slippers',
            price: 15.99,
            imageUrl: '/images/classic-flip-flops.jpg',
            sizes: [
              { size: 'S', stock: 50 },
              { size: 'M', stock: 100 },
              { size: 'L', stock: 75 },
              { size: 'XL', stock: 25 }
            ]
          },
          {
            id: 2,
            name: 'Luxury Leather Slippers',
            description: 'Premium leather house slippers',
            price: 29.99,
            imageUrl: '/images/luxury-leather.jpg',
            sizes: [
              { size: 'S', stock: 30 },
              { size: 'M', stock: 60 },
              { size: 'L', stock: 40 },
              { size: 'XL', stock: 20 }
            ]
          },
          {
            id: 3,
            name: 'Beach Sandals',
            description: 'Waterproof beach sandals',
            price: 19.99,
            imageUrl: '/images/beach-sandals.jpg',
            sizes: [
              { size: 'S', stock: 40 },
              { size: 'M', stock: 80 },
              { size: 'L', stock: 60 },
              { size: 'XL', stock: 30 }
            ]
          },
          {
            id: 4,
            name: 'Cozy Home Slippers',
            description: 'Warm and soft indoor slippers',
            price: 24.99,
            imageUrl: '/images/cozy-home.jpg',
            sizes: [
              { size: 'S', stock: 35 },
              { size: 'M', stock: 70 },
              { size: 'L', stock: 50 },
              { size: 'XL', stock: 25 }
            ]
          }
        ]
        
        // Simulated shops data
        const shopsData: Shop[] = [
          {
            id: 1,
            name: 'Footwear Paradise',
            address: '123 Main St, Colombo',
            contactPerson: 'John Smith'
          },
          {
            id: 2,
            name: 'Slipper World',
            address: '456 Beach Rd, Galle',
            contactPerson: 'Sarah Johnson'
          },
          {
            id: 3,
            name: 'Comfort Feet',
            address: '789 Hill St, Kandy',
            contactPerson: 'David Lee'
          }
        ]
        
        setProducts(productsData)
        setShops(shopsData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  const handleAddToOrder = (productId: number, size: string, quantity: number, price: number) => {
    const product = products.find(p => p.id === productId)
    if (!product) return
    
    const newItem: OrderItem = {
      productId,
      productName: product.name,
      size,
      quantity,
      price,
      subtotal: price * quantity
    }
    
    setOrderItems(prev => [...prev, newItem])
    setActiveTab('order')
  }

  const handleRemoveItem = (index: number) => {
    setOrderItems(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmitOrder = async (orderData: any) => {
    if (!selectedShop) {
      setError('Please select a shop before submitting the order')
      return
    }
    
    try {
      // In a real app, this would be an API call to submit the order
      console.log('Submitting order:', { ...orderData, shopName: selectedShop.name })
      
      // Simulate successful submission
      alert('Order submitted successfully!')
      
      // Reset order state
      setOrderItems([])
      setSelectedShop(null)
      setActiveTab('products')
    } catch (err) {
      console.error('Error submitting order:', err)
      throw new Error('Failed to submit order')
    }
  }

  const handleCancelOrder = () => {
    if (confirm('Are you sure you want to cancel this order? All items will be removed.')) {
      setOrderItems([])
      setActiveTab('products')
    }
  }

  const handleShopSelect = (shopId: string) => {
    const shop = shops.find(s => s.id === parseInt(shopId))
    setSelectedShop(shop || null)
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Slipper Distribution</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Label htmlFor="shop-select">Select Shop</Label>
            <Select onValueChange={handleShopSelect} value={selectedShop?.id.toString()}>
              <SelectTrigger id="shop-select" className="w-full">
                <SelectValue placeholder="Select a shop" />
              </SelectTrigger>
              <SelectContent>
                {shops.map(shop => (
                  <SelectItem key={shop.id} value={shop.id.toString()}>
                    {shop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="search">Search Products</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                type="text"
                placeholder="Search by name or description"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {selectedShop && (
          <div className="bg-muted p-3 rounded-md flex items-center">
            <Store className="h-5 w-5 mr-2" />
            <div>
              <p className="font-medium">{selectedShop.name}</p>
              <p className="text-sm text-muted-foreground">{selectedShop.address}</p>
            </div>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products" className="flex items-center">
            <Store className="mr-2 h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="order" className="flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Order
            {orderItems.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {orderItems.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {!selectedShop && (
            <div className="bg-yellow-50 text-yellow-700 p-3 rounded-md mb-4">
              Please select a shop to place an order
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  sizes={product.sizes}
                  onAddToOrder={handleAddToOrder}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No products found matching your search
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="order" className="mt-4">
          {!selectedShop ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Please select a shop to place an order</p>
              <Button onClick={() => setActiveTab('products')}>
                Go to Products
              </Button>
            </div>
          ) : (
            <OrderForm
              shopId={selectedShop.id}
              shopName={selectedShop.name}
              orderItems={orderItems}
              onRemoveItem={handleRemoveItem}
              onSubmitOrder={handleSubmitOrder}
              onCancelOrder={handleCancelOrder}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
