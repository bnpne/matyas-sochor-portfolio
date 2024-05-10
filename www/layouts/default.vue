<script setup lang='ts'>
const route = useRoute()
const { isMobile } = useDevice()
</script>

<template>
  <main id='main'>
    <!-- <template v-if='isMobile'> -->
    <!--   <SideBar v-if='route.path === "/"' /> -->
    <!-- </template> -->
    <SideBar />
    <slot />
  </main>
</template>

<style lang='scss'>
#main {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
