<script lang="ts" setup>
import TheHeader from '@/components/global/TheHeader.vue'
import BaseButton from '../components/base/BaseButton.vue'
import TheFooter from '@/components/global/TheFooter.vue'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import useWindowSize from '@/composables/useWindowSize'

const { windowSize } = useWindowSize()
const router = useRouter()
const isSettingsActive = ref(false)
const { logout } = useAuthStore()
const { currentUser } = storeToRefs(useAuthStore())

const userInitials = computed(() => {
  if (currentUser.value) {
    return `${currentUser.value.name[0]}${currentUser.value.surname[0]}`
  } else {
    return null
  }
})

function goToProfileSettings() {
  router.push('/profile')
}

function goToFavorites() {
  isSettingsActive.value = false
  router.push('/favorites')
}
</script>

<template>
  <TheHeader class="header-profile" />
  <section class="profile-settings">
    <div class="container">
      <h2 class="profile-settings__title">Мой аккаунт</h2>
      <div class="profile-settings__menu">
        <button class="profile-settings__menu-favorites" @click="goToFavorites">
          <span class="menu-icon">
            <svg
              class="favorites-icon-favorite"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use xlink:href="/public/sprite.svg#favorite"></use>
            </svg>
          </span>
          <span class="button-text">
            <template v-if="windowSize.x < 768">Избранное</template>
            <template v-else-if="windowSize.x >= 768"
              >Избранные фильмы</template
            >
          </span>
        </button>
        <button
          class="profile-settings__menu-settings"
          :class="{ active: isSettingsActive }"
          @click="goToProfileSettings"
        >
          <span class="menu-icon">
            <svg
              class="favorites-icon-settings"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use xlink:href="/public/sprite.svg#profile-icon"></use>
            </svg>
          </span>
          <span class="button-text">
            <template v-if="windowSize.x < 768">Настройки</template>
            <template v-else-if="windowSize.x >= 768"
              >Настройка аккаунта</template
            >
          </span>
        </button>
      </div>
      <div class="profile-settings__info">
        <div class="profile-settings__info-wrapper">
          <span class="user-icon"> {{ userInitials }} </span>
          <div class="profile-settings__info-inner">
            <span class="text-label">Имя Фамилия</span>
            <span class="text-info"
              >{{ currentUser?.name }} {{ currentUser?.surname }}</span
            >
          </div>
        </div>
        <div class="profile-settings__info-wrapper">
          <span class="email-logo">
            <svg class="email-icon" width="24" height="24" aria-hidden="true">
              <use xlink:href="/public/sprite.svg#email-icon"></use>
            </svg>
          </span>
          <div class="profile-settings__info-inner">
            <span class="text-label">Электронная почта</span>
            <span class="text-info">{{ currentUser?.email }}</span>
          </div>
        </div>
      </div>
      <BaseButton @click="logout" class="btn-exit-profile" :type="'primary'"
        >Выйти из аккаунта</BaseButton
      >
    </div>
  </section>
  <TheFooter />
</template>

<style lang="scss">
.header-profile {
  margin: 0 0 64px;

  @include vp-767 {
    margin: 0 0 24px;
  }
}

.profile-settings {
  margin: 0 0 406px;

  @include vp-767 {
    margin: 0 0 148px;
  }

  &__title {
    color: $color-white;
    font-weight: 700;
    font-size: 48px;
    line-height: 56px;
    margin: 0 0 64px;

    @include vp-767 {
      font-size: 24px;
      line-height: 32px;
      margin: 0 0 40px;
    }
  }

  &__menu {
    display: flex;
    gap: 64px;
    align-items: center;
    margin: 0 0 64px;

    @include vp-767 {
      margin: 0 0 40px;
      gap: 24px;
    }
  }

  &__menu-favorites,
  &__menu-settings {
    display: flex;
    gap: 8px;
    cursor: pointer;
    background-color: transparent;
    border: none;
    color: $color-white;
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
    padding: 8px 0;
    align-items: center;
  }

  &__menu-settings {
    border-bottom: 1px solid $color-heliotrope;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin: 0 0 64px;

    @include vp-767 {
      margin: 0 0 40px;
    }
  }

  &__info-wrapper {
    display: flex;
    gap: 16px;
  }

  &__info-inner {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}

.text-label {
  color: $color-white;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;

  @include vp-767 {
    font-size: 14px;
    line-height: 20px;
  }
}

.text-info {
  color: $color-white;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;

  @include vp-767 {
    font-size: 18px;
    line-height: 24px;
  }
}

.menu-icon {
  width: 24px;
  height: 24px;
  align-items: center;
}

.user-icon {
  width: 60px;
  height: 60px;
  padding: 13px 14px;
  background-color: $color-white-50;
  border-radius: 30px;
  align-items: center;
  color: $color-white;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;

  @include vp-767 {
    width: 48px;
    height: 48px;
    padding: 8px 9px;
  }
}

.email-logo {
  width: 60px;
  height: 60px;
  padding: 18px;
  background-color: $color-white-50;
  border-radius: 30px;
  align-items: center;

  @include vp-767 {
    width: 48px;
    height: 48px;
    padding: 12px;
  }
}

.btn-exit-profile {
  max-width: 262px;

  @include vp-767 {
    max-width: 335px;
  }
}

.profile-settings__menu-settings.active {
  border-bottom: 2px solid $color-heliotrope;
}

.profile-favorites-films__menu-favorites.active {
  border-bottom: 2px solid $color-heliotrope;
}
</style>
