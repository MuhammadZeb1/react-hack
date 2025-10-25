import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import cartReducer from '../features/cart/cartSlice'
import themeReducer from '../features/theme/themeSlice'


export const store = configureStore({
reducer: {
products: productsReducer,
cart: cartReducer,
theme: themeReducer,
}
})