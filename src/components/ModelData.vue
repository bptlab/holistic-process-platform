<template>
  <div>
    <o-field label="Name of Prozess">
      <o-input type="text" :value="currentLayerName" @input="updateName" />
    </o-field>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import processStore from "../store/processLayerStore";
export default defineComponent({
  name: "model-data",
  data() {
    return {
      processLayerStore: processStore.state,
    };
  },
  methods: {
    updateName(event) {
      if (!event.currentTarget) {
        return;
      }
      processStore.updateActiveLayerName(event.currentTarget.value);
    },
  },
  computed: {
    currentLayerName(): string | undefined {
      const activeLayer = processStore.getActiveLayer();
      if (!activeLayer) {
        return "";
      }
      if (activeLayer.name) {
        return activeLayer.name;
      }
      return activeLayer.id;
    },
  },
});
</script>

<style>
ul > li {
  margin-left: 10px;
}
</style>
