'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { CalendarIcon, MapPinIcon, ShoppingBagIcon } from 'lucide-react'

interface SalesData {
  date: string
  revenue: number
}

interface LocationData {
  location: string
  revenue: number
  orders: number
}

interface ProductData {
  name: string
  quantity: number
  revenue: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export function SalesAnalytics() {
  const [timeRange, setTimeRange] = useState<string>('weekly')
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [locationData, setLocationData] = useState<LocationData[]>([])
  const [productData, setProductData] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch analytics data - in a real app, this would be an API call
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true)
        
        // Simulated daily sales data
        const dailySalesData: SalesData[] = [
          { date: 'Apr 1', revenue: 809.58 },
          { date: 'Apr 2', revenue: 542.75 },
          { date: 'Apr 3', revenue: 698.32 },
          { date: 'Apr 4', revenue: 412.90 },
          { date: 'Apr 5', revenue: 367.45 },
          { date: 'Apr 6', revenue: 289.80 },
          { date: 'Apr 7', revenue: 456.20 }
        ]
        
        // Simulated weekly sales data
        const weeklySalesData: SalesData[] = [
          { date: 'Week 1', revenue: 3577.00 },
          { date: 'Week 2', revenue: 4125.50 },
          { date: 'Week 3', revenue: 3890.75 },
          { date: 'Week 4', revenue: 4567.20 }
        ]
        
        // Simulated monthly sales data
        const monthlySalesData: SalesData[] = [
          { date: 'Jan', revenue: 15420.30 },
          { date: 'Feb', revenue: 14250.80 },
          { date: 'Mar', revenue: 16780.45 },
          { date: 'Apr', revenue: 12160.45 }
        ]
        
        // Simulated location data
        const locationSalesData: LocationData[] = [
          { location: 'Colombo', revenue: 25680.50, orders: 145 },
          { location: 'Galle', revenue: 18450.75, orders: 98 },
          { location: 'Kandy', revenue: 15780.30, orders: 87 },
          { location: 'Jaffna', revenue: 9870.45, orders: 54 },
          { location: 'Negombo', revenue: 7650.20, orders: 42 }
        ]
        
        // Simulated product data
        const productSalesData: ProductData[] = [
          { name: 'Classic Flip Flops', quantity: 245, revenue: 3917.55 },
          { name: 'Luxury Leather Slippers', quantity: 180, revenue: 5398.20 },
          { name: 'Beach Sandals', quantity: 210, revenue: 4197.90 },
          { name: 'Cozy Home Slippers', quantity: 195, revenue: 4873.05 }
        ]
        
        // Set data based on selected time range
        switch (timeRange) {
          case 'daily':
            setSalesData(dailySalesData)
            break
          case 'weekly':
            setSalesData(weeklySalesData)
            break
          case 'monthly':
            setSalesData(monthlySalesData)
            break
          default:
            setSalesData(weeklySalesData)
        }
        
        setLocationData(locationSalesData)
        setProductData(productSalesData)
      } catch (error) {
        console.error('Error fetching analytics data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchAnalyticsData()
  }, [timeRange])

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = locationData.reduce((sum, item) => sum + item.orders, 0)
  const totalProducts = productData.reduce((sum, item) => sum + item.quantity, 0)

  if (isLoading) {
    return <div className="text-center py-8">Loading analytics...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Sales Analytics</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily (Last 7 days)</SelectItem>
            <SelectItem value="weekly">Weekly (Last 4 weeks)</SelectItem>
            <SelectItem value="monthly">Monthly (Last 4 months)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {timeRange === 'daily' ? 'Last 7 days' : timeRange === 'weekly' ? 'Last 4 weeks' : 'Last 4 months'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Across all locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
            <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">All product types</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="location">Sales by Location</TabsTrigger>
          <TabsTrigger value="products">Top Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>
                {timeRange === 'daily' ? 'Daily revenue for the last 7 days' : 
                 timeRange === 'weekly' ? 'Weekly revenue for the last 4 weeks' : 
                 'Monthly revenue for the last 4 months'}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Location</CardTitle>
              <CardDescription>
                Revenue distribution across different locations
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                    >
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">Location</th>
                      <th className="p-2 text-left font-medium">Orders</th>
                      <th className="p-2 text-left font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locationData.map((location, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{location.location}</td>
                        <td className="p-2">{location.orders}</td>
                        <td className="p-2">${location.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>
                Products ranked by quantity sold
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="quantity" fill="#82ca9d" name="Quantity Sold" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product Sales Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">Product</th>
                      <th className="p-2 text-left font-medium">Quantity</th>
                      <th className="p-2 text-left font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productData.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.quantity}</td>
                        <td className="p-2">${product.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
