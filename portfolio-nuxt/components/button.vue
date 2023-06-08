<template>
    <div class="p-1">
        <button
        type="button"
        v-show="visible"
        class="inline-flex bg-black rounded-full text-xs p-1"
        >
        <Icon :name="icon" color="white" />
        </button>
    </div>
</template>

<script>
export default {
  props: ['icon', 'work', 'visible']
}
</script>