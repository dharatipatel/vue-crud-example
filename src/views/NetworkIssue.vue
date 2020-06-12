<template>
  <div>
    <h1>Uh-oh!</h1>
    <h3>
      It looks like you're experiencing some network issue,please go back home
      and try again.
    </h3>
    <router-link :to="{ name: 'event-list' }">Back To Home page</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
