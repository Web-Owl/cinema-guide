<script setup lang="ts">
interface Props {
  icon: string
  width?: string
  height?: string
}

withDefaults(defineProps<Props>(), {
  width: '24px',
  height: '24px',
})
</script>

<template>
  <svg :width="width" aria-hidden="true" :height="height">
    <use :xlink:href="`/sprite.svg#${icon}`"></use>
  </svg>
</template>

<style lang="scss" scoped>
svg {
  color: inherit;
}
</style>
