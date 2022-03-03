<template>
  <div v-loading="true"></div>
</template>

<script lang="ts">
// Component
import { Component, Prop } from "vue-property-decorator";

// Store
import { Getter, Action } from "vuex-class";
import { BaseVue } from "@/base/view/BaseVue";

@Component({
  components: {},
})
export default class Loading extends BaseVue {}
</script>
