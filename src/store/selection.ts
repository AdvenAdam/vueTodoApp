import { defineStore } from 'pinia'
import type { Task } from '../types/task'

export const useSelectionStore = defineStore('selection', {
	state: () => ({
		selectedTasks: [] as { row: number; task: Task }[],
	}),
	getters: {
		allChecked: (state) => state.selectedTasks.length > 0,
		selectedCount: (state) => state.selectedTasks.length,
	},
	actions: {
		toggleAll(tasks: Task[], checked: boolean) {
			if (checked) {
				this.selectedTasks = tasks.map((t, i) => ({ row: i, task: t }))
			} else {
				this.selectedTasks = []
			}
		},
		toggleRow(task: Task, index: number, checked: boolean) {
			if (checked) {
				if (!this.selectedTasks.some((t) => t.task === task)) {
					this.selectedTasks.push({ row: index, task })
				}
			} else {
				this.selectedTasks = this.selectedTasks.filter((t) => t.task !== task)
			}
		},
		clearSelection() {
			this.selectedTasks = []
		},
		updateRows() {
			this.selectedTasks = this.selectedTasks.map((t, i) => ({ row: i, task: t.task }))
		},
	},
})
