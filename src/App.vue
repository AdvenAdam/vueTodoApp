<script setup lang="ts">
import { ref } from 'vue'
import Switch from './components/Switch.vue'
import Table from './components/Table.vue'
import Kanban from './components/Kanban.vue'

const currentView = ref<'table' | 'kanban'>('table')

function selectTable() {
	currentView.value = 'table'
}

function selectKanban() {
	currentView.value = 'kanban'
}
</script>

<template>
	<div class="flex justify-center flex-col items-center mb-4">
		<img
			src="./assets/logoipsum-380.svg"
			class="logo ipsum"
			alt="Ipsum logo"
		/>
		<h2 class="text-xl font-bold text-gray-800">Vue Todo App</h2>
	</div>
	<div class="flex justify-center mb-6">
		<Switch
			@kanban="selectKanban"
			@table="selectTable"
		/>
	</div>
	<div class="w-full">
		<Table v-if="currentView === 'table'" />
		<Kanban v-else />
	</div>
</template>
