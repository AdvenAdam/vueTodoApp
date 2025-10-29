<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Table from './components/Table.vue'
import Button from './components/Button.vue'
import { ref } from 'vue'

import MultiSelect from './components/MultiSelect.vue'

const options = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'orange', label: 'Orange' },
]

const selectedItems = ref([])
</script>

<template>
	<div class="flex justify-center items-center mb-4">
		<img
			src="./assets/logoipsum-380.svg"
			class="logo ipsum"
			alt="Ipsum logo"
		/>
	</div>
	<div>
		<MultiSelect
			v-model="selectedItems"
			:options="options"
			label="Select Fruits"
		/>
		<p>Selected: {{ selectedItems }}</p>
	</div>

	<Table />
</template>
