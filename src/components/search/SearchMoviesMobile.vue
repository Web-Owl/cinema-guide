<script lang="ts" setup>
import BaseInput from '../base/BaseInput.vue'

const model = defineModel()
const emit = defineEmits(['closeInput'])

const close = () => emit('closeInput')
</script>

<template>
  <div class="search-block__mobile">
    <BaseInput
      v-model="model"
      :placeholder="'Поиск'"
      :name="'search'"
      :type="'search'"
      :is-error="null"
      class="search-block__inner"
    >
      <template #icon>
        <BaseIcon
          class="search-svg"
          :width="'24px'"
          :height="'24px'"
          :icon="'search'"
        />
      </template>
      <template #append>
        <div class="close" @click="close">
          <BaseIcon
            class="search-svg"
            :width="'24px'"
            :height="'24px'"
            :icon="'search-close'"
          />
        </div>
      </template>
    </BaseInput>
  </div>
</template>

<style lang="scss" scoped>
.close {
  cursor: pointer;
}
.search-block__mobile {
  @include vp-767 {
    position: absolute;
    z-index: 200;
    top: -8px;
    right: 0;
    left: 0px;
    min-width: 335px;
    width: 100%;
  }
}
</style>
