<template>
	<div class="relative flex items-center">
		<button
			v-if="!active"
			@click="activateSearch"
			class="flex items-center justify-center rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 transition-all duration-200"
		>
			<Search class="h-5 w-5" />
		</button>

		<div
			v-else
			class="flex items-center rounded-full border border-gray-300 bg-white pl-3 pr-2 shadow-sm transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-200"
			:class="active ? 'w-56' : 'w-10'"
		>
			<Search class="h-4 w-4 text-gray-400" />

			<input
				ref="input"
				v-model="query"
				type="text"
				placeholder="Search Task ..."
				class="ml-2 w-full min-h-8 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
				@input="onInput"
				@keydown.esc="deactivateSearch"
				@blur="deactivateSearch"
			/>

			<button
				v-if="query"
				@click="clearQuery"
				class="ml-1 text-gray-400 hover:text-gray-600 transition"
			>
				<X class="h-4 w-4" />
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { Search, X } from 'lucide-vue-next'

const emit = defineEmits(['search'])
const query = ref('')
const active = ref(false)
const input = ref(null)
let debounceTimer = null

const activateSearch = async () => {
	active.value = true
	await nextTick()
	input.value?.focus()
}

const deactivateSearch = () => {
	if (!query.value.trim()) active.value = false
}

const clearQuery = () => {
	query.value = ''
	emit('search', '')
	input.value?.focus()
}

const onInput = () => {
	clearTimeout(debounceTimer)
	debounceTimer = setTimeout(() => {
		emit('search', query.value.trim())
	}, 300)
}
</script>
