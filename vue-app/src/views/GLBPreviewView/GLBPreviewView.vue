<template>
  <h1>Preview</h1>
</template>

<script setup>
import { GLTFLoader  } from 'three/addons/loaders/GLTFLoader.js'
import { onMounted } from 'vue'

onMounted(() => {
  console.log('onMounted')
  initThree()
})

const initThree = () => {
  const loader = new GLTFLoader()
  const url = new URL('./model.glb', import.meta.url);
  console.log('url: ' + url);

  loader.load(
    url,
    function (gltf) {
      scene.add(gltf.scene)

      gltf.animations // Array<THREE.AnimationClip>
      gltf.scene // THREE.Group
      gltf.scenes // Array<THREE.Group>
      gltf.cameras // Array<THREE.Camera>
      gltf.asset // Object
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    function (error) {
      console.error("error", error)
    }
  )
}
</script>
