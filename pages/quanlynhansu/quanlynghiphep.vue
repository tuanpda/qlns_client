<template>
  <div style="background-color: #e9ecef; padding: 10px">
    <div class="box">
      <div>
        <span style="color: #ff7f50" class="icon is-small is-left">
          <i class="fas fa-calendar-alt"></i>
        </span>
        <span style="font-weight: bold; font-size: large">
          Quản lý nghỉ phép
        </span>
      </div>

      <div
        style="
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        "
      >
        <div class="control">
          <div class="select is-small">
            <select v-model="selectedPhongBan" @change="onPhongBanChange">
              <option value="">-- Tất cả Phòng ban --</option>
              <option v-for="pb in phongBans" :key="pb" :value="pb">
                {{ pb }}
              </option>
            </select>
          </div>
        </div>

        <div class="control">
          <div class="select is-small">
            <select v-model="selectedChiNhanh" @change="onChiNhanhChange">
              <option value="">-- Tất cả Chi nhánh --</option>
              <option v-for="cn in chiNhanhs" :key="cn" :value="cn">
                {{ cn }}
              </option>
            </select>
          </div>
        </div>

        <div class="control">
          <input
            class="input is-small"
            type="text"
            v-model="searchQuery"
            placeholder="🔍 Họ tên ..."
            style="width: 250px"
          />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="table_wrapper">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead style="font-weight: bold; background-color: aliceblue">
            <tr>
              <th style="font-size: small; text-align: center; width: 3%">
                STT
              </th>
              <th style="font-size: small; text-align: center">Họ tên</th>
              <th style="font-size: small; text-align: center">Ngày HĐ</th>
              <th style="font-size: small; text-align: center">Điều kiện</th>
              <th style="font-size: small; text-align: center">Phép</th>
              <th
                style="font-size: small; text-align: center"
                v-for="i in 12"
                :key="'thang' + i"
              >
                Tháng {{ i }}
              </th>
              <th style="font-size: small; text-align: center">Tổng đã nghỉ</th>
              <th style="font-size: small; text-align: center">Còn lại</th>
              <th style="font-size: small; text-align: center">Xác nhận</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(nv, index) in filteredDanhSachNv" :key="index">
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ index + 1 }}
              </td>
              <td style="font-size: small; vertical-align: middle">
                {{ nv.ten }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ nv.ngayHopDongTinhPhep }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ nv.isNangNhocDocHai === 1 ? "ĐH" : "BT" }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ nv.ngayPhep }}
              </td>
              <td v-for="i in 12" :key="'thang' + i">
                <input
                  class="input is-small is-danger"
                  type="number"
                  min="0"
                  v-model.number="nv.thang[i]"
                  @input="capNhatPhep(nv)"
                />
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ nv.tongDaNghi }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ nv.conLai }}
              </td>
              <td style="text-align: center">
                <button
                  class="button is-small"
                  @click="userRole == 1 || userRole == 2 ? onSave(nv) : null"
                  :class="{ 'disabled-link': userRole !== 1 && userRole !== 2 }"
                  :title="
                    userRole == 1 || userRole == 2
                      ? 'Ghi dữ liệu'
                      : 'Bạn không có quyền ghi dữ liệu'
                  "
                >
                  <span style="color: #0d6efd" class="icon is-small is-left">
                    <i class="far fa-check-circle"></i>
                  </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuanLyNghiPhep",
  data() {
    return {
      danhSachNv: [],
      selectedPhongBan: "",
      selectedChiNhanh: "",
      searchQuery: "",
      phongBans: [],
      chiNhanhs: [],

      userRole: null,
    };
  },

  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    itemsPerPage() {
      this.currentPage = 1;
    },
  },

  computed: {
    user() {
      return this.$store.state.modules.users.user.user;
    },

    filteredDanhSachNv() {
      return this.danhSachNv.filter((nv) => {
        const matchPhongBan = this.selectedPhongBan
          ? nv.phongBan === this.selectedPhongBan
          : true;
        const matchChiNhanh = this.selectedChiNhanh
          ? nv.chiNhanh === this.selectedChiNhanh
          : true;
        const matchSearch = this.searchQuery
          ? nv.ten.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            nv.ngayHopDongTinhPhep
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
          : true;
        return matchPhongBan && matchChiNhanh && matchSearch;
      });
    },
  },

  mounted() {
    // console.log(this.user);

    const user = this.user;
    if (user) {
      this.userRole = user.role;
      // this.createdBy = user.username;
    } else {
      console.warn("User chưa có dữ liệu!");
    }

    this.taiDanhSachNv();
  },

  methods: {
    async taiDanhSachNv() {
      try {
        const res = await this.$axios.get("/api/empl/all-emp");

        const allPhongBans = new Set();
        const allChiNhanhs = new Set();

        this.danhSachNv = res.data
          .filter(
            (nv) =>
              nv.ngayHopDongTinhPhep && nv.ngayHopDongTinhPhep.trim() !== ""
          )
          .map((nv) => {
            const thang = {};
            for (let i = 1; i <= 12; i++) thang[i] = 0;

            const ngayPhep = this.tinhNgayPhep(
              nv.ngayHopDongTinhPhep,
              nv.isNangNhocDocHai
            );
            const tongDaNghi = 0;
            const conLai = ngayPhep;

            allPhongBans.add(nv.phongBan);
            allChiNhanhs.add(nv.chiNhanh);

            return {
              ten: nv.hoTen,
              phongBan: nv.phongBan,
              chiNhanh: nv.chiNhanh,
              ngayHopDongTinhPhep: nv.ngayHopDongTinhPhep,
              isNangNhocDocHai: nv.isNangNhocDocHai,
              ngayPhep,
              thang,
              tongDaNghi,
              conLai,
            };
          });

        this.phongBans = [...allPhongBans].sort();
        this.chiNhanhs = [...allChiNhanhs].sort();
      } catch (error) {
        console.error("Lỗi tải danh sách nhân viên:", error);
      }
    },

    tinhNgayPhep(ngayBatDau, isNangNhocDocHai) {
      const namHienTai = new Date().getFullYear();
      const [thangStr, namStr] = ngayBatDau.split("/");
      const thang = parseInt(thangStr, 10);
      const nam = parseInt(namStr, 10);

      if (nam === namHienTai) {
        return 13 - thang;
      }

      const soNam = namHienTai - nam;
      const heSo = Math.floor(soNam / 5);

      return (isNangNhocDocHai === 0 ? 12 : 14) + heSo;
    },

    capNhatPhep(nv) {
      nv.tongDaNghi = Object.values(nv.thang).reduce((a, b) => a + b, 0);
      nv.conLai = nv.ngayPhep - nv.tongDaNghi;
    },

    onPhongBanChange() {
      this.selectedChiNhanh = "";
      this.searchQuery = "";
    },

    onChiNhanhChange() {
      this.selectedPhongBan = "";
      this.searchQuery = "";
    },

    onSave(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped>
@import "@/assets/customCss/common.css";
@import "@/assets/customCss/footerTable.css";

.input.is-small {
  min-width: 60px;
}

.table_wrapper {
  overflow-x: auto;
}
</style>
