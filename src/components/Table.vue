<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { CircleDot, Check, Pencil } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../store/task'
import { useSelectionStore } from '../store/selection'
import Button from './Button.vue'
import Checkbox from './Checkbox.vue'
import Badge from './Badge.vue'
import type { Task } from '../types'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Multiselect from './Multiselect.vue'
import Toolbar from './Toolbar.vue'

const store = useTaskStore()
const selectionStore = useSelectionStore()
const newTask = ref<Partial<Task> | null>(null)

const { tasks, loading, error } = storeToRefs(store)

onMounted(async () => {
	await store.fetchTasks()
})
const allDevelopers = computed(() => {
	const devSet = new Set<string>()
	tasks.value.forEach((task) => {
		if (Array.isArray(task.developer)) {
			task.developer.forEach((dev) => devSet.add(dev))
		} else if (task.developer) {
			devSet.add(task.developer)
		}
	})
	return Array.from(devSet).map((dev) => ({ value: dev, label: dev }))
})
const allStatuses = ['Ready to Start', 'In Progress', 'Waiting for review', 'Pending Deploy', 'Done', 'Stuck']

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

	store.addTask(newTask.value as Task)
	newTask.value = null
	selectionStore.updateRows()
}

const editingCell = ref<{ row: number; field: keyof Task } | null>(null)
const localEditValue = ref<string | number | string[] | null>(null)
const inputRefs = ref<{ [key: string]: HTMLInputElement | null }>({})

const enableEdit = (row: number, field: keyof Task) => {
	editingCell.value = { row, field }
	const value = store.tasks[row][field]

	if (field === 'developer') {
		localEditValue.value = Array.isArray(value) ? value.map((dev) => ({ value: dev, label: dev })) : value ? [{ value, label: value }] : []
	} else if (Array.isArray(value)) {
		localEditValue.value = value.join(', ')
	} else if (typeof value === 'string') {
		localEditValue.value = value || ''
	} else {
		localEditValue.value = value || null
	}
	nextTick(() => {
		if (field !== 'developer') {
			console.log('met here')
			const key = `${row}-${field}`
			inputRefs.value?.focus?.()
			inputRefs.value?.select?.()
		}
	})
}

const finishEdit = (row: number, field: keyof Task) => {
	const task = { ...store.tasks[row] }

	if (field === 'developer') {
		task.developer = Array.isArray(localEditValue.value) ? (localEditValue.value as Array<{ value: string; label: string }>).map((d) => d.value) : []
	} else if (field === 'date') {
		if (localEditValue.value) {
			const date = new Date(localEditValue.value)
			const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }
			task.date = new Intl.DateTimeFormat('en-US', options).format(date)
		} else {
			task.date = ''
		}
	} else if (field === 'estimatedSP' || field === 'actualSP') {
		task[field] = Number(localEditValue.value) || 0
	} else {
		task[field] = localEditValue.value || ''
	}

	store.tasks[row] = task

	store.updateTask(task)
	editingCell.value = null
}

const onExport = () => {
	console.log('Export clicked')
}
const onArchive = () => {
	console.log('Archive clicked')
}
const onDelete = () => {
	const rowsToDelete = selectionStore.selectedTasks.sort((a, b) => b - a)

	rowsToDelete.forEach((row) => {
		store.tasks.splice(row, 1)
	})

	selectionStore.clearSelection()
}

