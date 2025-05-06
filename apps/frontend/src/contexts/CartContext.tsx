import { createContext, useContext, useState, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface BaseCartItem {
  id: string
  type: 'pizza' | 'drink'
  price: number
  image: string
  quantity: number
}

export interface PizzaItem extends BaseCartItem {
  idBack: any
  type: 'pizza'
  flavor: string
  size: string
  extras: string[]
}

export interface DrinkItem extends BaseCartItem {
  idBack: any
  type: 'drink'
  name: string
  description: string
}

export type CartItem = PizzaItem | DrinkItem
export type NewPizzaItem = Omit<PizzaItem, 'id'>
export type NewDrinkItem = Omit<DrinkItem, 'id'>
export type NewCartItem = NewPizzaItem | NewDrinkItem

type CartContextType = {
  items: CartItem[]
  addItem: (item: NewCartItem) => string
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function isPizza(item: NewCartItem): item is NewPizzaItem {
  return item.type === 'pizza'
}

function isDrink(item: NewCartItem): item is NewDrinkItem {
  return item.type === 'drink'
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: NewCartItem): string => {
    const newId = uuidv4()
  
    let matchedId: string | null = null
  
    setItems((prev) => {
      if (isPizza(item)) {
        const match = prev.find(
          (i): i is PizzaItem =>
            i.type === 'pizza' &&
            i.flavor === item.flavor &&
            i.size === item.size &&
            JSON.stringify(i.extras) === JSON.stringify(item.extras)
        )
  
        if (match) {
          matchedId = match.id
          return prev.map((i) =>
            i.id === match.id ? { ...i, quantity: i.quantity + item.quantity } : i
          )
        }
  
        const newPizza: PizzaItem = { ...item, id: newId }
        matchedId = newId
        return [...prev, newPizza]
      }
  
      if (isDrink(item)) {
        const match = prev.find(
          (i): i is DrinkItem =>
            i.type === 'drink' &&
            i.name === item.name &&
            i.description === item.description
        )
  
        if (match) {
          matchedId = match.id
          return prev.map((i) =>
            i.id === match.id ? { ...i, quantity: i.quantity + item.quantity } : i
          )
        }
  
        const newDrink: DrinkItem = { ...item, id: newId }
        matchedId = newId
        return [...prev, newDrink]
      }
  
      return prev
    })
  
    return matchedId || newId
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
