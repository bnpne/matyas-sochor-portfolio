<!-- EXPERIMENT PAGE -->

<script setup lang='ts'>
const route = useRoute()
const query = groq`*[_type == 'projects' && projectSlug.current == "${route.params.slug}"][0]`
const { data: experiment } = useSanityQuery<Project>(query)

useHead({
  title: `${experiment.value?.projectTitle} | Matyas Sochor`
})

onMounted(() => {
})
</script>

<template>
  <NuxtLayout name='work' class='experiment' :data='experiment'>
    <div v-if='experiment' class='experiment-container'>
      <div class='experiment-hero'>
        <div class='experiment-hero-img'>
          <div class='experiment-hero-img-overlay'></div>
          <SanityImage :asset-id="experiment.projectCaseImage?.asset?._ref" auto="format" w='1000' fit='clip' />
          <div v-if='experiment.projectDetails' class='experiment-hero-details'>
            <div class='experiment-hero-details-client'>
              <p>Client</p>
              <NuxtLink v-for='client in experiment.projectDetails?.clients' :to='client.clientLink'
                class='experiment-hero-details-client-link' target="_blank" rel="noreferrer">
                {{ client.clientName }}
              </NuxtLink>
              <div class="experiment-hero-details-client-footer"></div>
            </div>
            <div class='experiment-hero-details-info'>
              <div class='experiment-hero-details-info-section' v-if='experiment.projectDetails?.projectYear &&
    experiment.projectDetails?.projectType'>
                <p>Type/Year</p>
                <p v-for='type in experiment.projectDetails?.projectType'>{{ type }}</p>
              </div>
              <div class='experiment-hero-details-info-section' v-if='experiment.projectDetails?.projectRole'>
                <p>My role</p>
                <p v-for='role in experiment.projectDetails?.projectRole'>{{ role }}</p>
              </div>
              <div class='experiment-hero-details-info-section' v-if='experiment.projectDetails?.agencies'>
                <p>Agencies</p>
                <p v-for='agency in experiment.projectDetails?.agencies'>{{ agency }}</p>
              </div>
              <div class='experiment-hero-details-info-section' v-if='experiment.projectDetails?.awards'>
                <p>Recognition</p>
                <p v-for='award in experiment.projectDetails?.awards'>{{ award }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if='experiment.projectHeroText' class='experiment-intro'>
        <p class='experiment-intro-header'>Introduction</p>
        <SanityContent :blocks='experiment.projectHeroText' />
      </div>
      <div v-if='experiment.projectSections' class='experiment-sections'>
        <template v-for='section in experiment.projectSections.sections'>
          <ImageGrid v-if='section._type == "imageGrid"' :data='section' />
          <FullWidthImage v-else-if='section._type == "fullWidthImage"' :data='section' />
          <ProjectText v-else-if='section._type == "projectText"' :data='section' />
          <PlainText v-else-if='section._type == "projectPlainText"' :data='section' />
        </template>
      </div>
      <div v-if='experiment.projectCredits' class='experiment-credits'>
        <ProjectCredits :data='experiment.projectCredits' />
      </div>
    </div>
  </NuxtLayout>
</template>


<style lang='scss'>
.experiment {
  position: relative;

  &-container {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(10px);

    @include mobile() {
      gap: mobile-vw(10px);
    }
  }

  &-hero {
    position: relative;
    min-height: calc(100vh - desktop-vw(20px));
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @include rounded-border();

    @include mobile() {
      min-height: calc(100vh - mobile-vw(20px));
    }

    &-img {
      display: block;
      height: 100%;
      width: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &-overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.3) 16.69%, rgba(0, 0, 0, 0) 50.43%, rgba(0, 0, 0, 0) 77.51%, rgba(0, 0, 0, 0.44) 99.58%);
      }

      img {
        flex-grow: 1;
        @include image-default();
      }
    }

    &-details {
      min-height: desktop-vw(125px);
      width: 100%;
      position: absolute;
      z-index: 4;
      bottom: 0;
      left: 0;
      background: $white10;
      backdrop-filter: blur(10px);
      padding: desktop-vw(18px) desktop-vw(14px) desktop-vw(28px);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: flex-start;

      @include mobile() {
        min-height: mobile-vw(125px);
        padding: mobile-vw(18px) mobile-vw(14px) mobile-vw(28px);
      }

      &-client {
        display: flex;
        flex-direction: column;
        gap: desktop-vw(6px);
        @include small-type();
        line-height: desktop-vw(14px);
        color: #FFFFFF66;

        @include mobile() {
          gap: mobile-vw(6px);
          line-height: mobile-vw(14px);
        }

        &-link {
          color: $white;
          display: flex;
          gap: desktop-vw(4px);
          align-content: center;

          @include mobile() {
            gap: mobile-vw(4px);
          }

          &::after {
            content: url('~/assets/svg/link-arrow.svg');
            width: desktop-vw(13px);
            height: desktop-vw(13px);
            display: inline-block;
            margin-left: 4px;
            margin-top: 2px;
            margin-bottom: -2px;
            overflow: hidden;

            @include mobile() {
              width: mobile-vw(13px);
              height: mobile-vw(13px);
            }
          }
        }

        &-footer {
          width: 100%;
          border: solid 1px #FFFFFF33;
        }
      }

      &-info {
        display: flex;
        gap: desktop-vw(130px);
        align-content: flex-start;

        @include mobile() {
          gap: mobile-vw(130px);
        }

        &-section {
          @include small-type();
          line-height: desktop-vw(14px);
          display: flex;
          flex-direction: column;
          gap: desktop-vw(6px);
          color: $white;

          @include mobile() {
            gap: mobile-vw(6px);
            line-height: mobile-vw(14px);
          }

          &>p {
            &:first-child {
              color: #FFFFFF66;
            }
          }
        }
      }
    }
  }

  &-intro {

    &-header {
      margin-top: desktop-vw(30px);
      @include body-type();
      @include small-type();
      color: #00000040;
      margin-bottom: desktop-vw(320px);

      @include mobile() {
        margin-bottom: mobile-vw(114px);
        margin-top: mobile-vw(30px);
      }
    }

    margin-bottom: desktop-vw(30px);
    @include large-heading();
    max-width: 75%;

    @include mobile() {
      padding: 0 mobile-vw(14px);
      margin-bottom: mobile-vw(30px);
      max-width: 100%;
    }

    & strong {
      color: $black50;
    }
  }

  &-sections {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(10px);

    @include mobile() {
      gap: mobile-vw(10px);
    }

  }
}
</style>
