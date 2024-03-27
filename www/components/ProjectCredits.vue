<script setup lang='ts'>
defineProps(['data'])
</script>

<template v-if='data'>
  <section class='section-credits'>
    <div class="section-credits-container">
      <p class='section-credits-title'>Credits</p>
      <ul>
        <li class='section-credits-credit' v-for="credit in data">
          <p class='section-credits-credit-text'>
            <span>
              {{ credit.creditTitle }}
            </span>
            <span>&nbsp;·&nbsp;</span>
            <span>
              {{ credit.creditName }}
            </span>
          </p>
          <div class='section-credits-credit-divider'></div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang='scss'>
.section-credits {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  margin-top: desktop-vw(30px);
  margin-bottom: desktop-vw(100px);

  @include mobile() {
    margin-top: mobile-vw(30px);
    margin-bottom: mobile-vw(100px);
    padding: 0 mobile-vw(14px);
  }

  &-container {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(40px);
    width: 50%;

    @include mobile() {
      gap: mobile-vw(40px);
      width: 100%;
    }
  }

  &-title {
    color: $black50;
    @include small-type();
  }

  &-credit {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: desktop-vw(16px);
    margin-bottom: desktop-vw(16px);
    margin-right: desktop-vw(14px);

    @include mobile() {
      gap: mobile-vw(16px);
      margin-bottom: mobile-vw(16px);
      margin-right: mobile-vw(14px);
    }

    &-text {
      @include small-type();
    }

    &-divider {
      border: .5px solid $black10;
    }
  }

}
</style>
