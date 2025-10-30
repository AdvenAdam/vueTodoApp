<script setup lang="ts">
import { ref } from 'vue'
import Switch from './components/Switch.vue'
import Table from './components/Table.vue'
import Kanban from './components/Kanban.vue'

const currentView = ref<'table' | 'kanban'>('table')
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
			@kanban="() => (currentView = 'kanban')"
			@table="() => (currentView = 'table')"
		/>
	</div>

	<div class="w-full relative min-h-[500px]">
		<!-- Table -->
		<div
			v-if="currentView === 'table'"
			class="w-full transform transition-all duration-500 ease-out opacity-0 translate-y-4 blur-sm animate-fade-up"
		>
			<Table class="w-full" />
		</div>

		<!-- Kanban -->
		<div
			v-if="currentView === 'kanban'"
			class="w-full transform transition-all duration-500 ease-out opacity-0 translate-y-4 blur-sm animate-fade-up"
		>
			<Kanban class="w-full" />
		</div>
	</div>
</template>

<style scoped>
@keyframes fadeUp {
	0% {
		opacity: 0;
		transform: translateY(16px);
		filter: blur(4px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
		filter: blur(0);
	}
}

.animate-fade-up {
	animation: fadeUp 0.5s ease-out forwards;
}
</style>
