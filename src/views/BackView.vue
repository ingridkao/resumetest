<template>
  <div class="home backstage">
    BackView
    <nav>
      <router-link 
        v-for="item in routes"
        :key="item.path"
        :to="item.path"
      >
          {{item.chName? item.chName: item.name }}
      </router-link> |
  </nav>
  </div>
</template>

<script>
import {BackRoute} from '@/router/index.js'

export default {
  data(){
    return {
      routes: BackRoute
    }
  }
}
</script>
