<template>
  <TabGroup as="div" class="w-full flex flex-col gap-3">
    <TabList
      as="div"
      class="gap-1 mb-5 lg:gap-2 max-w-fit py-2 lg:mt-3 md:mt-3 w-full flex justify-center rounded-xl bg-base-100 flex-wrap lg:flex-nowrap self-center lg:sticky lg:top-2 z-40 shadow-lg border border-base-300"
    >
      <Tab
        as="div"
        :key="tab.id"
        v-for="tab in tabs"
        class="focus:outline-none px-2"
        v-slot="{ selected }"
      >
        <button
          :class="[
            selected
              ? 'btn btn-primary text-white  shadow'
              : 'text-neutral border-primary border-2',
          ]"
          class="rounded-lg px-3 w-28 text-sm lg:text-base lg:w-36 flex items-center justify-center gap-2 py-2.5 font-medium leading-5 cursor-pointer"
        >
          <span class="hidden lg:block" v-if="!selected">
            <icon :name="tab.icon" size="25" class="hidden lg:block md:block" />
          </span>
          <span>{{ tab.name }}</span>
        </button>
      </Tab>
    </TabList>

    <div class="flex">
      <div class="lg:basis-9/12 basis-full">
        <div class="w-full">
          <ProfileTop />
        </div>
        <TabPanels class="mt-2 min-h-fit justify-center flex p-2">
          <transition
            v-for="tab in tabs"
            :key="tab.id"
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 "
            leave-active-class="transition-all duration-300 "
            leave-to-class="opacity-0  "
            mode="out-in"
          >
            <TabPanel class="rounded-xl basis-full flex justify-center mb-32">
              <component :is="tab.component" />
            </TabPanel>
          </transition>
        </TabPanels>
      </div>
      <div>
        <MobileSectionDisplay />
      </div>
    </div>
  </TabGroup>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
const tabs = [
  {
    id: 1,
    name: "Bio",
    icon: "mdi:user",
    component: defineAsyncComponent(() => import("./BioSection.vue")),
  },
  {
    id: 2,
    name: "Contact",
    icon: "teenyicons:contact-solid",
    component: defineAsyncComponent(() => import("./ContactSection.vue")),
  },
  {
    id: 3,
    name: "Links",
    icon: "tabler:link",
    component: defineAsyncComponent(() => import("./LinksSection.vue")),
  },
  {
    id: 5,
    name: "Media",
    icon: "material-symbols:media-link",
    component: defineAsyncComponent(() => import("./MediaSection.vue")),
  },

  {
    id: 5,
    name: "Services",
    icon: "grommet-icons:services",
    component: defineAsyncComponent(() => import("./ServiceTab.vue")),
  },
  {
    id: 6,
    name: "Testimonials",
    icon: "dashicons:testimonial",
    component: defineAsyncComponent(() =>
      import("./PersonalTestimonialsSection.vue")
    ),
  },
  {
    id: 4,
    name: "themes",
    icon: "material-symbols:draw",
    component: defineAsyncComponent(() => import("./ThemesSection.vue")),
  },
];
</script>
