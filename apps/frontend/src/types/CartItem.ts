// types/CartItem.ts

export type PizzaCartItem = {
    type: 'pizza'
    flavor: string
    size: string
    extras: string[]
    price: number
    image: string
    quantity: number
  }
  
  export type DrinkCartItem = {
    type: 'drink'
    name: string
    description: string
    price: number
    image: string
    quantity: number
  }
  
  export type CartItem = PizzaCartItem | DrinkCartItem
  