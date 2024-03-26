<script setup lang='ts'>
defineProps(['data'])
</script>

<template>
  <div v-if='data' class='list-section'>
    <div class='list-section-header'>
      <p>Education</p>
      <div class='list-section-header-divider'></div>
    </div>
    <div class='list-section-info'>
      <div v-for='info in data' class='list-section-info-line'>
        <p>{{ info.school }}</p>
        <div class='list-section-info-line-right'>
          <p>{{ info.schoolLocation }}</p>
          <p v-if='!info.currentlyAttending'>{{ info.schoolDate.split('-')[0] }}</p>
          <p v-else>Current</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.list-section {
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
        justify-content: space-between;
        width: desktop-vw(150px);
      }
    }
  }
}
</style>
