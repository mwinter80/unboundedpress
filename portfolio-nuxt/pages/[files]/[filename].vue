<template>
    <div class="flex min-h-full items-center justify-center text-center">
        <embed :src="'https://unboundedpress.org/api/' + route.params.files + '.files/' + metadata._id.$oid + '/binary'" class="w-[85%] h-[88vh]" />
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

</script>