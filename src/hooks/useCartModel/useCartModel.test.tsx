import { act, renderHook } from '@testing-library/react-native'

import { ICartService } from '@/services'
import { mockCart } from '@/tests/mocks'

import { useCartModel } from './useCartModel'

describe('useCartModel', () => {
	const addItemToCartMock = jest.fn()
	const clearCartMock = jest.fn()
	const getCartItemsMock = jest.fn()
	const removeItemFromCartMock = jest.fn()
	const updateItemQuantityMock = jest.fn()

	const cartServiceMock: jest.Mocked<ICartService> = {
		addItemToCart: addItemToCartMock,
		clearCart: clearCartMock,
		getCartItems: getCartItemsMock,
		removeItemFromCart: removeItemFromCartMock,
		updateItemQuantity: updateItemQuantityMock,
	}

	beforeEach(() => {
		getCartItemsMock.mockReturnValue([mockCart])
	})

	it('should add an item into cart correctly', async () => {
		const { result } = renderHook(() => useCartModel(cartServiceMock))

		const addItemToCart = result.current.addItemToCart

		await act(() => {
			addItemToCart(mockCart)
		})

		expect(addItemToCartMock).toHaveBeenCalledWith(mockCart)
		expect(getCartItemsMock).toHaveBeenCalled()
		expect(result.current.cart).toHaveLength(1)
	})

	it('should update an item in cart correctly', async () => {
		const { result } = renderHook(() => useCartModel(cartServiceMock))

		const updateItemQuantity = result.current.updateItemQuantity

		await act(() => {
			updateItemQuantity('1', 10)
		})

		expect(updateItemQuantityMock).toHaveBeenCalledWith('1', 10)
		expect(getCartItemsMock).toHaveBeenCalled()
		expect(result.current.cart).toHaveLength(1)
	})

	it('should remove an item in cart correctly', async () => {
		const { result } = renderHook(() => useCartModel(cartServiceMock))

		const removeItemFromCart = result.current.removeItemFromCart

		await act(() => {
			removeItemFromCart('1')
		})

		expect(removeItemFromCartMock).toHaveBeenCalledWith('1')
		expect(getCartItemsMock).toHaveBeenCalled()
		expect(result.current.cart).toHaveLength(1)
	})

	it('should clear the cart correctly', async () => {
		const { result } = renderHook(() => useCartModel(cartServiceMock))

		const clearCart = result.current.clearCart

		await act(() => {
			clearCart()
		})

		expect(clearCartMock).toHaveBeenCalled()
		expect(getCartItemsMock).toHaveBeenCalled()
		expect(result.current.cart).toHaveLength(1)
	})
})
