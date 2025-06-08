<template>
  <div style="background-color: #e9ecef; padding: 10px">
    <div class="box container">
      <div>
        <span style="color: #dc3554" class="icon is-small is-left">
          <i class="fas fa-landmark"></i>
        </span>
        <span style="font-weight: bold; font-size: large"
          >Danh mục Phòng ban</span
        >
      </div>

      <div style="margin-top: 10px; display: flex; justify-content: flex-end">
        <div class="field">
          <div class="field is-grouped">
            <div class="control">
              <button @click="addNew()" class="button is-success is-small">
                Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box container">
      <div class="table_wrapper">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead style="font-weight: bold; background-color: #e9ecef">
            <tr>
              <th style="text-align: center; width: 5%">STT</th>
              <th style="text-align: center">Mã Phòng ban</th>
              <th style="text-align: center">Tên Phòng ban</th>
              <th style="text-align: center">Tạo ngày</th>
              <th style="text-align: center">Tạo bởi</th>
              <th style="text-align: center">Ghi chú</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in phongban" :key="index">
              <td style="text-align: center; vertical-align: middle">
                {{ index + 1 }}
              </td>
              <td style="text-align: center; vertical-align: middle">
                {{ item.maPhongBan }}
              </td>
              <td style="vertical-align: middle">
                {{ item.tenPhongBan }}
              </td>
              <td style="text-align: center; vertical-align: middle">
                {{ item.createdAt | formatDate }}
              </td>
              <td style="text-align: center; vertical-align: middle">
                {{ item.createdBy }}
              </td>
              <td style="text-align: center; vertical-align: middle">
                {{ item.ghichu }}
              </td>

              <td style="text-align: center; vertical-align: middle">
                <a
                  @click="
                    userRole == 1 || userRole == 2 ? editPhongban(item) : null
                  "
                  :class="{ 'disabled-link': userRole !== 1 && userRole !== 2 }"
                  :title="
                    userRole == 1 || userRole == 2
                      ? 'Hiệu chỉnh hồ sơ'
                      : 'Bạn không có quyền chỉnh sửa'
                  "
                >
                  <span style="color: #0d6efd" class="icon is-small is-left">
                    <i class="fa fa-pencil"></i>
                  </span>
                </a>
                &ensp;
                <a
                  @click="
                    userRole == 1 || userRole == 2 ? onDelete(item) : null
                  "
                  :class="{ 'disabled-link': userRole !== 1 && userRole !== 2 }"
                  :title="
                    userRole == 1 || userRole == 2
                      ? 'Xoá'
                      : 'Bạn không có quyền xoá'
                  "
                >
                  <span style="color: red" class="icon is-small is-left">
                    <i class="fa fa-trash"></i>
                  </span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Biểu tượng loading -->
    <div v-if="isLoading" class="loading-overlay">
      <!-- Biểu tượng loading -->
      <div class="loading-spinner"></div>
      <span>waitting some minute ...</span>
    </div>

    <!-- modal addnews -->
    <div class="">
      <div :class="{ 'is-active': isActive_Addnew }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-addnew box">
          <section class="modal-card-body">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div>
                <span style="color: #ff7f50" class="icon is-small is-left">
                  <i class="fas fa-plus-circle"></i>
                </span>
                <span style="font-weight: bold">Thêm Phòng ban</span>
              </div>
              <div>
                <button
                  @click="isActive_Addnew = false"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>
            </div>
            <hr class="navbar-divider" />

            <div class="field">
              <label class="label">Mã Phòng ban</label>
              <div class="control">
                <input
                  v-model="formAddNew.maPhongBan"
                  class="input"
                  type="text"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Tên Phòng ban</label>
              <div class="control">
                <input
                  v-model="formAddNew.tenPhongBan"
                  class="input"
                  type="text"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Ghi chú</label>
              <div class="control">
                <textarea
                  v-model="formAddNew.ghichu"
                  class="textarea"
                ></textarea>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button @click="onSave" class="button is-link">Thêm mới</button>
              </div>
              <div class="control">
                <button
                  @click="isActive_Addnew = false"
                  class="button is-link is-light"
                >
                  Huỷ bỏ
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- modal editor -->
    <div class="">
      <div :class="{ 'is-active': isActive_Edit }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-addnew box">
          <section class="modal-card-body">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div>
                <span style="color: #ff7f50" class="icon is-small is-left">
                  <i class="fas fa-highlighter"></i>
                </span>
                <span style="font-weight: bold">Sửa thông tin Phòng ban</span>
              </div>
              <div>
                <button
                  @click="isActive_Edit = false"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>
            </div>
            <hr class="navbar-divider" />

            <div class="field">
              <label class="label">Mã Phòng ban</label>
              <div class="control">
                <input
                  v-model="formEdit.maPhongBan"
                  class="input"
                  type="text"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Tên Phòng ban</label>
              <div class="control">
                <input
                  v-model="formEdit.tenPhongBan"
                  class="input"
                  type="text"
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Ghi chú</label>
              <div class="control">
                <textarea v-model="formEdit.ghichu" class="textarea"></textarea>
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button @click="onEditApply" class="button is-link">
                  Ghi dữ liệu
                </button>
              </div>
              <div class="control">
                <button
                  @click="isActive_Edit = false"
                  class="button is-link is-light"
                >
                  Huỷ bỏ
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      phongban: [],
      isActive_Addnew: false,
      isActive_Edit: false,
      isLoading: false,
      formAddNew: {
        maPhongBan: "",
        tenPhongBan: "",
        ghichu: "",
        createdBy: "",
        createdAt: null,
      },
      formEdit: {
        maPhongBan: "",
        tenPhongBan: "",
        ghichu: "",
      },

      userRole: null,
    };
  },

  computed: {
    user() {
      return this.$store.state.modules.users.user.user;
    },
  },

  mounted() {
    const user = this.user;
    if (user) {
      this.userRole = user.role;
      // this.createdBy = user.username;
    } else {
      console.warn("User chưa có dữ liệu!");
    }

    this.getPhongban();
  },

  methods: {
    async getPhongban() {
      const res = await this.$axios.get("/api/danhmucs/dmphongban");
      //   console.log(res);
      this.phongban = res.data;
    },

    async addNew() {
      this.isActive_Addnew = true;
    },

    async onSave() {
      if (this.userRole == 1 || this.userRole == 2) {
        // Kiểm tra dữ liệu trước khi ghi
        if (
          this.formAddNew.maPhongBan == "" ||
          this.formAddNew.tenPhongBan == ""
        ) {
          Swal.fire({
            title: "Các ô dữ liệu không được để trống",
            icon: "error",
          });
          return;
        }

        //   console.log(this.formAddNew);

        const current = new Date();
        this.formAddNew.createdAt = current;

        const result = await Swal.fire({
          title: `Xác nhận thêm mới phòng ban ?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận thêm",
          denyButtonText: `Hủy thêm`,
        });
        if (result.isConfirmed) {
          try {
            const res = await this.$axios.post(
              "/api/danhmucs/add-phongban",
              this.formAddNew
            );
            if (res.status === 200) {
              Swal.fire({
                title: "Tạo thành công",
                text: `Đã thêm mới phòng ban tên: ${this.formAddNew.tenPhongBan}`,
                icon: "success",
              });
              // ghi log
              const dataLog = {
                meNu: "Danh mục / Phòng ban",
                chucNang: "Thêm mới Phòng ban",
                noiDung: `Thêm mới Phòng ban: ${this.formAddNew.tenPhongBan}`,
                createdAt: current,
                createdBy: this.createdBy,
              };
              await this.$axios.post("/api/empl/read-log-his-system", dataLog);

              this.getPhongban();
              this.isActive_Addnew = false;
            }
          } catch (error) {
            // Dừng hiển thị biểu tượng loading
            this.isLoading = false;
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: `Lỗi! Không thể tạo tài khoản`,
            });
          }
        }
      }
    },

    async editPhongban(data) {
      this.formEdit = {};
      this.isActive_Edit = true;
      this.formEdit = data;
    },

    async onEditApply() {
      if (this.userRol == 1 || this.userRol == 2) {
        // Kiểm tra dữ liệu trước khi ghi
        if (this.formEdit.maPhongBan == "" || this.formEdit.tenPhongBan == "") {
          Swal.fire({
            title: "Các ô dữ liệu không được để trống",
            icon: "error",
          });
          return;
        }

        const current = new Date();
        this.formAddNew.createdAt = current;

        const result = await Swal.fire({
          title: `Xác nhận sửa thông tin phòng ban ?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận sửa",
          denyButtonText: `Hủy sửa`,
        });
        if (result.isConfirmed) {
          this.isLoading = true;
          try {
            const res = await this.$axios.post(
              "/api/danhmucs/edit-phongban",
              this.formEdit
            );
            if (res.status === 200) {
              this.isLoading = false;
              Swal.fire({
                title: "Sửa thành công",
                icon: "success",
              });

              // ghi log
              const dataLog = {
                meNu: "Danh mục / Phòng ban",
                chucNang: "Hiệu chỉnh Phòng ban",
                noiDung: `Hiệu chỉnh Phòng ban: ${this.formEdit.tenPhongBan}`,
                createdAt: current,
                createdBy: this.createdBy,
              };
              await this.$axios.post("/api/empl/read-log-his-system", dataLog);

              this.getPhongban();
              this.isActive_Edit = false;
            }
          } catch (error) {
            // Dừng hiển thị biểu tượng loading
            this.isLoading = false;
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: `Lỗi! Không thể sửa thông tin phòng ban`,
            });
          }
        }
      }
    },

    async onDelete(data) {
      if (this.userRol == 1 || this.userRol == 2) {
        const result = await Swal.fire({
          title: `Xác nhận xoá phòng ban ?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận xoá",
          denyButtonText: `Hủy xoá`,
        });
        if (result.isConfirmed) {
          this.isLoading = true;
          const current = new Date();
          this.formAddNew.createdAt = current;

          const dataPost = {
            id: data.id,
          };
          try {
            const res = await this.$axios.post(
              `/api/danhmucs/del-phongban`,
              dataPost
            );
            if (res.status === 200) {
              this.isLoading = false;
              Swal.fire({
                title: "Xoá thành công",
                text: `Đã xoá phòng ban: ${data.tenPhongBan}`,
                icon: "success",
              });
              // ghi log
              const dataLog = {
                meNu: "Danh mục / Phòng ban",
                chucNang: "Xoá Phòng ban",
                noiDung: `Xoá Phòng ban: ${data.tenPhongBan}`,
                createdAt: current,
                createdBy: this.createdBy,
              };
              await this.$axios.post("/api/empl/read-log-his-system", dataLog);

              this.getPhongban();
            }
          } catch (error) {
            // Dừng hiển thị biểu tượng loading
            this.isLoading = false;
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: `Lỗi! Không thể xoá phòng ban`,
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="css">
@import "@/assets/customCss/common.css";

@import "@/assets/customCss/footerTable.css";

.modal-card-addnew {
  width: 650px;
  height: 500px;
}
</style>
