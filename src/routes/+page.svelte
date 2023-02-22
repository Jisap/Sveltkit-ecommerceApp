<script lang="ts">
	import ProductCard from "$lib/productCard.svelte";
	import { get } from "svelte/store";
	import { cartItems } from "../cart";

	const products: Product[] = [
		{
			id: "price_1MeLAFCuZvmb6988R2Tga6ge",
			name: "Coffe",
			price: 5
		},
		{
			id: "price_1MeLCnCuZvmb6988bpzDhvhB",
			name: "Sunglasses",
			price: 10
		},
		{
			id: "price_1MeLE0CuZvmb6988LoqoEvm8",
			name: "Water Bottle",
			price: 15
		}
	]

	async function checkout() {
		await fetch("api/stripeCheckout", { // http://localhost:5173/api/stripeCheckout
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(
				{ items: get(cartItems) }
			)
		}).then((data) => {
			return data.json()
		}).then((data) => {
			window.location.replace(data.url); // Redirección a la página de success o cancel según el rdo de la compra
		});
	}

</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		
		<div class="col-span-3">
			<h1>SvelteKit 1.0 Store</h1>
		</div>

		{#each products as product }
			<ProductCard product={ product }/>
		{/each}

		<div class="col-span-3">
			<button 
				class="btn variant-filled-primary"
				on:click={() => checkout()}
			>
				Chekout with Stripe API
			</button>
		</div>

	</div>
</div>
