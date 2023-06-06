<template>
  <div>
    <h1 class="text-4xl">michael winter</h1>
    <h2>
      <ul class="inline-list">
        <li>works</li>
        <li>events</li>
        <li>about</li>
        <li>code</li>
      </ul>
    </h2>
    <slot /> <!-- required here only -->
  </div>
</template>

<style>
.inline-list li {
    display: inline;
    padding-left: 5px;
    padding-right: 20px;
}
</style>
