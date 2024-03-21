<script setup lang='ts'>
defineProps(['data'])
</script>

<template>
  <div v-if='data' class='sc-list-section'>
    <div class='sc-list-section-header'>
      <p>Selected Projects & Collaborations</p>
      <div class='sc-list-section-header-divider'></div>
    </div>
    <div class='sc-list-section-info'>
      <div v-for='info in data' class='sc-list-section-info-line'>
        <p>{{ info.projectTitle }}</p>
        <div class='sc-list-section-info-line-right'>
          <p>{{ info.projectType }}</p>
          <p>{{ info.projectDate.split('-')[0] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.sc-list-section {
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
        justify-content: space-between;
        width: desktop-vw(175px);
      }
    }
  }
}
</style>
