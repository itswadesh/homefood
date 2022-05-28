<style>
.size1 {
	display: flex;
	flex-direction: row;
}
.size2 {
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 5px;
}
.buttonrounded1 {
	border-radius: 50px;
	width: 33px;
}
.button.is-danger {
	border-color: transparent;
	color: #fff;
}
.button1 {
	border: 1px solid transparent;
	border-width: 1px;
	color: #32325d;
	cursor: pointer;
	justify-content: center;
	text-align: center;
	white-space: nowrap;
	background: #f5f5f5;
	box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.btnplus-clr {
	background: #ffdd57;
}
.button1:hover {
	background: #ffdd57;
}
.button {
	border: 1px solid transparent;
	border-width: 1px;
	color: #32325d;
	background-color: white;
	cursor: pointer;
	justify-content: center;
	padding: calc(0.375em - 1px) 0.75em;
	padding-bottom: 0px;
	text-align: center;
	white-space: nowrap;
	display: flex;
	flex-direction: row;
	box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.button:hover {
	background: #ff3860;
	color: #fff;
}
.buttonrounded {
	border-radius: 15px;
	height: 34px;
	border-left-width: 2px;
}
.align {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 10px;
}
/* .plus {
  font-size: 25px;
  margin-top: -3px;
} */
.cart-icon {
	padding-bottom: 3px;
	padding-left: 5px;
}
/* .center {
  display: flex;
  flex-direction: row;
  align-items: center;
} */
.addalign {
	padding-top: 4px;
}
</style>

<script>
import { KQL_AddToCart, KQL_Cart } from './graphql/_kitql/graphqlStores'
import { Cart } from './graphql/_kitql/graphqlTypes'
import { store, toast } from './util'

export let product, cart
let loading = false
function checkCart(pid) {
	return cart?.items?.some((e) => e.pid === pid)
}
function getQty(pid) {
	const found = cart.items?.find((e) => e.pid === pid)
	return found?.qty || 0
}

async function refreshCart() {
	// await KQL_Cart.resetCache()
	// await KQL_Cart.queryLoad({ variables: { store: store.id }, settings: { policy: 'network-only' } })
}
async function addToCart({ pid, vid, options, qty }) {
	const optiData = $KQL_Cart.data
	optiData.cart.currencyCode = `Removing items...`
	loading = true
	const addToCartRes = await KQL_AddToCart.mutate({
		variables: { pid, qty, vid, options }
	})
	loading = false
	if (addToCartRes.errors) {
		return toast(addToCartRes.errors[0].message.replace('UserInputError: ', ''), 'error')
	}
	if (qty < 1) toast('Removed from cart', 'success')
	else toast('Added to the cart', 'success')
	cart = addToCartRes.data.addToCart
	await KQL_Cart.query({ variables: { store: store.id }, settings: { policy: 'network-only' } })
}
// $: cart = $KQL_Cart.data?.cart || {}
</script>

<div class="align">
	{#if cart?.items && !checkCart(product.id)}
		<button
			on:click="{() =>
				addToCart({
					pid: product.id,
					vid: product.id,
					options: [],
					qty: 1
				})}">
			{#if loading}
				{loading ? '...' : cart?.items?.find((e) => e.pid === product.id).qty}
			{:else}
				<div class="button1 buttonrounded1 btnalign">
					<img src="/plus.svg" alt="" />
				</div>
			{/if}
		</button>
	{:else}
		<div>
			<div class="size1">
				<button
					disabled="{loading}"
					class="button1 buttonrounded1 "
					on:click="{() =>
						addToCart({
							pid: product.id,
							vid: product.id,
							options: [],
							qty: -1
						})}">
					<img src="/minus.svg" alt="" />
				</button>
				<span class="size2">
					{loading ? '...' : cart?.items?.find((e) => e.pid === product.id).qty}
				</span>
				<button
					disabled="{loading}"
					class="button1 button.is-danger buttonrounded1 btnplus-clr"
					on:click="{() =>
						addToCart({
							pid: product.id,
							vid: product.id,
							options: [],
							qty: 1
						})}">
					<img src="/plus.svg" alt="" />
				</button>
			</div>
		</div>
	{/if}
</div>
