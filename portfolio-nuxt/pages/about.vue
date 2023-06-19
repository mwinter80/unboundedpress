<template>
    <div class="bg-zinc-100 rounded-lg m-5 grid grid-cols-[60%,37%] gap-10 bg-white divide-x divide-solid divide-black py-4 min-h-[86vh]">
        <div class="px-5">
            <p class="text-lg">about</p>
        
            <div class="leading-tight py-2 ml-3 text-sm">
                <div class="leading-tight py-2">
                    My practice as a composer and sound artist is diverse, ranging from music created by digital and acoustic instruments to installations and kinetic sculptures. Each piece typically explores one simple process and often reflects various related interests of mine such as phenomenology, mathematics, epistemology, algorithmic information theory, and the history of science. To me, everything we experience is computable. Given this digital philosophy, I acknowledge even my most open works as algorithmic; and, while not always apparent on the surface of any given piece, the considerations of computability and epistemology are integral to my practice. I often reconcile epistemological limits with artistic practicality by considering and addressing the limits of computation from an artistic and experiential vantage point and by collaborating with other artists, mathematicians, and scientists in order to integrate objects, ideas, and texts from various domains as structural elements in my pieces. My work also aims to subvert discriminatory conventions and hierarchies by exploring alternative forms of presentation and interaction, often with minimal resources and low information.
                </div>
                <div class="leading-tight py-2">
                    My work has been presented at venues and festivals throughout the world such as REDCAT, in Los Angeles; the Ostrava Festival of New Music in the Czech Republic; Tsonami Arte Sonoro Festival in Valparaiso, Chile; the Huddersfield New Music Festival in the United Kingdom; and Umbral Sesiones at the Museo de Arte Contemporáneo in Oaxaca, Mexico. Recordings of my music have been released by XI Records, Another Timbre, New World Records, Edition Wandelweiser, Bahn Mi Verlag, Tsonami Records, and Pogus Productions. In 2008, I co-founded <em>the wulf.</em>, a Los Angeles-based organization dedicated to experimental performance and art. From 2018 to 2019, I was a fellow / artist-in-residence at the Akademie Schloss Solitude in Stuttgart, Germany. I currently reside in Berlin.
                </div> 
                <div class="inline-flex place-items-center p-2">
                    CV
                    <div class="w-[28px]">
                        <IconButton :visible="true" type="document" work="placeholder" link="https://unboundedpress.org/cv"></IconButton>
                    </div>
                </div>
                <br>
                <div class="inline-flex place-items-center p-2">
                    Works List with Presentation History
                    <div class="w-[28px]">
                        <IconButton :visible="true" type="document" work="placeholder" link="https://unboundedpress.org/works_list"></IconButton>
                    </div>
                </div>
                <br>
                <br>
                <div id="mc_embed_signup">
                    <form action="https://unboundedpress.us12.list-manage.com/subscribe/post?u=bdadd25738fedf704641f3a80&amp;id=01c5761ebb&amp;f_id=00f143e0f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_self">
                        <label for="mce-EMAIL">subscribe to my mailing list to know about upcoming events</label>
                        <input id="mce-EMAIL" type="email" value="" name="EMAIL" placeholder="email address" required="" class="email">
                        <div style="position: absolute; left: -5000px;" aria-hidden="true">
                            <input type="text" name="b_bdadd25738fedf704641f3a80_01c5761ebb" tabindex="-1" value="">
                        </div>
                        <div id="mce-responses" class="clear foot">
                            <div class="response" id="mce-error-response" style="display:none"></div>
                            <div class="response" id="mce-success-response" style="display:none"></div>
                        </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                        <div class="clear">
                            <input id="mc-embedded-subscribe" type="submit" value="subscribe" name="subscribe" class="button">
                        </div>
                    </form>
                </div>     
            </div> 
        </div>
        <div class="px-5">
            <ImageSlider bucket="images" :gallery="gallery" class="max-w-[90%]"></ImageSlider>
        </div>
    </div>
</template>

<script setup>

const { data: images } = await useFetch('https://unboundedpress.org/api/images.files?pagesize=200')

const { data: gallery } = await useFetch('https://unboundedpress.org/api/my_image_gallery?pagesize=200', {
    transform: (gallery) => {
        for (const item of gallery) {
            item.image_id =  images.value.find(obj => {return obj.filename === item.image})._id.$oid
        }
        return gallery //.sort((a,b) => a.priority - b.priority)
    }
})
</script>

<style>
    #mc_embed_signup form {text-align:left; padding:2px 0 2px 0;}
    .mc-field-group { display: inline-block; } /* positions input field horizontally */
    #mc_embed_signup input.email {border: 1px solid #ABB0B2;  -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; color: #343434; background-color: #fff; box-sizing:border-box; height:32px; padding: 0px 0.4em; display: inline-block; margin: 0; width:350px; vertical-align:top;}
    #mc_embed_signup label {display:block; padding-bottom:10px;}
    #mc_embed_signup .clear {display: inline-block;} /* positions button horizontally in line with input */
    #mc_embed_signup .button {font-size: 13px; border: none; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; letter-spacing: .03em; color: #fff; background-color: #aaa; box-sizing:border-box; height:32px; line-height:32px; padding:0 18px; display: inline-block; margin: 0; transition: all 0.23s ease-in-out 0s;}
    #mc_embed_signup .button:hover {background-color:#777; cursor:pointer;}
    #mc_embed_signup div#mce-responses {float:left; top:-1.4em; padding:0em .5em 0em .5em; overflow:hidden; width:90%;margin: 0 5%; clear: both;}
    #mc_embed_signup div.response {margin:1em 0; padding:1em .5em .5em 0; font-weight:bold; float:left; top:-1.5em; z-index:1; width:80%;}
    #mc_embed_signup #mce-error-response {display:none;}
    #mc_embed_signup #mce-success-response {color:#529214; display:none;}
    #mc_embed_signup label.error {display:block; float:none; width:auto; margin-left:1.05em; text-align:left; padding:.5em 0;}
    @media (max-width: 768px) {
        #mc_embed_signup input.email {width:100%; margin-bottom:5px;}
        #mc_embed_signup .clear {display: block; width: 100% }
        #mc_embed_signup .button {width: 100%; margin:0; }
    }
    #mc_embed_signup{clear:left; width:100%;}
</style>