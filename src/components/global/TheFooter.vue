<script lang="ts" setup></script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__inner-left">
          <a class="company-link" href="#">LLC «Мультимедиа Визион»</a>
          <div class="copyright">
            <svg
              class="copyright__icon"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use xlink:href="/public/sprite.svg#copyright"></use>
            </svg>
            <span class="copyright__text">Все права защищены</span>
          </div>
        </div>
        <div class="footer__inner-right">
          <div class="footer__inner-right-socials">
            <a class="socials-link" href="#">
              <svg
                class="socials__icon"
                width="36"
                height="40"
                aria-hidden="true"
              >
                <use xlink:href="/public/sprite.svg#vk"></use>
              </svg>
            </a>
            <a class="socials-link" href="#">
              <svg
                class="socials__icon"
                width="36"
                height="40"
                aria-hidden="true"
              >
                <use xlink:href="/public/sprite.svg#youtube"></use>
              </svg>
            </a>
            <a class="socials-link" href="#">
              <svg
                class="socials__icon"
                width="36"
                height="40"
                aria-hidden="true"
              >
                <use xlink:href="/public/sprite.svg#ok"></use>
              </svg>
            </a>
            <a class="socials-link" href="#">
              <svg
                class="socials__icon"
                width="36"
                height="40"
                aria-hidden="true"
              >
                <use xlink:href="/public/sprite.svg#tg"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  @include vp-767 {
    z-index: 50;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 0;

    @include vp-767 {
      flex-direction: column;
      align-items: start;
      padding: 33px 0;
    }
  }

  &__inner-left {
    display: flex;
    align-items: center;

    @include vp-767 {
      flex-direction: column;
      align-items: start;
    }
  }

  &__inner-right-socials {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
}

.company-link {
  margin: 0 12px 0 0;
  color: $color-white;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;

  @include vp-767 {
    margin: 0 0 8px 0;
  }
}

.copyright {
  display: flex;
  align-items: center;

  @include vp-767 {
    margin: 0 0 32px 0;
  }
}

.copyright__icon {
  margin: 0 12px 0 0;

  @include vp-767 {
    width: 20px;
    height: 20px;
  }
}

.copyright__text {
  margin: 0;
  color: $color-white-70;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  pointer-events: none;

  @include vp-767 {
    font-size: 14px;
    line-height: 20px;
  }
}

.socials-link {
  cursor: pointer;
  border-radius: 8px;
}

.socials__icon {
  @include vp-767 {
    width: 24px;
    height: 24px;
  }
}
</style>
