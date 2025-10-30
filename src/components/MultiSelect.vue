<script setup lang="ts">
import { ref, watch } from 'vue'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

const props = defineProps({
	modelValue: {
		type: [Array, String],
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
	single: {
		type: Boolean,
		default: false,
	},
	onClose: {
		type: Function,
		default: null,
	},
})

const emit = defineEmits(['update:modelValue', 'update:options'])

const internalValue = ref<Array<any>>([...props.modelValue])
const optionsList = ref<Array<any>>([...props.options])

watch(
	() => props.modelValue,
	(newVal) => {
		internalValue.value = Array.isArray(newVal) ? [...newVal] : []
	}
)

watch(
	internalValue,
	(val) => {
		if (JSON.stringify(val) !== JSON.stringify(props.modelValue)) {
			emit('update:modelValue', [...val])
		}
	},
	{ deep: true }
)

function handleClose() {
	if (props.onClose) {
		props.onClose(internalValue.value)
	}
}
function addTag(newTag: string) {
	const tag = { label: newTag, value: newTag }

	if (!props.options.find((t) => t.value === newTag)) {
		emit('update:options', [...props.options, tag])
	}

	emit('update:modelValue', [...props.modelValue, tag])
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
			:options="optionsList"
			:multiple="true"
			:close-on-select="false"
			:clear-on-select="false"
			:preserve-search="true"
			placeholder="Select options"
			label="label"
			track-by="value"
			:taggable="true"
			@close="handleClose"
			@tag="addTag"
			class="border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
		/>
	</div>
</template>
