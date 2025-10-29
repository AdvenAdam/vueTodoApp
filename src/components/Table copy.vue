<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { CircleDot, Check } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../store/task'
import { useSelectionStore } from '../store/selection'
import Button from './Button.vue'
import Checkbox from './Checkbox.vue'
import Badge from './Badge.vue'
import type { Task } from '../types'

const store = useTaskStore()
const selectionStore = useSelectionStore()
const newTask = ref<Partial<Task> | null>(null)

const { tasks, loading, error } = storeToRefs(store)

onMounted(async () => {
	await store.fetchTasks()
})

const allChecked = computed(() => tasks.value.length > 0 && selectionStore.selectedTasks.length === tasks.value.length)

const toggleAll = () => selectionStore.toggleAll(tasks.value)

const toggleRowSelection = (task: any, index: number, checked: boolean) => selectionStore.toggleRow(task, index, checked)

const statusVariant = (status: Task['status']) => {
	switch (status) {
		case 'Ready to Start':
			return 'gray'
		case 'In Progress':
			return 'yellow'
		case 'Waiting for review':
			return 'blue'
		case 'Pending Deploy':
			return 'purple'
		case 'Done':
			return 'green'
		case 'Stuck':
			return 'red'
		default:
			return 'gray'
	}
}

const priorityVariant = (priority: Task['priority']) => {
	switch (priority) {
		case 'Low':
			return 'blue'
		case 'Medium':
			return 'purple'
		case 'High':
			return 'yellow'
		case 'Critical':
			return 'red'
		case 'Best Effort':
			return 'gray'
		default:
			return 'gray'
	}
}
const typeVariant = (type: Task['type']) => {
	switch (type) {
		case 'Feature Enhancements':
			return 'green'
		case 'Bug':
			return 'red'
		case 'Other':
			return 'gray'
		default:
			return 'gray'
	}
}

const addNewTaskRow = () => {
	newTask.value = {
		title: `New Task`,
		developer: [],
		status: 'Ready to Start',
		priority: 'Low',
		type: 'Other',
		date: '',
		estimatedSP: 0,
		actualSP: 0,
	}

	if (newTask.value && newTask.value.title) {
		tasks.value.unshift(newTask.value as Task)
		newTask.value = null
	}
}
</script>

<template>
	<div class="flex items-center mb-4">
		<Button
			variant="primary"
			@click="addNewTaskRow"
		>
			Add Task
		</Button>
	</div>
	<div class="flex flex-col">
		<div class="overflow-x-auto pb-4">
			<div class="min-w-full inline-block align-middle">
				<div class="overflow-hidden border rounded-lg border-gray-300">
					<table class="table-auto min-w-full rounded-xl">
						<thead>
							<tr class="bg-gray-50">
								<th class="p-5 text-left">
									<Checkbox
										:modelValue="allChecked"
										@change="(checked) => selectionStore.toggleAll(tasks, checked)"
									/>
								</th>

								<th class="th-text">Task</th>
								<th class="th-text">Developer</th>
								<th class="th-text">Status</th>
								<th class="th-text">Priority</th>
								<th class="th-text">Type</th>
								<th class="th-text">Date</th>
								<th class="th-text">Est. SP</th>
								<th class="th-text">Actual SP</th>
							</tr>
						</thead>

						<tbody
							v-if="!loading"
							class="divide-y divide-gray-300"
						>
							<tr
								v-if="newTask"
								class="bg-gray-50 transition-all duration-300"
							>
								<td class="p-5"></td>
								<td class="p-2">
									<input
										v-model="newTask.title"
										class="border rounded px-2 py-1 w-full"
										placeholder="Task title"
									/>
								</td>
								<td class="p-2">
									<input
										v-model="newTask.developer"
										class="border rounded px-2 py-1 w-full"
										placeholder="Developer(s)"
									/>
								</td>
								<td class="p-2">
									<select
										v-model="newTask.status"
										class="border rounded px-2 py-1 w-full"
									>
										<option>Ready to Start</option>
										<option>In Progress</option>
										<option>Waiting for review</option>
										<option>Pending Deploy</option>
										<option>Done</option>
										<option>Stuck</option>
									</select>
								</td>
								<td class="p-2">
									<select
										v-model="newTask.priority"
										class="border rounded px-2 py-1 w-full"
									>
										<option>Low</option>
										<option>Medium</option>
										<option>High</option>
										<option>Critical</option>
										<option>Best Effort</option>
									</select>
								</td>
								<td class="p-2">
									<select
										v-model="newTask.type"
										class="border rounded px-2 py-1 w-full"
									>
										<option>Feature Enhancements</option>
										<option>Bug</option>
										<option>Other</option>
									</select>
								</td>
								<td class="p-2">
									<input
										type="date"
										v-model="newTask.date"
										class="border rounded px-2 py-1 w-full"
									/>
								</td>
								<td class="p-2">
									<input
										type="number"
										v-model.number="newTask.estimatedSP"
										class="border rounded px-2 py-1 w-full"
									/>
								</td>
								<td class="p-2">
									<input
										type="number"
										v-model.number="newTask.actualSP"
										class="border rounded px-2 py-1 w-full"
									/>
								</td>
							</tr>
							<template v-if="tasks.length">
								<tr
									v-for="(task, index) in tasks"
									:key="task.title + index"
									class="bg-white transition-all duration-300 hover:bg-gray-50"
								>
									<td class="p-5">
										<Checkbox
											:modelValue="selectionStore.selectedTasks.some((t) => t.row === index + 1)"
											@change="(checked) => toggleRowSelection(task, index, checked)"
										/>
									</td>

									<td class="p-5 font-medium text-gray-800">{{ task.title }}</td>
									<td class="p-5">
										<span class="text-sm text-gray-700">
											{{ Array.isArray(task.developer) ? task.developer.join(', ') : task.developer }}
										</span>
									</td>

									<td class="p-5">
										<Badge
											:text="task.status"
											:variant="statusVariant(task.status)"
										/>
									</td>

									<td class="p-5">
										<Badge
											:text="task.priority"
											:variant="priorityVariant(task.priority)"
										/>
									</td>

									<td class="p-5">
										<Badge
											:text="task.type"
											:variant="typeVariant(task.type)"
										/>
									</td>

									<td class="p-5 text-sm text-gray-600">
										{{ task.date || '-' }}
									</td>

									<td class="p-5 text-center text-gray-700">{{ task.estimatedSP }}</td>
									<td class="p-5 text-center text-gray-700">{{ task.actualSP }}</td>
								</tr>
							</template>

							<tr v-if="loading">
								<td
									colspan="9"
									class="text-center py-10 text-gray-500"
								>
									Loading tasks...
								</td>
							</tr>
							<tr v-if="error">
								<td
									colspan="9"
									class="text-center py-10 text-gray-500"
								>
									Error loading tasks {{ error }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
