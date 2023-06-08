<template>
    <div>
        <embed :src="'https://unboundedpress.org/api/scores.files/' + metadata._id.$oid + '/binary'" width="100%" height="900px" />
    </div>
</template>

<script setup>

const route = useRoute()

const { data: metadata } = await useFetch('https://unboundedpress.org/api/scores.files?filter={"filename":"' + route.params.filename + '"}', {
    //lazy: true,
    //server: false,
    transform: (metadata) => {
        console.log(metadata)
        return metadata[0]
    }
  })

</script>