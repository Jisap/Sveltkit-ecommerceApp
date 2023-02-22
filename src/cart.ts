import { writable, get } from "svelte/store";

export const cartItems = writable<CartItem[]>([]); // Estado para cartItems ( Similar a context de react )

export const addToCart = ( id:string ) => {
    
    let items = get( cartItems )
    let itemPosition = items.findIndex( item => item.id === id )

    if( itemPosition !== -1) { // Item is in the cart, add to the quantity of that item
        cartItems.update(() => {
            let updatedItems = items.map(( item ) => {                    
                if( item.id === id ){                                  // Buscamos el item que ya esta en el carrito
                    return { ...item, quantity: item.quantity + 1 }    // incrementamos a ese item la cantidad en 1 
                }                                                      // Retornamos el item actualizado dentro de updatedItems
                return item;
            })
            return updatedItems                                        // Retornamos cartItems con el valor de updatedItems  
        })
    }else{ // Item is not in the cart, add the object to the cart
        cartItems.update(() => {
            return [...items, { id, quantity: 1 } ]
        });
    }
}

export const removeFromCart = ( id:string ) => {

    let items = get(cartItems)
    let itemPosition = items.findIndex(item => item.id === id);

    if( items[itemPosition]?.quantity -1 === 0){    // Si el item en el carrito tiene una cantidad de 1 borramos el item del []
        items.splice(itemPosition, 1);
    }

    cartItems.update(() => {
        let updatedItems = items.map((item) => {                   // En este caso el item tiene cantidad > 1
            if (item.id === id) {                                  // Buscamos el item que ya esta en el carrito
                return { ...item, quantity: item.quantity -1 }     // restamos a ese item la cantidad en 1 
            }                                                      // Retornamos el item actualizado dentro de updatedItems
            return item;
        })
        return updatedItems                                        // Retornamos cartItems con el valor de updatedItems  
    })

}

