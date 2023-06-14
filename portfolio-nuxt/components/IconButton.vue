<template>
    <div class="p-1">
        <div v-show="visible" class="bg-black rounded-full text-xs" >

            <NuxtLink v-if="type === 'document'" class="inline-flex p-1" :to="link">
                <Icon name="ion:book-sharp" color="white" />
            </NuxtLink>

            <NuxtLink v-else-if="type === 'buy'" class="inline-flex p-1" :to="link">
                <Icon name="bxs:purchase-tag" color="white" />
            </NuxtLink>

            <NuxtLink v-else-if="type === 'discogs'" class="inline-flex p-1" :to="link">
                <Icon name="simple-icons:discogs" color="white" />
            </NuxtLink>

            <button @click="audioPlayerStore.setSoundCloudTrackID(work.soundcloud_trackid)" v-else-if="type === 'audio'" class="inline-flex p-1">
                <Icon name="wpf:speaker" color="white" />
            </button>

            <button @click="modalStore.setModalProps('video', 'aspect-video', true, '', '', work.vimeo_trackid)" v-else-if="type === 'video'" class="inline-flex p-1">
                <Icon name="fluent:video-48-filled" color="white" />
            </button>

            <button @click="modalStore.setModalProps('image', 'aspect-auto', true, 'images', work.gallery, '')" v-else="type === 'image'" class="inline-flex p-1">
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
        props: ['type', 'work', 'visible', 'link']
    }
</script>