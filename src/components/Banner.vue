<template>
  <div class="banner">
    <img src="../assets/img/pic_S26427394@2x.png" class="banner-img">
    <div class="links">
      <div class="follow">Follow Us!</div>
      <img src="../assets/img/Icon_instagram.svg" class="ig">
      <img src="../assets/img/Icon_facebook.svg" class="fb">
    </div>
    <img src="../assets/img/Icon_chevronsdown.svg" class="float-icon">
  </div>
</template>

<style lang="scss" scoped>
@keyframes float {
  0% {
    transform: translateY(10%);
  }
  25% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(-10%);
  }
  75% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(10%);
  }
}
.banner {
  @include flex-center;
  flex-direction: column;
  width: 100%;
  .banner-img {
    width: 964px;
  }
  .links {
    width: 964px;
    display: flex;
    justify-content: flex-end;
    margin-top: 22.69px;
    font-size: 18px;
    .follow {
      margin-right: 20px;
    }
    .ig {
      margin-right: 15.39px;
      transition-duration: .2s;
      cursor: pointer;
      &:hover {
        transform: translateY(-15%);
      }
    }
    .fb {
      transition-duration: .2s;
      cursor: pointer;
      &:hover {
        transform: translateY(-15%);
      }
    }
  }
  .float-icon {
    animation: float 1s linear infinite;
    margin-top: 36.31px;
  }
}
</style>
