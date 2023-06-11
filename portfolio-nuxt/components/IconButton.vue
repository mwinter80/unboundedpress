<template>
    <div class="p-1">
        <div v-show="visible" class="inline-flex bg-black rounded-full text-xs" >

            <NuxtLink v-if="type === 'document'" class="inline-flex p-1" :to="'/scores/' + work.score">
                <Icon name="ion:book-outline" color="white" />
            </NuxtLink>

            <button @click="audioPlayerStore.setSoundCloudTrackID(work.soundcloud_trackid)" v-else-if="type === 'audio'" class="inline-flex p-1">
                <Icon name="wpf:speaker" color="white" />
            </button>

            <button @click="isOpen = true" v-else-if="type === 'video'" class="inline-flex p-1">
                <Icon name="fluent:video-48-filled" color="white" />

                <Modal v-model="isOpen">
                    <ModalBody class="aspect-video">
                        <iframe :src="'https://player.vimeo.com/video/' + work.vimeo_trackid" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </ModalBody>
                </Modal>
                
            </button>

            <button @click="isOpen = true" v-else="type === 'image'" class="inline-flex p-1">
                <Icon name="mdi:camera" color="white" />

                <Modal v-model="isOpen">
                    <ModalBody>
                        <ImageSlider :image_ids="work.image_ids"></ImageSlider>
                    </ModalBody>
                </Modal>

            </button>

        </div>
    </div>
</template>

<script setup>
  import { useAudioPlayerStore } from "@/stores/AudioPlayerStore"
  const audioPlayerStore = useAudioPlayerStore()

  const isOpen = ref(false)
</script>

<script>
    export default {
        props: ['type', 'work', 'visible']
    }
</script>