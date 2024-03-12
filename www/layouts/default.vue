<template>
  <main id='main'>
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
