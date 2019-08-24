<template>
  <div class="footer">
    <div class="place">
      <img src="../assets/img/Icon_place.svg">
      <div>台北市大安區新生南路二段86號</div>
    </div>
    <div class="phone">
      <img src="../assets/img/Icon_phone.svg">
      <div>02-2345678</div>
    </div>
    <div>
      <img src="../assets/img/Icon_email.svg">
      <div>homeplace@mail.com</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  padding-bottom: 50px;
  & > div {
    display: flex;
    align-items: center;
    width: 300px;
    margin: 0 auto;
    & > img {
      margin-right: 23.35px;
    }
  }
  .place {
    margin-bottom: 20.35px;
  }
  .phone {
    margin-bottom: 21.32px;
  }
}
</style>
