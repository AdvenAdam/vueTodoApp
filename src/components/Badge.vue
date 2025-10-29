<script setup lang="ts">
import { defineProps } from 'vue'
import { CircleDot } from 'lucide-vue-next'

const props = defineProps<{
	text: string
	variant: 'gray' | 'yellow' | 'blue' | 'purple' | 'green' | 'red'
}>()

const statusClasses: Record<typeof props.variant, string> = {
	gray: 'bg-gray-100 text-gray-600',
	yellow: 'bg-yellow-50 text-yellow-600',
	blue: 'bg-blue-50 text-blue-600',
	purple: 'bg-purple-50 text-purple-600',
	green: 'bg-emerald-50 text-emerald-600',
	red: 'bg-red-50 text-red-600',
}
</script>

<template>
	<div
		class="py-1.5 px-2.5 rounded-full flex justify-center items-center gap-1 w-fit text-xs font-medium"
		:class="statusClasses[variant]"
	>
		<CircleDot class="w-4 h-4" />
		<span class="font-medium text-xs whitespace-nowrap">{{ text }} </span>
	</div>
</template>
