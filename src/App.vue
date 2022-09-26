<template>
	<MainHeader/>
	<router-view/>
</template>

<script>
import MainHeader from '@/components/layout/MainHeader.vue'
export default {
	components: {
		MainHeader: MainHeader
	}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
