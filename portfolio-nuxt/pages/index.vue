<template>
  <div class="bg-zinc-100 rounded-lg m-5 grid grid-cols-3 gap-10 bg-white divide-x divide-solid divide-black p-4">
    <div class="px-5">
      <p class="text-lg">pieces</p>
      <div class="py-2 ml-3" v-for="item in works">
        <p class="font-thin">{{ item.year }}</p>
        <div class="leading-tight py-1 ml-3" v-for="work in item.works">
          <div class="grid grid-cols-[70%,30%] gap-1 font-thin">
            <p class="italic text-sm">{{ work.title }}</p>
             <div class="grid grid-cols-[28px_28px_28px_28px]">

              <IconButton :visible="work.score" type="score" bucket="scores" :work="work"></IconButton>
 
              <IconButton :visible="work.soundcloud_trackid" type="audio" :work="work"></IconButton>

              <IconButton :visible="work.vimeo_trackid" type="video" :work="work"></IconButton>

              <IconButton :visible="work.image_ids" type="image" :work="work"></IconButton>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-5">
      <p class="text-lg">writings</p>

      <div class="leading-tight py-2 ml-3 text-sm" v-for="item in pubs">
        <div class="grid grid-cols-[95%,5%] gap-1">
          <div>
            {{ item.entryTags.title }}
            <div class="ml-4 text-[#7F7F7F]">
              {{ item.entryTags.author }}
              <span v-if=item.entryTags.booktitle>{{ item.entryTags.booktitle}}.&nbsp;</span>
              <span v-if=item.entryTags.journal>{{item.entryTags.journal}}.&nbsp;</span>
              <span v-if=item.entryTags.editor>editors {{item.entryTags.editor}}&nbsp;</span>
              <span v-if=item.entryTags.volume>volume {{item.entryTags.volume}}.</span>
              <span v-if=item.entryTags.publisher>{{item.entryTags.publisher}}.</span>
              {{ item.entryTags.year }}.
            </div>
          </div>
          <div>
            <IconButton :visible=true type="pub" class="inline-flex p-1"></IconButton>
          </div>
        </div>
      </div>
    </div>

    <div class="px-5">
      <p class="text-lg">releases</p>
      <div class="leading-tight py-4 ml-3 text-sm" v-for="item in releases">
        <p class="text-center leading-tight py-2">{{ item.title }}</p>
        <button @click="modalStore.setModalProps('image', 'aspect-auto', true, 'album_art', [item.album_art_id], '')">
          <nuxt-img :src="'https://unboundedpress.org/api/album_art.files/' + item.album_art_id + '/binary'" 
          quality="50"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { useModalStore } from "@/stores/ModalStore"
  const modalStore = useModalStore()

  const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});

  const { data: images } = await useFetch('https://unboundedpress.org/api/images.files?pagesize=200')

  const { data: works } = await useFetch('https://unboundedpress.org/api/works?pagesize=200', {
    transform: (works) => {
      for (const work of works) {
        if(work.images){
          let image_ids = [];
          for (const image of work.images){
            image_ids.push(images.value.find(obj => {return obj.filename === image.filename})._id.$oid)
          }
          work.image_ids = image_ids
        }
      }
      let res = groupBy(works, work => new Date(work.date.$date).getFullYear())
      res = Object.keys(res).map((year) => {
        return {
          year,
          works: res[year]
        };
      });
      res.sort((a,b) => b.year - a.year)
      return res
    }
  })

  //const { data: pubs } = await useFetch('https://unboundedpress.org/api/publications/_aggrs/publications?pagesize=200')
  //const { data: pubs } = await useFetch('https://unboundedpress.org/api/publications?sort=-entryTags.year&pagesize=200')
  const { data: pubs } = await useFetch('https://unboundedpress.org/api/publications?pagesize=200', {
    transform: (pubs) => {
      return pubs.sort((a,b) => b.entryTags.year - a.entryTags.year)
    }
  })

  const { data: album_art } = await useFetch('https://unboundedpress.org/api/album_art.files?pagesize=200')

  const { data: releases } = await useFetch('https://unboundedpress.org/api/releases?pagesize=200', {
    //lazy: true,
    //server: false,
    transform: (releases) => {
      for (const release of releases) {
        release.album_art_id = album_art.value.find(obj => {return obj.filename === release.album_art})._id.$oid
      }
      return releases
    }
  })

  /*
  watch(releases, (response)=>{
    //console.log(response)
    for (const item of response) {
      useFetch(`https://unboundedpress.org/api/album_art.files?filter={"filename":"${item.album_art}"}`).then((response) => {
        item.album_art_id = response.data.value[0]._id.$oid
      })
    }
    return response
        
  }, {
      //deep: true,
      immediate: true
  })
  */
</script>

<style>
  .metamask-icon {
    width:25px;
    height: 25px;
    background-size: contain!important;
    background: url('../../styles/img/metamask-icon.svg');
    background-repeat: no-repeat;
  }
</style>