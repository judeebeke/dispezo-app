import {useReducer} from 'react';

import CartContext from './cart-context';

const defualtCartState = {
    items: [],
    totalAmount: 0
}

const CartReducer = (state, action) => {
    if(action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingCartItem = state.items[existingCartItemIndex]

         let updatedItems

        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }

            updatedItems = [...state.items]

            updatedItems[existingCartItemIndex] = updatedItem;

        } else {
           updatedItems = state.items.concat(action.item)
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE') {
        const existingItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingItem = state.items[existingItemIndex]

        const updatedTotalAmount = state.totalAmount - existingItem.price;
        
        let updatedItems;

        if(existingItem.amount === 1) {
           updatedItems = state.items.filter(item => item.id !== action.id)
           console.log(updatedItems)
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defualtCartState;
}

const CartProvider = (props) => {
    const [cartState, cartActionDispatcher] = useReducer(CartReducer, defualtCartState);

    const addItemHandler = (item) => {
        cartActionDispatcher({type: 'ADD', item: item})
    }
    const removeItemHandler = (id) => {
        cartActionDispatcher({type: 'REMOVE', id: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;