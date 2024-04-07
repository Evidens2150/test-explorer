<template>
  <tree-item
    v-for="item in data"
    :key="item.id"
    :item="item"
  />
</template>

<script setup>
import { defineProps } from "vue";
import TreeItem from '@/components/TreeItem';

defineProps({
  data: {
    type: Array,
    default: () => []
  },
});
</script>

<style
  scoped
  lang='scss'
></style>
