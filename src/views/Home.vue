<template>
  <div class="home">
    <loading :active.sync="loading"
    :loader="'dots'" :color="'#333333'"
    :background-color="'#FFFFFF'" :opacity="0.9">Loading...</loading>
    <Banner class="banner-wrap"></Banner>
    <div class="rooms">
      <Card v-for="(item) in rooms"
      :key="item.id"
      :room="item"
      class="cards" @go-room="goRoom(item.id)"></Card>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import Banner from '@/components/Banner.vue';
import Card from '@/components/Card.vue';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'home',
  components: {
    Banner,
    Card,
    Loading,
  },
  methods: {
    goRoom(id) {
      this.$router.push(`/room/${id}`);
    },
  },
  computed: {
    rooms() {
      return this.$store.state.api.rooms;
    },
    loading() {
      return this.$store.state.deal.load;
    },
  },
  created() {
    this.$store.dispatch('getRooms');
  },
};
</script>

<style lang="scss" scoped>
.banner-wrap {
  margin-top: 80px;
}
.rooms {
  width: 964px;
  margin: 0 auto;
  margin-top: 116.19px;
  margin-bottom: 123px;
  display: flex;
  flex-wrap: wrap;
  .cards {
    margin-right: 38px;
  }
  .cards:nth-child(3n) {
    margin-right: 0;
  }
  .cards:first-child {
    margin-left: 12px;
  }
  .cards:nth-child(4) {
    margin-left: 12px;
  }
}
</style>
