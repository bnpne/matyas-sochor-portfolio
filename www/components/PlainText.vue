<script setup lang='ts'>
defineProps(['data'])
</script>

<template v-if='data'>
  <section class='section-plain-text'>
    <ScrollFadeIn>
      <div class='section-plain-text-body'>
        <SanityContent :blocks='data.plainText' />
      </div>
    </ScrollFadeIn>
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
    max-width: desktop-vw(655px);
    margin-right: desktop-vw(14px);

    strong {
      color: $black50;
    }
  }
}
</style>
