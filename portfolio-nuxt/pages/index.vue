<template>
  <h1>Index page</h1>
  <div class="grid grid-cols-3 gap-4">
    <ul>
      <li class="italic" v-for="item in works">{{ item.title }}</li>
    </ul>

    <ul>
      <li v-for="item in pubs">{{ item.entryTags.title }}</li>
    </ul>
  </div>
  </template>

<script setup>
  const { data: works } = await useFetch('https://unboundedpress.org/api/works?sort=-date&pagesize=200')
  const { data: pubs } = await useFetch('https://unboundedpress.org/api/publications/_aggrs/publications?pagesize=200')
</script>
