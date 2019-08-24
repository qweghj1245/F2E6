<template>
  <div class="nav">
    <div class="logo" @click="$router.push('/')">HOMEPLACE</div>
    <div class="list">
      <div class="set">活動公告</div>
      <div class="set">交通方式</div>
      <div class="set">周邊景點</div>
      <div class="set">關於我們</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  padding: 21px 20px 13px 30px;
  .logo {
    font-size: 20px;
    cursor: pointer;
  }
  .list {
    display: flex;
    .set {
      margin-right: 80px;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        &::after {
          width: 80%;
        }
      }
      &::after {
        content: '';
        display: block;
        @include size(0, 0);
        border-top: solid 1px $color-black;
        margin: 0 auto;
        margin-top: 10px;
        transition-duration: .4s;
      }
    }
  }
}
</style>
