<style>
.navbar-item img {
	max-height: 2.3rem;
}
.navbar-brand1 {
	box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
	align-items: stretch;
	display: flex;
	flex-shrink: 0;
	min-height: 3.25rem;
}
.navbar.has-shadow {
	box-shadow: 0 2px 0 0 #f5f5f5;
}
.navbar.is-primary {
	background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
}
.navbar {
	background-color: #fff;
	min-height: 3.25rem;
	z-index: 30;
}
.navbar.is-primary .navbar-brand > a.navbar-item:hover {
	background: linear-gradient(87deg, #fb6340 0, #fbb140 100%) !important;
}
img {
	height: auto;
	max-width: 100%;
}
.navbar-item img {
	max-height: 1.75rem;
}
.navbar-menu {
	background-color: #fff;
	box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
	padding: 0.5rem 0;
	display: none;
}
.navbar-link,
a.navbar-item {
	cursor: pointer;
}
.navbar-item1,
.navbar-link {
	color: #4a4a4a;
	display: block;
	line-height: 1.5;
	padding: 0.5rem 0.75rem;
	flex-grow: 0;
	flex-shrink: 0;
}
/* .section {
  padding: 3rem 1.5rem;
} */
.hero.is-primary .subtitle {
	color: hsla(0, 0%, 100%, 0.9);
}
.title:not(.is-spaced) + .subtitle {
	margin-top: -1.25rem;
}
article,
aside,
figure,
footer,
header,
hgroup {
	display: block;
}
profile .card-profile-image img {
	-webkit-box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
	box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
/* .imgsize {
  width: 128px;
  height: 90px;
  margin-left: -20px;
} */
.shadow,
.profile-page .card-profile .card-profile-image img {
	-webkit-box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
	box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
.a1 {
	display: flex;
	align-items: center;
}
.headeralign1 {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	text-align: center;
}
.cart-icon1 {
	padding-right: 6px;
	margin-top: 5px;
}
.center {
	display: flex;
	flex-direction: row;
	align-items: center;
}
</style>

<script lang="ts">
import { currency } from './util'
import { spring } from 'svelte/motion'
import { createEventDispatcher } from 'svelte'
import { KQL_Cart } from './graphql/_kitql/graphqlStores'
const dispatch = createEventDispatcher()
export const btnname = null
export let nextpage = null
export let text = 'Proceed to checkout'
export const cls = null
export const loading = !!false
function modulo(n, m) {
	// handle negative numbers
	return ((n % m) + m) % m
}
function submit() {
	dispatch('submit')
}
</script>

<section class="my-5 border-t  border-gray-200 py-5 text-gray-800">
	<h5 class="text-xl font-bold capitalize tracking-wide">Price Summary</h5>

	<h6 class="mt-1 text-xs tracking-wider text-gray-400">Includes GST and all government taxes</h6>

	<div class="mt-3">
		<div class="mt-2 flex items-center justify-between font-medium">
			<h4>Total item price</h4>
			<h4>{currency(Math.floor($KQL_Cart.data?.cart.subtotal))}</h4>
		</div>

		{#if $KQL_Cart.data?.cart.discount > 0}
			<div class="mt-2 flex items-center justify-between font-medium">
				<h4>Item discount</h4>
				<h4>-{currency($KQL_Cart.data?.cart.discount)}</h4>
			</div>
		{/if}

		<div class="mt-2 flex items-center justify-between font-medium">
			<h4>Shipping fee</h4>
			<h4>FREE</h4>
		</div>

		<!-- <p class="d mt-1 text-xs tracking-wider text-gray-400">
			Free shipping on orders of ₹899 or more. For first purchase,
			<a href="/" class="underline hover:text-primary-500">See Offer</a>
		</p> -->
	</div>

	<hr class="my-5 border-t border-dashed border-gray-200" />

	<div class=" my-2 flex items-center justify-between text-lg font-semibold ">
		<h4>Total</h4>
		{currency(Math.floor($KQL_Cart.data?.cart.subtotal))}
	</div>
	{#if $KQL_Cart.data?.cart.qty > 0}
		<footer class="footer">
			<nav class="navbar header has-shadow is-primary text-white">
				<div
					class="headeralign1 flex flex-col items-center justify-center shadow "
					style="color:white;">
					{#if nextpage}
						<a
							href="{nextpage}"
							class="mt-5 block h-full w-full flex-1 rounded-md text-center font-semibold uppercase tracking-wider text-white shadow-md transition duration-300 ">
							{text}
						</a>
					{:else}
						<button
							on:click="{submit}"
							class="w-full block px-4 py-2 mt-5 font-semibold tracking-wider text-white uppercase rounded-md shadow-md transition duration-300 focus:outline-none ">
							{text}
						</button>
					{/if}
				</div>
			</nav>
		</footer>
	{/if}
</section>
