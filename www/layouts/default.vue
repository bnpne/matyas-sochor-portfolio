<script setup lang='ts'>
const route = useRoute()
const { isMobile } = useDevice()

onMounted(() => {
  console.log(route.path)
})
</script>

<template>
  <main id='main'>
    <template v-if='isMobile'>
      <SideBar v-if='route.path === "/"' />
    </template>
    <template v-else>
      <SideBar />
    </template>
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
