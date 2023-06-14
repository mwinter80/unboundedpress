<template>
  <div class="font-thin sticky top-0 bg-white p-2">
    <div class="text-5xl p-2"> <NuxtLink to='/'>michael winter</NuxtLink></div>
    <div class="inline-flex text-2xl">
      <NuxtLink class="px-8" to='/'>works</NuxtLink>
      <NuxtLink class="px-8" to='/events'>events</NuxtLink>
      <NuxtLink class="px-8" to='/about'>about</NuxtLink>
      <NuxtLink class="px-8" to='https://unboundedpress.org/code'>code</NuxtLink>
    </div>
  </div>
  <slot /> <!-- required here only -->
  <div class="sticky bottom-0 bg-white p-2 flex justify-center">
    <iframe width="400rem" height="20" scrolling="no" frameborder="no" allow="autoplay" 
    :src="'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + audioPlayerStore.soundcloud_trackid + '&inverse=false&auto_play=true&show_user=false'"></iframe>
  </div>

  <Modal v-model="modalStore.isOpen">
      <ModalBody :class="modalStore.aspect">
          <ImageSlider v-if="modalStore.type === 'image'" :bucket="modalStore.bucket" :gallery="modalStore.gallery"></ImageSlider>
          <iframe v-if="modalStore.type === 'video'" :src="'https://player.vimeo.com/video/' + modalStore.vimeo_trackid" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      </ModalBody>
  </Modal>
</template>

<script setup>
  import { useAudioPlayerStore } from "@/stores/AudioPlayerStore"
  import { useModalStore } from "@/stores/ModalStore"

  const audioPlayerStore = useAudioPlayerStore()
  const modalStore = useModalStore()

</script>
