<template>
  <div id='page' class='page'>
    <nav class='page-nav'>
      <NuxtLink to='/archive' class='page-nav-archive'>Archive</NuxtLink>
      <NuxtLink to='/' class='page-nav-more'>X</NuxtLink>
    </nav>
    <div class='page-container'>
      <slot />
    </div>
  </div>
</template>

<style lang='scss'>
.page {
  padding: desktop-vw(10px);

  &-nav {
    position: fixed;
    top: desktop-vw(24px);
    right: desktop-vw(24px);
    width: auto;
    display: flex;
    gap: desktop-vw(4px);
    z-index: 2;


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
