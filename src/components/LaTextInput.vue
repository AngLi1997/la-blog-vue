<template>
    <input type="text" v-model="modelValue" :placeholder="placeholder" :class="inputClass">
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    }
})
const modelValue = defineModel()
const inputClass = computed(() => {
    return [props.type]
})
defineEmits(['update:modelValue'])
</script>
<style scoped>
input {
    width: 100%;
    inline-size: none;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    border: 0px solid #ccc;
}

.title {
    font-size: 1rem;
}

.sub-title {
    font-size: 0.8rem;
}
</style>