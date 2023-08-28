<template>
  <div class="grid grid-cols-[63%,35%] w-full font-thin sticky top-0 bg-white p-2 z-20">
      <div>
        <div class="text-5xl p-2"> <NuxtLink to='/'>michael winter</NuxtLink></div>
        <div class="inline-flex text-2xl ml-4">
          <NuxtLink class="px-3" to='/'>works</NuxtLink>
          <NuxtLink class="px-3" to='/events'>events</NuxtLink>
          <NuxtLink class="px-3" to='/about'>about</NuxtLink>
          <NuxtLink class="px-3" to='https://unboundedpress.org/code'>code</NuxtLink>
          <NuxtLink class="px-3 block" to='https://unboundedpress.org/legacy'>legacy</NuxtLink>
        </div>
      </div>
      <div class="px-1 bg-zinc-100 rounded-lg text-center">
            <div class="text-sm">upcoming events</div>
            <EventSlider :upcoming_events="upcoming_events" class="max-w-[95%] min-h-[80%]"></EventSlider>
        </div>
      <!------
      <div class="ml-3 p-2 text-sm justify-end">
        Welcome to the new front-end of my website, which is still in development. It functions similar to the former site. In case you cannot find something here, you can still view the old front-end by clicking on the "legacy" link in the menu below. If you have any questions or find any problems, please contact me at the email link in the about section.
      </div>
      --->
  </div>
  <slot /> <!-- required here only -->
  <div class="fixed bottom-0 bg-white p-2 w-full flex justify-center z-20">
    <iframe width="400rem" height="20px" scrolling="no" frameborder="no" allow="autoplay" v-if="audioPlayerStore.soundcloud_trackid !== 'undefined'"
    :src="'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + audioPlayerStore.soundcloud_trackid + '&inverse=false&auto_play=true&show_user=false'"></iframe>
  </div>

  <Modal v-model="modalStore.isOpen">
      <ModalBody :class="modalStore.aspect">
        <ImageSlider v-if="modalStore.type === 'image'" :bucket="modalStore.bucket" :gallery="modalStore.gallery"></ImageSlider>
        <iframe v-if="modalStore.type === 'video'" :src="'https://player.vimeo.com/video/' + modalStore.vimeo_trackid" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      </ModalBody>
  </Modal>
</template>

<script setup>
  import { useAudioPlayerStore } from "@/stores/AudioPlayerStore"
  import { useModalStore } from "@/stores/ModalStore"

  const audioPlayerStore = useAudioPlayerStore()
  const modalStore = useModalStore()

  const route = useRoute()

  if(route.params.files == 'scores') {
    const { data: work } = await useFetch('https://unboundedpress.org/api/works?filter={"score":"' + route.params.filename + '"}', {
      transform: (work) => {

          if(work[0].soundcloud_trackid){
            audioPlayerStore.setSoundCloudTrackID(work[0].soundcloud_trackid)
          } else {
            audioPlayerStore.clearSoundCloudTrackID()
          }
          return work[0]
      }
    })
  }

  //const upcoming_events = [{"_id":{"$oid":"64de3967cdd55b0007a4d073"},"start_date":{"$date":1694894400201},"venue":{"name":"Music and the Wende, Now @ G\u0327ertru\u0304des Street Theatre","city":"Rīga","state":"LV"},"program":[{"work":"remembering clive wearing","performers":[{"name":"Michael Winter","instrument_tags":["reader","lights","computer"]}]},{"work":"ida for amy","performers":[{"name":"Lucie Nezri","instrument_tags":["piano"]},{"name":"Edgars Rubenis","instrument_tags":["guitar"]}]},{"work":"preliminary thoughts","performers":[{"name":"Michael Winter","instrument_tags":["guitar"]},{"name":"Ernests Vilsons","instrument_tags":["reader"]}]}],"program_file":"","flyer":"","links":[],"legacy_program":"","legacy_performers":""},{"_id":{"$oid":"64de3866cdd55b0007a4d072"},"start_date":{"$date":1694548800201},"venue":{"name":"Music and the Wende, Now @ Pegaza Pagalms","city":"Liepāja","state":"LV"},"program":[{"work":"lv","performers":[{"name":"Rihards Plešanovs","instrument_tags":["piano"]}]},{"work":"a chance happening...","performers":[{"name":"Rihards Plešanovs","instrument_tags":["piano"]}]},{"work":"partition and gate","ensemble":"MPLab","performers":[]}],"program_file":"","flyer":"","links":[],"legacy_program":"","legacy_performers":""},{"_id":{"$oid":"64de3766cdd55b0007a4d071"},"start_date":{"$date":1694289600201},"venue":{"name":"Music and the Wende, Now @ Aleponija","city":"Rīga","state":"LV"},"program":[{"work":"ostinato and interrupt","performers":[{"name":"edgars rubenis","instrument_tags":["guitar"]}]},{"work":"necklaces","performers":[{"name":"edgars rubenis","instrument_tags":["guitar"]}]}],"program_file":"","flyer":"","links":[],"legacy_program":"","legacy_performers":""},{"_id":{"$oid":"64bf851695cfda0007250928"},"start_date":{"$date":1696795200201},"venue":{"name":"Riverun Festival @ Centre National de Création Musicale","city":"Albi","state":"FR"},"program":[{"work":"Counterfeiting in Colonial Connecticut","performers":[{"name":"Elliot Simpson","instrument_tags":["guitar"]}]}],"program_file":"","flyer":"","links":[],"legacy_program":"","legacy_performers":""},{"_id":{"$oid":"64bf840a95cfda0007250927"},"start_date":{"$date":1700769600201},"venue":{"name":"KM28","city":"Berlin","state":"DE"},"program":[{"work":"a history of the domino problem","ensemble":"Kali Ensemble","performers":[]}],"program_file":"","flyer":"","links":[],"legacy_program":"","legacy_performers":""},{"_id":{"$oid":"64bf83c195cfda0007250926"},"start_date":{"$date":1700683200201},"venue":{"name":"Humboldt University","city":"Berlin","state":"DE"},"program":[{"work":"a history of the domino problem","ensemble":"Kali Ensemble","performers":[]}],"program_file":"","flyer":"","links":[],"legacy_program":"","legacy_performers":""}]

  const { data: upcoming_events } = await useFetch("https://unboundedpress.org/api/events?filter={'start_date':{'$gte':{'$date':1692298623411}}}", {
        transform: (upcoming_events) => {
            for (const event of upcoming_events) {
                let date = new Date(event.start_date.$date)
                event.formatted_date = ("0" + (date.getMonth() + 1)).slice(-2) + "." + ("0" + date.getDate()).slice(-2) + "." + date.getFullYear()
            }
            return upcoming_events.sort((a,b) => a.start_date.$date - b.start_date.$date)
        }
    })

</script>
