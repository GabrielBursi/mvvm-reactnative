import { faker } from '@faker-js/faker'

import { CartItem, Product } from '@/models'

export const generateProduct = (): Product => ({
	id: faker.string.uuid(),
	name: faker.commerce.productName(),
	description: faker.commerce.productDescription(),
	price: parseFloat(faker.commerce.price()),
	imageUrl: faker.image.url(),
	category: faker.commerce.department(),
})

export const mockProduct: Product = generateProduct()
export const mockProducts: Product[] = [
	generateProduct(),
	generateProduct(),
	generateProduct(),
	generateProduct(),
]

export const generateCartItem = (): CartItem => ({
	product: generateProduct(),
	quantity: faker.number.int({ min: 1, max: 10 }),
})

export const mockCart: CartItem = generateCartItem()
