<template>
  <div class="pageIdex">
    <div v-if="user">
      <div class="columns" style="padding: 50px">
        <div class="column is-4">
          <div class="box has-text-centered">
            <p>
              <span
                style="
                  font-weight: 500;
                  font-size: 18px;
                  color: #6c757d;
                  font-family: 'Roboto', sans-serif;
                "
              >
                {{ greeting }}, {{ user.name }}
              </span>
            </p>
            <span
              style="font-weight: 600; font-size: 20px; font-family: monospace"
            >
              {{ currentTime }}
            </span>

            <!-- Ảnh căn giữa -->
            <div
              class="is-flex is-justify-content-center"
              style="margin-top: 10px; margin-bottom: 10px"
            >
              <figure class="image is-128x128">
                <img
                  class="is-rounded"
                  :src="user.avatar"
                  alt="User"
                  style="
                    width: 128px;
                    height: 128px;
                    object-fit: cover;
                    border: 1px solid #f1aeb5;
                  "
                />
              </figure>
            </div>

            <!-- Thông tin tổ chức -->

            <div
              class="tag is-medium mt-3"
              style="background-color: #ff6600; color: white"
            >
              <template v-if="user.role == 1">
                <span>Quản trị cấp cao</span>
              </template>
              <template v-else>
                <span>Nhân viên công ty</span>
              </template>
            </div>

            <p class="mt-2">
              <span class="icon has-text-danger">
                <i class="fas fa-fingerprint"></i>
              </span>
              <span>{{ user.username }}</span>
            </p>

            <button class="button is-dark mt-4 is-fullwidth">
              {{ user.cccd }} / {{ user.sodienthoai }}
            </button>
          </div>
        </div>

        <div class="column is-2">
          <div class="box has-text-centered">
            <nuxt-link
              to="/nhanviendailythu/tongsokekhai"
              style="text-decoration: none"
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 10px;
                "
              >
                <span style="font-size: 14px; font-weight: 500; color: #007bff">
                  Nam: {{ dataReport.tongNam }}
                </span>
                <span style="font-size: 14px; font-weight: 500; color: #e83e8c">
                  Nữ: {{ dataReport.tongNu }}
                </span>
              </div>

              <span
                style="
                  font-size: 40px;
                  font-weight: 700;
                  font-family: 'Roboto', sans-serif;
                  color: #ffc107;
                  display: inline-block;
                  margin: 5px 0;
                "
              >
                {{ dataReport.tongNhanSu }}
              </span>
            </nuxt-link>

            <hr class="navbar-divider" />
            <span style="font-size: 15px; font-weight: 500">
              Tổng nhân sự công ty
            </span>
          </div>

          <div class="box has-text-centered">
            <span
              style="
                font-size: 60px;
                font-weight: 700;
                font-family: 'Roboto', sans-serif;
                color: #0d6efd;
              "
            >
              {{ dataReport.tongDangVien }}
            </span>
            <hr class="navbar-divider" />
            <span style="font-size: 15px; font-weight: 500">Đảng viên</span>
          </div>
        </div>

        <div class="column is-2">
          <div class="box has-text-centered">
            <nuxt-link
              to="/nhanviendailythu/hosoloibitrave"
              style="text-decoration: none"
            >
              <span
                style="
                  font-size: 60px;
                  font-weight: 700;
                  font-family: 'Roboto', sans-serif;
                  color: #dc3545;
                "
              >
                {{ dataReport.tongTrenDaiHoc }}
              </span>
            </nuxt-link>
            <hr class="navbar-divider" />
            <span style="font-size: 15px; font-weight: 500">Trên đại học</span>
          </div>
          <div class="box has-text-centered">
            <nuxt-link
              to="/nhanviendailythu/hosodaguilencong"
              style="text-decoration: none"
            >
              <span
                style="
                  font-size: 60px;
                  font-weight: 700;
                  font-family: 'Roboto', sans-serif;
                  color: #198754;
                "
              >
                {{ dataReport.tongDaiHoc }}
              </span>
            </nuxt-link>
            <hr class="navbar-divider" />
            <span style="font-size: 15px; font-weight: 500">Đại học</span>
          </div>
        </div>

        <div class="column is-2">
          <div class="box has-text-centered">
            <nuxt-link
              to="/nhanviendailythu/hosochuaguilencong"
              style="text-decoration: none"
            >
              <span
                style="
                  font-size: 60px;
                  font-weight: 700;
                  font-family: 'Roboto', sans-serif;
                  color: #fd7e14;
                "
              >
                {{ dataReport.tongCaoDang }}
              </span>
            </nuxt-link>

            <hr class="navbar-divider" />
            <span style="font-size: 15px; font-weight: 500">Cao đẳng</span>
          </div>
          <div class="box has-text-centered">
            <span
              style="
                font-size: 60px;
                font-weight: 700;
                font-family: 'Roboto', sans-serif;
                color: #6610f2;
              "
            >
              {{ dataReport.tongTrungCap }}
            </span>
            <hr class="navbar-divider" />
            <span style="font-size: 15px; font-weight: 500">Trung cấp</span>
          </div>
        </div>

        <div class="column is-2">
          <div class="box has-text-centered">
            <nuxt-link
              to="/nhanviendailythu/hosochuaguilencong"
              style="text-decoration: none"
            >
              <span
                style="
                  font-size: 60px;
                  font-weight: 700;
                  font-family: 'Roboto', sans-serif;
                  color: #008b8b;
                "
              >
                {{ dataReport.tongSoCap }}
              </span>
            </nuxt-link>

            <hr class="navbar-divider" />
            <span style="font-size: 15px; font-weight: 500">Sơ cấp</span>
          </div>
          <div class="box has-text-centered">
            <span
              style="
                font-size: 60px;
                font-weight: 700;
                font-family: 'Roboto', sans-serif;
                color: #e9967a;
              "
            >
              {{ dataReport.tongLDPT }}
            </span>
            <hr class="navbar-divider" />
            <span style="font-size: 15px; font-weight: 500"
              >Lao động phổ thông</span
            >
          </div>
        </div>
      </div>

      <div class="columns" style="padding-left: 50px; padding-right: 50px">
        <div class="column is-8">
          <TuoiNghiHuu />
        </div>
        <div class="column is-4">
          <CharAge />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CharAge from "~/components/CharAge.vue";
