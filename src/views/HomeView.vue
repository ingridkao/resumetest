<template>
  <div class="home">
    {{title}}
    <font-awesome-icon icon="fa-solid fa-user-secret" />
    <font-awesome-icon icon="fa-solid fa-search" />
    <font-awesome-icon icon="fa-solid fa-list" />
    <font-awesome-icon icon="fa-solid fa-clone" />
    <font-awesome-icon icon="fa-solid fa-filter" />
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    <router-link :to="{name: 'frontpage'}">前台</router-link> |
    <router-link :to="{name: 'backpage'}">後台</router-link> |
  </div>
</template>

<script>
export default {
  data(){
    return {
      title: '🐢',
    }
  }
}
</script>
