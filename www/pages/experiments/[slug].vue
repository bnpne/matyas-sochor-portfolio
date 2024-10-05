<!-- Experiment PAGE -->
<!-- https://plasticbionic.com/project/days-2-->
<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Player from "@vimeo/player";

definePageMeta({
  pageTransition: {
    css: false,
    name: "experiment",
    mode: "out-in",
    onEnter(el, done) {
      const app = useNuxtApp();

      gsap.to(".t-o", {
        opacity: 0,
        duration: 0.75,
        delay: 0.25,
        ease: "circ.out",
        onComplete: () => {
          app.$scrollStart();
          done();
        },
      });
    },
    onLeave(el, done) {
      const app = useNuxtApp();
      app.$scrollStop();
      gsap.to(".t-o", {
        opacity: 1,
        duration: 0.75,
        ease: "circ.out",
        onComplete: () => {
          done();
        },
      });
    },
  },
});

const app = useNuxtApp();
const router = useRouter();
const ellipse = ref();
const progress = reactive({ value: 0 });
const lenisProgress = reactive({ value: 0 });
const caseImage = ref(null);
const scrollImage = ref(null);
const { isMobile, isSafari } = useDevice();

const testProgress = () => {
  progress.value += 25;
};

const da = computed(() => {
  const c = 2 * Math.PI * 21.5;
  const p = c * (1 - progress.value / 100);
  return { c, p };
});

const route = useRoute();
const store = useData();
const { data } = storeToRefs(store);
const work = ref(null);
const loading = ref(true);
const called = ref(false);
const video = ref([]);
const workContainer = ref(null);
const vimeo = ref(null);
const vimeoPlayer = ref(null);
const footerVimeo = ref(null);
const footerVimeoPlayer = ref(null);

// Get next index
const nextIndex = reactive({ value: null });
const isNext = computed(() => {
  return nextIndex.value;
});
async function getIndex() {
  if (work.value) {
    toRaw(data.value).home?.selectedExperiments.forEach((a, i) => {
      if (a?._id === work.value?._id) {
        if (i === toRaw(data.value).home.selectedExperiments.length - 1) {
          nextIndex.value = 0;
        } else {
          nextIndex.value = i + 1;
        }
      }
    });
  }
  await nextTick();
}

const navigate = () => {
  setTimeout(async () => {
    await navigateTo(
      `/experiments/${
        toRaw(data.value).home?.selectedExperiments[isNext.value]?.projectSlug
          .current
      }`,
      { redirectCode: 301 }
    );
  }, 200);
};

watch(
  () => called.value,
  () => {
    if (!isMobile) {
      if (called.value === true) {
        let child = scrollImage.value.children[0];
        let tl = gsap.timeline({
          default: { ease: "expo.out" },
          onComplete: () => navigate(),
        });
        tl.to(scrollImage.value, {
          width: "100%",
          top: "100%",
          y: "-100%",
          delay: 0.5,
          duration: 1.2,
          ease: "expo.out",
        });
        tl.to(
          [".work-credits", ".work-sections"],
          { opacity: 0, ease: "expo.out", duration: 1.2 },
          "<"
        );
        tl.to(child, { duration: 1.2, y: "0%", ease: "expo.out" }, "<");
      }
    }
  }
);

let setCursorPosition = function (s, e, cp) {
  let bounds = s.getBoundingClientRect();
  let xPosition = e.clientX - bounds.left - cp.clientWidth / 2 + "px";
  let yPosition = e.clientY - cp.clientHeight / 2 + "px";
  cp.style.transform =
    "translate(" + xPosition + "," + yPosition + ") scale(1)";
  return {
    x: xPosition,
    y: yPosition,
  };
};

