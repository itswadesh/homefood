<script>
import { onMount } from 'svelte'

import { KQL_Settings } from './graphql/_kitql/graphqlStores'
import GradiantButton from './ui/GradiantButton.svelte'
import { store } from './util'
onMount(async () => {
	try {
		await KQL_Settings.query({ fetch })
	} catch (e) {}
})
</script>

<div class="p-3 py-10 text-gray-800 sm:p-10">
	<div class="container mx-auto flex max-w-7xl flex-col items-center justify-center">
		<div class="mb-5 text-center capitalize">
			<p><b>Home made food, Home delivered</b> <br /> Delivery only to Sunabeda Township</p>
		</div>
		<a
			href="{$KQL_Settings.data?.settings?.ADMIN_PANEL_LINK}?role=vendor&store={store.id}"
			target="_blank"
			rel="noopener noreferrer external">
			<GradiantButton class="w-60">Join as Chef</GradiantButton>
		</a>
	</div>
</div>
