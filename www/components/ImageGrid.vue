<script setup lang='ts'>
defineProps(['data'])
</script>

<template v-if='data'>
  <section class='section-image-grid'>
    <div v-for="image in data.gridImage" class='section-image-grid-image'>
      <SanityImage :asset-id="image.asset?._ref" auto="format" />
    </div>
  </section>
</template>

<style lang='scss'>
.section-image-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: desktop-vw(10px);
  width: 100%;

  @include mobile {
    gap: mobile-vw(6px);
    flex-direction: column;
  }

  &-image {
    @include rounded();
    overflow: hidden;
    width: 100%;
    height: 100%;
    flex: 0 0 calc(50% - desktop-vw(5px));

    @include mobile {
      flex: 1;
    }

    &>img {
      height: 100%;
      width: 100%;
      vertical-align: top;
      object-fit: contain;
    }
  }
}
</style>
