<template>
    <button :class="buttonClass">
        <slot></slot>
    </button>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
    type: {
        type: String,
        default: 'default'
    }
})
const buttonClass = computed(() => {
    return [props.type]
})
</script>
<style lang="css" scoped>
button {
    width: 100px;
    display: inline-block;
    padding: 10px 10px;
    font-size: 0.8rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

/* .default {
    color: black;
    background-color: #2780E3;
} */

.primary {
    color: white;
    background-color: #2780E3;
}

button:active {
    transform: scale(0.95);
}

button:hover {
    opacity: 0.8;
}
</style>