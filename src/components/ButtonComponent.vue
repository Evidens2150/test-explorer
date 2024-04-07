<template>
  <button
    class="custom-button"
    type="button"
    @click="$emit('clicked')"
  >
    <slot>
    </slot>
  </button>
</template>

<script setup>
import { defineEmits } from "vue";

defineEmits(['clicked'])
</script>

<style>
.custom-button {
  background: none;
  outline: none;
  border: none;
  margin: 0;
  padding: 0;
  color: white;
  cursor: pointer;
  transition: all 0.2s linear;
  opacity: 1;
  &:hover {
    color: #646262;
  }
}
</style>