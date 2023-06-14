<template>
    <div class="bg-zinc-100 rounded-lg m-5 grid grid-cols-2 gap-10 bg-white divide-x divide-solid divide-black p-4">
    
        <div class="px-5">
            <p class="text-lg">performances</p>

            <div class="leading-tight py-2 ml-3 text-sm" v-for="item in events">
                <div class="gap-1">
                    <div>
                        {{ item.formatted_date }}: {{item.venue.city}}, {{item.venue.state}}
                        <div class="ml-4 text-[#7F7F7F]">
                            {{ item.venue.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-5">
            <p class="text-lg">lectures</p>

            <div class="leading-tight py-2 ml-3 text-sm" v-for="item in lectures">
                <div class="gap-1">
                    <div>
                        {{ item.formatted_date }}: {{item.location}}
                        <div class="ml-4 text-[#7F7F7F]">
                            {{ item.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    const { data: events } = await useFetch('https://unboundedpress.org/api/events?pagesize=200', {
        transform: (events) => {
            for (const event of events) {
                let date = new Date(event.start_date.$date)
                event.formatted_date = ("0" + (date.getMonth() + 1)).slice(-2) + "." + ("0" + date.getDate()).slice(-2) + "." + date.getFullYear()
            }
            return events.sort((a,b) => b.start_date.$date - a.start_date.$date)
        }
    })

    const { data: lectures } = await useFetch('https://unboundedpress.org/api/talks?pagesize=200', {
        transform: (events) => {
            for (const event of events) {
                let date = new Date(event.date)
                event.formatted_date = ("0" + (date.getMonth() + 1)).slice(-2) + "." + ("0" + date.getDate()).slice(-2) + "." + date.getFullYear()
            }
            return events.sort((a,b) => b.date - a.date)
        }
    })
</script>

