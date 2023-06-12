<template>
    <div class="p-1">
        <div v-show="visible" class="bg-black rounded-full text-xs" >

            <NuxtLink v-if="type === 'score'" class="inline-flex p-1" :to="'/' + bucket + '/' + work.score">
                <Icon name="ion:book-outline" color="white" />
            </NuxtLink>

            <NuxtLink v-else-if="type === 'pub'" class="inline-flex p-1">
                <Icon name="ion:book-outline" color="white" />
            </NuxtLink>

            <button @click="audioPlayerStore.setSoundCloudTrackID(work.soundcloud_trackid)" v-else-if="type === 'audio'" class="inline-flex p-1">
                <Icon name="wpf:speaker" color="white" />
            </button>

            <button @click="modalStore.setModalProps('video', 'aspect-video', true, '', '', work.vimeo_trackid)" v-else-if="type === 'video'" class="inline-flex p-1">
                <Icon name="fluent:video-48-filled" color="white" />
            </button>

            <button @click="modalStore.setModalProps('image', 'aspect-auto', true, 'images', work.image_ids, '')" v-else="type === 'image'" class="inline-flex p-1">
                <Icon name="mdi:camera" color="white" />
            </button>

        </div>
    </div>
</template>

<script setup>
  import { useAudioPlayerStore } from "@/stores/AudioPlayerStore"
  import { useModalStore } from "@/stores/ModalStore"

  const audioPlayerStore = useAudioPlayerStore()
  const modalStore = useModalStore()

</script>

<script>
    export default {
        props: ['type', 'work', 'bucket', 'visible']
    }
</script>