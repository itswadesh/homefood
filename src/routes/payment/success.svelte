<style>
.success-animation {
	margin: 150px auto;
}

.checkmark {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	display: block;
	stroke-width: 4;
	stroke: #4bb71b;
	stroke-miterlimit: 10;
	box-shadow: inset 0px 0px 0px #4bb71b;
	animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both;
	position: relative;
	top: 5px;
	right: 5px;
	margin: 0 auto;
}

.checkmark__circle {
	stroke-dasharray: 166;
	stroke-dashoffset: 166;
	stroke-width: 4;
	stroke-miterlimit: 10;
	stroke: #4bb71b;
	fill: #fff;
	animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark__check {
	transform-origin: 50% 50%;
	stroke-dasharray: 48;
	stroke-dashoffset: 48;
	animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
	100% {
		stroke-dashoffset: 0;
	}
}

@keyframes scale {
	0%,
	100% {
		transform: none;
	}

	50% {
		transform: scale3d(1.1, 1.1, 1);
	}
}

@keyframes fill {
	100% {
		box-shadow: inset 0px 0px 0px 30px #4bb71b;
	}
}
</style>

<script context="module" lang="ts">
export async function load({ url, params, fetch, session, context }) {
	let orderId = url.searchParams.get('order_id')
	let paymentReferenceId = url.searchParams.get('payment_reference_id')
	let addressId = url.searchParams.get('address')
	let loading, err, address, order

	console.log('orderId = ', orderId)

	try {
		loading = true

		order = (
			await KQL_PaySuccessPageHit.mutate({
				fetch,
				variables: {
					orderId: orderId,
					paymentReferenceId: paymentReferenceId || null
				}
			})
		).data?.paySuccessPageHit

		console.log('Order = ', order)
	} catch (e) {
		err = e
	} finally {
		loading = false
	}
	return { props: { loading, address, err, order } }
}
</script>

<script>
import ImageLoader from '$lib/components/Image/ImageLoader.svelte'
import { KQL_Address, KQL_PaySuccessPageHit } from '$lib/graphql/_kitql/graphqlStores'
import PrimaryButton from '$lib/ui/PrimaryButton.svelte'
import { currency, store } from '$lib/util'

export let loading, err, order
</script>

{#if order}
	<div class="container mx-auto w-full max-w-6xl px-4 py-5 pb-10 text-gray-800 sm:px-10 md:py-10 ">
		<!-- {#if !order && loading}
			<OrderSuccessSkeleton />
		{/if} -->

		<div class="text-center">
			<div class="mb-5 sm:mb-10">
				<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
					<circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"></circle>

					<path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
				</svg>
			</div>
			{#if order}
				<h2 class="mb-5 text-2xl font-bold sm:text-3xl">Thank You For Your Purchase !!</h2>
			{/if}
			<h5 class="mb-2 flex items-center justify-center space-x-2 text-sm sm:text-base">
				<span class="text-gray-500">Order Number:</span>

				<b>
					{order.orderNo}
				</b>
			</h5>

			<p class="mb-4 text-sm sm:mb-9">
				Your Order was place on <b>{order.createdAt}</b> <br />

				A Confirmation e-mail will be sent to the e-mail address that you specified in Order
				details.
			</p>

			<div class="mb-4 flex flex-wrap items-center justify-center text-sm sm:mb-7 sm:text-base">
				<a href="/my/orders" rel="noopener" class="m-1 sm:m-3">
					<PrimaryButton class="whitespace-nowrap">View Order Details</PrimaryButton>
				</a>

				<a href="/" rel="noopener" class="m-1 sm:m-3">
					<button
						class="flex transform items-center justify-center space-x-1 whitespace-nowrap rounded-md border border-gray-700 bg-white px-4 py-2 font-semibold tracking-wide text-gray-800 shadow-md transition duration-300 hover:border-primary-500 hover:bg-opacity-80 hover:text-primary-500 hover:shadow focus:outline-none focus:ring-0 focus:ring-offset-0 active:scale-95">
						Continue Shopping
					</button>
				</a>
			</div>
		</div>

		<div
			class="mx-auto max-w-7xl space-y-5 sm:flex sm:items-start sm:justify-center sm:space-y-0 sm:space-x-10 md:space-x-20">
			<div class="sm:w-1/2">
				<div class="mb-5">
					<h6
						class="mb-4 border-b border-dashed border-gray-400 pb-2 text-base font-semibold sm:text-lg">
						Item Details
					</h6>

					<div class="itmes-start flex flex-col gap-4">
						{#each order.items as item, ix}
							<a
								href="/products/{item.slug}?id={item.pid}"
								rel="noopener"
								class="group flex w-full flex-row justify-between
								
								{ix != order.items.length - 1 ? 'border-b' : ''}">
								<div class="flex w-full flex-row gap-4">
									<div>
										<ImageLoader src="{item.imgCdn}" alt="" class="h-auto w-20 object-contain" />
									</div>

									<div class="w-4/5 flex-1 lg:w-10/12">
										{#if store.isFnb && item.vendor}
											<b class="mb-2 text-sm">
												{item.vendor.businessName}
											</b>
										{:else if item.brandName}
											<b class="mb-2 text-sm">
												{item.brandName}
											</b>
										{/if}

										<div class="mb-2 flex items-start gap-2">
											<a
												href="/products/{item.slug}?id={item.pid}"
												class="text-sm text-gray-500 group-hover:underline">
												{item.name}
											</a>

											{#if store.isFnb}
												<div>
													{#if item.foodType === 'V'}
														<ImageLoader src="/product/veg.png" alt="veg" class="h-5 w-5" />
													{:else if item.foodType === 'N' || item.foodType === 'E'}
														<ImageLoader src="/product/non-veg.png" alt="veg" class="h-5 w-5" />
													{:else}
														<ImageLoader src="/product/other.png" alt="veg" class="h-5 w-5" />
													{/if}
												</div>
											{/if}
										</div>

										<div class="mb-2 flex w-full items-center gap-4 text-sm">
											<div class="me-4">
												<span class="font-medium text-gray-500 me-2">Qty :</span>

												<b>{item.qty}</b>
											</div>

											<div>
												<span class="font-medium text-gray-500 me-2">Price :</span>

												<b>{currency(item.price)}</b>
											</div>
										</div>

										<!-- Options -->

										{#if item.usedOptions}
											<div class="mb-2 flex flex-col space-y-2 text-sm sm:mb-4">
												{#each item.usedOptions as o}
													<div class="flex flex-col items-start sm:flex-row">
														<h6 class="mb-1 w-full sm:mb-0 sm:w-52 sm:me-5">
															{o.name}
														</h6>

														{#if o.val && o.val.length}
															<span class="font-medium">
																{o.val[0]}
															</span>
														{/if}

														<div class="flex flex-col space-y-1 font-medium">
															{#if o.dates && o.dates[0]}
																<span>
																	{o.dates[0]}
																</span>
															{/if}

															{#if o.dates && o.dates[1]}
																<span>
																	{o.dates[1]}
																</span>
															{/if}
														</div>
													</div>
												{/each}
											</div>
										{/if}
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-4 sm:w-1/2">
				{#if order && order.address}
					<div class="text-sm">
						<h6
							class="mb-4 border-b border-dashed border-gray-400 pb-2 text-base font-semibold sm:text-lg">
							Shipping Information
						</h6>

						<div class="text-sm text-gray-600">
							{#if order.address.firstName}
								<h5 class="mb-2 text-base font-semibold capitalize tracking-wide">
									{order.address.firstName}

									{order.address.lastName}
								</h5>
							{/if}

							<div class="s flex flex-wrap">
								{#if order.address.address}
									<div>
										{order.address.address},
									</div>
								{/if}

								{#if order.address.city}
									<div>
										{order.address.city},
									</div>
								{/if}

								{#if order.address.country}
									<div>
										{order.address.country}
									</div>
								{/if}

								{#if order.address.zip}
									<div>
										{order.address.zip}
									</div>
								{/if}
							</div>

							{#if order.address.phone || order.address.userPhone}
								<div>
									<b>Phone:</b>

									<span>{order.address.phone || order.userPhone}</span>
								</div>
							{/if}

							{#if order.address.email}
								<div>
									<b>Email:</b>

									<span>{order.address.email}</span>
								</div>
							{/if}
						</div>
					</div>
				{/if}

				{#if order && order.amount}
					<div class="text-sm">
						<h6
							class="mb-4 border-b border-dashed border-gray-400 pb-2 text-base font-semibold sm:text-lg">
							Payment Information
						</h6>

						<div class="flex max-w-max flex-col items-start gap-2">
							{#if order.amount.subtotal}
								<div class="flex items-center">
									<h6 class="mr-2 w-20">Subtotal</h6>

									<span>: &nbsp; {currency(order.amount.subtotal)} </span>
								</div>
							{/if}

							{#if order.amount.discount}
								<div class="flex items-center">
									<h6 class="mr-2 w-20">Discount</h6>

									<span>: &nbsp; {currency(order.amount.discount)} </span>
								</div>
							{/if}

							{#if order.amount.shipping}
								<div class="flex items-center">
									<h6 class="mr-2 w-20">Shipping</h6>

									<span>: &nbsp; {currency(order.amount.shipping)} </span>
								</div>
							{/if}

							{#if order.amount.total}
								<hr class="w-full border-t-2 border-gray-300" />

								<div class="flex items-center text-base font-bold">
									<h6 class="mr-2 w-20">Total</h6>

									<span>: &nbsp; {currency(order.amount.total)} </span>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
