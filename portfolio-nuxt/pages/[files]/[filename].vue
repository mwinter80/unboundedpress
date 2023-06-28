<template>
    <div class="flex min-h-full items-center justify-center text-center">
        <embed v-if="route.params.filename.split('.').pop()==='pdf'" :src="'https://unboundedpress.org/api/' + route.params.files + '.files/' + metadata._id.$oid + '/binary'" class="w-[85%] h-[88vh]" />
        <nuxt-img v-else-if="route.params.filename.split('.').pop()==='jpg'" :src="'https://unboundedpress.org/api/' + route.params.files + '.files/' + metadata._id.$oid + '/binary'" class="w-[85%]"/>
    </div>
</template>

<script setup>

const route = useRoute()

const { data: metadata } = await useFetch('https://unboundedpress.org/api/' + route.params.files + '.files?filter={"filename":"' + route.params.filename + '"}', {
    //lazy: true,
    //server: false,
    transform: (metadata) => {
        return metadata[0]
    }
  })

    useHead({
        titleTemplate: 'Michael Winter - Files - ' + route.params.filename
    })
</script>