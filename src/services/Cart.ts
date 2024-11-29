// Serviço responsável por gerenciar a lógica de manipulação do carrinho de compras
// No padrão MVVM, o **Service** é a camada que gerencia a lógica de negócio e a manipulação de dados.
// Ele se comunica com o **ViewModel**, que por sua vez comunica-se com a **View** (UI).
import { CartItem } from '@/models'

// Interface que define as operações disponíveis no serviço do carrinho
export interface ICartService {
	// Recupera os itens no carrinho
	getCartItems(): CartItem[]

	// Adiciona um novo item ao carrinho
	addItemToCart(newItem: CartItem): CartItem[]

	// Atualiza a quantidade de um item no carrinho
	updateItemQuantity(productId: string, quantity: number): CartItem[]

	// Remove um item do carrinho
	removeItemFromCart(productId: string): CartItem[]

	// Limpa todos os itens do carrinho
	clearCart(): void
}

export class CartService implements ICartService {
	// A lista de itens no carrinho é armazenada internamente, como um estado privado.
	// A camada de Service é responsável por garantir que a lógica de manipulação de dados seja isolada da UI.
	private cart: CartItem[] = []

	// Recupera todos os itens no carrinho
	getCartItems(): CartItem[] {
		return this.cart
	}

	// Adiciona um novo item ao carrinho ou atualiza a quantidade caso o item já exista
	addItemToCart(newItem: CartItem): CartItem[] {
		// Verifica se o item já existe no carrinho (baseado no ID do produto)
		const existingItemIndex = this.cart.findIndex(
			(item) => item.product.id === newItem.product.id
		)

		// Se o item já estiver no carrinho, apenas aumenta a quantidade
		if (existingItemIndex !== -1) {
			this.cart[existingItemIndex].quantity += newItem.quantity
		} else {
			// Caso contrário, adiciona o item ao carrinho
			this.cart.push(newItem)
		}

		return this.cart
	}

	// Atualiza a quantidade de um item específico no carrinho
	updateItemQuantity(productId: string, quantity: number): CartItem[] {
		// Modifica o item específico baseado no ID, atualizando a quantidade
		this.cart = this.cart.map((item) =>
			item.product.id === productId ? { ...item, quantity } : item
		)

		// Filtra itens com quantidade <= 0, removendo-os do carrinho
		this.cart = this.cart.filter((item) => item.quantity > 0)

		return this.cart
	}

	// Remove um item do carrinho baseado no ID do produto
	removeItemFromCart(productId: string): CartItem[] {
		// Filtra o item pelo ID, removendo-o do carrinho
		this.cart = this.cart.filter((item) => item.product.id !== productId)
		return this.cart
	}

	// Limpa todos os itens do carrinho
	clearCart(): void {
		this.cart = []
	}
}