watch([() => store.isFetched, () => loading.value], async () => {
  if (!loading || store.isFetched) {
    toRaw(data.value)?.projects.forEach((p) => {
      if (p.projectSlug.current === route.params.slug) {
        work.value = p;
      }
    });
    getIndex();
    useHead({
      title: `${work.value?.projectTitle} | Matyas Sochor`,
    });
    await nextTick();

    let intro = gsap.timeline({
      defaults: { duration: 1, ease: "circ.out" },
      paused: true,
    });
    intro
      .from(".work-hero", { opacity: 0 }, ">-.5")
      // .from('.intro-anima', { scale: 1.2 }, '>-.9')
      .from(".detail-anima", { y: "50%", opacity: 0, stagger: 0.17 }, ">-.5");
    intro.play();
    ScrollTrigger.refresh(true);

    let cp = gsap.utils.toArray(".cursor-experiment-object");

    if (!isMobile && !isSafari) {
      if (workContainer.value) {
        let timeout;
        // workContainer.value.addEventListener('mouseenter', () => {
        //   setTimeout(() => {
        //     cp[0].style.opacity = 1
        //   }, 500)
        // })
        workContainer.value.addEventListener("mousemove", (e) => {
          setTimeout(() => {
            cp[0].style.opacity = 1;
          }, 100);
          // cp[0].style.opacity = 1
          setCursorPosition(workContainer.value, e, cp[0]);
        });
        workContainer.value.addEventListener("mouseleave", () => {
          setTimeout(() => {
            cp[0].style.opacity = 0;
          }, 100);
        });
      }
    }

    if (Array.isArray(toRaw(video.value))) {
      toRaw(video.value).forEach((v) => {
        v.currentTime = 0;
        v.load();
      });
    } else {
      toRaw(video.value).currentTime = 0;
      toRaw(video.value).load();
    }

    if (caseImage.value) {
      gsap.to(caseImage.value, {
        y: "30%",
        ease: " circ.out",
        scrollTrigger: {
          trigger: caseImage.value,
          scrub: 0,
          start: "top top",
          end: "bottom top",
        },
      });
    }

    if (vimeo.value) {
      let options = {
        playsinline: true,
        play_button_position: "center",
      };
      vimeoPlayer.value = new Player(vimeo.value, options);
    }
    if (footerVimeo.value) {
      let options = {
        playsinline: true,
      };
      footerVimeoPlayer.value = new Player(footerVimeo.value, options);
    }

    /// SCROLL ANIMATIONS
    /// Fade In
    let animaFade = gsap.utils.toArray(".anima-fade");
    animaFade.forEach((f) => {
      gsap.from(f.children, {
        opacity: 0,
        y: "80%",
        duration: 1,
        ease: "circ.out",
        stagger: 0.17,
        scrollTrigger: {
          trigger: f,
          start: "top 95%",
        },
      });
    });

    /// Scale
    let animaScale = gsap.utils.toArray(".anima-scale");
    animaScale.forEach((s) => {
      let img = gsap.utils.toArray(".a", s);
      gsap.from(img, {
        scale: 1.1,
        ease: "circ.out",
        stagger: 0.17,
        duration: 1.5,
        scrollTrigger: {
          trigger: s,
          start: "top 95%",
        },
      });
    });

    /// Divider
    let animaDivider = gsap.utils.toArray(".anima-divider");
    animaDivider.forEach((d) => {
      gsap.from(d.children, {
        width: "0%",
        ease: "circ.out",
        stagger: 0.17,
        duration: 1.5,
        scrollTrigger: {
          trigger: d,
          start: "top 95%",
        },
      });
    });

    gsap.from(".work-footer-scroll-image", {
      y: "50%",
      duration: 0.8,
      ease: "circ.out",
      scrollTrigger: {
        trigger: ".work-footer-scroll",
        start: "bottom bottom",
      },
    });

    app.$lenis.on("scroll", (e) => {
      lenisProgress.value = e.progress;
    });

    let t = 0;
    if (!isMobile) {
      window.addEventListener("wheel", (e) => {
        if (lenisProgress.value === 1) {
          if (t < 100) {
            t += e.deltaY / 20;
            t = Math.min(Math.max(t, 0), 100);
            gsap.to(progress, { value: t, ease: "circ.out" });
          }

          if (t === 100) {
            called.value = true;
          }
        } else {
          t = 0;
          gsap.to(progress, { value: 0, ease: "circ.out" });
        }
      });
    }
  }
});

onMounted(() => {
  loading.value = false;
  app.$scrollStart();
  if (app.$lenis.isStopped) {
  }
});

onBeforeUnmount(() => {
  // Revert gsap context
  // ScrollTrigger.killAll()
});
</script>

