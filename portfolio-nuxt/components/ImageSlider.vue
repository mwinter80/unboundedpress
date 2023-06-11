<template>
    <Swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 7000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
    >

      <SwiperSlide v-for="image_id in image_ids">
        <div>
          <nuxt-img :src="'https://unboundedpress.org/api/images.files/' + image_id + '/binary'" 
          quality="50"/>
        </div>
      </SwiperSlide>
    </Swiper>
  </template>

<script>
export default {
    props: ['image_ids']
}
</script>