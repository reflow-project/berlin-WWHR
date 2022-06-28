<template>
    <div class="container">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'Container',
}
</script>
<style lang="css" scoped>
.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  font-style: normal;
  z-index: 4;
}

</style>