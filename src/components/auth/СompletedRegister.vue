<script lang="ts" setup>
import BaseButton from '../base/BaseButton.vue'
import BaseLogo from '../base/BaseLogo.vue'

const emit = defineEmits(['backToLogin'])

function backToLogin() {
  emit('backToLogin')
}
</script>

<template>
  <form class="form-modal" @submit.prevent>
    <div class="form-modal__form-logo">
      <BaseLogo :type="'logo'" :width="180" :height="24" />>
    </div>
    <span class="form-modal__title">Регистрация завершена</span>
    <p class="form-modal__description">
      Используйте вашу электронную почту для входа
    </p>
    <BaseButton
      @click="backToLogin"
      class="form-modal__btn-login"
      :type="'primary'"
      >Войти</BaseButton
    >
  </form>
</template>

<style lang="scss" scoped>
.form-modal {
  $root: &;
  position: relative;
  background-color: $color-white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__form-logo {
    margin-bottom: 40px;

    @include vp-767 {
      margin-bottom: 22px;
    }
  }

  &__title {
    margin-bottom: 24px;
    color: $color-black;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
  }

  &__description {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    color: $color-black;
    margin: 0 0 24px;
  }

  &__btn-login {
    width: 295px;
  }
}
</style>
