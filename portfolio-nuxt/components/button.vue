<template>
    <div class="p-1">
        <div v-show="visible" class="inline-flex bg-black rounded-full text-xs" >
            <NuxtLink v-if="type === 'document'" class="inline-flex p-1" :to="'/scores/' + work.score" target="_blank">
                <Icon name="ion:book-outline" color="white" />
            </NuxtLink>
            <button @click="audioPlayerStore.setSoundCloudTrackID(work.soundcloud_trackid)" v-else-if="type === 'audio'" class="inline-flex p-1">
                <Icon name="wpf:speaker" color="white" />
            </button>
            <button v-else-if="type === 'video'" class="inline-flex p-1">
                <Icon name="fluent:video-48-filled" color="white" />
            </button>
            <button v-else="type === 'image'" class="inline-flex p-1">
                <Icon name="mdi:camera" color="white" />
            </button>
        </div>
    </div>
</template>

<script setup>
  import { useAudioPlayerStore } from "@/stores/AudioPlayerStore"
  const audioPlayerStore = useAudioPlayerStore()
</script>

<script>
    export default {
        props: ['type', 'work', 'visible']
    }
</script>