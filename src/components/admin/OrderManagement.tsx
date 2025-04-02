'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Eye, Trash2, Filter } from 'lucide-react'

interface OrderItem {
  productId: number
  productName: string
  size: string
  quantity: number
  price: number
  subtotal: number
}

interface Order {
  id: number
  shopId: number
  shopName: string
  orderDate: string
  paymentMethod: 'Cash' | 'Cheque'
  paymentStatus: 'Pending' | 'Completed'
  orderStatus: 'New' | 'Processing' | 'Completed' | 'Cancelled'
  totalAmount: number
  location: string
  items: OrderItem[]
  notes?: string
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Fetch orders - in a real app, this would be an API call
    const fetchOrders = async () => {
      try {
        setIsLoading(true)
        
        // Simulated orders data
        const ordersData: Order[] = [
          {
            id: 1001,
            shopId: 1,
            shopName: 'Footwear Paradise',
            orderDate: '2025-04-01T10:30:00Z',
            paymentMethod: 'Cash',
            paymentStatus: 'Completed',
            orderStatus: 'Completed',
            totalAmount: 159.92,
            location: '6.9271,79.8612',
            items: [
              {
                productId: 1,
                productName: 'Classic Flip Flops',
                size: 'M',
                quantity: 5,
                price: 15.99,
                subtotal: 79.95
              },
              {
                productId: 2,
                productName: 'Luxury Leather Slippers',
                size: 'L',
                quantity: 2,
                price: 29.99,
                subtotal: 59.98
              },
              {
                productId: 3,
                productName: 'Beach Sandals',
                size: 'S',
                quantity: 1,
                price: 19.99,
                subtotal: 19.99
              }
            ],
            notes: 'Urgent order for weekend sale'
          },
          {
            id: 1002,
            shopId: 2,
            shopName: 'Slipper World',
            orderDate: '2025-04-01T14:15:00Z',
            paymentMethod: 'Cheque',
            paymentStatus: 'Pending',
            orderStatus: 'Processing',
            totalAmount: 249.90,
            location: '6.0535,80.2210',
            items: [
              {
                productId: 4,
                productName: 'Cozy Home Slippers',
                size: 'M',
                quantity: 10,
                price: 24.99,
                subtotal: 249.90
              }
            ]
          },
          {
            id: 1003,
            shopId: 3,
            shopName: 'Comfort Feet',
            orderDate: '2025-03-30T09:45:00Z',
            paymentMethod: 'Cash',
            paymentStatus: 'Completed',
            orderStatus: 'Completed',
            totalAmount: 319.80,
            location: '7.2906,80.6337',
            items: [
              {
                productId: 2,
                productName: 'Luxury Leather Slippers',
                size: 'XL',
                quantity: 6,
                price: 29.99,
                subtotal: 179.94
              },
              {
                productId: 4,
                productName: 'Cozy Home Slippers',
                size: 'L',
                quantity: 4,
                price: 24.99,
                subtotal: 99.96
              },
              {
                productId: 3,
                productName: 'Beach Sandals',
                size: 'M',
                quantity: 2,
                price: 19.99,
                subtotal: 39.98
              }
            ]
          },
          {
            id: 1004,
            shopId: 1,
            shopName: 'Footwear Paradise',
            orderDate: '2025-03-29T16:20:00Z',
            paymentMethod: 'Cheque',
            paymentStatus: 'Pending',
            orderStatus: 'New',
            totalAmount: 79.96,
            location: '6.9271,79.8612',
            items: [
              {
                productId: 1,
                productName: 'Classic Flip Flops',
                size: 'S',
                quantity: 5,
                price: 15.99,
                subtotal: 79.95
              }
            ]
          }
        ]
        
        setOrders(ordersData)
        setFilteredOrders(ordersData)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchOrders()
  }, [])

  useEffect(() => {
    // Apply filters
    let result = [...orders]
    
    if (statusFilter !== 'all') {
      result = result.filter(order => order.orderStatus === statusFilter)
    }
    
    if (paymentFilter !== 'all') {
      result = result.filter(order => order.paymentStatus === paymentFilter)
    }
    
    setFilteredOrders(result)
  }, [orders, statusFilter, paymentFilter])

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const handleDeleteOrder = (orderId: number) => {
    if (confirm('Are you sure you want to delete this order?')) {
      // In a real app, this would be an API call
      setOrders(orders.filter(order => order.id !== orderId))
    }
  }

  const handleStatusChange = (orderId: number, status: 'New' | 'Processing' | 'Completed' | 'Cancelled') => {
    // In a real app, this would be an API call
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, orderStatus: status } : order
    )
    setOrders(updatedOrders)
  }

  const handlePaymentStatusChange = (orderId: number, checked: boolean) => {
    // In a real app, this would be an API call
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, paymentStatus: checked ? 'Completed' : 'Pending' } : order
    )
    setOrders(updatedOrders)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Orders ({filteredOrders.length})</h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm mr-2">Status:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2">Payment:</span>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No orders found matching your filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Shop</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.shopName}</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Select 
                      value={order.orderStatus} 
                      onValueChange={(value) => handleStatusChange(order.id, value as any)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue>
                          <Badge 
                            className={
                              order.orderStatus === 'New' ? 'bg-blue-100 text-blue-800' :
                              order.orderStatus === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              order.orderStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {order.orderStatus}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`payment-${order.id}`} 
                        checked={order.paymentStatus === 'Completed'}
                        onCheckedChange={(checked) => handlePaymentStatusChange(order.id, checked as boolean)}
                      />
                      <label 
                        htmlFor={`payment-${order.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {order.paymentMethod}
                      </label>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteOrder(order.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Placed on {selectedOrder && formatDate(selectedOrder.orderDate)}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-1">Shop Information</h3>
                  <p>{selectedOrder.shopName}</p>
                  <p className="text-sm text-muted-foreground">
                    Location: {selectedOrder.location}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Payment Details</h3>
                  <p>Method: {selectedOrder.paymentMethod}</p>
                  <p>Status: {selectedOrder.paymentStatus}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Order Items</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.productName}</TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${item.subtotal.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-medium">Total</TableCell>
                        <TableCell className="text-right font-bold">${selectedOrder.totalAmount.toFixed(2)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {selectedOrder.notes && (
                <div>
                  <h3 className="font-medium mb-1">Notes</h3>
                  <p className="text-sm">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
