<template>
  <div class="font-thin sticky top-0 bg-white p-2">
    <div class="text-5xl p-2">michael winter</div>
    <div class="text-2xl px-8">
      works
      events
      about
      code
    </div>
  </div>
  <slot /> <!-- required here only -->
</template>

<style>
.inline-list li {
    display: inline;
    padding-left: 5px;
    padding-right: 20px;
}
</style>
