<template>
  <div>
    <div class='t-o'></div>
  </div>
</template>

<style lang='scss'>
.t-o {
  position: fixed;
  //height: 100%;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: $white;
  pointer-events: none;
  touch-action: unset;
  top: 0;
  opacity: 0;
  z-index: 999;
}
</style>
