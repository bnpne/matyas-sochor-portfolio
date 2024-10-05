<script setup lang="ts">
defineProps(["data"]);
import Player from "@vimeo/player";

const video = ref(null);
const vimeo = ref(null);
const embed = ref(null);

onMounted(() => {
  if (video.value) {
    video.value.currentTime = 0;
    video.value.load();
  }

  if (vimeo.value) {
    let options = {
      playsinline: true,
      play_button_position: "center",
    };
    embed.value = new Player(vimeo.value, options);
  }
});
</script>

<template v-if="data">
  <span class="anima-scale">
    <section class="section-full-width">
      <div class="section-full-width-image">
        <SanityImage
          class="a"
          v-if="data.fullWidthSelection === 'image'"
          :asset-id="data.image.asset?._ref"
          auto="format"
          w="2000"
          fit="clip"
        />
        <!-- todo fix video -->
        <SanityFile
          v-else-if="data.fullWidthSelection === 'video'"
          :asset-id="data.video.asset?._ref"
        >
          <template #default="{ src }">
            <video
              ref="video"
              class="a"
              autoplay="true"
              playsinline="true"
              loop="true"
              muted
              :src="src"
            ></video>
          </template>
        </SanityFile>
        <div
          v-else-if="data.fullWidthSelection === 'vimeo'"
          :data-vimeo-url="data.vimeo"
          ref="vimeo"
          class="vimeo-player"
        />
      </div>
    </section>
  </span>
</template>

<style lang="scss">
.section-full-width {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: desktop-vw(10px);
  width: 100%;

  &-image {
    @include rounded();
    overflow: hidden;
    width: 100%;
    height: 100%;
    flex: 1;

    & > img {
      height: 100%;
      width: 100%;
      vertical-align: top;
      object-fit: contain;
    }

    & > video {
      height: 100%;
      width: 100%;
      vertical-align: top;
      object-fit: contain;
    }

    .vimeo-player {
      width: 100%;
      aspect-ratio: 16/9;
      height: auto;
      position: relative;

      iframe {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100vw;
        height: 100vh;
        transform: translate(-50%, -50%);

        @media (min-aspect-ratio: 16/9) {
          // /* height = 100 * (9 / 16) = 56.25 */
          height: 56.25vw;
        }
        @media (max-aspect-ratio: 16/9) {
          // /* width = 100 / (9 / 16) = 177.777777 */
          width: 177.78vh;
        }
      }
    }
  }
}
</style>
