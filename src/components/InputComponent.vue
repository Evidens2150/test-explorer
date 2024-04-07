<template>
  <div class="custom-field">
    <div
      class="custom-field__overlay"
      @click="emit('cancel')"
    >
    </div>
    <div class="custom-field__content">
      <input
        ref="input"
        type="text"
        :value="modelValue"
        class="custom-field__input"
        @keyup="onInput"
      >
      <button-component
        class="custom-field__button"
        @clicked="emit('accept')"
      >
        <accept-icon />
      </button-component>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from "vue";
import ButtonComponent from '@/components/ButtonComponent'
import AcceptIcon from '@/assets/icons/AcceptIcon';

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
});

const emit = defineEmits(['accept', 'update:modelValue']);
const input = ref();

onMounted(() => {
  input.value.focus()
})

const onInput = (event) => {
  if (event.keyCode == 13) {
    emit('accept')
    return
  }
  emit('update:modelValue', event.target.value)
}
</script>

<style
  scoped
  lang='scss'
>
.custom-field {
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid white;
  border-radius: 5px;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  &__content {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__input {
    outline: none;
    border: none;
    background: none;
    color: white;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    max-width: 150px;
  }
  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 5px;
  }
}
</style>