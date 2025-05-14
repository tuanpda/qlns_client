<template>
  <div>
    <section class="hero is-large is-info">
      <div class="hero-body">
        <div class="columns">
          <div class="column">
            <p class="title">
              <span class="icon">
                <i style="" class="far fa-building"></i>
              </span>
              Công Ty CP Môi Trường & Công Trình Đô Thị Hà Tĩnh
            </p>
            <h3 class="title is-5">
              <span class="icon">
                <i style="" class="fab fa-first-order-alt"></i>
              </span>
              HỆ THỐNG QUẢN LÝ NHÂN SỰ - HUMAN RESOURCE MANAGEMENT
            </h3>
            <h4 class="title is-6">
              <span class="icon">
                <i style="" class="fas fa-map-marker-alt"></i>
              </span>
              Địa chỉ: 161, Xuân Diệu, Thành Phố Hà Tĩnh, Tỉnh Hà Tĩnh, Bắc Hà,
              Hà Tĩnh
            </h4>
            <hr class="navbar-diliver" />
          </div>
        </div>
        <div class="columns">
          <div class="column is-8">
            <template>
              <h4 class="title is-5">
                <span class="icon">
                  <i style="" class="fas fa-money-check"></i>
                </span>
                Phiên đăng nhập hiện tại
              </h4>
            </template>
            <h5 class="title is-6">
              <span class="icon">
                <i style="" class="fas fa-male"></i>
              </span>
              Người sử dụng: {{ account.name }}
            </h5>
            <h5 class="title is-6">
              <span class="icon">
                <i style="" class="far fa-address-card"></i>
              </span>
              Căn cước công dân: {{ account.cccd }}
            </h5>
            <h5 class="title is-6">
              <span class="icon">
                <i style="" class="fas fa-phone-square"></i>
              </span>
              Số điện thoại: {{ account.sodienthoai }}
            </h5>
            <h5 class="title is-6">
              <span class="icon">
                <i style="" class="fas fa-envelope-open-text"></i>
              </span>
              Email: {{ account.email }}
            </h5>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: "auth",
  data() {
    return {
      account: {},
    };
  },

  mounted() {
    if (this.$auth && this.$auth.user) {
      this.account = this.$auth.user;
      // console.log(this.diemthu);
    } else {
      console.error("User data not available");
    }

    // console.log(this.$auth.loggedIn);
  },
};
</script>
