<style scoped>
.backgroundimg {
	background: url('/food-home-banner.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
.height {
	height: 50vh;
	width: 100%;
}
.heading {
	margin-top: -90px;
	padding-bottom: 13px;
	font-size: 25px;
	/* color: snow; */
	text-align: center;
}
.link {
	outline: none;
	text-decoration: none;
	position: relative;
	font-size: 25px;
	line-height: 1;
	color: snow;
	display: inline-block;
}
.link--move {
	/* text-transform: uppercase; */
	font-weight: 900;
	overflow: hidden;
	line-height: 0.75;
	color: snow;
}
.title {
	padding: 1rem;
	background-color: rgba(0, 0, 0, 0.5);
	width: 350px;
	font-size: 2rem;
}
.link--move:hover {
	color: #b5d2f8;
}
.link--move::after {
	content: '';
	position: absolute;
	height: 16px;
	width: 100%;
	top: 50%;
	margin-top: -8px;
	right: 0;
	background: rgba(235, 109, 37, 0.5);
	transform: translate3d(-100%, 0, 0);
	transition: transform 0.4s;
	transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}

.link--move:hover::after {
	transform: translate3d(100%, 0, 0);
}
.link--move::before {
	content: attr(data-letters);
	position: absolute;
	z-index: 2;
	overflow: hidden;
	color: #424242;
	white-space: nowrap;
	width: 0%;
	transition: width 0.4s 0.3s;
}
.link--kukuri:hover::before {
	width: 100%;
}
</style>

<script>
let loading = false

export let closed = false
</script>

<body>
	<div class="backgroundimg height"></div>

	<div class="heading">
		<div class="link link--move title" data-letters="Misiki">Misiki</div>
	</div>
</body>
