<script setup lang='ts'>
defineProps(['data'])
</script>

<template>
  <div v-if='data' class='recognition-list-section'>
    <div class='recognition-list-section-header'>
      <ScrollFadeIn>
        <p>Recognition</p>
      </ScrollFadeIn>
      <ScrollDivider>
        <div class='recognition-list-section-header-divider'></div>
      </ScrollDivider>
    </div>
    <div class='recognition-list-section-info'>
      <ScrollFadeIn>
        <div v-for='info in data' class='recognition-list-section-info-line'>
          <p v-if='!info.awardLink'>{{ info.award }}</p>
          <NuxtLink v-else :to='info.awardLink' target='_blank'>{{ info.award }}</NuxtLink>
          <div class='recognition-list-section-info-line-right'>
            <p>{{ info.awardDate.split('-')[0] }}</p>
          </div>
        </div>
      </ScrollFadeIn>
    </div>
  </div>
</template>

<style lang='scss'>
.recognition-list-section {
  @include small-type();
  display: flex;
  flex-direction: column;
  gap: desktop-vw(12px);

  @include mobile() {
    gap: mobile-vw(12px);
    padding: 0 mobile-vw(14px);
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
    display: flex;
    flex-direction: column;
    gap: desktop-vw(8px);

    @include mobile() {
      gap: mobile-vw(8px);
    }

    &-line {
      display: flex;
      align-content: center;
      justify-content: space-between;

      &-right {
        color: $black50;
        display: flex;
        gap: desktop-vw(40px);

        @include mobile() {
          gap: mobile-vw(40px);
        }
      }
    }
  }
}
</style>
