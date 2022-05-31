<template>
  <div class="relative">
    <div class="p-2 h-20 mt-1 text-center">
      <div class="text-center text-xl">Navigator</div>
      <o-field>
        <o-input
          v-model="searchTerm"
          placeholder="Search"
          inputClass="text-center"
          rootClass="mt-2 mb-2 w-11/12 mx-auto"
        ></o-input>
      </o-field>
    </div>
    <div class="mt-4">
      <o-tabs
        v-model="activeTab"
        class="w-full"
        tabItemWrapperClass="grow"
        navTabsClass="sticky top-0 z-50 bg-white relative"
        variant="primary"
      >
        <o-tab-item value="0" label="Business Processes">
          <BusinessProcessList
            @change-layer="$emit('change-layer', $event)"
          ></BusinessProcessList>
          <o-button rounded @click="$emit('new-process')" class="mt-4"
            >Add business process</o-button
          >
        </o-tab-item>

        <o-tab-item value="1" label="RPA Flows">
          <RpaFlowList
            @change-flow="$emit('change-flow', $event)"
          ></RpaFlowList>
          <o-button rounded @click="$emit('new-flow')" class="mt-4"
            >Add RPA flow</o-button
          >
        </o-tab-item>
      </o-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "navigation-sidebar",
  emits: ["new-process", "change-layer", "new-flow", "change-flow"],
  data() {
    return {
      searchTerm: "",
      activeTab: "0",
    };
  },
  methods: {
    clearSearchTerm() {
      this.searchTerm = "";
    },
  },
  components: { BusinessProcessList, RpaFlowList },
});
</script>

<script setup lang="ts">
import RpaFlowList from "./NavigationSidebar/RpaFlowList.vue";
import BusinessProcessList from "./NavigationSidebar/BusinessProcessList.vue";
</script>
