<script setup>
import { ref, watch } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

const props = defineProps({
	modelValue: {
		type: Array,
		default: () => [],
	},
	options: {
		type: Array,
		required: true,
	},
	label: {
		type: String,
		default: '',
	},
	onClose: {
		type: Function,
		default: null,
	},
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref([...props.modelValue])

watch(
	() => props.modelValue,
	(newVal) => {
		internalValue.value = [...newVal]
	}
)

function updateValue(value) {
	emit('update:modelValue', value)
}

function handleClose() {
	if (props.onClose) {
		props.onClose(internalValue.value)
	}
}
</script>

<template>
	<div class="flex flex-col gap-2">
		<label
			v-if="label"
			class="text-sm font-medium text-gray-700"
			>{{ label }}</label
		>

		<Multiselect
			v-model="internalValue"
			:options="options"
			:multiple="true"
			:close-on-select="false"
			:clear-on-select="false"
			:preserve-search="true"
			placeholder="Select options"
			label="label"
			track-by="value"
			@input="updateValue"
			@close="handleClose"
			class="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
		/>
	</div>
</template>
