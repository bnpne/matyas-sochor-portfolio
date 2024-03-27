<template>
  <div class='work-footer'>
    <p class='work-footer-text'>
      Do you want to know more about my role,
      the team and the process?
    </p>
    <div>
      <NuxtLink to='mailto:matyas@sochor.xyz' class='work-footer-button'>
        Let's Chat
      </NuxtLink>
    </div>
    <div class='work-footer-divider'></div>
  </div>
</template>

<style lang='scss'>
.work-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: desktop-vw(20px);

  @include mobile() {
    gap: mobile-vw(20px);
    padding: 0 mobile-vw(14px);
  }

  &-text {
    @include medium-type();
    width: 40%;

    @include mobile() {
      width: 100%;
    }
  }

  &-button {
    @include button-default-black();
    @include small-type();
    width: auto;
    margin-bottom: desktop-vw(76px);
    padding: desktop-vw(12px) desktop-vw(25px);

    @include mobile() {
      margin-bottom: mobile-vw(76px);
      padding: mobile-vw(12px) mobile-vw(25px);
    }
  }

  &-divider {
    border: solid .5px $black10;
    margin-bottom: desktop-vw(96px);

    @include mobile() {
      margin-bottom: mobile-vw(96px);
    }
  }
}
</style>
