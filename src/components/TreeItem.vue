<template>
  <div class="tree-item">
    <div class="tree-item__content">

      <button-component
        @clicked="toggleExpand"
        v-if="item.children?.length"
        class="tree-item__expander expander"
      >
        <expand-icon
          class="expander__icon"
          :class="{ 'expander__icon_rotated': !isExpanded }"
        />
      </button-component>
      <folder-icon
        v-if="item.type === 'folder'"
        class="tree-item__icon"
      />
      <file-icon
        v-if="item.type === 'file'"
        class="tree-item__icon"
      />
      <input-component
        v-if="isEditMode"
        type="text"
        v-model="itemName"
        class="tree-item__name"
        @accept="onRename(item.id)"
        @cancel="onCancelRename"
      />
      <span
        v-else
        class="tree-item__name"
      >
        {{ item.name }}
      </span>
      <div class="tree-item__control">
        <add-item
          v-if="item.type === 'folder'"
          @add-file="addFile(item.id)"
          @add-folder="addFolder(item.id)"
        />
        <button-component @clicked="toggleEditMode">
          <edit-icon />
        </button-component>
        <button-component @clicked="onDelete(item.id)">
          <delete-icon />
        </button-component>
      </div>
    </div>
    <div
      v-if="item.type === 'folder'"
      class="tree-item__childrens"
      :class="{ 'tree-item__childrens_expanded': isExpanded }"
    >
      <file-tree :data="item.children" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
import { useFileSystemStore } from '@/store/explorer.ts';
import FileTree from '@/components/FileTree';
import ButtonComponent from '@/components/ButtonComponent'
import InputComponent from '@/components/InputComponent'
import ExpandIcon from '@/assets/icons/ExpandIcon';
import FileIcon from '@/assets/icons/FileIcon';
import FolderIcon from '@/assets/icons/FolderIcon';
import EditIcon from '@/assets/icons/EditIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import AddItem from '@/components/AddItem'

const props = defineProps({
  item: {
    type: Object,
    default: () => { }
  },
});

const fileSystemStore = useFileSystemStore();
const isEditMode = ref(false)
const isExpanded = ref(true)
const itemName = ref('')

onMounted(() => {
  setOriginItemName()
})

const setOriginItemName = () => {
  itemName.value = props.item.name
}
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
}
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
const onRename = (id) => {
  fileSystemStore.renameItem(id, itemName.value);
  toggleEditMode()
}
const onCancelRename = () => {
  setOriginItemName()
  toggleEditMode()
}
const onDelete = (id) => {
  fileSystemStore.deleteItem(id);
}
const addFile = (id) => {
  fileSystemStore.addItem('file', id);
}
const addFolder = (id) => {
  fileSystemStore.addItem('folder', id);
}
</script>

<style
  scoped
  lang='scss'
>
.tree-item {
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  &__content {
    display: flex;
    width: 100%;
    padding-top: 10px;
    align-items: center;
  }
  &__expander {
    flex-shrink: 0;
  }
  &__icon {
    margin-right: 10px;
    flex-shrink: 0;
  }
  &__name {
    height: 23px;
    display: flex;
    align-items: center;
  }
  &__control {
    margin-left: auto;
    padding-left: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  &__childrens {
    overflow: hidden;
    max-height: 0;
    transition: all 0.1s linear;
    width: 100%;
    margin-left: 10px;
    &_expanded {
      max-height: 100px;
    }
  }

  .tree-item {
    border-left: 1px solid white;
    padding-left: 10px;
  }
}
.expander {
  &__icon {
    transition: all 0.1s linear;
    &_rotated {
      transform: rotate(-90deg);
    }
  }
}
</style>