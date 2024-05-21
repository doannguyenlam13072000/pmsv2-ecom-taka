<template>
  <div>
    <iframe
      ref="rpmIframe"
      :src="iframeSrc"
      width="100%"
      height="800"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const iframeSrc = 'https://vuepoc.readyplayer.me?frameApi'
const rpmIframe = ref(null)

const onIframeLoad = () => {
  window.addEventListener('message', handleMessage)
}

const handleMessage = (event: { origin?: any; source?: any; data?: any }) => {
  if (event.origin !== 'https://vuepoc.readyplayer.me') return

  const { source, data } = event
  if (source === 'readyplayerme') {
    console.log('Received message from Ready Player Me:', data)
    // Handle the data, e.g., store the avatar URL
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<style scoped>
iframe {
  border: none;
}
</style>
