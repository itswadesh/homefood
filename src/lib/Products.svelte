<style>
.products {
	margin: 0 1rem;
}
.product {
	align-items: flex-start;
	display: flex;
	text-align: left;
	padding-top: 1rem;
}
@media (min-width: 900px) and (max-width: 2000px) {
	.product {
		display: none;
	}
}
.content {
	flex: 1;
	margin-top: 5px;
}
@media (min-width: 900px) and (max-width: 2000px) {
	.content {
		margin-top: 1rem;
		text-align: left;
	}
}
strong {
	color: #363636;
	font-weight: 700;
}
.image {
	width: 104px;
}
.image img {
	border-radius: 50px;
}
.border {
	border-top: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
@media (min-width: 900px) and (max-width: 2000px) {
	.border {
		border-top: 0px;
	}
}
.price-align {
	text-align: right;
	margin-top: 5px;
}
.big {
	font-size: 1.5em;
	font-weight: 700;
}
@media (min-width: 900px) and (max-width: 2000px) {
	.big {
		padding-top: 10px;
		padding-bottom: 10px;
	}
}
.head {
	position: relative;
	left: 0;
	right: 0;
	text-align: center;
	margin-bottom: 50px;
}
.webcolumn {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 350px;
	padding: 10px;
}
.webcard {
	width: 350px;
	height: 150px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
	margin-top: 5px;
	border-radius: 6px;
	margin: 10px;
}
@media (min-width: 900px) and (max-width: 2000px) {
	.webcard {
		display: inline-block;
		flex-direction: row;
		justify-content: space-around;
	}
}
@media (min-width: 300px) and (max-width: 900px) {
	.webcard {
		display: none;
	}
}
.webprice {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: 0.7rem;
}
.f-12 {
	font-size: 20px;
}
</style>

<script>
import CartButtons from './CartButtons.svelte'
import ImageLoader from './components/Image/ImageLoader.svelte'

import { currency } from './util'
export let products, showcart, cart
</script>

<div class="products head">
	{#each products as p, ix}
		<div class="product {ix !== 0 || ix !== products.length ? 'pb-3 border-b' : ''}">
			<div class="image">
				<ImageLoader src="{p._source.img}" alt="" class="h-24 w-24 rounded-full p-1 shadow-lg" />
			</div>
			<div class="content">
				<strong>{p._source.name}</strong>
				<div class="text-xs">
					{#if p._source.vendor.businessName}
						by <span class="text-gray-500">{p._source.vendor.businessName || ''}</span>
						<!-- href="{`/vendor/${p._source.vendor.slug}?id=${p._source.vendor.id}`}" -->
					{/if}
				</div>
			</div>
			<div class="price-align">
				<div class="big">{currency(p._source.price)}</div>
				{#if showcart}
					<CartButtons product="{{ id: p._id }}" cart="{cart}" />
				{/if}
			</div>
		</div>
	{/each}
	{#each products as p, ix}
		<div class="webcard {ix != 0 || ix !== products.length ? 'pb-3 border-b' : ''}">
			<div class="webcolumn">
				<div class="image">
					<ImageLoader src="{p._source.img}" alt="" class="h-24 w-24 rounded-full p-1 shadow-lg" />
				</div>
				<div class="content">
					<div>
						<strong class="f-12">{p._source.name}</strong>
					</div>
					<div class="webprice">
						<div class="big">{currency(p._source.price)}</div>
						<div>
							{#if showcart}
								<CartButtons product="{{ id: p._id }}" />
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
