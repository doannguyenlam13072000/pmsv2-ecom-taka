<script>
import { modalMixin } from '@/mixins/modalMixin'
export default {
  data() {},
  methods: {},
  mixins: [modalMixin],
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeUnmount() {
    console.log('beforeUnmount')
  },
  unmounted() {
    console.log('unmounted')
  },
  activated() {
    console.log('objeactivatedct')
  },
  deactivated() {
    console.log('deactivated')
  },
  errorCaptured() {
    console.log('errorCaptured')
  }
}
</script>
<template>
  <div class="about">
    <h1 class="text-green-500">This is an Home page</h1>
    <p>Mixin: {{ a }}</p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
