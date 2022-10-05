<template>
  <div class="home">
    {{title}}
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
