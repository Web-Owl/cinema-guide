<script lang="ts" setup>
defineProps<{
  color: 'red' | 'yellow' | 'green' | 'grey'
}>()
</script>

<template>
  <span class="estimation" :class="[`estimation--${color}`]">
    <svg class="estimation-icon" width="16" height="16" aria-hidden="true">
      <use xlink:href="/public/sprite.svg#icon-star"></use>
    </svg>
    <span class="estimation__number">
      <slot></slot>
    </span>
  </span>
</template>

<style lang="scss" scoped>
.estimation {
  width: 70px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;

  &--red {
    background-color: $color-fire-brick;
  }

  &--yellow {
    background-color: $color-lucky;
  }

  &--green {
    background-color: $color-forest-green;
  }

  &--grey {
    background-color: $color-grey;
  }

  &__number {
    color: $color-white;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
  }
}
</style>
