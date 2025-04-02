<script lang="ts" setup>
interface Props {
  type?: 'primary' | 'secondary'
}

withDefaults(defineProps<Props>(), {
  type: 'primary',
})
</script>

<template>
  <button :class="['btn', `btn--${type}`]">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.btn--primary {
  background-color: $color-slate-blue;
  border: none;
  border-radius: 28px;
  width: 340px;
  min-height: 56px;
  padding: 16px;
  margin: 0;
  color: $color-white;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
  transition: all $transition-300;
}

.btn--primary:disabled {
  background-color: $color-quartz;
  pointer-events: none;
}

.btn--primary:hover,
:focus-visible {
  background-color: $color-medium-slate-blue;
  outline: none;
}

.btn--secondary {
  background-color: $color-montana;
  width: 183px;
  min-height: 56px;
  padding: 16px;
  border: none;
  border-radius: 28px;
  margin: 0;
  color: $color-white;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
  transition: all $transition-300;
}

.btn--secondary:disabled {
  background-color: $color-black-40;
  pointer-events: none;
  color: $color-white-50;
}

.btn--secondary:hover {
  background-color: $color-white;
  outline: none;
  color: $color-black;
}

.btn--secondary:focus-visible {
  background-color: $color-white;
  outline: none;
  color: $color-black;
}
</style>
