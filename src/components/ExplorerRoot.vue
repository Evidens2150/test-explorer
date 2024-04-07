<template>
  <div class="container">
    <div class="content">
      <div class='button-wrapper'>
        <add-item
          is-root
          @add-file="addFile"
          @add-folder="addFolder"
        />
      </div>
      <div class="explorer">
        <FileTree :data="fileTreeData" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFileSystemStore } from '@/store/explorer.ts'
import { computed } from "vue";
import FileTree from '@/components/FileTree'
import AddItem from '@/components/AddItem'


const fileSystemStore = useFileSystemStore();

const fileTreeData = computed(() => fileSystemStore.fileTreeData);

const addFile = () => {
  fileSystemStore.addItem('file')
}
const addFolder = () => {
  fileSystemStore.addItem('folder')
}
</script>

<style
  scoped
  lang='scss'
>
.container {
  min-height: 100vh;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  background: linear-gradient(45deg,
      hsl(240deg 100% 20%) 0%,
      hsl(290deg 92% 41%) 33%,
      hsl(264deg 100% 73%) 67%,
      hsl(200deg 100% 50%) 100%);
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  min-height: 200px;
  max-height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 5px;
  background-color: rgba(#ffffff, 0.15);
}
.explorer {
  padding: 10px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: white rgba(white, 0.1);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(white, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 100%;
    border: 3px solid rgba(white, 0.1);
  }
}
.button-wrapper {
  padding: 10px 10px 0;

  &:deep(.add-item__toggler) {
    &:hover::after {
      content: attr(data-title);
      position: absolute;
      top: 0;
      left: 100%;
      background-color: rgba(#000000, 0.4);
      font-size: 11px;
      padding: 5px;
      width: 80px;
      color: white;
    }
  }
}
</style>
