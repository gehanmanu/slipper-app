'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

interface ProductSize {
  size: string
  stock: number
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  sizes: ProductSize[]
}

export function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    sizes: [{ size: 'S', stock: 0 }, { size: 'M', stock: 0 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 0 }]
  })

  useEffect(() => {
    // Fetch products - in a real app, this would be an API call
    const fetchProducts = async () => {
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
        
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  const handleAddProduct = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      sizes: [{ size: 'S', stock: 0 }, { size: 'M', stock: 0 }, { size: 'L', stock: 0 }, { size: 'XL', stock: 0 }]
    })
    setIsDialogOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
      sizes: [...product.sizes]
    })
    setIsDialogOpen(true)
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      // In a real app, this would be an API call
      setProducts(products.filter(product => product.id !== productId))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSizeStockChange = (index: number, value: string) => {
    const newSizes = [...formData.sizes]
    newSizes[index].stock = parseInt(value) || 0
    setFormData(prev => ({ ...prev, sizes: newSizes }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.price) {
      alert('Please fill in all required fields')
      return
    }
    
    // In a real app, this would be an API call
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(product => 
        product.id === editingProduct.id 
          ? { 
              ...product, 
              name: formData.name,
              description: formData.description,
              price: parseFloat(formData.price),
              imageUrl: formData.imageUrl,
              sizes: formData.sizes
            } 
          : product
      )
      setProducts(updatedProducts)
    } else {
      // Add new product
      const newProduct: Product = {
        id: Math.max(0, ...products.map(p => p.id)) + 1,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl || '/images/placeholder.jpg',
        sizes: formData.sizes
      }
      setProducts([...products, newProduct])
    }
    
    setIsDialogOpen(false)
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Products ({products.length})</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">No products found</p>
            <Button onClick={handleAddProduct}>Add Your First Product</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sizes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {product.name}
                    <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                      {product.description}
                    </p>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((size) => (
                        <Badge key={size.size} variant="outline" className="text-xs">
                          {size.size}: {size.stock}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {editingProduct 
                ? 'Update the product details below.' 
                : 'Fill in the details for the new product.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="/images/product.jpg"
                />
              </div>
              <div className="grid gap-2">
                <Label>Sizes & Stock</Label>
                <div className="grid grid-cols-2 gap-3">
                  {formData.sizes.map((size, index) => (
                    <div key={size.size} className="flex items-center gap-2">
                      <Label className="w-8">{size.size}</Label>
                      <Input
                        type="number"
                        min="0"
                        value={size.stock}
                        onChange={(e) => handleSizeStockChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
