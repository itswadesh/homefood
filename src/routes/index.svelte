<script context="module">
import Cookie from 'cookie-universal'
const cookies = Cookie()

export async function load({ url, params, fetch, session, context, cookie }) {
	let err, count, products, facets, currentLocation
	let currentPage = url.searchParams.get('page') || 1
	let sort = url.searchParams.get('sort')
	let searchData = url.searchParams.get('q')
	let location = url.searchParams.get('location')
	let query = url.searchParams
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
			currentLocation
		}
	}
}
</script>

<script>
import Hero from '$lib/Hero.svelte'
// import SEO from '$lib/components/SEO/index.svelte'
import { KQL_Home, KQL_Products } from '$lib/graphql/_kitql/graphqlStores'
import { onMount } from 'svelte'
import ProductCard from '$lib/components/_ProductCard.svelte'
import { store } from '$lib/util'
import CategoriesHome from '$lib/components/_CategoriesHome.svelte'
import Errors from '$lib/components/alerts/Errors.svelte'
import HeroBanners from '$lib/HeroBanners.svelte'
import Loading from '$lib/Loading.svelte'
import Info from '$lib/Info.svelte'
import Skeleton from '$lib/ui/Skeleton.svelte'
import Products from '$lib/Products.svelte'
import Overlay from '$lib/Overlay.svelte'
import CartBar from '$lib/CartBar.svelte'
import { get } from '$lib/util/api'
const seoProps = {
	title: 'Misiki Food | Homemade',
	metadescription: 'Home made food home delivered by Misiki'
}
export let banners,
	featuredProducts = null,
	hotProducts = null,
	shoppoProducts = null,
	query

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
<div>
	<Loading active="{loading}" />
	<div>
		<Hero closed="{store.closed}" />
		<Info />
		{#if loading}
			<Skeleton />
		{:else}
			<Products products="{products}" showcart="{true}" />
		{/if}
		<Overlay closed="{store.closed}" />
		<CartBar />
	</div>
</div>
