<script lang="ts" setup>
const model = defineModel()

interface Props {
  placeholder: string
  type?: string
  name: string
  isError: boolean | null
}

withDefaults(defineProps<Props>(), {
  type: 'text',
})
</script>

<template>
  <div class="custom-input" :class="`custom-input--${type}`">
    <div class="custom-input__container" :class="{ 'is-invalid': isError }">
      <div v-if="$slots.icon" class="custom-input__icon">
        <slot name="icon"></slot>
      </div>
      <input
        v-model="model"
        :placeholder="placeholder"
        class="custom-input__field"
        :class="`custom-input__field--${type}`"
        :type="type"
        :name="name"
      />
      <div
        v-if="$slots.append"
        class="custom-input__icon custom-input__icon--append"
      >
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

.custom-input {
  width: 340px;
  display: flex;
  flex-direction: column;
  position: relative;

  @include vp-767 {
    width: 295px;
    height: 56px;
  }

  &__container {
    display: flex;
    align-items: center;
    border: 1px solid $color-black-40;
    padding: 16px;
    position: relative;
    border-radius: 8px;
  }

  ::placeholder {
    color: $color-black-40;
  }

  &__field {
    border: none;
    outline: none;
    padding-left: 36px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: $color-black;
    flex: 1;
    align-items: center;
  }

  &__container:hover {
    border-color: $color-perano;
    .custom-input__icon {
      color: $color-perano;
    }
  }

  &__icon {
    color: $color-black-40;
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    line-height: 0;
  }
}

.custom-input__container.is-invalid:has(.custom-input__field:focus-visible) {
  color: $color-salmon;
}

.is-invalid {
  border-color: $color-salmon;
  .custom-input__icon {
    color: $color-salmon;
  }
  &:hover {
    color: $color-salmon;
    border-color: $color-salmon;
    .custom-input__icon {
      color: $color-salmon;
    }
  }
}

/* search input */
.custom-input--search {
  height: 48px;
  display: flex;
  margin: 0;
  gap: 12px;
  padding: 12px 16px;
  background-color: $color-montana;
  border-radius: 8px;
  width: 100%;
  max-width: 560px;
  .custom-input__container {
    border: none;
    padding: 0px;
    .custom-input__icon {
      left: 0px;
      color: $color-white-50;
    }
  }
}

.custom-input__field--search {
  width: 100%;
  height: auto;
  border: 0;
  background-color: transparent;
  outline: none;
  color: $color-white-50;

  &::placeholder {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: $color-white-50;
  }
}
.custom-input__container:has(.custom-input__icon--append) {
  .custom-input__field {
    padding-right: 52px;
  }
}
.close-search-svg {
  cursor: pointer;
}

.custom-input__icon--append {
  position: absolute;
  right: 0px;
  top: 50%;
  left: auto !important;
  pointer-events: all;
}
</style>
