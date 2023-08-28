<template>
    <Swiper
      :autoHeight="true"
      :loop="true"
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
      :effect="'fade'"
      :fadeEffect="{
        crossFade: true
      }"
      :pagination="{
        clickable: true,
      }"
      
      :style="{
        '--swiper-navigation-color': 'rgb(71 85 105)',
        '--swiper-pagination-color': 'rgb(71 85 105)',
        '--swiper-pagination-bottom': '0%'
      }"
      :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation, SwiperEffectFade]"
    >

      <SwiperSlide v-for="(item, index) in upcoming_events" class="bg-zinc-100 h-full">
                        <div class="gap-1 w-[100%] mt-1 mb-1 text-sm h-full">
                            <div>
                                {{ item.formatted_date }}: {{item.venue.city}}, {{item.venue.state}}
                                <div class="text-[#7F7F7F]">
                                    {{ item.venue.name }}
                                </div>
                            </div>
                        </div>
                        <!-- Comment 
                        <div v-for="performance in item.program">
                            <div class="italic text-sm ml-16 pt-1">{{performance.work}}</div>
                            <div v-if="performance.ensemble" class="ml-20">
                                {{ performance.ensemble }}
                            </div>
                            <div v-for="performer in performance.performers" class="ml-20">
                                {{ performer.name }} - 
                                <span v-for="(instrument, index) in performer.instrument_tags">
                                    <span v-if="index !== 0">, </span>
                                    {{ instrument }}
                                </span>
                            </div>
                        </div>
                        -->
        </SwiperSlide>

    </Swiper>
  </template>

<script>
export default {
    props: ['upcoming_events']
}
</script>