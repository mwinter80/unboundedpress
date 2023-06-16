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

              <IconButton :visible="work.score" type="document" :work="work" :link="work.score"></IconButton>
 
              <IconButton :visible="work.soundcloud_trackid" type="audio" :work="work"></IconButton>

              <IconButton :visible="work.vimeo_trackid" type="video" :work="work"></IconButton>

              <IconButton :visible="work.gallery" type="image" :work="work"></IconButton>

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
            <IconButton :visible=item.entryTags.howpublished type="document" :link="item.entryTags.howpublished" class="inline-flex p-1"></IconButton>
          </div>
        </div>
      </div>
    </div>

    <div class="px-5">
      <p class="text-lg">releases</p>
      <div class="leading-tight py-4 ml-3 text-sm" v-for="item in releases">
        <p class="text-center leading-tight py-2">{{ item.title }}</p>
        <button @click="modalStore.setModalProps('image', 'aspect-auto', true, 'album_art', [{image_id: item.album_art_id}], '')">
          <nuxt-img :src="'https://unboundedpress.org/api/album_art.files/' + item.album_art_id + '/binary'" 
          quality="50"/>
        </button>
        <div class="flex place-content-center place-items-center">
          <IconButton :visible="item.discogs_id" type="discogs" :link="'https://www.discogs.com/release/' + item.discogs_id"></IconButton>
          <IconButton :visible="item.buy_link" type="buy" :link="item.buy_link"></IconButton>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>

  import { useModalStore } from "@/stores/ModalStore"
  
  const modalStore = useModalStore()

  const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});

  const isValidUrl = urlString => {
    /*
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
	  return !!urlPattern.test(urlString);
    */
   
    var pattern = /^((http|https|ftp):\/\/)/;
    return pattern.test(urlString)
	}


  const { data: images } = await useFetch('https://unboundedpress.org/api/images.files?pagesize=200')

  const { data: works } = await useFetch('https://unboundedpress.org/api/works?pagesize=200', {
    transform: (works) => {
      for (const work of works) {
        if(work.score){
          work.score = "/scores/" + work.score
        }
        /*
        if(work.images){
          let image_ids = [];
          for (const image of work.images){
            image_ids.push(images.value.find(obj => {return obj.filename === image.filename})._id.$oid)
          }
          work.image_ids = image_ids
        }
        */
        if(work.images){
          let gallery = [];
          for (const image of work.images){
            gallery.push({
              image_id: images.value.find(obj => {return obj.filename === image.filename})._id.$oid,
            })
          }
          work.gallery = gallery
        }
      }
      let groups = groupBy(works, work => new Date(work.date.$date).getFullYear())
      groups = Object.keys(groups).map((year) => {
        return {
          year,
          works: groups[year].sort((a,b) => b.date.$date - a.date.$date)
        };
      });
      groups.sort((a,b) => b.year - a.year)
      return groups
    }
  })

  //const { data: pubs } = await useFetch('https://unboundedpress.org/api/publications/_aggrs/publications?pagesize=200')
  //const { data: pubs } = await useFetch('https://unboundedpress.org/api/publications?sort=-entryTags.year&pagesize=200')
  const { data: pubs } = await useFetch('https://unboundedpress.org/api/publications?pagesize=200', {
    transform: (pubs) => {
      for (const pub of pubs) {
        if(pub.entryTags.howpublished && !(isValidUrl(pub.entryTags.howpublished))){
          pub.entryTags.howpublished = "/pubs/" + pub.entryTags.howpublished
        }
      }
      return pubs.sort((a,b) => {
        let aPrime = 5000
        let bPrime = 5000
        if(a.entryTags.year === 'forthcoming'){aPrime =  5000} else {aPrime = a.entryTags.year}
        if(b.entryTags.year === 'forthcoming'){bPrime =  5000} else {bPrime = b.entryTags.year}
        return bPrime - aPrime
      })
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

