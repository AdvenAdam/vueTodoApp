<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Table from './components/Table.vue'
import Button from './components/Button.vue'
import Toolbar from './components/Toolbar.vue'
</script>

<template>
	<div class="flex justify-center items-center mb-4">
		<img
			src="./assets/logoipsum-380.svg"
			class="logo ipsum"
			alt="Ipsum logo"
		/>
	</div>

	<Table />
	<!-- <Toolbar /> -->
</template>
