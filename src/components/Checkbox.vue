<script setup lang="ts">
import { Check } from 'lucide-vue-next'

const props = defineProps<{
	modelValue: boolean
	disabled?: boolean
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void
	(e: 'change', value: boolean): void
}>()

function onChange(e: Event) {
	const value = (e.target as HTMLInputElement).checked
	emit('update:modelValue', value)
	emit('change', value)
}
</script>

<template>
	<label class="relative flex items-center cursor-pointer select-none">
		<input
			type="checkbox"
			class="sr-only peer"
			:checked="modelValue"
			@change="onChange"
			:disabled="disabled"
		/>
		<div
			class="w-5 h-5 rounded-md border border-gray-400 bg-gray-200 peer-checked:bg-blue-600 peer-disabled:opacity-50 hover:border-blue-500 transition duration-200"
		></div>
		<Check class="absolute left-1 top-1 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
	</label>
</template>
