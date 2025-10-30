<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { CircleDot } from 'lucide-vue-next'

const props = defineProps<{
	text: string
	variant: 'gray' | 'yellow' | 'blue' | 'purple' | 'green' | 'emerald' | 'red'
	size?: 'small' | 'medium'
}>()

const statusClasses: Record<typeof props.variant, string> = {
	gray: 'bg-gray-100 text-gray-600',
	yellow: 'bg-yellow-50 text-yellow-600',
	blue: 'bg-blue-50 text-blue-600',
	purple: 'bg-purple-50 text-purple-600',
	green: 'bg-emerald-50 text-emerald-600',
	emerald: 'bg-emerald-50 text-emerald-600',
	red: 'bg-red-50 text-red-600',
}

const sizeClasses = computed(() => {
	switch (props.size) {
		case 'small':
			return 'py-1 px-2 text-[10px] gap-0.5 w-fit'
		case 'medium':
		default:
			return 'py-1.5 px-2.5 text-xs gap-1 w-fit'
	}
})

const iconSize = computed(() => (props.size === 'small' ? 'w-3 h-3' : 'w-4 h-4'))
</script>

<template>
	<div
		class="rounded-full flex justify-center items-center font-medium"
		:class="[statusClasses[props.variant], sizeClasses]"
	>
		<CircleDot :class="iconSize" />
		<span class="font-medium whitespace-nowrap">{{ text }}</span>
	</div>
</template>