import CharOther from "~/components/CharOther.vue";
import CharOther1 from "~/components/CharOther1.vue";
import TuoiNghiHuu from "~/components/TuoiNghiHuu.vue";

export default {
  components: {
    CharAge,
    CharOther,
    CharOther1,
  },
  name: "IndexPage",
  middleware: "auth",
  data() {
    return {
      role: 0,
      currentTime: "",
      greeting: "",
      dataReport: {},
    };
  },

  computed: {
    user() {
      return this.$store.state.modules.users.user.user;
    },
  },

  watch: {
    user(newUser) {
      if (newUser) {
        this.role = newUser.role;
      }
    },
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },

  mounted() {
    // console.log(this.user);

    const user = this.user;
    if (user) {
      this.role = user.role;
      // console.log(this.role);

      // this.report();
    } else {
      console.warn("User chưa có dữ liệu!");
    }

    // this.report();

    // this.updateTime();
    // this.timer = setInterval(this.updateTime, 1000);
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000);
    this.report();
  },

  methods: {
    async report() {
      const res = await this.$axios.get(`/api/empl/report-index`);
      // console.log(res);
      if (res.status == 200) {
        this.dataReport = res.data;
      }
    },

    updateTime() {
      const now = new Date();

      // Giờ phút giây (24h)
      const time = now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();

      this.currentTime = `${time}, ${day} Tháng ${month} Năm ${year}`;

      // Xác định lời chào
      const hour = now.getHours();
      if (hour >= 5 && hour < 12) {
        this.greeting = "Chào buổi sáng";
      } else if (hour >= 12 && hour < 14) {
        this.greeting = "Chào buổi trưa";
      } else if (hour >= 14 && hour < 18) {
        this.greeting = "Chào buổi chiều";
      } else if (hour >= 18 && hour < 22) {
        this.greeting = "Chào buổi tối";
      } else {
        this.greeting = "Chúc ngủ ngon";
      }
    },
  },
};
</script>

<style lang="css" scoped>
.pageIdex {
  height: auto;
  background: white; /* hoặc màu nền bạn muốn */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* đổ bóng mềm, đẹp */
  border-radius: 12px; /* bo tròn nhẹ cho đẹp */
  padding: 20px; /* tùy chọn, nếu bạn muốn thêm khoảng cách trong */

  display: flex;
  flex-direction: column;
  justify-content: space-between; /* đẩy phần đầu lên và phần cuối xuống */
}
</style>
