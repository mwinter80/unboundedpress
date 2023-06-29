<template>
    <div class="flex min-h-full items-center justify-center text-center">
        <embed v-if="route.params.filename.split('.').pop()==='pdf'" :src="'https://unboundedpress.org/api/' + route.params.files + '.files/' + file_metadata._id.$oid + '/binary'" class="w-[85%] h-[88vh]"/>
        <nuxt-img v-else-if="route.params.filename.split('.').pop()==='jpg'" :src="'https://unboundedpress.org/api/' + route.params.files + '.files/' + file_metadata._id.$oid + '/binary'" class="w-[85%]"/>
    </div>
</template>

<script setup>

import { useAudioPlayerStore } from "@/stores/AudioPlayerStore"

const audioPlayerStore = useAudioPlayerStore()

const route = useRoute()

const { data: file_metadata } = await useFetch('https://unboundedpress.org/api/' + route.params.files + '.files?filter={"filename":"' + route.params.filename + '"}', {
    //lazy: true,
    //server: false,
    transform: (file_metadata) => {
        return file_metadata[0]
    }
  })

    useHead({
        titleTemplate: 'Michael Winter - Files - ' + route.params.filename
    })
</script>