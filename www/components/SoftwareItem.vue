<script setup lang='ts'>
defineProps(['data'])
</script>

<template>
  <div v-if='data' class='software-list-section'>
    <div class='software-list-section-header'>
      <ScrollFadeIn>
        <p>Software</p>
      </ScrollFadeIn>
      <ScrollDivider>
        <div class='software-list-section-header-divider'></div>
      </ScrollDivider>
    </div>
    <ScrollFadeIn>
      <div class='software-list-section-info'>
        <div v-for='info, index in data' class='software-list-section-info-line'>
          <p v-if='index !== data.length - 1'>{{ info }},&nbsp;</p>
          <p v-else>{{ info }}&nbsp;</p>
        </div>
      </div>
    </ScrollFadeIn>
  </div>
</template>

<style lang='scss'>
.software-list-section {
  @include small-type();
  display: flex;
  flex-direction: column;
  gap: desktop-vw(12px);

  @include mobile() {
    padding: 0 mobile-vw(14px);
    gap: mobile-vw(12px);
  }

  &-header {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(12px);
    color: $black50;

    @include mobile() {
      gap: mobile-vw(12px);
    }

    &-divider {
      border: .5px solid $black10;
    }
  }

  &-info {
    display: inline-block;

    &-line {
      display: inline-block;
    }
  }
}
</style>
