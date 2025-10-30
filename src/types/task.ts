export type Task = {
	title: string
	developer: string[]
	priority: 'Low' | 'Medium' | 'High' | 'Critical' | 'Best Effort'
	status: 'Ready to Start' | 'In Progress' | 'Waiting for review' | 'Pending Deploy' | 'Done' | 'Stuck'
	type: 'Feature Enhancements' | 'Bug' | 'Other'
	estimatedSP: number
	actualSP: number
	date: string
}
