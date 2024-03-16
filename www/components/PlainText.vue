<script setup lang='ts'>
defineProps(['data'])
</script>

<template v-if='data'>
  <section class='section-plain-text'>
    <div class='section-plain-text-body'>
      <SanityContent :blocks='data' />
    </div>
  </section>
</template>

<style lang='scss'>
.section-plain-text {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  margin-top: desktop-vw(30px);
  margin-bottom: desktop-vw(165px);

  &-body {
    @include medium-type();
    max-width: 50%;

    strong {
      color: $black50;
    }
  }
}
</style>