const onClose = () => {
	selectionStore.selectedTasks = []
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
	<div class="flex flex-col max-w-screen-2xl mx-auto">
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
								<th class="th-text w-64">Task</th>
								<th class="th-text">Developer</th>
								<th class="th-text">Status</th>
								<th class="th-text">Priority</th>
								<th class="th-text">Type</th>
								<th class="th-text w-40">Date</th>
								<th class="th-text w-32">Est. SP</th>
								<th class="th-text w-32">Actual SP</th>
							</tr>
						</thead>

						<tbody
							v-if="!loading"
							class="divide-y divide-gray-300"
						>
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

									<td
										class="p-5 font-medium text-gray-800 group cursor-pointer"
										@click="enableEdit(index, 'title')"
									>
										<template v-if="editingCell?.row === index && editingCell?.field === 'title'">
											<input
												ref="el => inputRefs.value[`${index}-title`] = el"
												type="text"
												v-model="localEditValue"
												@blur="finishEdit(index, 'title')"
												@keyup.enter="finishEdit(index, 'title')"
												class="border p-1 rounded w-full"
												autofocus
											/>
										</template>
										<template v-else>
											<div class="flex items-center justify-between">
												<span class="text-start">{{ task.title }}</span>
												<Pencil class="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
											</div>
										</template>
									</td>
									<td
										class="p-5 text-sm text-gray-700 cursor-pointer group"
										@click="enableEdit(index, 'developer')"
									>
										<template v-if="editingCell?.row === index && editingCell?.field === 'developer'">
											<Multiselect
												v-model="localEditValue"
												:options="allDevelopers"
												:taggable="true"
												placeholder="Select developers"
												@close="() => finishEdit(index, 'developer')"
											/>
										</template>
										<template v-else>
											<div class="flex items-center justify-between">
												{{ Array.isArray(task.developer) ? task.developer.join(', ') : task.developer || '-' }}
												<Pencil class="w-4 h-4 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
											</div>
										</template>
									</td>
									<td
										class="p-5 text-sm text-gray-700 cursor-pointer group"
										@click="enableEdit(index, 'status')"
									>
										<template v-if="editingCell?.row === index && editingCell?.field === 'status'">
											<select
												v-model="localEditValue"
												@blur="finishEdit(index, 'status')"
												@change="finishEdit(index, 'status')"
												class="border p-1 rounded w-full"
											>
												<option
													v-for="status in allStatuses"
													:key="status"
													:value="status"
												>
													{{ status }}
												</option>
											</select>
										</template>
										<template v-else>
											<div class="flex items-center justify-between">
												<Badge
													:text="task.status"
													:variant="statusVariant(task.status)"
												/>
												<Pencil class="w-4 h-4 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
											</div>
										</template>
									</td>

									<td
										class="p-5 text-sm text-gray-700 cursor-pointer group"
										@click="enableEdit(index, 'priority')"
									>
										<template v-if="editingCell?.row === index && editingCell?.field === 'priority'">
											<select
												v-model="localEditValue"
												@blur="finishEdit(index, 'priority')"
												@change="finishEdit(index, 'priority')"
												class="border p-1 rounded w-full"
											>
												<option
													v-for="priority in ['Low', 'Medium', 'High', 'Critical', 'Best Effort']"
													:key="priority"
													:value="priority"
												>
													{{ priority }}
												</option>
											</select>
										</template>
										<template v-else>
											<div class="flex items-center justify-between">
												<Badge
													:text="task.priority"
													:variant="priorityVariant(task.priority)"
												/>
												<Pencil class="w-4 h-4 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
											</div>
										</template>
									</td>

									<td
										class="p-5 text-sm text-gray-700 cursor-pointer group"
										@click="enableEdit(index, 'type')"
									>
										<template v-if="editingCell?.row === index && editingCell?.field === 'type'">
											<select
												v-model="localEditValue"
												@blur="finishEdit(index, 'type')"
												@change="finishEdit(index, 'type')"
												class="border p-1 rounded w-full"
											>
												<option
													v-for="type in ['Feature Enhancements', 'Bug', 'Other']"
													:key="type"
													:value="type"
												>
													{{ type }}
												</option>
											</select>
										</template>
										<template v-else>
											<div class="flex items-center justify-between">
												<Badge
													:text="task.type"
													:variant="typeVariant(task.type)"
												/>
												<Pencil class="w-4 h-4 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
											</div>
										</template>
									</td>

									<td
										class="p-5 text-sm text-gray-600 cursor-pointer group"
										@click="enableEdit(index, 'date')"
									>
										<template v-if="editingCell?.row === index && editingCell?.field === 'date'">
											<div class="max-w-40">
												<VueDatePicker
													v-model="localEditValue"
													:enable-time-picker="false"
													:input-class="'border p-1 rounded w-full'"
													@blur="() => finishEdit(index, 'date')"
												/>
											</div>
										</template>
										<template v-else>
											<div class="flex items-center justify-between">
												<span class="text-sm text-gray-700">{{ task.date || '-' }}</span>
												<Pencil class="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
											</div>
										</template>
									</td>

									<td
										class="p-5 text-sm text-gray-700 group cursor-pointer"
										@click="enableEdit(index, 'estimatedSP')"
									>
										<template v-if="editingCell?.row === index && editingCell?.field === 'estimatedSP'">
											<input
												ref="el => inputRefs.value[`${index}-estimatedSP`] = el"
												type="number"
												min="0"
												step="1"
												v-model.number="localEditValue"
												@blur="finishEdit(index, 'estimatedSP')"
												@keyup.enter="finishEdit(index, 'estimatedSP')"
												class="border p-1 rounded w-20"
												autofocus
											/>
										</template>
										<template v-else>
											<div class="flex items-center justify-between">
												<span>{{ task.estimatedSP }}</span>
												<Pencil class="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
											</div>
										</template>
									</td>

									<td
										class="p-5 text-sm text-gray-700 group cursor-pointer"
										@click="enableEdit(index, 'actualSP')"
									>
										<template v-if="editingCell?.row === index && editingCell?.field === 'actualSP'">
											<input
												ref="el => inputRefs.value[`${index}-actualSP`] = el"
												type="number"
												min="0"
												step="1"
												v-model.number="localEditValue"
												@blur="finishEdit(index, 'actualSP')"
												@keyup.enter="finishEdit(index, 'actualSP')"
												class="border p-1 rounded w-full max-w-20"
												autofocus
											/>
										</template>
										<template v-else>
											<div class="flex items-center justify-between">
												<span>{{ task.actualSP }}</span>
												<Pencil class="w-4 h-4 ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
											</div>
										</template>
									</td>
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
	<Toolbar
		v-if="selectionStore.selectedTasks.length > 0"
		:selected-count="selectionStore.selectedTasks.length"
		@export="onExport"
		@archive="onArchive"
		@delete="onDelete"
		@close="onClose"
	/>
</template>
