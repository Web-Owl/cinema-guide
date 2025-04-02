<script lang="ts" setup>
import type { ModelRef } from 'vue'
import BaseInput from '../base/BaseInput.vue'

const model: ModelRef<string | undefined> = defineModel()
</script>

<template>
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
      <div class="reset-search-text" @click="model = ''" v-if="model?.length">
        <BaseIcon
          class="search-svg"
          :width="'24px'"
          :height="'24px'"
          :icon="'search-close'"
        />
      </div>
    </template>
  </BaseInput>
</template>
