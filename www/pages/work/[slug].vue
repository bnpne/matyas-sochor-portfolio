<!-- WORK PAGE -->

<script setup lang='ts'>
const route = useRoute()
const query = groq`*[_type == 'projects' && projectSlug.current == "${route.params.slug}"][0]`
const { data: work } = useSanityQuery<Project>(query)

useHead({
  title: `${work.value?.projectTitle} | Matyas Sochor`
})

onMounted(() => {
  // console.log(toRaw(work.value))
})
</script>

<template>
  <NuxtLayout name='work' class='work' :data='work'>
    <div v-if='work' class='work-container'>
      <div class='work-hero'>
        <div class='work-hero-img'>
          <div class='work-hero-img-overlay'></div>
          <SanityImage :asset-id="work.projectCaseImage?.asset?._ref" auto="format" />
          <div v-if='work.projectDetails' class='work-hero-details'>
            <div class='work-hero-details-client'>
              <p>Client</p>
              <NuxtLink v-for='client in work.projectDetails?.clients' :to='client.clientLink'
                class='work-hero-details-client-link' target="_blank" rel="noreferrer">
                {{ client.clientName }}
              </NuxtLink>
              <div class="work-hero-details-client-footer"></div>
            </div>
            <div class='work-hero-details-info'>
              <div class='work-hero-details-info-section' v-if='work.projectDetails?.projectYear &&
    work.projectDetails?.projectType'>
                <p>Type/Year</p>
                <p v-for='type in work.projectDetails?.projectType'>{{ type }}</p>
              </div>
              <div class='work-hero-details-info-section' v-if='work.projectDetails?.projectRole'>
                <p>My role</p>
                <p v-for='role in work.projectDetails?.projectRole'>{{ role }}</p>
              </div>
              <div class='work-hero-details-info-section' v-if='work.projectDetails?.agencies'>
                <p>Agencies</p>
                <p v-for='agency in work.projectDetails?.agencies'>{{ agency }}</p>
              </div>
              <div class='work-hero-details-info-section' v-if='work.projectDetails?.awards'>
                <p>Recognition</p>
                <p v-for='award in work.projectDetails?.awards'>{{ award }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if='work.projectHeroText' class='work-intro'>
        <p class='work-intro-header'>Introduction</p>
        <SanityContent :blocks='work.projectHeroText' />
      </div>
      <div v-if='work.projectSections' class='work-sections'>
        <template v-for='section in work.projectSections.sections'>
          <ImageGrid v-if='section._type == "imageGrid"' :data='section' />
          <FullWidthImage v-else-if='section._type == "fullWidthImage"' :data='section' />
          <ProjectText v-else-if='section._type == "projectText"' :data='section' />
          <PlainText v-else-if='section._type == "projectPlainText"' :data='section' />
        </template>
      </div>
      <div v-if='work.projectCredits' class='work-credits'>
        <ProjectCredits :data='work.projectCredits' />
      </div>
      <ProjectFooter />
    </div>
  </NuxtLayout>
</template>

<style lang='scss'>
.work {
  position: relative;

  &-container {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(10px);
  }

  &-hero {
    position: relative;
    min-height: calc(100vh - desktop-vw(20px));
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @include rounded-border();

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

      &-client {
        display: flex;
        flex-direction: column;
        gap: desktop-vw(6px);
        @include small-type();
        line-height: desktop-vw(14px);
        color: #FFFFFF66;

        &-link {
          color: $white;
          display: flex;
          gap: desktop-vw(4px);
          align-content: center;

          &::after {
            content: url('~/assets/svg/link-arrow.svg');
            width: desktop-vw(13px);
            height: desktop-vw(13px);
            display: inline-block;
            margin-left: 4px;
            margin-top: 2px;
            margin-bottom: -2px;
            overflow: hidden;
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

        &-section {
          @include small-type();
          line-height: desktop-vw(14px);
          display: flex;
          flex-direction: column;
          gap: desktop-vw(6px);
          color: $white;

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
      @include body-type();
      @include small-type();
      color: #00000040;
      margin-bottom: desktop-vw(320px);
    }

    margin-bottom: desktop-vw(30px);
    @include large-heading();
    max-width: 75%;

    & strong {
      color: $black50;
    }
  }

  &-sections {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(10px);

  }
}
</style>
