<script setup lang="ts">
const props = defineProps(["data"]);
console.log(props);
</script>

<template v-if="data">
  <span class="anima-scale">
    <section class="section-image-grid">
      <div
        v-for="image in props.data.gridImage"
        class="section-image-grid-image"
        :class="{ 'with-border': image.addBorder }"
      >
        <SanityImage
          class="a"
          :asset-id="image.image?.asset?._ref"
          auto="format"
          w="2000"
          fit="clip"
        />
      </div>
    </section>
  </span>
</template>

<style lang="scss">
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

    & > img {
      height: 100%;
      width: 100%;
      vertical-align: top;
      object-fit: contain;
    }

    &.with-border {
      border: 1px rgba(30, 30, 30, 0.1) solid;
      border-radius: desktop-vw(12px);

      @include mobile() {
        border-radius: mobile-vw(12px);
      }
    }
  }
}
</style>
