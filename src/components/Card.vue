<template>
  <div class="card" @click="goRoom">
    <div class="photo" :style="image"></div>
    <div class="title">{{room.name}}</div>
    <div class="price">{{room.price}}</div>
  </div>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
    },
  },
  methods: {
    goRoom() {
      this.$emit('go-room');
    },
  },
  computed: {
    image() {
      return `background-image:url(${this.room.imageUrl})`;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  @include size(288px, 344px);
  box-shadow: $shadow;
  background-color: $color-white;
  padding: 20px;
  margin-bottom: 38px;
  transition-duration: .5s;
  cursor: pointer;
  &:hover {
    transform: translateY(-3%);
    box-shadow: $shadow-deeper;
  }
  .photo {
    @include size(248px, 248px);
    margin-bottom: 10px;
    background-size: cover;
  }
  .title {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .price {
    font-size: 14px;
  }
}
</style>
