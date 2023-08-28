<template>
    <Swiper
      :autoHeight="true"
      :loop="true"
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :style="{
        '--swiper-navigation-color': 'rgb(71 85 105)',
        '--swiper-pagination-color': 'rgb(71 85 105)',
        '--swiper-pagination-bottom': 'auto',
        '--swiper-pagination-top': '1rem',
        '--swiper-navigation-top-offset': '5rem'
      }"
      :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
    >

      <SwiperSlide v-for="image in gallery" class="p-10 bg-zinc-100">
          <nuxt-img :src="'https://unboundedpress.org/api/' + bucket + '.files/' + image.image_id + '/binary'" 
          quality="50"/>
      </SwiperSlide>
    </Swiper>
  </template>

<script>
export default {
    props: ['gallery', 'bucket']
}
</script>