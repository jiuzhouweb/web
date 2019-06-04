<template>
	<div >
		listModule
	</div>
</template>

<script>
	export default {
		name: 'listModule',
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
div{
	width: 1180px;
}
</style>
