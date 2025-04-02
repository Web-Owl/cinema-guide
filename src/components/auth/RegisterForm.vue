<script lang="ts" setup>
import BaseInput from '@/components/base/BaseInput.vue'
import { reactive } from 'vue'
import BaseButton from '../base/BaseButton.vue'
import BaseLogo from '../base/BaseLogo.vue'
import { useAuthStore } from '@/stores/auth'
import { required, email, minLength } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const emit = defineEmits(['changeForm', 'success'])
const { register } = useAuthStore()

const formFields = reactive<{
  name: string
  surname: string
  email: string
  password: string
  passwordRepeat: string
}>({
  name: '',
  surname: '',
  email: '',
  password: '',
  passwordRepeat: '',
})

const rules = {
  name: { required },
  surname: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  passwordRepeat: {
    required,
    sameAsPassword: (value: string) => value === formFields.password,
  },
}

const v$ = useVuelidate(rules, formFields)

function changeForm() {
  emit('changeForm')
}

async function registerUser() {
  const isCorrectForm = await v$.value.$validate() // Активирую всю валидацию
  if (!isCorrectForm) return // Если валидация не пройдена, не продолжаем

  const response = await register({
    email: formFields.email,
    password: formFields.password,
    name: formFields.name,
    surname: formFields.surname,
  })
  if (response === true) {
    emit('success')
  }
}
</script>

<template>
  <form @submit.prevent="registerUser" class="form-modal">
    <div class="form-modal__form-logo">
      <BaseLogo :type="'logo'" :width="180" :height="24" />
    </div>
    <span class="form-modal__title">Регистрация</span>
    <div class="form-modal__input-inner">
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
        v-model="formFields.name"
        :placeholder="'Имя'"
        :type="'text'"
        :name="'name'"
        :isError="!!v$.name.$errors[0]?.$message"
      >
        <template #icon>
          <BaseIcon :width="'24px'" :height="'24px'" :icon="'profile'" />
        </template>
      </BaseInput>
      <BaseInput
        v-model="formFields.surname"
        :placeholder="'Фамилия'"
        :type="'text'"
        :name="'surname'"
        :isError="!!v$.surname.$errors[0]?.$message"
      >
        <template #icon>
          <BaseIcon :width="'24px'" :height="'24px'" :icon="'profile'" />
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
      <BaseInput
        v-model="formFields.passwordRepeat"
        :placeholder="'Подтвердите пароль'"
        :type="'password'"
        :name="'passwordRepeat'"
        :isError="v$.passwordRepeat.sameAsPassword.$invalid"
      >
        <template #icon>
          <BaseIcon :width="'22px'" :height="'12px'" :icon="'key'" />
        </template>
      </BaseInput>
    </div>
    <BaseButton class="form-modal__btn-create" :type="'primary'"
      >Создать аккаунт</BaseButton
    >
    <button class="form-modal__text-password" @click="changeForm">
      У меня есть пароль
    </button>
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

  &__input-inner {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  &__btn-create {
    margin-bottom: 24px;

    @include vp-767 {
      width: 295px;
    }
  }

  &__text-password {
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
</style>
