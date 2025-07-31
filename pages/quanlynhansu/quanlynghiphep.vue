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
        class="filters"
        style="
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        "
      >
        <!-- Năm -->
        <div class="control">
          <div class="select is-small is-fullwidth">
            <select v-model="selectedNam" @change="onChangeNam">
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
              <option value="2033">2033</option>
            </select>
          </div>
        </div>

        <!-- Phòng ban -->
        <div class="control">
          <div class="select is-small">
            <select v-model="selectedPhongBan" @change="onPhongBanChange">
              <option value="">-- Tất cả Phòng ban --</option>
              <option
                v-for="pb in phongBans"
                :key="pb.maPhongBan"
                :value="pb.maPhongBan"
              >
                {{ pb.tenPhongBan }}
              </option>
            </select>
          </div>
        </div>

        <!-- Chi nhánh -->
        <div class="control">
          <div class="select is-small">
            <select v-model="selectedChiNhanh" @change="onChiNhanhChange">
              <option value="">-- Tất cả Chi nhánh --</option>
              <option
                v-for="cn in chiNhanhs"
                :key="cn.maChiNhanh"
                :value="cn.maChiNhanh"
              >
                {{ cn.tenChiNhanh }}
              </option>
            </select>
          </div>
        </div>

        <!-- Tìm theo tên -->
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

    <!-- Bảng -->
    <div class="box" v-if="filteredDanhSachNv.length > 0">
      <div class="table_wrapper">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead style="font-weight: bold; background-color: aliceblue">
            <tr>
              <th style="width: 3%; text-align: center">STT</th>
              <th style="text-align: center">Họ tên</th>
              <th style="text-align: center">Ngày HĐ</th>
              <th style="text-align: center">Điều kiện</th>
              <th style="text-align: center">Phép</th>
              <th v-for="i in 12" :key="i" style="text-align: center">
                Tháng {{ i }}
              </th>
              <th style="text-align: center">Tổng đã nghỉ</th>
              <th style="text-align: center">Còn lại</th>
              <th style="text-align: center">Xác nhận</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(nv, index) in filteredDanhSachNv" :key="index">
              <td style="text-align: center">{{ index + 1 }}</td>
              <td>{{ nv.hoTen }}</td>
              <td style="text-align: center">{{ nv.ngayHopDongTinhPhep }}</td>
              <td style="text-align: center">
                {{ nv.isNangNhocDocHai ? "ĐH" : "BT" }}
              </td>
              <td style="text-align: center">{{ nv.ngayPhep }}</td>
              <td v-for="i in 12" :key="i">
                <input
                  class="input is-small is-danger"
                  type="number"
                  min="0"
                  v-model.number="nv.thang[i]"
                  @input="capNhatPhep(nv)"
                />
              </td>
              <td style="text-align: center">{{ nv.tongDaNghi }}</td>
              <td style="text-align: center">{{ nv.conLai }}</td>
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

    <div class="columns box" v-else>
      <div class="column is-2"></div>
      <div
        class="column"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: auto;
          text-align: center;
        "
      >
        <article class="message is-success">
          <div class="message-header">
            <p>Hướng dẫn</p>
          </div>
          <div class="message-body">
            <ul
              style="
                text-align: left;
                padding-left: 20px;
                font-weight: 600;
                color: #dc3545;
              "
            >
              <li>
                1: Bạn chọn Phòng ban hoặc Chi nhánh để lấy danh sách nhân sự
                của đơn vị và xem dữ liệu về nghỉ phép
              </li>
              <li>
                2: Năm nghỉ phép được mặc định là năm hiện hành, để chọn năm quá
                khứ hoặc tương lai thì chọn vào năm đó
              </li>
              <li>
                3: Sau khi tìm được đơn vị thì có thể tìm từng tên người trong
                đơn vị đó nếu muốn xem chi tiết người đó
              </li>
            </ul>
          </div>
        </article>
      </div>
      <div class="column is-2"></div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "QuanLyNghiPhep",
  data() {
    return {
      danhSachNv: [],
      selectedNam: "2025",
      selectedPhongBan: "",
      selectedChiNhanh: "",
      searchQuery: "",
      phongBans: [],
      chiNhanhs: [],
      userRole: null,
      createdBy: "",
    };
  },

  computed: {
    user() {
      return this.$store.state.modules.users.user.user;
    },

    filteredDanhSachNv() {
      return this.danhSachNv.filter((nv) => {
        const matchSearch = this.searchQuery
          ? nv.hoTen.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true;
        return matchSearch;
      });
    },
  },

  mounted() {
    const user = this.user;
    if (user) {
      this.userRole = user.role;
      this.createdBy = user.username;
    }
    this.loadDanhSachPhongBanChiNhanh();
  },

  methods: {
    async loadDanhSachPhongBanChiNhanh() {
      try {
        const [pbRes, cnRes] = await Promise.all([
          this.$axios.get("/api/danhmucs/dmphongban/"),
          this.$axios.get("/api/danhmucs/dmchinhanh/"),
        ]);

        // console.log(pbRes.data);

        this.phongBans = pbRes.data;
        this.chiNhanhs = cnRes.data;
      } catch (error) {
        console.error("Lỗi tải danh sách phòng ban/chi nhánh:", error);
      }
    },

    async onChangeNam() {
      await this.taiDanhSachNv();
    },

    async onPhongBanChange() {
      this.selectedChiNhanh = "";
      await this.taiDanhSachNv();
    },

    async onChiNhanhChange() {
      this.selectedPhongBan = "";
      await this.taiDanhSachNv();
    },

    async taiDanhSachNv() {
      try {
        const nam = this.selectedNam;
        const [resNv, resPhep] = await Promise.all([
          this.$axios.get("/api/empl/all-emp"),
          this.$axios.get(`/api/empl/nghiphep-theo-nam?nam=${nam}`),
        ]);

        const filterFn = (nv) => {
          if (this.selectedPhongBan)
            return nv.maPhongBan === this.selectedPhongBan;
          if (this.selectedChiNhanh)
            return nv.maChiNhanh === this.selectedChiNhanh;
          return false;
        };

        this.danhSachNv = resNv.data
          .filter((nv) => nv.ngayHopDongTinhPhep && filterFn(nv))
          .map((nv) => {
            const thang = {};
            for (let i = 1; i <= 12; i++) thang[i] = 0;

            const nghiPhep = resPhep.data.find(
              (np) => np.maNhanVien === nv.maNhanVien
            );
            if (nghiPhep) {
              for (let i = 1; i <= 12; i++) {
                thang[i] = parseInt(nghiPhep[`thang${i}`] || 0);
              }
            }

            const ngayPhep = this.tinhNgayPhep(
              nv.ngayHopDongTinhPhep,
              nv.isNangNhocDocHai
            );
            // console.log(ngayPhep);

            const tongDaNghi = Object.values(thang).reduce((a, b) => a + b, 0);
            const conLai = ngayPhep - tongDaNghi;

            return {
              ...nv,
              thang,
              ngayPhep,
              tongDaNghi,
              conLai,
              namNghiPhep: nam,
              createdBy: this.createdBy,
              createdAt: new Date(),
            };
          });
      } catch (error) {
        console.error("Lỗi tải danh sách nhân viên:", error);
      }
    },

    tinhNgayPhep(ngayBatDau, isNangNhocDocHai) {
      const namHienTai = new Date().getFullYear();
      const [thangStr, namStr] = ngayBatDau.split("/");
      const thang = parseInt(thangStr, 10);
      const nam = parseInt(namStr, 10);
      // console.log("Năm hiện tại:", namHienTai);

      if (nam === namHienTai) return 13 - thang;
      const soNam = namHienTai - nam;
      // console.log("Số năm:", soNam);

      const heSo = Math.floor(soNam / 5);
      // console.log("hệ số:", heSo);

      // console.log("check kiểu:", typeof isNangNhocDocHai);

      return (isNangNhocDocHai ? 14 : 12) + heSo;
    },

    capNhatPhep(nv) {
      nv.tongDaNghi = Object.values(nv.thang).reduce((a, b) => a + b, 0);
      nv.conLai = nv.ngayPhep - nv.tongDaNghi;
    },

    async onSave(nv) {
      const result = await Swal.fire({
        title: "Xác nhận ghi dữ liệu nghỉ phép?",
        showDenyButton: true,
        confirmButtonText: "Xác nhận",
        denyButtonText: `Hủy`,
      });
      if (result.isConfirmed) {
        try {
          const res = await this.$axios.post("/api/empl/add-ngaynghiphep", nv);
          if (res.status == 200) {
            Swal.fire({
              title: "Ghi dữ liệu nghỉ phép thành công!",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Có lỗi xảy ra",
              icon: "error",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
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
