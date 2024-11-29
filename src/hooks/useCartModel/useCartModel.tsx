import { useCallback, useState } from 'react'

import { CartItem } from '@/models'
import { ICartService } from '@/services'

// Hook personalizado que serve como **Controller** no padrão MVVM.
// O **Controller** é responsável por orquestrar as interações entre a **View** e o **Model**,
// recebendo as ações da View, interagindo com o Model (no caso, o serviço de carrinho),
// e atualizando o estado conforme necessário.
export const useCartModel = (cartService: ICartService) => {
	// Estado que mantém a lista de itens do carrinho.
	// O estado 'cart' armazena os itens no carrinho, que serão exibidos pela View.
	const [cart, setCart] = useState<CartItem[]>(cartService.getCartItems())

	// Função que atualiza o estado 'cart' com os itens atuais do serviço.
	// Isso é necessário sempre que o carrinho é modificado (adicionar, remover, atualizar itens).
	const handleSetCart = useCallback(
		() => setCart(cartService.getCartItems()),
		[cartService] // A função depende do serviço de carrinho para recuperar os itens atualizados.
	)

	// Função para adicionar um item ao carrinho.
	// Ela chama o método do serviço para adicionar o item e, em seguida, atualiza o estado do carrinho.
	const addItemToCart = useCallback(
		(item: CartItem) => {
			cartService.addItemToCart(item) // Chama o serviço para adicionar o item
			handleSetCart() // Atualiza o estado local 'cart' com os novos itens
		},
		[cartService, handleSetCart] // Dependências para garantir que a função seja atualizada corretamente
	)

	// Função para atualizar a quantidade de um item no carrinho.
	// Chama o serviço para atualizar a quantidade e depois atualiza o estado do carrinho.
	const updateItemQuantity = useCallback(
		(productId: string, quantity: number) => {
			cartService.updateItemQuantity(productId, quantity) // Atualiza a quantidade do item
			handleSetCart() // Atualiza o estado 'cart' após a modificação
		},
		[cartService, handleSetCart] // Dependências para a função ser atualizada com as alterações
	)

	// Função para remover um item do carrinho.
	// Chama o serviço para remover o item e depois atualiza o estado 'cart'.
	const removeItemFromCart = useCallback(
		(productId: string) => {
			cartService.removeItemFromCart(productId) // Remove o item do carrinho
			handleSetCart() // Atualiza o estado local 'cart' com os itens restantes
		},
		[cartService, handleSetCart] // Dependências para manter as funções atualizadas
	)

	// Função para limpar o carrinho completamente.
	// Chama o serviço para limpar todos os itens do carrinho e depois atualiza o estado 'cart'.
	const clearCart = useCallback(() => {
		cartService.clearCart() // Limpa todos os itens do carrinho
		handleSetCart() // Atualiza o estado 'cart' para refletir a limpeza
	}, [cartService, handleSetCart]) // Dependências para garantir que a função seja atualizada

	// Retorna os dados e as ações que a View pode usar para interagir com o carrinho
	// Os dados (como cart) e as funções (addItemToCart, updateItemQuantity, etc.) são expostos para serem usados pela View.
	return {
		cart, // Lista de itens do carrinho
		addItemToCart, // Função para adicionar item
		updateItemQuantity, // Função para atualizar quantidade de item
		removeItemFromCart, // Função para remover item
		clearCart, // Função para limpar o carrinho
	} as const // A declaração `as const` mantém as funções e dados imutáveis e tipo seguro
}
