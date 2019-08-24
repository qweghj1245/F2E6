<template>
  <div class="room">
    <loading :active.sync="loading"
    :loader="'dots'" :color="'#333333'"
    :background-color="'#FFFFFF'" :opacity="0.9">Loading...</loading>
    <div class="top" v-if="room.id">
      <div class="room-photo">
        <img src="../assets/img/btn_chevronleft.svg" class="left" @click="changeImage('detect')"/>
        <div class="photo">
          <img :src="room.imageUrl[count]" class="image" />
          <div class="title">{{room.name}}</div>
          <div class="time">平日/假日(五-日)</div>
          <div class="price">${{room.normalDayPrice}}/{{room.holidayPrice}}</div>
        </div>
        <img src="../assets/img/btn_chevronright.svg" class="right" @click="changeImage('add')"/>
      </div>
      <div class="room-info">
        <div class="info">
          <div>房客人數限制： {{room.descriptionShort.GuestMax}} 人</div>
          <div>床型：{{bed}}</div>
          <div>衛浴數量： {{room.descriptionShort['Private-Bath']}} 間</div>
          <div>房間大小： {{room.descriptionShort.Footage}} M²</div>
        </div>
        <div class="warning">
          <div v-for="(item, index) in roomDetail" :key="index">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="room.id">
      <div class="book-status">
        <div class="status">- 此房型可預訂狀態</div>
        <!-- <div class="calender"></div> -->
        <v-date-picker
        mode="range"
        :value="null"
        color="gray"
        is-inline
        :min-date='new Date()'
        @input="getRange($event)"
        />
        <div class="provide">
          <div class="has">
            <div>
              <img src="../assets/img/Icon_check.svg">
              <div>提供項目</div>
            </div>
            <div v-for="(item, index) in allServie[0]" :key="index">{{item.cn}}</div>
          </div>
          <div class="hasnt">
            <div>
              <img src="../assets/img/Icon_cross.svg">
              <div>無提供項目</div>
            </div>
            <div v-for="(item, index) in allServie[1]" :key="index">{{item.cn}}</div>
          </div>
        </div>
      </div>
      <div class="booking">
        <div class="check-in-out">
          <div class="border">
            <div class="check-in">
              <div>CheckIn</div>
              <div>{{room.checkInAndOut.checkInEarly}}-{{room.checkInAndOut.checkInLate}}</div>
            </div>
            <div class="check-out">
              <div>CheckOut</div>
              <div>{{room.checkInAndOut.checkOut}}</div>
            </div>
          </div>
        </div>
        <div class="right-now">
          <div class="now" v-if="!success">即刻預訂!</div>
          <div class="now" v-else>
            <span>訂房成功</span>
            <img src="../assets/img/Icon_circlecheck.svg">
          </div>
          <div class="input">
            <span>姓名</span>
            <input type="text" v-model="name" :class="{'complete': success}" :disabled="success">
          </div>
          <div class="input">
            <span>電話</span>
            <input type="text" v-model="phone" :class="{'complete': success}" :disabled="success">
          </div>
          <div class="input date">
            <span>日期</span>
            <input type="text" v-model="start" :class="{'complete': success}" :disabled="success">
            <span>至</span>
            <input type="text" v-model="end" :class="{'complete': success}" :disabled="success">
          </div>
          <div class="pay-ok">
            <div class="error" v-if="error">
              <img src="../assets/img/Icon_error.svg">
              <span>{{error}}</span>
            </div>
            <div class="pay" v-if="holidayPrice || normalPrice">
              <div v-if="normalPrice">
                <span>${{room.normalDayPrice}} x {{parseTime.length - viewForTime.count}}晚</span>
                <span>${{normalPrice}}</span>
              </div>
              <div v-if="holidayPrice">
                <span>${{room.holidayPrice}} x {{viewForTime.count}}晚</span>
                <span>${{holidayPrice}}</span>
              </div>
              <div>
                <span>手續費含稅</span>
                <span>$0</span>
              </div>
            </div>
            <div class="total" v-if="holidayPrice || normalPrice">
              <span>總計</span>
              <span>${{normalPrice + holidayPrice}}</span>
            </div>
          </div>
          <div class="book-now-wrap" v-if="!success">
            <div class="book-now" @click="booking">預約</div>
          </div>
          <div class="after" v-else>
            <div class="cancel" @click="deleteRooms">取消所有訂單</div>
            <div class="commute">聯絡我們</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      name: '',
      phone: '',
      start: '',
      end: '',
      normalPrice: '',
      holidayPrice: '',
      isLoading: true,
    };
  },
  computed: {
    room() {
      return this.$store.state.api.room;
    },
    bed() {
      return this.$store.state.deal.bed;
    },
    count() {
      return this.$store.state.deal.count;
    },
    roomDetail() {
      return this.$store.state.deal.roomDetail;
    },
    allServie() {
      return this.$store.state.deal.allService;
    },
    parseTime() {
      return this.$store.state.deal.parseTime;
    },
    viewForTime() {
      return this.$store.state.deal.viewTime;
    },
    error() {
      return this.$store.state.api.error || '';
    },
    success() {
      return this.$store.state.api.success || false;
    },
    loading() {
      return this.$store.state.deal.load;
    },
  },
  methods: {
    /* eslint-disable */
    booking() {
      const data = {
        date: Array.from(this.parseTime),
        tel: this.phone,
        name: this.name,
      };
      const id = this.$route.params.id;
      if (!this.parseTime || !this.name || !this.phone) return;
      this.$store.dispatch('bookingRooms', {id, data});
    },
    getRange(e) {
      this.$store.dispatch('roomParseTime', e);
      this.start = this.viewForTime.start;
      this.end = this.viewForTime.end;
      /* eslint-disable */
      this.normalPrice = this.room.normalDayPrice * (this.parseTime.length - this.viewForTime.count);
      this.holidayPrice = this.room.holidayPrice * this.viewForTime.count;
    },
    changeImage(way) {
      this.$store.commit('changeImage', way);
    },
    async getRoomInformation() {
      const id = this.$route.params.id;
      try {
        await this.$store.dispatch('getRoomInformation', id);
        await this.changeImage();
      } catch (error) {
        console.log(error);
      }
    },
    deleteRooms() {
      this.$store.dispatch('deleteRooms');
    },
  },
  created() {
    this.getRoomInformation();
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.room {
  width: 1366px;
  margin: 0 auto;
  padding: 50px 33px 0 84px;
  .top {
    display: flex;
    align-items: flex-end;
    .room-photo {
      display: flex;
      align-items: center;
      .photo {
        background-color: $color-white;
        padding: 32.26px 32.26px 13.3px 32.26px;
        margin: 0 50px;
        box-shadow: $shadow;
        .image {
          @include size(400px, 400px);
        }
        .title {
          font-size: 30px;
          margin-bottom: 10px;
          margin-left: 3px;
          height: 34px;
        }
        .time {
          margin-left: 20px;
          font-size: 18px;
          margin-bottom: 10px;
        }
        .price {
          font-size: 18px;
        }
      }
      .left, .right {
        cursor: pointer;
      }
    }
    .room-info {
      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: left;
        margin-right: 70px;
        margin-bottom: 46px;
        font-size: 18px;
        & > div {
          width: 180px;
        }
      }
      .warning {
        font-size: 18px;
        margin-left: 15px;
      }
    }
  }
  .bottom {
    padding: 121.07px 116px 127.39px 114px;
    display: flex;
    .book-status {
      .status {
        font-size: 20px;
        margin-bottom: 30px;
        margin-left: 22px;
      }
      .calender {
        @include size(350px, 350px);
        background-color: orange;
        margin-left: 45px;
        margin-bottom: 84px;
      }
      .provide {
        display: flex;
        .has, .hasnt {
          & > div:first-child {
            display: flex;
            font-size: 30px;
            margin-bottom: 30px;
            & > img {
              margin-right: 14.5px;
            }
          }
          & > div {
            font-size: 18px;
            text-align: center;
          }
        }
        .has {
          margin-right: 84px;
        }
      }
    }
    .booking {
      padding-left: 165px;
      .check-in-out {
        width: 350px;
        font-size: 18px;
        padding: 6px;
        background-color: $color-white;
        margin-left: 27px;
        border-radius: 10px;
        margin-bottom: 30px;
        .border {
          border: solid 5px $color-grey2;
          border-radius: 10px;
          display: flex;
          text-align: center;
          align-items: center;
          justify-content: center;
          padding: 17px 0;
          .check-in {
            padding: 0 34.5px 0 29px;
            min-width: 102px;
            border-right: 2px solid $color-grey2;
          }
          .check-out {
            padding: 0 35px 2px 40.5px;
          }
        }
      }
      .right-now {
        @include size(404px, auto);
        box-shadow: $shadow;
        background-color: $color-white;
        padding: 30px 46px;
        font-size: 18px;
        .now {
          text-shadow: $shadow;
          font-size: 30px;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          & > img {
            margin-left: 13px;
          }
        }
        .input {
          margin-bottom: 29.5px;
          & > span {
            margin-right: 30px;
          }
          & > input {
            border: 0;
            border-bottom: solid 1px $color-grey3;
            padding-left: 5px;
            font-size: 16px;
            padding-bottom: 7.5px;
            &:focus {
              outline: 0;
            }
          }
          .complete.complete {
            border-bottom: 0;
          }
        }
        .input:nth-child(4) {
          // margin-bottom: 40.5px;
          margin-bottom: 15.3px;
        }
        .date {
          & > input {
            width: 100px;
          }
          & > span:nth-child(3) {
            margin: 0 13px;
          }
        }
        .book-now-wrap {
          display: flex;
          justify-content: center;
          .book-now {
            @include size(150px, 40px);
            background-color: $color-black;
            box-shadow: $shadow;
            border-radius: 20px;
            padding: 8px 0;
            text-align: center;
            color: $color-white;
            cursor: pointer;
          }
        }
        .after {
          display: flex;
          justify-content: space-between;
          .cancel {
            color: $color-grey3;
            font-size: 14px;
            text-decoration: underline;
            cursor: pointer;
          }
          .commute {
            background-color: $color-grey4;
            padding: 4px 8px 5px 8px;
            color: $color-black;
            font-size: 14px;
            cursor: pointer;
          }
        }
        .pay-ok {
          .error {
            color: $color-red;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 13.5px;
            border-bottom: 1px $color-grey3 dashed;
            & > img {
              margin-right: 9.8px;
            }
          }
          .pay {
            padding: 30px 13.5px;
            border-bottom: 1px $color-grey3 dashed;
            & > div {
              display: flex;
              justify-content: space-between;
              margin-bottom: 13px;
            }
            & > div:last-child {
              margin-bottom: 0;
            }
          }
          .total {
            padding-top: 30.5px;
            display: flex;
            justify-content: space-between;
            padding-bottom: 30px;
          }
        }
      }
    }
  }
}
/deep/ .book-status {
  & > div:nth-child(2) {
    width: 350px;
    margin-bottom: 83.97px;
  }
}
</style>
