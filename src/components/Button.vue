<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
	class?: string
	variant?: 'primary' | 'secondary' | 'danger'
}

type ButtonEmits = {
	(e: 'click', event: MouseEvent): void
}

const props = defineProps<ButtonProps>()
const emit = defineEmits<ButtonEmits>()

const baseClasses = 'px-4 py-2 rounded font-semibold transition duration-200 focus:outline-none cursor-pointer'

const variants: Record<ButtonProps['variant'], string> = {
	primary: 'bg-blue-500 hover:bg-blue-600 text-white',
	secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
	danger: 'bg-red-500 hover:bg-red-600 text-white',
}

const computedClasses = computed(() => {
	return `${baseClasses} ${variants[props.variant || 'primary']} ${props.class || ''}`
})

const handleClick = (event: MouseEvent) => {
	emit('click', event)
}
</script>

<template>
	<button
		v-bind="$attrs"
		:class="computedClasses"
		@click="handleClick"
	>
		<slot />
	</button>
</template>
