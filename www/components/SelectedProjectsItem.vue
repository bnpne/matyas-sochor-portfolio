<script setup lang='ts'>
defineProps(['data'])
</script>

<template>
  <div v-if='data' class='sc-list-section'>
    <div class='sc-list-section-header'>
      <ScrollFadeIn>
        <p>Selected Projects & Collaborations</p>
      </ScrollFadeIn>
      <ScrollDivider>
        <div class='sc-list-section-header-divider'></div>
      </ScrollDivider>
    </div>
    <div class='sc-list-section-info'>
      <ScrollFadeIn>
        <div v-for='info in data' class='sc-list-section-info-line'>
          <p>{{ info.projectTitle }}</p>
          <div class='sc-list-section-info-line-right'>
            <p>{{ info.projectType }}</p>
            <p>{{ info.projectDate.split('-')[0] }}</p>
          </div>
        </div>
      </ScrollFadeIn>
    </div>
  </div>
</template>

<style lang='scss'>
.sc-list-section {
  @include small-type();
  display: flex;
  flex-direction: column;
  gap: desktop-vw(12px);

  @include mobile() {
    padding: 0 mobile-vw(14px);
  }

  @include mobile() {
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

      &-right {
        color: $black50;
        display: flex;
        justify-content: space-between;
        width: desktop-vw(175px);

        @include mobile() {
          width: mobile-vw(175px);
        }
      }
    }
  }
}
</style>
