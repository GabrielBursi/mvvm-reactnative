import { Product } from '@/models'

export class ProductService {
	static async fetchProductsByCategory(category: string): Promise<Product[]> {
		return new Promise((resolve) => {
			setTimeout(() => {
				const mockProducts: Product[] = [
					{
						id: '1',
						name: 'Produto 1',
						description: 'Descrição do Produto 1',
						price: 99.99,
						imageUrl: 'https://via.placeholder.com/150',
						category,
					},
					{
						id: '2',
						name: 'Produto 2',
						description: 'Descrição do Produto 2',
						price: 199.99,
						imageUrl: 'https://via.placeholder.com/150',
						category,
					},
				]
				resolve(mockProducts)
			}, 1000)
		})
	}
}
