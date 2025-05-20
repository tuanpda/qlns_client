<template>
  <nav
    class="navbar is-transparent is-success"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <a href="/" class="navbar-item">
          <div>
            <span style="font-weight: bold; font-size: 25px">H . R . M</span>
          </div>
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          @click="toggleMenu"
        >
          <div>
            <img
              style="color: #f14668"
              src="@/assets/images/buger.png"
              alt=""
            />
          </div>
        </a>
      </div>

      <div
        class="navbar-menu"
        :class="{ 'is-active': isMenuOpen }"
        id="navbarMenu"
      >
        <div class="navbar-start">
          <!-- Người dùng -->
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" @click="toggleDropdown_quantriusers">
              <span
                style="color: hsl(0deg, 0%, 100%)"
                class="icon is-small is-left"
              >
                <i class="far fa-address-card"></i>
              </span>
              &ensp; Người dùng
            </a>
            <div
              @click="toggleDropdown_quantriusers"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_quantriusers"
            >
              <nuxt-link to="/admin/users/add-user" class="navbar-item">
                <span style="color: #ea4aaa" class="icon is-small is-left">
                  <i class="fas fa-trademark"></i>
                </span>
                &ensp; Thêm mới
              </nuxt-link>
              <nuxt-link to="/admin/users/manager-users" class="navbar-item">
                <span style="color: #ea4aaa" class="icon is-small is-left">
                  <i class="fa fa-cog"></i>
                </span>
                &ensp; Quản trị
              </nuxt-link>
              <!-- <nuxt-link class="navbar-item">
                <span style="color: #ea4aaa" class="icon is-small is-left">
                  <i class="fab fa-trade-federation"></i>
                </span>
                &ensp; Phân quyền
              </nuxt-link>
              <hr class="navbar-divider" />
              <nuxt-link class="navbar-item">
                <span style="color: #ea4aaa" class="icon is-small is-left">
                  <i class="fa fa-recycle"></i>
                </span>
                &ensp; Khóa / Mở / Hủy
              </nuxt-link>
              <nuxt-link class="navbar-item">
                <span style="color: #ea4aaa" class="icon is-small is-left">
                  <i class="fa fa-paper-plane"></i>
                </span>
                &ensp; Đổi mật khẩu
              </nuxt-link> -->
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div v-if="user" class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link" @click="toggleDropdown_user"
              ><img
                :src="user.avatar"
                alt=""
                width="40"
                height="60"
                style="border-radius: 50%"
              />
              &ensp; hi, {{ user.username }}!</a
            >
            <div
              @click="toggleDropdown_user"
              class="navbar-dropdown is-boxed"
              v-show="isDropdownOpen_user"
            >
              <a @click="isActive = true" class="navbar-item">
                <span class="icon is-small is-left" style="color: #f96854">
                  <i class="fas fa-address-card"></i>
                </span>
                &ensp; Hồ sơ cá nhân
              </a>
              <nuxt-link to="#" class="navbar-item">
                <span class="icon is-small is-left" style="color: #f96854">
                  <i class="fas fa-book"></i>
                </span>
                &ensp; Trợ giúp
              </nuxt-link>
              <hr class="navbar-divider" />
              <template v-if="user.role == 1">
                <nuxt-link to="/admin/" class="navbar-item">
                  <span class="icon is-small is-left" style="color: #ca1f26">
                    <i class="fab fa-buysellads"></i>
                  </span>
                  &ensp; Quản trị viên
                </nuxt-link>
              </template>
              <a @click="logout()" class="navbar-item">
                <span class="icon is-small is-left" style="color: #f96854">
                  <i class="fas fa-sign-out-alt"></i>
                </span>
                &ensp; Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal info user-->
      <div class="">
        <div :class="{ 'is-active': isActive }" class="modal">
          <div class="modal-background"></div>
          <div class="modal-content modal-card-predata">
            <section class="modal-card-body box">
              <div v-if="user">
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Họ tên</label>
                      <div class="control">
                        <input
                          v-model="user.name"
                          class="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Tên tài khoản</label>
                      <div class="control">
                        <input
                          v-model="user.username"
                          class="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Mật khẩu cũ</label>
                      <div class="control">
                        <input
                          v-model="form_change_pass.old_pass"
                          class="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Mật khẩu mới</label>
                      <div class="control">
                        <input
                          v-model="form_change_pass.new_pass"
                          class="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Nhập lại mật khẩu mới</label>
                      <div class="control">
                        <input
                          v-model="form_change_pass.re_new_pass"
                          class="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field">
                      <label class="label">Ảnh đại diện</label>
                      <div class="control" style="text-align: center">
                        <div id="preview" class="box">
                          <figure class="image is-128x128">
                            <img class="is-rounded" :src="user.avatar" />
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="column">
                    <button class="button is-small is-success is-fullwidth">
                      Cập nhật
                    </button>
                  </div>
                  <div class="column">
                    <button
                      @click="isActive = false"
                      class="button is-small is-danger is-fullwidth"
                    >
                      Thoát
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isDropdownOpen_danhmuc: false,
      isDropdownOpen_quantriusers: false,
      isDropdownOpen_user: false,
      activeMenu: "", // Thêm thuộc tính activeMenu để lưu trạng thái menu đang được sử dụng

      isActive: false,
      form_change_pass: {
        old_pass: "",
        new_pass: "",
        re_new_pass: "",
      },
    };
  },

  computed: {
    user() {
      return this.$store.state.modules.users.user.user;
    },
  },

  mounted() {},

  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    toggleDropdown_danhmuc() {
      this.isDropdownOpen_danhmuc = !this.isDropdownOpen_danhmuc;
    },

    toggleDropdown_quantriusers() {
      this.isDropdownOpen_quantriusers = !this.isDropdownOpen_quantriusers;
    },

    toggleDropdown_user() {
      this.isDropdownOpen_user = !this.isDropdownOpen_user;
    },

    async logout() {
      await this.$auth.logout(); // Đảm bảo rằng đăng xuất đã hoàn thành trước khi chuyển hướng
      this.$router.push("/login"); // Chuyển hướng đến trang login sau khi đăng xuất
    },
  },
};
</script>

<style lang="css" scoped>
.brand-title {
  font-size: 35px;
  font-weight: bold;
}

.navbar-brand {
  padding-right: 30px;
}

.avatar {
  margin-right: 5px;
}

.preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview img {
  width: 50px;
  height: 50px;
}

.modal-card {
  width: 620px;
  height: 500px;
}

.navbar {
  min-height: 5rem !important;
}

.nested.dropdown {
  &:hover > .dropdown-menu {
    display: block;
  }

  .dropdown-menu {
    top: -15px;
    margin-left: 100%;
  }

  .dropdown-trigger {
    button {
      padding: 0px 0px;
      border: 0px;
      font-size: 14px;
      font-weight: 400;
      height: 2em;
    }
  }

  /* Định nghĩa màu nền cho navbar */
  .is-custom-color {
    background-color: red; /* Thay #your-color bằng mã màu bạn muốn sử dụng */
  }
}
</style>
