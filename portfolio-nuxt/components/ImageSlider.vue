<template>
    <Swiper
      :autoHeight="true"
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
    >

      <SwiperSlide v-for="image_id in image_ids">
          <nuxt-img :src="'https://unboundedpress.org/api/' + bucket + '.files/' + image_id + '/binary'" 
          quality="50"/>
      </SwiperSlide>
    </Swiper>
  </template>

<script>
export default {
    props: ['image_ids', 'bucket']
}
</script>