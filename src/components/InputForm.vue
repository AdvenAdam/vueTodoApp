<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { X } from 'lucide-vue-next'
import Button from './Button.vue'

const emit = defineEmits<{
	(e: 'close'): void
	(e: 'submit', data: { name: string; email: string }): void
}>()

const visible = ref(false)
const form = ref({ name: '', email: '' })

const open = () => {
	visible.value = true
}

const close = () => {
	visible.value = false
	emit('close')
}

const submitForm = () => {
	emit('submit', { ...form.value })
	close()
}

defineExpose({ open, close })
</script>

<template>
	<div
		v-if="visible"
		class="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
	>
		<div class="bg-white flex flex-col justify-start rounded-lg shadow-lg w-xl p-6 relative">
			<button
				@click="close"
				class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
			>
				<X class="w-5 h-5 cursor-pointer" />
			</button>

			<h2 class="text-xl font-semibold mb-4">Add Task</h2>

			<form
				@submit.prevent="submitForm"
				class="flex flex-col gap-4"
			>
				<div class="text-start">
					<label class="text-sm font-medium text-gray-700">Task</label>
					<input
						v-model="form.name"
						type="text"
						name="title"
						class="mt-1 min-h-10 p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
						required
					/>
				</div>

				<div class="text-start">
					<label class="text-sm font-medium text-gray-700">Developer</label>
					<input
						v-model="form.developer"
						type="text"
						name="developer"
						class="mt-1 min-h-10 p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
						required
					/>
				</div>
				<div class="text-start">
					<label class="text-sm font-medium text-gray-700">Priority</label>
					<select
						v-model="form.priority"
						name="priority"
						class="mt-1 min-h-10 p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
						required
					>
						<option
							value=""
							disabled
						>
							Select Priority
						</option>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
						<option value="Critical">Critical</option>
						<option value="Best Effort">Best Effort</option>
					</select>
				</div>
				<div class="text-start">
					<label class="text-sm font-medium text-gray-700">Type</label>
					<select
						v-model="form.type"
						name="type"
						class="mt-1 min-h-10 p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
						required
					>
						<option
							value=""
							disabled
						>
							Select Type
						</option>
						<option value="Feature Enhancements">Feature Enhancements</option>
						<option value="Bug">Bug</option>
						<option value="Other">Other</option>
					</select>
				</div>
				<div class="text-start">
					<label class="text-sm font-medium text-gray-700">Priority</label>
					<select
						v-model="form.priority"
						name="priority"
						class="mt-1 min-h-10 p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
						required
					>
						<option
							value=""
							disabled
						>
							Select Priority
						</option>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
						<option value="Critical">Critical</option>
						<option value="Best Effort">Best Effort</option>
					</select>
				</div>

				<div class="text-start">
					<label class="text-sm font-medium text-gray-700">Estimated SP</label>
					<input
						v-model="form.estimatedSP"
						type="number"
						name="estimatedSP"
						class="mt-1 min-h-10 p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
						required
					/>
				</div>
				<div class="text-start">
					<label class="text-sm font-medium text-gray-700">Ectual SP</label>
					<input
						v-model="form.actualSP"
						type="number"
						name="actualSP"
						class="mt-1 min-h-10 p-2 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500"
						required
					/>
				</div>
				<Button variant="primary"> Add Task </Button>
			</form>
		</div>
	</div>
</template>
