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
