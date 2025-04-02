<script lang="ts" setup>
import BaseInput from '@/components/base/BaseInput.vue'
import { reactive } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import BaseLogo from '../base/BaseLogo.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const emit = defineEmits(['changeForm', 'success', 'loginUser'])
const { login, setUserInfo } = useAuthStore()
const { isAuthenticated } = storeToRefs(useAuthStore())

const formFields = reactive<{
  email: string
  password: string
}>({
  email: '',
  password: '',
})

const rules = {
  email: { required, email },
  password: { required },
}

const v$ = useVuelidate(rules, formFields)

async function loginUser() {
  const isCorrectForm = await v$.value.$validate() // Активирую всю валидацию
  if (!isCorrectForm) return
  try {
    await login({
      email: formFields.email,
      password: formFields.password,
    })
    if (isAuthenticated.value) {
      await setUserInfo()
      emit('success')
    }
  } catch (e) {
    alert('Такого пользователя нет')
    console.error(e)
  }
}

function changeForm() {
  emit('changeForm')
}
</script>

<template>
  <form class="auth-login" @submit.prevent="loginUser">
    <div class="auth-login__form-logo">
      <BaseLogo
        class="base-logo-modal"
        :type="'logo'"
        :width="180"
        :height="24"
      />
    </div>
    <div class="auth-login__input-inner">
      <BaseInput
        v-model="formFields.email"
        :placeholder="'Электронная почта'"
        :type="'email'"
        :name="'email'"
        :isError="!!v$.email.$errors[0]?.$message"
      >
        <template #icon>
          <BaseIcon :width="'22px'" :height="'18px'" :icon="'mail'" />
        </template>
      </BaseInput>
      <BaseInput
        v-model="formFields.password"
        :placeholder="'Пароль'"
        :type="'password'"
        :name="'password'"
        :isError="!!v$.password.$errors[0]?.$message"
      >
        <template #icon>
          <BaseIcon :width="'22px'" :height="'12px'" :icon="'key'" />
        </template>
      </BaseInput>
    </div>
    <BaseButton class="auth-login__btn-login" :type="'primary'"
      >Войти</BaseButton
    >
    <button @click="changeForm" class="auth-login__text-register">
      Регистрация
    </button>
  </form>
</template>

<style lang="scss" scoped>
.auth-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__form-logo {
    margin-bottom: 40px;

    @include vp-767 {
      margin-bottom: 32px;
    }
  }

  &__input-inner {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  &__btn-login {
    margin-bottom: 24px;

    @include vp-767 {
      width: 295px;
    }
  }

  &__text-register {
    color: $color-black;
    border: none;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
  }
}

.base-logo-modal {
  @include vp-767 {
    width: 180px;
    height: 24px;
  }
}
</style>
