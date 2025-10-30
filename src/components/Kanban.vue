<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTaskStore } from '../store/task'
import { Calendar, Users, ChevronRight, CheckCircle } from 'lucide-vue-next'
import Draggable from 'vuedraggable'
import type { Task } from '../types/task'
import SearchToggle from './SearchToggle.vue'
import SearchDevToggle from './SearchDevToggle.vue'
import Badge from './Badge.vue'

const taskStore = useTaskStore()
const searchQuery = ref('')
const searchDeveloperQuery = ref('')

onMounted(() => {
	taskStore.fetchTasks()
})

const statuses: Task['status'][] = ['Ready to Start', 'In Progress', 'Waiting for review', 'Pending Deploy', 'Done', 'Stuck']

const filteredTasksByStatus = computed(() => {
	const query = searchQuery.value?.toLowerCase() || ''
	const developerQuery = searchDeveloperQuery.value?.toLowerCase() || ''

	const grouped: Record<string, Task[]> = {}
	statuses.forEach((status) => {
		grouped[status] = taskStore.tasks.filter((task) => {
			if (task.status !== status) return false

			const matchesTitle = task.title.toLowerCase().includes(query)
			const matchesStatus = task.status.toLowerCase().includes(query)
			const matchesPriority = task.priority.toLowerCase().includes(query)
			const matchesType = task.type.toLowerCase().includes(query)

			const matchesDeveloper = developerQuery ? task.developer?.some((dev) => dev.toLowerCase().includes(developerQuery)) : true

			return (matchesTitle || matchesStatus || matchesPriority || matchesType) && matchesDeveloper
		})
	})
	return grouped
})

const allDevelopers = computed(() => {
	const devSet = new Set<string>()
	taskStore.tasks.forEach((task) => {
		if (Array.isArray(task.developer)) {
			task.developer.forEach((dev) => devSet.add(dev))
		} else if (task.developer) {
			devSet.add(task.developer)
		}
	})
	return Array.from(devSet).map((dev) => ({ value: dev, label: dev }))
})

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
			return 'emerald'
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

const onTaskChange = (newStatus: string, evt: any) => {
	if (evt.added) {
		const task = evt.added.element
		taskStore.updateTask({ ...task, status: newStatus })
		console.log('Task moved:', task.title, 'to', newStatus)
	}
}

const onSearch = (value: string) => {
	searchQuery.value = value.toLowerCase().trim()
}
const onTaskSelected = (value: string) => {
	searchDeveloperQuery.value = value.toLowerCase().trim()
}
</script>

<template>
	<div class="flex flex-col space-y-4">
		<div
			v-if="taskStore.loading"
			class="text-center py-8 text-gray-500"
		>
			Loading tasks...
		</div>

		<div v-else>
			<div class="flex items-center mb-4 gap-4">
				<SearchToggle @search="onSearch" />
				<SearchDevToggle
					:options="allDevelopers"
					@search="onTaskSelected"
				/>
			</div>

			<div class="flex space-x-4 overflow-x-auto pb-4">
				<div
					v-for="status in statuses"
					:key="status"
					class="shrink-0 w-80 bg-gray-200 rounded-lg flex flex-col"
				>
					<div :class="`p-3 rounded mb-2 bg-${statusVariant(status)}-100 text-${statusVariant(status)}-600`">
						<h3 class="font-medium mb-2 flex items-center justify-between">
							<span>{{ status }}</span>
							<span class="text-sm">{{ filteredTasksByStatus[status]?.length || 0 }}</span>
						</h3>
					</div>

					<div class="p-4">
						<Draggable
							:list="filteredTasksByStatus[status]"
							group="tasks"
							animation="200"
							:fallbackOnBody="true"
							:emptyInsertThreshold="0"
							@change="(evt) => onTaskChange(status, evt)"
							item-key="title"
							class="flex-1 min-h-[100px] p-1"
						>
							<template #item="{ element: task }">
								<div class="bg-white p-3 rounded-lg shadow hover:shadow-md transition cursor-move mb-3">
									<div class="flex justify-between items-start mb-2">
										<h4 class="font-semibold text-gray-800 text-sm">{{ task.title }}</h4>
										<CheckCircle
											v-if="task.status === 'Done'"
											class="w-4 h-4 text-green-500"
										/>
									</div>
									<div class="flex items-center space-x-2 mb-2">
										<Badge
											:text="task.priority"
											:variant="priorityVariant(task.priority)"
											:size="'small'"
										/>
										<Badge
											:text="task.type"
											:variant="typeVariant(task.type)"
											:size="'small'"
										/>
									</div>

									<div class="flex items-center space-x-2 text-gray-500 text-xs mb-1">
										<Users class="w-3 h-3" />
										<span>{{ Array.isArray(task.developer) ? task.developer.join(', ') : 'N/A' }}</span>
									</div>

									<div class="flex items-center space-x-2 text-gray-500 text-xs">
										<Calendar class="w-3 h-3" />
										<span>{{ task.date || 'No date' }}</span>
										<ChevronRight class="w-3 h-3" />
										<span>SP: {{ task.estimatedSP }}</span>
									</div>
								</div>
							</template>

							<template #footer>
								<div
									v-if="filteredTasksByStatus[status]?.length === 0"
									class="text-gray-400 text-center py-6 pointer-events-none"
								>
									No tasks
								</div>
							</template>
						</Draggable>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
