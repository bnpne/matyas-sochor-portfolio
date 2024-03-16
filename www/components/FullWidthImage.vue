<script setup lang='ts'>
defineProps(['data'])
</script>

<template v-if='data'>
  <section class='section-full-width'>
    <div class='section-full-width-image'>
      <SanityImage :asset-id="data.asset?._ref" auto="format" />
    </div>
  </section>
</template>

<style lang='scss'>
.section-full-width {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: desktop-vw(10px);
  width: 100%;

  &-image {
    @include rounded();
    overflow: hidden;
    width: 100%;
    height: 100%;
    flex: 1;

    &>img {
      height: 100%;
      width: 100%;
      vertical-align: top;
      object-fit: contain;
    }
  }
}
</style>
