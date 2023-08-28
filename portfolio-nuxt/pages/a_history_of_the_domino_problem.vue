<template>
    <div class="bg-contain bg-no-repeat bg-center rounded-lg m-5 gap-10 bg-[#0A0A19] py-4 text-2xl text-white h-[calc(100vh-10.5rem)] overflow-hidden" :style="{ backgroundImage: `url(${image})`}">
        <div class="rounded-lg w-full sticky top-[10px] grid grid-cols-[63%,35%]">
            <div>
                <div class="p-5 text-5xl font-bold">a history of the domino problem</div>
                
                <div class="inline-flex text-2xl ml-4 mb-5">
                    <a href="#about" class="px-3">about</a>
                    <a href="#exhibition" class="px-3">exhibition</a>
                    <a href="#events" class="px-3">events</a>
                    <a href="#participants" class="px-3">participants</a>
                    <a href="#media" class="px-3">media</a>
                    <a href="#contributors" class="px-3">contributors</a>
                </div>
            </div>
            <div>
                For the Lecture-Concert on 22 Nov 2023, priority will be given to those who RSVP. Sign up <NuxtLink class="text-2xl font-bold" to='https://www.surveymonkey.de/r/FDL8XW3'>HERE</NuxtLink>.
            </div>
        </div>
        <!---
        <Swiper
            :loop="true"
            :spaceBetween="30"
            :centeredSlides="true"
            :pagination='{
                clickable: true,
                renderBullet: function (index, className) {
                    return "<span class=" + className + ">" + ["about", "exhibition", "events", "participants"][index] + "</span>";
                }
            }'
            :navigation="false"
            :style="{
                '--swiper-pagination-color': 'rgb(255 255 255)',
                '--swiper-pagination-bullet-horizontal-gap': '80px',
                '--swiper-pagination-bullet-inactive-opacity': '0.8',
                '--swiper-pagination-bullet-size': '0px',
                '--swiper-pagination-bottom': 'auto',
                '--swiper-pagination-top': '1rem',
                '--swiper-pagination-margin-left': '0px',
            }"
            :hashNavigation="{
                watchState: true,
            }"
            :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation, SwiperHashNavigation]"
            class="max-w-[95vw]"
            >
        --->
        <Swiper
            :loop="true"
            :spaceBetween="30"
            :centeredSlides="true"
            :pagination="false"
            :navigation="false"
            :hashNavigation="{
                watchState: true,
            }"
            :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation, SwiperHashNavigation]"
            class="max-w-[95vw]"
            >
        <SwiperSlide data-hash="about" class="p-10 text-xl overflow-hidden">
            <div class="max-h-[calc(100vh-27rem)] overflow-auto">
                <p class="mb-5">
                    <span class="italic">a history of the domino problem</span> is a performance-installation that traces the history of an epistemological problem in mathematics about how things that one could never imagine fitting together, actually come together and unify in unexpected ways. The work comprises a set of musical compositions and a kinetic sculpture that sonify and visualize rare mosaics constructed from dominoes. The dominoes in these mosaics are similar yet slightly different than those used in the popular game of the same name. As opposed to rectangles, they are squares with various color combinations along the edges (which can alternatively also be represented by numbers or patterns) called <NuxtLink to='https://en.wikipedia.org/wiki/Wang_tile'>wang tiles</NuxtLink>. Like in the game, the rule is that edges of adjacent dominoes in a mosaic must match.  
                </p>
                <p>
                    The mosaics sonified and visualized in <span class="italic">a history of the domino problem</span> are rare because there is no systematic way to find them. This is due to the fact that they are  <NuxtLink to='https://en.wikipedia.org/wiki/Aperiodic_tiling'><span class="italic">aperiodic</span></NuxtLink>. One can think of an aperiodic mosaic like an infinite puzzle with a peculiar characteristic. Given unlimited copies of dominoes with a finite set of color/pattern combinations for the edges, there is a solution that will result in a mosaic that expands infinitely. However, in that solution, any periodic/repeating structure in the mosaic will eventually be interrupted. This phenomenon is one of the most intriguing aspects of the work. As the music and the visuals are derived from the mosaics, the resulting textures are always shifting ever so slightly. 
                </p>
            </div>
        </SwiperSlide>
        <SwiperSlide data-hash="exhibition" class="p-10 text-xl overflow-hidden">
            <div class="max-h-[calc(100vh-27rem)] overflow-auto">
                <div class="mb-5">
                    in collaboration with MAREIKE YIN-YEE LEE
                </div>
                <div class="mb-5">
                    Nov. - Exact dates and exhibition opening hours TBA soon!
                </div>
                <div class="mb-5">
                    Lichthof (Ost) Ausstellungsraum der Humboldt-Universität
                    <br>
                    Hauptgebäude, Erdgeschoss, Unter den Linden 6, 10117 Berlin
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide data-hash="events" class="p-10 text-xl overflow-hidden">
            <div class="max-h-[calc(100vh-27rem)] overflow-auto">
                <div class="mb-5">
                    Exhibition Opening - TBA
                </div>
                <div class="mb-5">
                    Exhibition Closing - TBA
                </div>
                <div class="mb-5">
                    Lecture-Concert 
                    <br>
                    with mathematician JARKKO KARI moderated by GAETAN BOROT
                    <br>
                    performance by KALI ENSEMBLE 
                    <br>
                    22 Nov 2023 | 19 Uhr
                    <br>
                    Senatssal der Humboldt-Universität
                    <br>
                    Hauptgebäude, 1. Obergeschoss, Unter den Linden 6, 10117 Berlin
                </div>
                <div class="mb-5">
                    Concert
                    <br>
                    performance by KALI ENSEMBLE 
                    <br>
                    23 Nov 2023 | 20 Uhr
                    <br>
                    KM28
                    <br>
                    Karl-Marx-Str. 28, 12043 Berlin     
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide data-hash="participants" class="p-10 text-xl overflow-hidden">
            <div class="max-h-[calc(100vh-27rem)] overflow-auto">
                <div class="mb-5 py-10">
                    <NuxtLink class="text-3xl font-bold" to='https://unboundedpress.org/'>Michael Winter - composer | sound artist</NuxtLink>
                    <div class="grid grid-cols-[20%,70%] p-5">
                        <nuxt-img src="/hdp_images/michael.jpg"/>
                        <div class="px-5">
                            <p class="mb-5">
                            My practice as a composer and sound artist is diverse, ranging from music created by digital and acoustic instruments to installations and kinetic sculptures. Each piece typically explores one simple process and often reflects various related interests of mine such as phenomenology, mathematics, epistemology, algorithmic information theory, and the history of science. To me, everything we experience is computable. Given this digital philosophy, I acknowledge even my most open works as algorithmic; and, while not always apparent on the surface of any given piece, the considerations of computability and epistemology are integral to my practice. I often reconcile epistemological limits with artistic practicality by considering and addressing the limits of computation from an artistic and experiential vantage point and by collaborating with other artists, mathematicians, and scientists in order to integrate objects, ideas, and texts from various domains as structural elements in my pieces. My work also aims to subvert discriminatory conventions and hierarchies by exploring alternative forms of presentation and interaction, often with minimal resources and low information.
                            </p>
                            <p>
                            My work has been presented at venues and festivals throughout the world such as REDCAT, in Los Angeles; the Ostrava Festival of New Music in the Czech Republic; Tsonami Arte Sonoro Festival in Valparaiso, Chile; the Huddersfield New Music Festival in the United Kingdom; and Umbral Sesiones at the Museo de Arte Contemporáneo in Oaxaca, Mexico. Recordings of my music have been released by XI Records, Another Timbre, New World Records, Edition Wandelweiser, Bahn Mi Verlag, Tsonami Records, and Pogus Productions. In 2008, I co-founded the wulf., a Los Angeles-based organization dedicated to experimental performance and art. From 2018 to 2019, I was a fellow / artist-in-residence at the Akademie Schloss Solitude in Stuttgart, Germany. I currently reside in Berlin. 
                            </p>
                        </div>
                    </div>
                </div>
                <div class="mb-5 py-10">
                    <NuxtLink class="text-3xl font-bold" to='http://www.mareikelee.com/'>MAREIKE YIN-YEE LEE - visual artist</NuxtLink>
                    <div class="grid grid-cols-[20%,70%] p-5">
                        <nuxt-img src="/hdp_images/mareike.jpg"/>
                        <div class="px-5">
                             Mareike Yin‑Yee Lee’s multidisciplinary practice encompasses drawing, video, sculpture, found and made objects, printmaking, and artist books. Current works include installations, recordings and live performances produced in collaboration with musicians and composers with an emphasis on the relation between sight and sound. How we approach, perceive and respond to these form the basis of her recent works‘ manifestations. Her immersive, site-specific installations explore the complex and tenuous nature of communication and how we experience space, drawing on gesture, sound, and memory to elicit responses that cannot be put into words. She redefines the architecture and temporality of the spaces in which she works. Lee’s work plays with the spaces between, across, and beyond, embracing the undefinable and subtle gradations, forging a language of colour, tone and space that seeks to articulate microcosms of daily life and sustained contemplation. Lee studied at Universität der Künste, Berlin, Germany; University of Toronto, Toronto, Canada; and Nova Scotia College of Art and Design, Nova Scotia, Canada, where she was awarded the Joseph Beuys Scholarship and the Canada Millennium Award of Excellence. Recent projects include exhibitions and performances at Kunsthaus Kule Berlin (2020), Kunstmuseum Kloster Unser Lieben Frauen Magdeburg (2019), Galerie Kunstpunkt Berlin (2018), Kunstbezirk Stuttgart, Kunst(zeug)haus Rapperswil- Jona Switzerland (2017), Kunsthaus Interlaken (2017), Neuer Kunstverein, Aschaffenburg (2016), and KW Institute for Contemporary Art, Berlin (2016).
                        </div>
                    </div>
                </div>
                <div class="mb-5 py-10">
                    <NuxtLink class="text-3xl font-bold" to='https://www.facebook.com/KaliEnsemble'>KALI - performing ensemble</NuxtLink>
                    <div class="grid grid-cols-[20%,70%] p-5">
                        <nuxt-img src="/hdp_images/kali.jpg"/>
                        <div class="px-5">
                            Kali is a new music ensemble based in the Hague. They primarily work with composers with whom they can collaborate and experiment over long periods. They aim to develop an artistic practice unique to their relationship with their collaborators. Over the past years, they have formed close and active relationships with several composers based in The Hague and abroad realizing many large-scale projects with great attention to detail.
                        </div>
                    </div>
                </div>
                <div class="mb-5 py-10">
                    <NuxtLink class="text-3xl font-bold" to='https://users.utu.fi/jkari/'>Jarkko Kari - mathematician | invited guest</NuxtLink>
                    <div class="grid grid-cols-[20%,70%] p-5">
                        <nuxt-img class="w-full" src="/hdp_images/jarkko.jpg"/>
                        <div class="px-5">
                            Jarkko J. Kari is a Finnish mathematician and computer scientist, known for his contributions to the theory of Wang tiles and cellular automata. Kari is currently a professor at the Department of Mathematics, University of Turku.
                        </div>
                    </div>
                </div>
                <div class="mb-5 py-10">
                    <NuxtLink class="text-3xl font-bold" to='https://www.mathematik.hu-berlin.de/de/forschung/forschungsgebiete/mathematische-physik/borot-mp-homepage'>Gaetan Borot - mathematician | organizer | moderator</NuxtLink>
                    <div class="grid grid-cols-[20%,70%] p-5">
                        <nuxt-img class="w-full" src="/hdp_images/gaetan.jpg"/>
                        <div class="px-5">
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide data-hash="media" class="p-20 text-xl overflow-hidden">
           
                <div class="flex justify-center">
                    <iframe src="https://player.vimeo.com/video/375784136" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>
                </div>
           
        </SwiperSlide>
        <SwiperSlide data-hash="contributors" class="p-10 text-xl overflow-hidden">
            <div class="max-h-[calc(100vh-27rem)] overflow-auto">
                <div class="grid grid-cols-4 p-5 items-center">
                    <NuxtLink class="px-3" to='https://www.hu-berlin.de/en'><nuxt-img class="w-[100px]" src="/hdp_images/hu_logo.png"/></NuxtLink>
                    <NuxtLink class="px-3" to='https://www.km28.de/'><nuxt-img class="w-[100px]" src="/hdp_images/km28_logo.png"/></NuxtLink>
                    <NuxtLink class="px-3" to='https://www.ims-chips.com/'><nuxt-img class="w-[250px]" src="/hdp_images/ims_chips_logo.png"/></NuxtLink>
                    <NuxtLink class="px-3" to='https://www.akademie-solitude.de/'><nuxt-img class="w-[100px]" src="/hdp_images/akademie_schloss_solitude_logo.png"/></NuxtLink>
                </div>
            </div>
        </SwiperSlide>
        </Swiper>
    </div>
    
  </template>
  
  <script>
  import hdp_background from "assets/hdp_background.png";
  export default {
    data() {
      return {
        image: hdp_background,    };
    }
  };
  </script>

<script setup>
import { useAudioPlayerStore } from "@/stores/AudioPlayerStore"

const audioPlayerStore = useAudioPlayerStore()
audioPlayerStore.setSoundCloudTrackID(324252345)

</script>