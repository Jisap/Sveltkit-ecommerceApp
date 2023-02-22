<script lang="ts">
    import { get } from "svelte/store";
    import { cartItems, addToCart, removeFromCart } from "../cart";
    export let product:Product = { id:"", name:"", price:0 };   // Producto recibido como prop desde el padre que se muestra en una tarjeta.

    let cart = get( cartItems );                                                        // []Vacio en principio
    let cartItemIndex = cart.findIndex((item) => { return item.id === product.id });    // Índice basado en [product] recibido
    let cartProduct = cart[cartItemIndex];                                              // Carrito de productos basado en los índices de product recibido

    cartItems.subscribe(( newCartValue ) => { // Nos subscribimos a posibles cambios en el valor de cartItems, nuevos productos agregados desde addToCart
        cart = newCartValue;                                                            // cart = al nuevo [CarItems] con el pto añadido 
        cartItemIndex = cart.findIndex((item) => { return item.id === product.id });    // Obtenemos el índice de ese pto añadido en cart
        cartProduct = cart[cartItemIndex];                                              // Damos valor a cartProduct con ese pto añadido
        console.log(cart) 
    })

</script>


<div class="card">
    <header class="card-header">
        <h2>{ product.name }</h2>
    </header>
    {#if cartProduct !== undefined}
        <div class="card-body px-4">
            Quatity: <strong>{ cartProduct.quantity}</strong>
        </div>
    {/if}
    <div class="card-body px-4">
        Price: ${ product.price }
    </div>
    <footer class="card-footer">
        <button class="p-2 rounded variant-glass-primary" on:click={ () => addToCart( product.id ) }>Add</button>
        <button class="p-2 rounded variant-glass-error" on:click={ () => removeFromCart( product.id ) }>Remove</button>
    </footer>
</div>