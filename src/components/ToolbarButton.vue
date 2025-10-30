<script setup>
import { computed } from 'vue'

import { Archive, Trash2, Star, ArrowRight, Grid, Copy, Upload, Repeat } from 'lucide-vue-next'

const props = defineProps({
	icon: String,
	label: String,
	disabled: Boolean,
})

const iconComponent = computed(() => {
	switch (props.icon) {
		case 'archive':
			return Archive
		case 'trash':
			return Trash2
		case 'star':
			return Star
		case 'arrow-right':
			return ArrowRight
		case 'apps':
			return Grid
		case 'duplicate':
			return Copy
		case 'export':
			return Upload
		case 'convert':
			return Repeat
		default:
			return null
	}
})
</script>
<template>
	<button
		:class="['flex items-center space-x-1 p-2 rounded hover:bg-gray-100', disabled ? 'opacity-50 cursor-not-allowed' : '']"
		:disabled="disabled"
		@click="$emit('click')"
	>
		<component
			:is="iconComponent"
			class="w-5 h-5 text-gray-600"
		/>
		<span class="text-gray-700 text-sm">{{ label }}</span>
	</button>
</template>
