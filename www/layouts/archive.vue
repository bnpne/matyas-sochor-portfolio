<template>
  <div id='page' class='archive-layout'>
    <nav class='archive-layout-nav'>
      <NuxtLink to='/' class='archive-layout-nav-home'>Back to Homepage</NuxtLink>
      <div class='archive-layout-nav-more'>2</div>
    </nav>
    <div class='archive-layout-container'>
      <slot />
    </div>
  </div>
</template>

<style lang='scss'>
.archive-layout {
  padding: desktop-vw(10px);

  &-nav {
    position: fixed;
    top: desktop-vw(24px);
    right: desktop-vw(24px);
    width: auto;
    display: flex;
    gap: desktop-vw(4px);
    z-index: 2;

    &-home {
      @include button-second-black();
    }

    &-more {
      @include button-second-black();
    }
  }

  &-container {
    position: relative;
    z-index: 1;
  }
}
</style>
