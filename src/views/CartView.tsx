/* eslint-disable react-native/no-color-literals */
import React from 'react'
import {
	View,
	Text,
	Button,
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from 'react-native'

import { useCartViewModel } from '@/hooks'
import { generateCartItem } from '@/tests/mocks'

type Props = Omit<
	Readonly<ReturnType<typeof useCartViewModel>>,
	'calculateTotalPrice'
>

export const CartView = ({
	addItemToCart,
	cart,
	clearCart,
	removeItemFromCart,
	totalPrice,
	updateItemQuantity,
}: Props) => {
	const renderItem = ({ item }: { item: (typeof cart)[0] }) => (
		<View style={styles.cartItem}>
			<Text>{item.product.name}</Text>
			<Text>Preço: ${item.product.price}</Text>
			<Text>Quantidade: {item.quantity}</Text>

			<View style={styles.itemActions}>
				<Button
					title="Remover"
					onPress={() => removeItemFromCart(item.product.id)}
				/>
				<Button
					title="Diminuir"
					onPress={() => updateItemQuantity(item.product.id, item.quantity - 1)}
				/>
				<Button
					title="Aumentar"
					onPress={() => updateItemQuantity(item.product.id, item.quantity + 1)}
				/>
			</View>
		</View>
	)

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Carrinho de Compras</Text>

			{/* Exibindo a lista de itens no carrinho */}
			<FlatList
				data={cart}
				renderItem={renderItem}
				keyExtractor={(item) => item.product.id}
			/>

			{/* Exibindo o preço total */}
			<Text style={styles.total}>Total: ${totalPrice}</Text>

			{/* Ações para limpar o carrinho ou adicionar um item */}
			<View style={styles.actions}>
				<TouchableOpacity onPress={clearCart}>
					<Text style={styles.clearCart}>Limpar Carrinho</Text>
				</TouchableOpacity>

				<Button
					title="Adicionar item ao carrinho"
					onPress={() => addItemToCart(generateCartItem())}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	actions: {
		marginTop: 20,
	},
	cartItem: {
		borderColor: '#ccc',
		borderRadius: 8,
		borderWidth: 1,
		marginBottom: 20,
		padding: 16,
	},
	clearCart: {
		color: 'red',
		marginBottom: 10,
	},
	container: {
		padding: 16,
	},
	header: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	itemActions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	total: {
		fontSize: 18,
		fontWeight: 'bold',
		marginVertical: 20,
	},
})
