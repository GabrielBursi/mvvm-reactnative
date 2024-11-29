import React from 'react'

import { useCartViewModel } from '@/hooks'
import { CartView } from '@/views'

export const CartScreen = () => {
	const cartViewModel = useCartViewModel()
	return <CartView {...cartViewModel} />
}
