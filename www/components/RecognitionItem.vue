<script setup lang='ts'>
defineProps(['data'])
</script>

<template>
  <div v-if='data' class='recognition-list-section'>
    <div class='recognition-list-section-header'>
      <p>Recognition</p>
      <div class='recognition-list-section-header-divider'></div>
    </div>
    <div class='recognition-list-section-info'>
      <div v-for='info in data' class='recognition-list-section-info-line'>
        <p v-if='!info.awardLink'>{{ info.award }}</p>
        <NuxtLink v-else :to='info.awardLink' target='_blank'>{{ info.award }}</NuxtLink>
        <div class='recognition-list-section-info-line-right'>
          <p>{{ info.awardDate.split('-')[0] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.recognition-list-section {
  @include small-type();
  display: flex;
  flex-direction: column;
  gap: desktop-vw(12px);

  &-header {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(12px);
    color: $black50;

    &-divider {
      border: .5px solid $black10;
    }
  }

  &-info {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(8px);

    &-line {
      display: flex;
      align-content: center;
      justify-content: space-between;

      &-right {
        color: $black50;
        display: flex;
        gap: desktop-vw(40px);
      }
    }
  }
}
</style>
