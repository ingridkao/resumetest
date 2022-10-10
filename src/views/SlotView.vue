<template>
  <section class="slot">
    <h1>This is an Slot page</h1>

    <Card>
      <template v-slot:header>
        <h2>插槽先生</h2>
      </template>
      <template v-slot:main>
        <h2>喔喔喔喔喔喔喔喔喔喔</h2>
      </template>
      <template v-slot:footer>
        <h6>我很少用這個</h6>
      </template>
    </Card>

  </section>
</template>

<script>
import Card from '@/components/layout/Card.vue'
export default {
  components: {
    Card
  },
}
</script>


