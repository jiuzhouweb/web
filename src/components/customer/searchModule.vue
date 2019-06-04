<template>
	<div class='search_contain'>
		searchModule
	</div>
</template>

<script>
	export default {
		name: 'searchModule',
		data() {
			return {
				form: {
					region: '',
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style scoped>
div.search_contain{
	width: 1180px;
}
</style>
