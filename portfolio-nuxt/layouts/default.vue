<template>
  <div class="grid grid-cols-[60%,40%] w-full font-thin sticky top-0 bg-white p-2 z-20">
      <div>
        <div class="text-5xl p-2"> <NuxtLink to='/'>michael winter</NuxtLink></div>
        <div class="inline-flex text-2xl ml-4">
          <NuxtLink class="px-3" to='/'>works</NuxtLink>
          <NuxtLink class="px-3" to='/events'>events</NuxtLink>
          <NuxtLink class="px-3" to='/about'>about</NuxtLink>
          <NuxtLink class="px-3" to='https://unboundedpress.org/code'>code</NuxtLink>
          <NuxtLink class="px-3" to='https://unboundedpress.org/legacy'>legacy</NuxtLink>
        </div>
      </div>
      <div class="ml-3 p-2 text-sm justify-end">
        Welcome to the new front-end of my website, which is still in development. It functions similar to the former site. In case you cannot find something here, you can still view the old front-end by clicking on the "legacy" link in the menu below. If you have any questions or find any problems please contact, me at the email link in the about section.
      </div>
  </div>
  <slot /> <!-- required here only -->
  <div class="sticky bottom-0 bg-white p-2 flex justify-center z-20">
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
