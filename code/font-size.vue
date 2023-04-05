
<template>
      <div>
            <nuxt-link :to="`/org/${$route.params.schoolId}/projects/${scope.row.id}.html`">
            </nuxt-link>
      </div>
</template>
<script>
export default {
      methods: {

      }
}
</script>
<style>
.a{
      font-size: 12px;
      -webkit-transform-origin-x: 0; /*缩小后文字居左*/
      -webkit-transform: scale(0.80);   /*关键*/
      transform:scale(0.5);
}
</style>
          