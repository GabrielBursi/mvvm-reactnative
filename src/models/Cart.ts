//* Definição do modelo de dados para itens no carrinho
//? Esse modelo representa cada item no carrinho de compras.
//? Ele é parte da camada de **Model** no padrão MVVM.
import { Product } from '@/models'

//* Interface que define a estrutura de um item do carrinho
//? - `product`: contém as informações do produto selecionado (importado do modelo Product).
//? - `quantity`: representa a quantidade do produto no carrinho.
export interface CartItem {
	product: Product
	quantity: number
}
