<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import ToolbarButton from './ToolbarButton.vue'

const props = defineProps<{
	selectedCount: number
}>()

const emit = defineEmits<{
	(e: 'export'): void
	(e: 'archive'): void
	(e: 'delete'): void
	(e: 'close'): void
}>()
</script>

<template>
	<div
		class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 opacity-0 translate-y-4 blur-sm"
		:class="selectedCount ? 'animate-fade-up' : ''"
	>
		<div class="flex items-center bg-white shadow rounded-lg p-2 space-x-4">
			<div class="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-medium">
				{{ props.selectedCount }}
			</div>
			<span class="font-medium text-gray-700"> Task{{ props.selectedCount > 1 ? 's' : '' }} selected </span>

			<div class="border-l border-gray-300 h-6"></div>

			<div class="flex items-center space-x-2">
				<ToolbarButton
					icon="export"
					label="Export"
					@click="$emit('export')"
				/>
				<ToolbarButton
					icon="archive"
					label="Archive"
					@click="$emit('archive')"
				/>
				<ToolbarButton
					icon="trash"
					label="Delete"
					@click="$emit('delete')"
				/>
			</div>

			<button
				class="ml-auto p-2 rounded hover:bg-gray-100"
				@click="$emit('close')"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-gray-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>
