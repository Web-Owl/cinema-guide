<script setup lang="ts">
const emit = defineEmits(['close'])
const clickHandler = () => {
  emit('close')
}

interface Props {
  isVideo?: boolean
}

withDefaults(defineProps<Props>(), {
  isVideo: false,
})
</script>

<template>
  <article :class="{ 'modal--video': isVideo }" class="modal">
    <div class="modal__inner">
      <button class="modal__close-btn" @click="clickHandler">
        <BaseIcon :width="'24px'" :height="'24px'" :icon="'close-icon'" />
      </button>
      <div class="modal__content">
        <div v-if="$slots.head" class="modal__head">
          <slot name="head" />
        </div>
        <div v-if="$slots.body" class="modal__body">
          <slot name="body" />
        </div>
        <div v-if="$slots.footer" class="modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  z-index: 77;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @include vp-767 {
    padding: 0;
    background-color: $color-black;
  }

  &__head {
    width: 100%;
    margin-bottom: 32px;
  }

  &__close-btn {
    background-color: $color-white;
    border: none;
    cursor: pointer;
    border-radius: 24px;
    align-items: center;
    width: 48px;
    height: 48px;
    padding: 12px;
    position: absolute;
    top: 0;
    right: -74px;

    @include vp-767 {
      top: 8px;
      right: 8px;
    }
  }

  &__icon {
    width: 140px;
    height: 140px;
    margin-bottom: 40px;

    span:first-of-type {
      width: 100%;
      height: 100%;
      color: inherit;
    }
  }

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 420px;
    margin: auto;
    border-radius: 24px;
    padding: 64px 40px;
    background-color: white;

    @include vp-767 {
      width: 335px;
      max-width: 335px;
      padding: 64px 20px 32px 20px;
      align-items: end;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  &__msg {
    display: inline-block;
    margin-bottom: 28px;
    white-space: pre-wrap;
    text-align: center;
  }

  &__btn {
    width: 100%;
  }

  &__body,
  &__footer {
    width: 100%;
  }
}

.modal--video {
  .modal__inner {
    max-width: 960px;
    height: 100%;
    max-height: 540px;
    background-color: $color-montana;
    align-items: center;
    padding: 0;
    display: flex;
    border: none;
    justify-content: center;

    @include vp-767 {
      width: 375px;
      height: 212px;
    }

    @media screen and (orientation: landscape) {
      width: 100%;
      height: 100%;
    }
  }
  .modal__content {
    height: 100%;
  }
  .modal__body {
    height: 100%;
  }
}
</style>
