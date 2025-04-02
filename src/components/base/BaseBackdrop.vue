<script setup lang="ts"></script>

<template>
  <div class="backdrop">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.backdrop {
  position: fixed;
  z-index: 35;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: $color-black-50;
  inset: 0;
}
</style>
