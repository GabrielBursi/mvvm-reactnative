import { useCallback, useMemo, useState } from 'react'

// Importando o hook que lida com o carrinho e o serviço responsável por gerenciá-lo
import { useCartModel } from '@/hooks'
import { CartService } from '@/services'

/**
 * O ViewModel que prepara e organiza os dados do carrinho
 * para que a View possa consumi-los de forma otimizada.
 */
export const useCartViewModel = () => {
	// Inicializando o CartService, que é responsável pela lógica de manipulação do carrinho
	const [cartService] = useState(() => new CartService())

	// Obtendo os dados do carrinho e as funções relacionadas através do hook useCartModel
	const { cart, ...restModel } = useCartModel(cartService)

	/**
	 * Função que calcula o preço total do carrinho.
	 * Utiliza a função reduce para somar o valor total de todos os itens no carrinho.
	 */
	const calculateTotalPrice = useCallback(() => {
		return cart.reduce(
			(total, item) => total + item.product.price * item.quantity, // Multiplicando o preço pelo número de unidades
			0 // Valor inicial da soma
		)
	}, [cart]) // A dependência é o cart, pois o total precisa ser recalculado sempre que o carrinho mudar

	/**
	 * Usamos useMemo para memorizar o valor total do carrinho.
	 * Isso evita cálculos desnecessários a cada renderização, melhorando a performance.
	 */
	const totalPrice = useMemo(calculateTotalPrice, [calculateTotalPrice])

	// Retornando os dados do carrinho e a função para calcular o preço total
	// Além disso, espalhamos as funções do useCartModel para serem utilizadas pela View
	return {
		cart,
		calculateTotalPrice,
		totalPrice,
		...restModel,
	} as const
}
