<!--
todo: have page notifications
-->

<template>
  <div id='page' class='work-layout'>
    <nav class='work-layout-nav'>
      <NuxtLink to='/archive' class='work-layout-nav-archive'>Archive</NuxtLink>
      <NuxtLink to='/' class='work-layout-nav-more'>X</NuxtLink>
    </nav>
    <div class='work-layout-container'>
      <slot />
    </div>
  </div>
</template>

<style lang='scss'>
.work-layout {
  padding: desktop-vw(10px) 0;
  padding-right: desktop-vw(10px);

  &-nav {
    position: fixed;
    top: desktop-vw(24px);
    right: desktop-vw(24px);
    width: auto;
    display: flex;
    gap: desktop-vw(4px);
    z-index: 2;
    @include small-type();


    &-archive {
      @include button-second-black();
    }

    &-more {
      @include button-default-black();
      border-radius: 50%;
      height: desktop-vw(42px);
      width: desktop-vw(42px);
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }

  &-container {
    position: relative;
    z-index: 1;
  }
}
</style>
