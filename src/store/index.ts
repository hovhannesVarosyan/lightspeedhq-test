import { useCategoryStore } from './modules/category'
import { useProductStore } from './modules/product'
import { useCartStore } from './modules/cart'

export { useCategoryStore, useProductStore, useCartStore }

export async function initializeStores() {
  const categoryStore = useCategoryStore()
  const productStore = useProductStore()
  const cartStore = useCartStore()

  await Promise.all([
    categoryStore.list(),
    cartStore.loadCartItems(),
  ])

  return { categoryStore, productStore, cartStore }
}
