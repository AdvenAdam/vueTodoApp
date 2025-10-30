<script setup lang="ts">
import { ref } from 'vue'
import ToolbarButton from './ToolbarButton.vue'

const selected = ref<'table' | 'kanban'>('kanban')

const emit = defineEmits<{
	(mode: 'table' | 'kanban'): void
}>()

function select(mode: 'table' | 'kanban') {
	selected.value = mode
	emit(mode)
}
</script>

<template>
	<div class="flex items-center bg-white shadow rounded-lg p-2 space-x-4 w-fit">
		<div class="flex items-center space-x-2">
			<ToolbarButton
				icon="table"
				label="Table"
				:selected="selected === 'table'"
				@click="select('table')"
			/>
			<ToolbarButton
				icon="kanban"
				label="Kanban"
				:selected="selected === 'kanban'"
				@click="select('kanban')"
			/>
		</div>
	</div>
</template>
