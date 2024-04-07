<template>
  <div class="add-item">
    <div
      v-if="isOptionsVisible"
      class="add-item__overlay"
      @click="toggleOptions"
    >
    </div>
    <div
      v-if="isOptionsVisible"
      class="add-item__options"
      :class="{ 'add-item__options_bottom': isRoot }"
    >
      <button-component @clicked="onAddFileClick">
        <FileIcon :size="15" />
      </button-component>
      <button-component @clicked="onAddFolderClick">
        <FolderIcon :size="15" />
      </button-component>
    </div>
    <button-component @clicked="toggleOptions">
      <div
        class="add-item__toggler"
        data-title="Add to the Root"
      >
        <add-icon :size="isRoot ? 20 : 15" />
      </div>
    </button-component>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import ButtonComponent from '@/components/ButtonComponent'
import FileIcon from '@/assets/icons/FileIcon';
import FolderIcon from '@/assets/icons/FolderIcon';
import AddIcon from '@/assets/icons/AddIcon';

defineProps({
  isRoot: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits(['add-file', 'add-folder'])

const isOptionsVisible = ref(false)

const toggleOptions = () => {
  isOptionsVisible.value = !isOptionsVisible.value;
}
const onAddFileClick = () => {
  emit('add-file');
  toggleOptions();
}
const onAddFolderClick = () => {
  emit('add-folder');
  toggleOptions();
}
</script>

<style
  scoped
  lang='scss'
>
.add-item {
  position: relative;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }
  &__options {
    position: absolute;
    display: flex;
    gap: 5px;
    z-index: 1;
    background-color: rgba(#000000, 0.8);
    padding: 2px;
    border-radius: 5px;
    overflow: hidden;
    right: 100%;
    &_bottom {
      right: unset;
      top: 18px;
      padding: 5px;
    }
  }

  &__toggler {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
}
</style>