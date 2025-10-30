import { defineStore } from 'pinia'
import axios from 'axios'
import type { Task } from '../types/task'

interface TaskState {
	tasks: Task[]
	loading: boolean
	error: string | null
}

export const useTaskStore = defineStore('task', {
	state: (): TaskState => ({
		tasks: [],
		loading: false,
		error: null,
	}),

	getters: {
		allCompleted: (state) => state.tasks.length > 0 && state.tasks.every((t) => t.status === 'Done'),
		someCompleted: (state) => state.tasks.some((t) => t.status === 'Done'),
	},

	actions: {
		async fetchTasks() {
			this.loading = true
			try {
				const response = await axios.get('https://mocki.io/v1/f7861fc0-9071-4034-afed-777f3b590c3c')
				const raw = Array.isArray(response.data) ? response.data : Array.isArray(response.data.data) ? response.data.data : []
				this.tasks = raw.map((t: any) => ({
					title: t.title,
					developer: Array.isArray(t.developer) ? t.developer : (t.developer || '').split(',').map((d: string) => d.trim()),
					priority: t.priority,
					status: t.status,
					type: t.type,
					date: t.date ?? null,
					estimatedSP: t['Estimated SP'] ?? t.estimatedSP ?? 0,
					actualSP: t['Actual SP'] ?? t.actualSP ?? 0,
					completed: ['Done', 'Completed'].includes(t.status),
				}))

				this.error = null
			} catch (err: unknown) {
				if (err instanceof Error) {
					this.error = err.message
				} else {
					this.error = 'An unexpected error occurred.'
				}
			} finally {
				this.loading = false
			}
		},

		addTask(task: Task) {
			const exists = this.tasks.some((t) => t.title === task.title)
			if (!exists) {
				this.tasks.unshift(task)
			}
		},

		updateTask(updatedTask: Task) {
			const index = this.tasks.findIndex((task) => task.title === updatedTask.title)
			if (index !== -1) this.tasks[index] = updatedTask
		},

		deleteTask(row: number) {
			if (row >= 0 && row < this.tasks.length) {
				this.tasks.splice(row, 1)
			}
		},
	},
})
