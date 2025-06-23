<template>
  <div class="column">
    <div class="box">
      <div class="columns">
        <div class="column">
          <div class="control">
            <span style="color: #ff0000" class="icon is-small is-left">
              <i class="fas fa-file-signature"></i>
            </span>
            <span style="font-weight: bold; color: #ff8c00"
              >Kê khai BHXH BHYT</span
            >
          </div>
        </div>
      </div>

      <div style="margin-top: 20px">
        <div v-if="loggedIn">
          <div>
            <div class="titleKk">
              <hr class="line" />
              <div class="topleft">
                <span style="color: red; font-weight: 700">1.</span> Thông tin
                điểm Thu
              </div>
            </div>
            <div class="columns">
              <div
                class="column"
                style="font-size: 15px; font-weight: bold; color: #2e8b57"
              >
                {{ user.tendaily }}
              </div>
              <div class="column">
                <div class="control has-icons-left">
                  <div class="select is-small is-fullwidth">
                    <select @change="loaihinhChange($event)">
                      <option selected disabled>
                        -- CHỌN LOẠI HÌNH THAM GIA --
                      </option>
                      <option
                        v-for="(item, index) in loaihinhtg"
                        :key="index"
                        :value="item.maloaihinh"
                      >
                        {{ item.maloaihinh }} - {{ item.tenloaihinh }}
                      </option>
                    </select>
                  </div>
                  <div class="icon is-small is-left">
                    <i style="color: #fed604" class="far fa-bookmark"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-top: 30px">
            <div class="titleKk">
              <hr class="line" />
              <div class="topleft">
                <span style="color: red; font-weight: 700">2.</span> Thông tin
                người nạp hồ sơ
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <div style="display: flex; align-items: center">
                  <div style="margin-right: 10px">
                    <label class="labelFix">Họ tên người nạp tiền</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.name"
                      type="text"
                      class="input is-small"
                      disabled
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Tỉnh LH</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.tentinh"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Địa chỉ liên hệ</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.diachi"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
              </div>
              <div class="column">
                <div style="display: flex; align-items: center">
                  <div style="margin-right: 10px">
                    <label class="labelFix">Số CCCD</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.cccd"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Huyện LH</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.tenhuyen"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Email</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.email"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
              </div>
              <div class="column">
                <div style="display: flex; align-items: center">
                  <div style="margin-right: 10px">
                    <label class="labelFix">Số điện thoại</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.sodienthoai"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Xã LH</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.tenxa"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
                <div
                  style="display: flex; align-items: center; margin-top: 15px"
                >
                  <div style="margin-right: 10px">
                    <label class="labelFix">Mã số BHXH</label>
                  </div>
                  <div style="flex-grow: 1">
                    <input
                      v-model="user.masobhxh"
                      disabled
                      type="text"
                      class="input is-small"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin-top: 50px">
          <div class="titleKk">
            <hr class="line" />
            <div class="topleft">
              <span style="color: red; font-weight: 700">3.</span> Nghiệp vụ
            </div>
          </div>
          <div class="columns">
            <div class="column is-4">
              <div style="display: flex; align-items: center">
                <div style="margin-right: 10px">
                  <label class="labelFix">Loại hình tham gia</label>
                </div>
                <div style="flex-grow: 1">
                  <input
                    disabled
                    v-model="loaihinh"
                    type="text"
                    class="input is-small"
                  />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div style="display: flex; align-items: center">
                <div style="margin-right: 10px">
                  <label class="labelFix">Lương cơ sở</label>
                </div>
                <div style="flex-grow: 1">
                  <input
                    type="text"
                    class="input is-small"
                    v-model="luongcoso"
                    disabled
                    v-mask="mask"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sử dụng v-bind để truyền props vào component con -->
        <div v-if="maloaihinh == 'AR'">
          <ArTable :maloaihinh="maloaihinh" :loaihinh="loaihinh" />
        </div>
        <div v-if="maloaihinh == 'BI'">
          <BiTable :maloaihinh="maloaihinh" :loaihinh="loaihinh" />
        </div>
        <div v-if="maloaihinh == 'IS'">
          <ISTable :maloaihinh="maloaihinh" :loaihinh="loaihinh" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArTable from "@/components/nghiepvu/caculCastAR";
import BiTable from "@/components/nghiepvu/caculCastBI";
import ISTable from "@/components/nghiepvu/caculCastIS";
import Swal from "sweetalert2";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
const currencyMask = createNumberMask({
  prefix: "",
  allowDecimal: true,
  includeThousandsSeparator: true,
  allowNegative: false,
});
export default {
  name: "KekhaiPage",
  middleware: "auth",
  components: {
    ArTable,
    BiTable,
    ISTable,
  },

  data() {
    return {
      mask: currencyMask,
      loaihinhtg: [],
      maloaihinh: "",
      loaihinh: "",
      luongcoso: 0,
      user_info: {},
    };
  },

  computed: {
    loggedIn() {
      return this.$auth.loggedIn;
    },
    user() {
      return this.$auth.user;
    },
  },

  mounted() {
    this.loadLoaihinhtg();
  },

  methods: {
    async loadLoaihinhtg() {
      const res = await this.$axios.get(`/api/danhmucs/dmloaihinhtg`);
      this.loaihinhtg = res.data;
      const res_lcs = await this.$axios.get(`/api/danhmucs/dmluongcs`);
      // console.log(res_lcs);

      if (res_lcs.data.length > 0) {
        this.luongcoso = res_lcs.data[0].luongcs;
      }
    },

    async loaihinhChange(e, index) {
      const loaihinhtg = e.target.value;
      const tenloaihinhtg = e.target.options[e.target.selectedIndex].text;
      let position = tenloaihinhtg.split("-");
      this.maloaihinh = loaihinhtg;
      if (loaihinhtg) {
        this.loaihinh = position[1].trim();
      }
      // console.log(this.maloaihinh);
      // console.log(this.loaihinh);
    },
  },
};
</script>

<style scoped lang="css">
@import "@/assets/customCss/common.css";
</style>
