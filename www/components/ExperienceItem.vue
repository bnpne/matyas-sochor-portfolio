<script setup lang='ts'>
defineProps(['data'])
</script>

<template>
  <div v-if='data' class='experience-list-section'>
    <div class='experience-list-section-header'>
      <p>Experience</p>
      <div class='experience-list-section-header-divider'></div>
    </div>
    <div class='experience-list-section-info'>
      <div v-for='info in data' class='experience-list-section-info-line'>
        <p v-if='!info.jobLink'>{{ info.job }}</p>
        <NuxtLink v-else :to='info.jobLink' target='_blank'>{{ info.job }}</NuxtLink>
        <div class='experience-list-section-info-line-right'>
          <p>{{ info.jobRole }}</p>
          <p>{{ info.jobLocation }}</p>
          <p>{{ info.jobStartDate.split('-')[0] }} - Current</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.experience-list-section {
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
      border: 1px solid $black10;
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
