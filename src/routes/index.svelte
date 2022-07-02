<script context="module">
import Cookie from 'cookie-universal'
const cookies = Cookie()

export async function load({ url, params, fetch, session, context, cookie }) {
	let err, count, products, facets, currentLocation, cart
	let currentPage = url.searchParams.get('page') || 1
	let sort = url.searchParams.get('sort')
	let searchData = url.searchParams.get('q')
	let location = url.searchParams.get('location')
	let query = url.searchParams
	try {
		// await KQL_Cart.resetCache()
		cart = (await KQL_Cart.query({ fetch, variables: { store: store.id } })).data.cart || {}
	} catch (e) {
		throw Error(e)
	}
	return {
		props: {
			err,
			count,
			products,
			url,
			currentPage,
			sort,
			facets,
			query,
			searchData,
			currentLocation,
			cart
		}
	}
}
</script>

<script>
import Hero from '$lib/Hero.svelte'
import { KQL_Cart, KQL_Home, KQL_Products } from '$lib/graphql/_kitql/graphqlStores'
import { onMount } from 'svelte'
import ProductCard from '$lib/components/_ProductCard.svelte'
import { store } from '$lib/util'
import CategoriesHome from '$lib/components/_CategoriesHome.svelte'
import Errors from '$lib/components/alerts/Errors.svelte'
import HeroBanners from '$lib/HeroBanners.svelte'
import Loading from '$lib/Loading.svelte'
import Info from '$lib/Info.svelte'
import ProductSkeleton from '$lib/ui/ProductSkeleton.svelte'
import Products from '$lib/Products.svelte'
import Overlay from '$lib/Overlay.svelte'
import CartBar from '$lib/CartBar.svelte'
import { get } from '$lib/util/api'
import SEO from '$lib/components/SEO/index.svelte'

const seoProps = {
	title: 'Misiki Food | Homemade',
	metadescription: 'Home made food home delivered by Misiki'
}

export let banners,
	featuredProducts = null,
	hotProducts = null,
	shoppoProducts = null,
	query,
	cart

let products = [],
	count,
	facets,
	loading,
	err

onMount(async () => {
	try {
		loading = true
		const res = await get(`products/es?${query.toString()}`)
		products = res?.data
		count = +res?.count
		facets = res?.facets.all_aggs
		err = !products ? 'No result found' : null
	} catch (e) {
	} finally {
		loading = false
	}
})
</script>

<SEO {...seoProps} />

<main>
	<section>
		<Loading active="{loading}" />
	</section>

	<section>
		<Hero closed="{store.closed}" />

		<Info />

		{#if loading}
			<div class="p-3 py-10 sm:p-10">
				<div class="container mx-auto max-w-7xl">
					<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10 md:grid-cols-3">
						{#each { length: 21 } as _}
							<div class="col-span-1">
								<ProductSkeleton />
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<Products products="{products}" showcart="{true}" cart="{cart}" />
		{/if}

		<Overlay closed="{store.closed}" />

		<CartBar />

		<div class="h-20 w-full bg-transparent sm:h-40"></div>
	</section>
</main>
