<script setup lang='ts'>
defineProps(['data'])
</script>

<template>
  <div v-if='data' class='software-list-section'>
    <div class='software-list-section-header'>
      <p>Software</p>
      <div class='software-list-section-header-divider'></div>
    </div>
    <div class='software-list-section-info'>
      <div v-for='info, index in data' class='software-list-section-info-line'>
        <p v-if='index !== data.length - 1'>{{ info }},&nbsp;</p>
        <p v-else>{{ info }}&nbsp;</p>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.software-list-section {
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
    display: inline-block;

    &-line {
      display: inline-block;
    }
  }
}
</style>
