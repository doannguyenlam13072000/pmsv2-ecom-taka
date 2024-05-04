<script lang="ts">
import { demoMixin } from '@/mixins/DemoMixin'

export default {
  mixins: [demoMixin]
}
</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>Mixin: {{ a }}</p>
  </div>
</template>
