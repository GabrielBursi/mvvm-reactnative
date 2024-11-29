import { act, renderHook } from '@testing-library/react-native'

import { generateCartItem, mockCart } from '@/tests/mocks'

import { useCartViewModel } from './useCartViewModel'

describe('useCartViewModel', () => {
	const mockCart2 = generateCartItem()
	const mockCart3 = generateCartItem()

	it('should return the cart correctly', async () => {
		const { result } = renderHook(useCartViewModel)

		const addItemToCart = result.current.addItemToCart

		await act(() => {
			addItemToCart(mockCart)
		})

		expect(result.current.cart).toEqual([mockCart])
	})

	it('should update an item in cart correctly', async () => {
		const { result } = renderHook(useCartViewModel)

		const updateItemQuantity = result.current.updateItemQuantity
		const addItemToCart = result.current.addItemToCart

		await act(() => {
			addItemToCart(mockCart)
			updateItemQuantity(mockCart.product.id, 500)
		})

		expect(result.current.cart).toEqual([{ ...mockCart, quantity: 500 }])
	})

	it('should remove an item in cart correctly', async () => {
		const { result } = renderHook(useCartViewModel)

		const removeItemFromCart = result.current.removeItemFromCart
		const addItemToCart = result.current.addItemToCart

		await act(() => {
			addItemToCart(mockCart)
			removeItemFromCart(mockCart.product.id)
		})

		expect(result.current.cart).toHaveLength(0)
	})

	it('should clear the cart correctly', async () => {
		const { result } = renderHook(useCartViewModel)

		const clearCart = result.current.clearCart
		const addItemToCart = result.current.addItemToCart

		await act(() => {
			addItemToCart(mockCart)
			addItemToCart(mockCart2)
			addItemToCart(mockCart3)
			clearCart()
		})

		expect(result.current.cart).toHaveLength(0)
	})

	it('should calculate the total price correctly', async () => {
		const { result } = renderHook(useCartViewModel)

		const addItemToCart = result.current.addItemToCart

		await act(() => {
			addItemToCart(mockCart)
			addItemToCart(mockCart2)
			addItemToCart(mockCart3)
		})

		const totalPrice =
			mockCart.product.price * mockCart.quantity +
			mockCart2.product.price * mockCart2.quantity +
			mockCart3.product.price * mockCart3.quantity

		expect(result.current.cart).toHaveLength(3)
		expect(result.current.calculateTotalPrice()).toBe(totalPrice)
	})
})
