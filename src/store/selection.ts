import { defineStore } from 'pinia'

export const useSelectionStore = defineStore('selection', {
	state: () => ({
		selectedTasks: [] as { row: number; title: string }[],
	}),
	getters: {
		allChecked: (state) => state.selectedTasks.length > 0,
	},
	actions: {
		toggleAll(tasks: { title: string }[], checked: boolean) {
			if (checked) {
				this.selectedTasks = tasks.map((t, i) => ({ row: i + 1, title: t.title }))
			} else {
				this.selectedTasks = []
			}
		},
		toggleRow(task: { title: string }, index: number, checked: boolean) {
			if (checked) {
				if (!this.selectedTasks.some((t) => t.row === index + 1)) {
					this.selectedTasks.push({ row: index + 1, title: task.title })
				}
			} else {
				this.selectedTasks = this.selectedTasks.filter((t) => t.row !== index + 1)
			}
		},
	},
})
