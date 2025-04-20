import { createContext, useContext, useState, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'

export type PizzaCartItem = {
  id: string
  type: 'pizza'
  flavor: string
  size: string
  extras: string[]
  price: number
  image: string
  quantity: number
}

export type DrinkCartItem = {
  id: string
  type: 'drink'
  name: string
  description: string
  price: number
  image: string
  quantity: number
}

export type CartItem = PizzaCartItem | DrinkCartItem

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => string
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function isPizza(item: Omit<CartItem, 'id'>): item is Omit<PizzaCartItem, 'id'> {
  return item.type === 'pizza'
}

function isDrink(item: Omit<CartItem, 'id'>): item is Omit<DrinkCartItem, 'id'> {
  return item.type === 'drink'
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: Omit<CartItem, 'id'>): string => {
    const id = uuidv4()
  
    setItems((prev) => {
      // Verifica se é pizza
      if (isPizza(item)) {
        const existingIndex = prev.findIndex(
          (i): i is PizzaCartItem =>
            i.type === 'pizza' &&
            i.flavor === item.flavor &&
            i.size === item.size &&
            JSON.stringify(i.extras) === JSON.stringify(item.extras)
        )
  
        if (existingIndex !== -1) {
          const updated = [...prev]
          updated[existingIndex].quantity += item.quantity
          return updated
        }
  
        const newPizza: PizzaCartItem = { ...item, id }
        return [...prev, newPizza]
      }
  
      if (isDrink(item)) {
        const existingIndex = prev.findIndex(
          (i): i is DrinkCartItem =>
            i.type === 'drink' && i.name === item.name && i.description === item.description
        )
  
        if (existingIndex !== -1) {
          const updated = [...prev]
          updated[existingIndex].quantity += item.quantity
          return updated
        }
  
        const newDrink: DrinkCartItem = { ...item, id }
        return [...prev, newDrink]
      }
  
      return prev
    })
  
    return id
  }
  
  
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
