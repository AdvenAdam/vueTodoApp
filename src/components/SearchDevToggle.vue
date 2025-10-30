<template>
	<div class="relative flex items-center">
		<button
			v-if="!active"
			@click="activateSearch"
			class="flex items-center justify-center rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition-all duration-200"
		>
			<User class="h-5 w-5" />
		</button>

		<div
			v-else
			class="flex items-center rounded-full border border-gray-300 bg-white pl-3 pr-2 shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-200"
			:class="active ? 'w-56' : 'w-10'"
		>
			<select
				ref="input"
				v-model="selected"
				class="ml-2 w-full min-h-8 bg-transparent text-sm text-gray-700 focus:outline-none"
				@change="onSelect"
				@keydown.esc="deactivateSearch"
				@blur="deactivateSearch"
			>
				<option
					value=""
					disabled
					hidden
				>
					Search Developer
				</option>
				<option
					v-for="option in options"
					:key="option.value"
					:value="option.value"
				>
					{{ option.label }}
				</option>
			</select>

			<button
				v-if="selected"
				@click="clearSelection"
				class="ml-1 text-gray-400 hover:text-gray-600 transition"
			>
				<X class="h-4 w-4" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { User, X } from 'lucide-vue-next'

const emit = defineEmits(['search'])
const props = defineProps({
	options: {
		type: Array,
		required: true,
		default: () => [],
	},
})

const active = ref(false)
const selected = ref('')
const input = ref(null)

const activateSearch = async () => {
	active.value = true
	await nextTick()
	input.value?.focus()
}

const deactivateSearch = () => {
	if (!selected.value) active.value = false
}

const clearSelection = () => {
	selected.value = ''
	emit('search', '')
	input.value?.focus()
}

const onSelect = () => {
	emit('search', selected.value)
}
</script>
