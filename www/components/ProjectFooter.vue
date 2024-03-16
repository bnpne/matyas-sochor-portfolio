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

  &-text {
    @include medium-type();
    width: 40%;
  }

  &-button {
    @include button-default-black();
    width: auto;
    margin-bottom: desktop-vw(76px);
  }

  &-divider {
    border: solid 1px $black10;
    margin-bottom: desktop-vw(96px);
  }
}
</style>
