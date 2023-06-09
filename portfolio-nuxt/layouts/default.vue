<template>
  <div class="font-thin sticky top-0 bg-white p-2">
    <div class="text-5xl p-2">michael winter</div>
    <div class="text-2xl px-8">
      works
      events
      about
      code
    </div>
  </div>
  <slot /> <!-- required here only -->
  <div class="sticky bottom-0 bg-white p-2 flex justify-center">
    <iframe width="400rem" height="20" scrolling="no" frameborder="no" allow="autoplay" 
    :src="'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + audioPlayerStore.soundcloud_trackid + '&inverse=false&auto_play=true&show_user=false'"></iframe>
  </div>
</template>

<script setup>
  import { useAudioPlayerStore } from "@/stores/AudioPlayerStore"
  const audioPlayerStore = useAudioPlayerStore()

</script>
