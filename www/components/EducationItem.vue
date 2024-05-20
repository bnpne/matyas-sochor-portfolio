<script setup lang='ts'>
defineProps(['data'])
</script>

<template>
  <div v-if='data' class='list-section'>
    <div class='list-section-header'>
      <ScrollFadeIn>
        <p>Education</p>
      </ScrollFadeIn>
      <ScrollDivider>
        <div class='list-section-header-divider'></div>
      </ScrollDivider>
    </div>
    <div class='list-section-info'>
      <ScrollFadeIn>
        <div v-for='info in data' class='list-section-info-line'>
          <p v-if='!info.schoolLink'>{{ info.school }}</p>
          <NuxtLink v-else :to='info.schoolLink' target='_blank'>{{ info.school }}</NuxtLink>
          <div class='list-section-info-line-right'>
            <p>{{ info.schoolLocation }}</p>
            <p v-if='!info.currentlyAttending'>{{ info.schoolDate.split('-')[0] }}</p>
            <p v-else>Current</p>
          </div>
        </div>
      </ScrollFadeIn>
    </div>
  </div>
</template>

<style lang='scss'>
.list-section {
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

      &>a {
        transition: color 300ms ease-out;

        &:hover {
          color: $black50;
        }
      }

      &-right {
        color: $black50;
        display: flex;
        justify-content: space-between;
        width: desktop-vw(150px);

        @include mobile() {
          width: auto;
          gap: mobile-vw(10px);
        }
      }

      @include mobile() {
        gap: mobile-vw(14px);
      }
    }
  }
}
</style>
