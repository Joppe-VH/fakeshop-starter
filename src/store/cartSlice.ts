import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartItem, Product } from "../lib/types"

const initialState = {
  items: <CartItem[]>[],
}

type CartState = typeof initialState

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.product.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ product, quantity })
      }
    },
    removeFromCart: (state, action: PayloadAction<Product["id"]>) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.product.id !== productId)
    },
    updateQuantity: (state, action: PayloadAction<{ productId: Product["id"]; quantity: number }>) => {
      const { productId, quantity } = action.payload

      if (quantity <= 0) {
        state.items = state.items.filter(item => item.product.id !== productId)
        return
      }

      const item = state.items.find(item => item.product.id === productId)
      if (item) {
        item.quantity = quantity
      }
    },
    incrementQuantity: (state, action: PayloadAction<Product["id"]>) => {
      const productId = action.payload
      const item = state.items.find(item => item.product.id === productId)
      if (item) item.quantity += 1
    },
    decrementQuantity: (state, action: PayloadAction<Product["id"]>) => {
      const productId = action.payload
      const item = state.items.find(item => item.product.id === productId)
      if (item) {
        item.quantity -= 1
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.product.id !== productId)
        }
      }
    },
    clearCart: state => {
      state.items = []
    },
  },
  selectors: {
    selectCartItems: createSelector(
      (state: CartState) => state.items,
      items => items.map(item => ({ ...item, subtotal: item.product.price * item.quantity })),
    ),
    selectCartTotal: createSelector(
      (state: CartState) => state.items,
      items => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    ),
    selectCartCount: createSelector(
      (state: CartState) => state.items,
      items => items.reduce((count, item) => count + item.quantity, 0),
    ),
  },
})

export const { addToCart, removeFromCart, updateQuantity, incrementQuantity, decrementQuantity, clearCart } =
  cartSlice.actions

export const { selectCartItems, selectCartTotal, selectCartCount } = cartSlice.selectors

export default cartSlice