<template>
  <div class="work" id="page">
    <NuxtLayout name="work" :data="work">
      <div v-if="work" class="work-container">
        <div class="cursor-experiment-object">
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 80 30"
          >
            <g filter="url(#a)">
              <rect width="80" height="30" rx="15" fill="#fff" />
              <path
                d="m19.933 15.087-1.222-.351c-.611-.195-1.092-.507-1.456-.936-.364-.429-.546-.962-.546-1.599 0-.689.26-1.274.78-1.742.52-.468 1.157-.702 1.898-.702.676 0 1.248.169 1.716.507a2.73 2.73 0 0 1 1.001 1.365l-.923.377a1.953 1.953 0 0 0-.624-.923 1.663 1.663 0 0 0-1.092-.377c-.494 0-.897.13-1.222.39-.325.26-.481.611-.481 1.053 0 .78.442 1.3 1.339 1.573l.975.299c.715.208 1.261.546 1.625 1.001.364.455.546 1.001.546 1.638s-.26 1.209-.793 1.716c-.533.507-1.209.754-2.028.754-.767 0-1.404-.195-1.898-.585a3.335 3.335 0 0 1-1.066-1.443l.936-.416c.195.481.468.845.806 1.105s.741.39 1.196.39c.533 0 .975-.143 1.326-.429.351-.286.52-.65.52-1.079 0-.767-.442-1.3-1.313-1.586Zm9.895 1.313.91.377c-.221.728-.572 1.313-1.053 1.742-.482.429-1.105.65-1.86.65-1.13 0-1.988-.442-2.573-1.313s-.871-2.002-.871-3.393c0-1.365.299-2.483.896-3.367.598-.884 1.456-1.326 2.561-1.326.767 0 1.404.221 1.912.663.506.442.858 1.027 1.04 1.742l-.936.338c-.143-.533-.377-.962-.715-1.287a1.737 1.737 0 0 0-1.248-.494c-.793 0-1.404.338-1.82 1.027-.417.689-.625 1.586-.625 2.691 0 1.079.221 1.963.663 2.665.442.702 1.04 1.053 1.781 1.053.494 0 .91-.156 1.235-.481.326-.325.56-.754.703-1.287Zm7.84 2.6-1.976-3.328h-1.781v3.354H32.91V9.913h2.652c.936 0 1.677.26 2.236.78.559.52.832 1.222.832 2.093 0 .676-.169 1.235-.507 1.69-.338.455-.806.78-1.404.975L38.786 19h-1.118Zm-1.976-8.138h-1.794v3.874h1.781c.559 0 1.027-.169 1.391-.494.364-.325.546-.806.546-1.443 0-.611-.182-1.092-.546-1.43-.364-.338-.819-.507-1.378-.507Zm8.023 7.345c.78 0 1.352-.338 1.716-1.027.364-.689.546-1.599.546-2.743 0-1.131-.182-2.041-.546-2.73-.364-.689-.936-1.027-1.716-1.027-.78 0-1.352.338-1.716 1.027-.364.689-.546 1.599-.546 2.743 0 1.131.182 2.041.546 2.73.364.689.936 1.027 1.716 1.027Zm0 .936v.013c-1.131 0-1.963-.442-2.51-1.313-.545-.871-.818-2.002-.818-3.393 0-.676.065-1.287.195-1.846.13-.559.325-1.053.585-1.482.26-.429.61-.767 1.053-1.014.442-.247.949-.364 1.534-.364 1.13 0 1.963.429 2.509 1.3.546.871.819 2.002.819 3.393 0 .676-.065 1.287-.195 1.846a5.043 5.043 0 0 1-.585 1.482c-.26.429-.611.767-1.053 1.014-.442.247-.95.364-1.534.364ZM49.293 19V9.887h1.001v8.164h4.55V19h-5.55Zm8.062 0V9.887h1v8.164h4.55V19h-5.55Z"
                fill="#000"
              />
            </g>
            <defs>
              <filter
                id="a"
                x="-200"
                y="-200"
                width="480"
                height="430"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="100" />
                <feComposite
                  in2="SourceAlpha"
                  operator="in"
                  result="effect1_backgroundBlur_484_20180"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_backgroundBlur_484_20180"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div ref="workContainer" class="work-hero pre-project">
          <div class="work-hero-img pre-image" ref="caseImage">
            <!-- <div class='work-hero-img-overlay'></div> -->
            <template v-if="!work.projectDetailImage">
              <template
                v-if="work.projectCaseImage?.projectCaseSelection === 'image'"
              >
                <SanityImage
                  class="intro-anima s-t"
                  :asset-id="work.projectCaseImage?.image.asset?._ref"
                  auto="format"
                  w="2000"
                  fit="clip"
                />
              </template>
              <template
                v-else-if="
                  work.projectCaseImage?.projectCaseSelection === 'video'
                "
              >
                <SanityFile
                  :asset-id="work.projectCaseImage?.video.asset?._ref"
                >
                  <template #default="{ src }">
                    <video
                      ref="video"
                      class="intro-anima"
                      preload="true"
                      autoplay="true"
                      playsinline="true"
                      loop="true"
                      muted
                      :src="src"
                    ></video>
                  </template>
                </SanityFile>
              </template>
              <template
                v-else-if="
                  work.projectCaseImage?.projectCaseSelection === 'vimeo'
                "
              >
                <div
                  :data-vimeo-url="work.projectCaseImage?.vimeo"
                  ref="vimeo"
                  class="intro-anima vimeo-player"
                  play_button_position="center"
                  playsinline="true"
                />
              </template>
            </template>
            <template v-else>
              <SanityImage
                class="intro-anima s-t"
                :asset-id="work.projectDetailImage?.asset?._ref"
                auto="format"
                w="2000"
                fit="clip"
              />
            </template>
            <div v-if="work.projectDetails" class="work-hero-details">
              <div class="work-hero-details-client detail-anima">
                <p>Client</p>
                <template v-for="client in work.projectDetails?.clients">
                  <NuxtLink
                    :to="client.clientLink"
                    :class="
                      client.clientLink
                        ? 'work-hero-details-client-link'
                        : 'work-hero-details-client-nolink'
                    "
                    target="_blank"
                    rel="noreferrer"
                  >
                    {{ client.clientName }}
                  </NuxtLink>
                  <div
                    v-if="client.clientLink"
                    class="work-hero-details-client-footer"
                  ></div>
                </template>
              </div>
              <div class="work-hero-details-info">
                <div
                  class="work-hero-details-info-section detail-anima"
                  v-if="
                    work.projectDetails?.projectYear &&
                    work.projectDetails?.projectType
                  "
                >
                  <p>Type/Year</p>
                  <p v-for="type in work.projectDetails?.projectType">
                    {{ type }}
                  </p>
                </div>
                <div
                  class="work-hero-details-info-section detail-anima"
                  v-if="work.projectDetails?.projectRole"
                >
                  <p>My role</p>
                  <p v-for="role in work.projectDetails?.projectRole">
                    {{ role }}
                  </p>
                </div>
                <div
                  class="work-hero-details-info-section detail-anima"
                  v-if="work.projectDetails?.agencies"
                >
                  <p>Agencies</p>
                  <p v-for="agency in work.projectDetails?.agencies">
                    {{ agency }}
                  </p>
                </div>
                <div
                  class="work-hero-details-info-section detail-anima"
                  v-if="work.projectDetails?.awards"
                >
                  <p>Recognition</p>
                  <p v-for="award in work.projectDetails?.awards">
                    {{ award }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="work.projectHeroText" class="work-intro">
          <span class="anima-fade">
            <p class="work-intro-header">Introduction</p>
          </span>
          <span class="anima-fade">
            <SanityContent :blocks="work.projectHeroText" />
          </span>
        </div>
        <div v-if="work.projectSections" class="work-sections">
          <template v-for="section in work.projectSections.sections">
            <ImageGrid v-if="section._type == 'imageGrid'" :data="section" />
            <FullWidthImage
              v-else-if="section._type == 'fullWidthImage'"
              :data="section"
            />
            <ProjectText
              v-else-if="section._type == 'projectText'"
              :data="section"
            />
            <PlainText
              v-else-if="section._type == 'projectPlainText'"
              :data="section"
            />
          </template>
        </div>
        <div v-if="work.projectCredits" class="work-credits">
          <ProjectCredits :data="work.projectCredits" />
        </div>
        <template v-if="data.home?.selectedExperiments[isNext]">
          <div class="work-footer">
            <span class="anima-fade">
              <p class="work-footer-text">
                Do you want to know more about my role, the team and the
                process?
              </p>
            </span>
            <div>
              <span class="anima-fade">
                <NuxtLink
                  to="mailto:matyas@sochor.xyz"
                  class="work-footer-button"
                >
                  Let's Chat
                </NuxtLink>
              </span>
            </div>
            <div class="work-footer-divider"></div>
            <template v-if="!isMobile">
              <NuxtLink
                :to="`/experiments/${data.home?.selectedExperiments[isNext].projectSlug.current}`"
                class="work-footer-scroll"
              >
                <span class="anima-fade">
                  <p v-if="!isMobile" class="work-footer-scroll-heading">
                    Scroll to next project
                  </p>
                  <p v-else class="work-footer-scroll-heading">
                    To next project
                  </p>
                </span>
                <span class="anima-fade">
                  <h2 class="work-footer-scroll-next">
                    {{ data.home?.selectedExperiments[isNext]?.projectTitle }}
                  </h2>
                </span>
                <span class="anima-fade">
                  <div class="work-footer-scroll-spinner">
                    <div class="work-footer-scroll-spinner-base">
                      <svg
                        viewBox="0 0 46 45"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.9992 26.9004L22.5763 27.3234L22.9992 27.7451L23.4222 27.3234L22.9992 26.9004ZM23.4222 26.4775L18.6431 21.6985L17.7972 22.5443L22.5763 27.3234L23.4222 26.4775ZM23.4222 27.3234L28.2012 22.5443L27.3553 21.6985L22.5763 26.4775L23.4222 27.3234ZM23.5966 26.9004L23.5966 16.3953L22.4018 16.3953L22.4018 26.9004L23.5966 26.9004Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div class="work-footer-scroll-spinner-progress">
                      <svg
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          v-if="da.c"
                          ref="ellipse"
                          cx="22"
                          cy="22"
                          r="21.5"
                          stroke="black"
                          :stroke-dasharray="`${da?.c - da?.p} ${da?.p}`"
                        />
                      </svg>
                    </div>
                  </div>
                </span>
                <span>
                  <div
                    ref="scrollImage"
                    v-if="data.home?.selectedExperiments[isNext]"
                    class="work-footer-scroll-image"
                  >
                    <template
                      v-if="
                        !data.home.selectedExperiments[isNext]
                          .projectDetailImage
                      "
                    >
                      <template
                        v-if="
                          data.home?.selectedExperiments[isNext]
                            ?.projectCaseImage?.projectCaseSelection === 'image'
                        "
                      >
                        <SanityImage
                          class="a"
                          :asset-id="
                            data.home?.selectedExperiments[isNext]
                              ?.projectCaseImage?.image.asset?._ref
                          "
                          auto="format"
                          w="2000"
                          fit="clip"
                        />
                      </template>
                      <template
                        v-else-if="
                          data.home?.selectedExperiments[isNext]
                            ?.projectCaseImage?.projectCaseSelection === 'video'
                        "
                      >
                        <SanityFile
                          :asset-id="
                            data.home?.selectedExperiments[isNext]
                              ?.projectCaseImage?.video.asset?._ref
                          "
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
                      </template>
                      <template
                        v-else-if="
                          data.home?.selectedExperiments[isNext]
                            ?.projectCaseImage?.projectCaseSelection === 'vimeo'
                        "
                      >
                        <div
                          :data-vimeo-url="
                            data.home?.selectedExperiments[isNext]
                              ?.projectCaseImage.vimeo
                          "
                          ref="footerVimeo"
                          class="vimeo-player"
                        />
                      </template>
                    </template>
                    <template v-else>
                      <SanityImage
                        class="intro-anima s-t"
                        :asset-id="
                          data.home?.selectedExperiments[isNext]
                            ?.projectDetailImage?.asset?._ref
                        "
                        auto="format"
                        w="2000"
                        fit="clip"
                      />
                    </template>
                  </div>
                </span>
              </NuxtLink>
            </template>
            <template v-else>
              <NuxtLink
                :to="`/experiments/${data.home?.selectedExperiments[isNext].projectSlug.current}`"
                class="work-footer-scroll"
              >
                <span class="anima-fade">
                  <p class="work-footer-scroll-heading">
                    Click to next experiment
                  </p>
                </span>
                <span class="anima-fade">
                  <h2 class="work-footer-scroll-next">
                    {{ data.home?.selectedExperiments[isNext]?.projectTitle }}
                  </h2>
                </span>
                <span class="anima-fade">
                  <div class="work-footer-scroll-spinner">
                    <!-- <div class='work-footer-scroll-spinner-base'> -->
                    <!-- <svg viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg"> -->
                    <!--   <path -->
                    <!--     d="M22.9992 26.9004L22.5763 27.3234L22.9992 27.7451L23.4222 27.3234L22.9992 26.9004ZM23.4222 26.4775L18.6431 21.6985L17.7972 22.5443L22.5763 27.3234L23.4222 26.4775ZM23.4222 27.3234L28.2012 22.5443L27.3553 21.6985L22.5763 26.4775L23.4222 27.3234ZM23.5966 26.9004L23.5966 16.3953L22.4018 16.3953L22.4018 26.9004L23.5966 26.9004Z" -->
                    <!--     fill="black" /> -->
                    <!-- </svg> -->
                    <!-- <svg viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"> -->
                    <!--   <path -->
                    <!--     d="M42.054 13.0789C43.2463 15.6468 43.9212 18.4245 44.0401 21.2533C44.1589 24.0821 43.7195 26.9066 42.7468 29.5655C41.7741 32.2244 40.2872 34.6658 38.371 36.7501C36.4548 38.8344 34.1468 40.5208 31.5788 41.7132C29.0109 42.9055 26.2332 43.5804 23.4044 43.6993C20.5756 43.8181 17.7512 43.3787 15.0922 42.4059C12.4333 41.4332 9.99196 39.9463 7.90766 38.0301C5.82336 36.1139 4.13689 33.806 2.94455 31.238C1.7522 28.6701 1.07733 25.8924 0.958462 23.0636C0.839595 20.2348 1.27906 17.4103 2.25177 14.7514C3.22448 12.0925 4.71138 9.65114 6.62758 7.56684C8.54377 5.48254 10.8517 3.79607 13.4197 2.60373C15.9877 1.41138 18.7653 0.736509 21.5941 0.617642C24.4229 0.498775 27.2474 0.938242 29.9063 1.91095C32.5653 2.88366 35.0066 4.37056 37.0909 6.28676C39.1752 8.20295 40.8616 10.5109 42.054 13.0789L42.054 13.0789Z" -->
                    <!--     stroke="black" /> -->
                    <!--   <path -->
                    <!--     d="M22.4993 0.598633C26.6525 0.598633 30.7173 1.79823 34.2051 4.05321C37.6928 6.30818 40.455 9.52255 42.1596 13.3099C43.8642 17.0972 44.4385 21.2962 43.8137 25.4022C43.1888 29.5081 41.3913 33.3462 38.6373 36.455C35.8832 39.5638 32.2899 41.8109 28.2892 42.9263C24.2885 44.0416 20.0509 43.9777 16.0857 42.7422C12.1205 41.5067 8.59652 39.1522 5.93747 35.9618C3.27843 32.7714 1.59749 28.8808 1.09674 24.7579" -->
                    <!--     stroke="black" /> -->
                    <!--   <path -->
                    <!--     d="M22.4992 26.9883L22.0763 27.4113L22.4992 27.833L22.9222 27.4113L22.4992 26.9883ZM22.9222 26.5654L18.1431 21.7864L17.2972 22.6322L22.0763 27.4113L22.9222 26.5654ZM22.9222 27.4113L27.7012 22.6322L26.8553 21.7864L22.0763 26.5654L22.9222 27.4113ZM23.0966 26.9883L23.0966 16.4831L21.9018 16.4831L21.9018 26.9883L23.0966 26.9883Z" -->
                    <!--     fill="black" /> -->
                    <!-- </svg> -->
                  </div>
                  <!-- <div class='work-footer-scroll-spinner-progress'> -->
                  <!--   <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"> -->
                  <!--     <circle v-if='da.c' ref='ellipse' cx="22" cy="22" r="21.5" stroke='black' -->
                  <!--       :stroke-dasharray="`${(da?.c - da?.p)} ${da?.p}`" /> -->
                  <!--   </svg> -->
                  <!-- </div> -->
                  <!-- </div> -->
                </span>

                <span>
                  <div
                    ref="scrollImage"
                    v-if="data.home?.selectedExperiments[isNext]"
                    class="work-footer-scroll-image"
                  >
                    <template
                      v-if="
                        !data.home?.selectedExperiments[isNext]
                          ?.projectDetailImage
                      "
                    >
                      <template
                        v-if="
                          data.home?.selectedExperiments[isNext]
                            ?.projectCaseImage?.projectCaseSelection === 'image'
                        "
                      >
                        <SanityImage
                          class="a"
                          :asset-id="
                            data.home?.selectedExperiments[isNext]
                              ?.projectCaseImage?.image.asset?._ref
                          "
                          auto="format"
                          w="2000"
                          fit="clip"
                        />
                      </template>
                      <template
                        v-else-if="
                          data.home?.selectedExperiments[isNext]
                            ?.projectCaseImage?.projectCaseSelection === 'video'
                        "
                      >
                        <SanityFile
                          :asset-id="
                            data.home?.selectedExperiments[isNext]
                              ?.projectCaseImage?.video.asset?._ref
                          "
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
                      </template>
                    </template>
                    <template v-else>
                      <SanityImage
                        class="intro-anima s-t"
                        :asset-id="
                          data.home?.selectedExperiments[isNext]
                            ?.projectDetailImage?.asset?._ref
                        "
                        auto="format"
                        w="2000"
                        fit="clip"
                      />
                    </template>
                  </div>
                </span>
              </NuxtLink>
            </template>
          </div>
        </template>
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.cursor-experiment-object {
  position: fixed;
  display: block;
  opacity: 0;
  top: 5%;
  z-index: 100;
  transition: all 100ms ease-out;
  cursor: pointer;
  pointer-events: none;

  & > svg {
    width: desktop-vw(80px);
    height: desktop-vw(30px);
  }

  @include mobile() {
    display: none;
  }
}

.work {
  position: relative;

  &-container {
    display: flex;
    flex-direction: column;
    gap: desktop-vw(10px);
    position: relative;

    @include mobile() {
      overflow: hidden;
      gap: mobile-vw(6px);
    }
  }

  &-hero {
    position: relative;
    height: calc(100vh - desktop-vw(20px));
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @include rounded-border();

    @include mobile() {
      height: calc(100vh - mobile-vw(96px));
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
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.3) 16.69%,
            rgba(0, 0, 0, 0) 50.43%,
            rgba(0, 0, 0, 0) 77.51%,
            rgba(0, 0, 0, 0.44) 99.58%
          ),
          linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.3) 16.69%,
            rgba(0, 0, 0, 0) 50.43%,
            rgba(0, 0, 0, 0) 77.51%,
            rgba(0, 0, 0, 0.44) 99.58%
          );
      }

      img {
        flex-grow: 1;
        @include image-default();
      }

      video {
        height: 100%;
        width: 100%;
        flex-grow: 1;
        object-fit: cover;
      }

      .vimeo-player {
        height: 100%;
        width: 100%;
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

    &-details {
      min-height: desktop-vw(125px);
      width: 100%;
      position: absolute;
      z-index: 4;
      bottom: 0;
      left: 0;
      background: $white10;
      backdrop-filter: blur(10px);
      padding: desktop-vw(18px) desktop-vw(24px) desktop-vw(28px);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: flex-start;

      @include mobile() {
        min-height: mobile-vw(125px);
        padding: mobile-vw(18px) mobile-vw(14px) mobile-vw(28px);
        justify-content: flex-start;
        gap: mobile-vw(40px);
        overflow-x: scroll;
      }

      &-client {
        display: flex;
        flex-direction: column;
        gap: desktop-vw(6px);
        @include small-type();
        line-height: desktop-vw(14px);
        color: #ffffff66;

        @include mobile() {
          gap: mobile-vw(6px);
          line-height: mobile-vw(14px);
          white-space: nowrap;
        }

        &-link {
          color: $white;
          display: flex;
          // gap: desktop-vw(4px);
          align-content: center;
          margin-bottom: desktop-vw(4px);

          @include mobile() {
            //gap: mobile-vw(4px);
            margin-bottom: mobile-vw(4px);
          }

          &::after {
            content: url("~/assets/svg/link-arrow.svg");
            width: desktop-vw(13px);
            height: desktop-vw(13px);
            display: inline-block;
            margin-left: 4px;
            //margin-top: 2px;
            // margin-bottom: -2px;
            overflow: hidden;

            @include mobile() {
              width: mobile-vw(13px);
              height: mobile-vw(13px);
            }
          }
        }

        &-footer {
          width: 100%;
          border: solid 1px #ffffff33;
        }
      }

      &-info {
        display: flex;
        gap: desktop-vw(130px);
        align-content: flex-start;

        @include mobile() {
          gap: mobile-vw(40px);
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
            min-width: mobile-vw(100px);
          }

          & > p {
            &:first-child {
              color: #ffffff66;
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
      gap: mobile-vw(6px);
    }
  }

  &-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: desktop-vw(20px);

    @include mobile() {
      gap: mobile-vw(20px);
      padding: 0 mobile-vw(14px);
    }

    &-text {
      @include medium-type();
      width: 40%;
      margin-top: desktop-vw(68px);

      @include mobile() {
        @include large-heading();
        margin-top: mobile-vw(68px);
        width: 100%;
        font-size: mobile-vw(20px);
        line-height: mobile-vw(32px);
      }
    }

    &-button {
      @include button-default-black();
      @include small-type();
      width: auto;
      margin-bottom: desktop-vw(76px);
      padding: desktop-vw(12px) desktop-vw(25px);

      @include mobile() {
        margin-bottom: mobile-vw(26px);
        padding: mobile-vw(12px) mobile-vw(25px);
      }
    }

    &-divider {
      border: solid 0.5px $black10;
      margin-bottom: desktop-vw(96px);

      @include mobile() {
        margin-bottom: mobile-vw(26px);
      }
    }

    &-scroll {
      display: flex;
      flex-direction: column;
      //position: relative;
      align-items: center;
      gap: desktop-vw(24px);
      padding: 0 desktop-vw(60px);

      @include mobile() {
        gap: mobile-vw(16px);
        padding: 0 mobile-vw(60px);
      }

      &-heading {
        @include small-type();
        color: $black50;
      }

      &-next {
        @include sans-serif-regular();
        font-size: desktop-vw(56px);
        line-height: desktop-vw(67px);

        @include mobile() {
          text-align: center;
          font-size: mobile-vw(32px);
          line-height: mobile-vw(36px);
        }
      }

      &-spinner {
        position: relative;
        height: desktop-vw(44px);
        width: desktop-vw(44px);
        border-radius: 50%;
        margin-bottom: desktop-vw(144px);

        @include mobile() {
          height: mobile-vw(44px);
          width: mobile-vw(44px);
          margin-bottom: mobile-vw(114px);
        }

        &-base {
          position: relative;
          z-index: 1;
          height: 100%;
          width: 100%;
          border-radius: 50%;
          background: $white;
          border: $black10 solid 1px;
        }

        &-progress {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          height: 100%;
          width: 100%;
          border-radius: 50%;
          background: transparent;
          transform: rotate(-90deg);

          svg {
            height: desktop-vw(44px);
            width: desktop-vw(44px);

            @include mobile() {
              height: mobile-vw(40px);
              width: mobile-vw(40px);
            }
          }
        }
      }

      &-image {
        position: absolute;
        top: calc(100% - desktop-vw(74px));
        height: calc(100vh - desktop-vw(20px));
        //left: 50%;
        //transform: translate(-50%, 0);
        left: 0;
        width: 100%;
        z-index: 10;
        display: flex;
        flex-direction: column;
        width: 100%;
        flex-grow: 1;

        &-overlay {
          position: absolute;
          height: 100%;
          width: 100%;
          z-index: 11;
          background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.3) 16.69%,
              rgba(0, 0, 0, 0) 50.43%,
              rgba(0, 0, 0, 0) 77.51%,
              rgba(0, 0, 0, 0.44) 99.58%
            ),
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.3) 16.69%,
              rgba(0, 0, 0, 0) 50.43%,
              rgba(0, 0, 0, 0) 77.51%,
              rgba(0, 0, 0, 0.44) 99.58%
            );
        }

        @include rounded();
        overflow: hidden;

        @include mobile() {
          //width: calc(100% - mobile-vw(10px));
          top: calc(100% - mobile-vw(120px));
        }

        img {
          @include image-default();
          flex-grow: 1;
          transform: translateY(-20%);
        }

        video {
          @include image-default();
          flex-grow: 1;
        }

        .vimeo-player {
          height: 100%;
          width: 100%;
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
  }
}
</style>
