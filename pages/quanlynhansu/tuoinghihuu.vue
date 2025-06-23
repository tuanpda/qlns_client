<template>
  <div style="background-color: #e9ecef; padding: 10px">
    <div class="box">
      <div>
        <span style="color: #ff7f50" class="icon is-small is-left">
          <i class="fab fa-wpforms"></i>
        </span>
        <span style="font-weight: bold; font-size: large"
          >Quản lý Nghỉ hưu</span
        >
      </div>

      <div style="margin-top: 10px; display: flex; justify-content: flex-end">
        <div class="field">
          <div class="field is-grouped">
            <div class="control">
              <input
                class="input is-small"
                type="text"
                v-model="searchQuery"
                placeholder="🔍 Nhập tên nhân viên..."
                style="width: 500px"
              />
            </div>
            <!-- <div class="control">
              <button class="button is-info">Tìm kiếm</button>
            </div> -->
            <!-- <div class="control">
              <button class="button is-success is-small">Thêm mới</button>
            </div> -->
          </div>
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
              <th style="font-size: small; text-align: center; width: 5%">
                Ảnh Hồ sơ
              </th>
              <th style="font-size: small; text-align: center">Họ tên</th>
              <th style="font-size: small; text-align: center">Ngày sinh</th>
              <th style="font-size: small; text-align: center">Giới tính</th>
              <th style="font-size: small; text-align: center">
                Tuổi hiện nay
              </th>
              <th style="font-size: small; text-align: center">
                Tuổi đủ nghỉ hưu
              </th>
              <th style="font-size: small; text-align: center">Tuổi (Tháng)</th>
              <th style="font-size: small; text-align: center">
                Số tháng còn lại
              </th>
              <th style="font-size: small; text-align: center">
                Tháng hưởng hưu
              </th>
              <!-- <th style="font-size: small; text-align: center">
                Ngày tháng nghỉ hưu
              </th> -->
              <th style="font-size: small; text-align: center">Ngày còn lại</th>
              <th style="font-size: small; text-align: center">Thời vụ</th>
              <th style="font-size: small; text-align: center">Độc hại?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedTable" :key="index">
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ index + 1 }}
              </td>
              <td style="text-align: center; vertical-align: middle">
                <img
                  :src="item.anhHoSo"
                  style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-right: 10px;
                  "
                />
              </td>
              <td style="font-size: small; vertical-align: middle">
                {{ item.hoTen }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.ngaySinh }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <template v-if="item.gioiTinh == 1"> Nam </template>
                <template v-else> Nữ </template>
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.tuoiHienNayNam }} {{ item.tuoiHienNayThang }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.tuoiNghiHuu135 }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <span
                  style="
                    font-weight: bold;
                    background-color: #ff7f50;
                    color: white;
                    padding-left: 7px;
                    padding-right: 7px;
                    padding-top: 2px;
                    padding-bottom: 2px;
                  "
                  >{{ item.tongThangTuoi }}</span
                >
              </td>

              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <span
                  v-if="
                    item.thoiDiemNghiHuu === 'undefined/undefined' ||
                    item.thoiDiemNghiHuu === 'NaN'
                  "
                >
                  0
                </span>
                <span
                  v-else
                  :style="{
                    fontWeight: 'bold',
                    backgroundColor:
                      item.thangConLaiNghiHuu < 0 ? '#ffc107' : '#dc3545',
                    color: item.thangConLaiNghiHuu < 0 ? '#000' : '#fff',
                    paddingLeft: '7px',
                    paddingRight: '7px',
                    paddingTop: '2px',
                    paddingBottom: '2px',
                  }"
                >
                  {{ item.thangConLaiNghiHuu }}
                </span>
              </td>

              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                <span
                  v-if="item.thoiDiemNghiHuu !== 'undefined/undefined'"
                  style="
                    font-weight: bold;
                    background-color: #198754;
                    color: white;
                    padding-left: 7px;
                    padding-right: 7px;
                    padding-top: 2px;
                    padding-bottom: 2px;
                  "
                >
                  {{ item.thoiDiemNghiHuu }}
                </span>
                <span
                  v-else
                  style="
                    font-weight: bold;
                    background-color: #ffc107;
                    color: white;
                    padding-left: 7px;
                    padding-right: 7px;
                    padding-top: 2px;
                    padding-bottom: 2px;
                  "
                >
                  Đã quá hạn nghỉ hưu
                </span>
              </td>

              <!-- <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.ngayNghiChinhXac }}
              </td> -->
              <td
                :style="{
                  fontSize: 'small',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  fontWeight: 600,
                  color: item.soNgayConLai < 0 ? 'orange' : '#0d6efd',
                }"
              >
                {{ item.soNgayConLai }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.isThoiVu == 1 ? "HĐ Thời vụ" : "" }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.isNangNhocDocHai == 1 ? "Có" : "Không" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Phân trang -->
      <div class="pagination-container">
        <div class="pagination-input">
          <input
            type="number"
            min="1"
            max="100"
            v-model="itemsPerPage"
            class="input is-small"
            style="width: 100%"
          />
        </div>
        <div class="pagination">
          <button
            class="button is-small is-success"
            @click="changePage(1)"
            :disabled="currentPage === 1"
          >
            Đầu tiên
          </button>
          <button
            class="button is-small is-info"
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            Trước
          </button>
          <button
            class="button is-small"
            v-for="(page, index) in pages"
            :key="index"
            @click="changePage(page)"
            :class="{ active: page === currentPage }"
          >
            {{ page }}
          </button>
          <button
            class="button is-small is-info"
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === pageCount"
          >
            Sau
          </button>
          <button
            class="button is-small is-success"
            @click="changePage(pageCount)"
            :disabled="currentPage === pageCount"
          >
            Cuối
          </button>
        </div>
      </div>
    </div>

    <!-- Biểu tượng loading -->
    <div v-if="isLoading" class="loading-overlay">
      <!-- Biểu tượng loading -->
      <div class="loading-spinner"></div>
      <span>waitting some minute ...</span>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import huuNam from "../../data/huuNam.json";
import huuNu from "../../data/huuNu.json";
import huuNam_Nndh from "../../data/huuNam_Nndh.json";
import huuNu_Nndh from "../../data/huuNu_Nndh.json";
import { now } from "moment";

export default {
  data() {
    return {
      listNhanSu: [],
      dmPhongBan: [],
      dmChiNhanh: [],
      // sort and pagi
      sortDirection: 1,
      sortKey: "ttqt",
      currentPage: 1,
      itemsPerPage: 10,
      searchQuery: "", // 🔍 Thêm biến tìm kiếm

      isActive: false,
      isActive_Edit: false,
      isActive_AddNew: false,
      isLoading: false,

      fileName: "",
      selectedFile: null,
      url: null,

      detailHuman: {},

      formAddNew: {
        hoTen: "",
        soDienThoai: "",
        ngaySinh: "",
        gioiTinh: "",
        viTriCongTac: "",
        thoiGianBatdauTgBhxh: "",
        loaiHd: "",
        thoiHanHd_Batdau: "",
        thoiHanHd_Ketthuc: "",
        ngayBonhiemChucvu: "",
        trinhDoHocVan: "",
        trinhDoChuyenMon: "",
        danToc: "Kinh",
        tonGiao: "Không",
        soCmnd: "",
        ngayCap_cmnd: "",
        noiCap_cmnd: "",
        soCccd: "",
        ngayCap_Cccd: "",
        noiCap_Cccd: "",
        noiKhaiSinh: "",
        diaChiHoKhau: "",
        diaChiHienNay: "",
        createdBy: "",
        createdAt: null,
        ghichu: "",
        maNhanVien: "",
        anhHoSo: "",
        status: 1,
        ischinhanh: 0,
        isphongban: 0,
        maPhongBan: "",
        maChiNhanh: "",
        phongBan: "",
        chiNhanh: "",
        isthoivu: 0,
        fileName: "",
        selectedFile: null,
        url: null,
      },

      isPbCn: 1,

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

    filteredTable() {
      if (!this.searchQuery) return this.listNhanSu; // Nếu không nhập gì, trả về danh sách gốc
      return this.listNhanSu.filter((item) =>
        item.hoTen.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    // filteredTable() {
    //   if (!this.searchQuery) return this.listNhanSu; // Nếu không nhập gì, trả về danh sách gốc
    //   return this.listNhanSu.filter(
    //     (item) =>
    //       item.hoTen.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    //       item.tenChiBo
    //         .toLowerCase()
    //         .includes(this.searchQuery.toLowerCase()) ||
    //       item.trinhDoChuyenMon
    //         .toLowerCase()
    //         .includes(this.searchQuery.toLowerCase())
    //   );
    // },

    sortedTable() {
      return this.filteredTable.sort((a, b) => {
        // 🔄 Sửa từ listNhanSu -> filteredTable
        if (a[this.sortKey] < b[this.sortKey]) return -1 * this.sortDirection;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * this.sortDirection;
        return 0;
      });
    },

    pageCount() {
      return Math.ceil(this.sortedTable.length / this.itemsPerPage);
    },

    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },

    endIndex() {
      return this.startIndex + this.itemsPerPage;
    },

    paginatedTable() {
      return this.sortedTable.slice(this.startIndex, this.endIndex);
    },

    pages() {
      const startPage = Math.max(1, this.currentPage - 2);
      const endPage = Math.min(this.pageCount, this.currentPage + 2);

      let pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (endPage < this.pageCount) {
        pages.push("...");
        pages.push(this.pageCount);
      }

      return pages;
    },
  },

  mounted() {
    // console.log(this.user);

    const user = this.user;
    if (user) {
      this.userRole = user.role;
      this.createdBy = user.username;
      this.formAddNew.createdBy = user.username;
    } else {
      console.warn("User chưa có dữ liệu!");
    }

    this.getNhansu();
    this.getPhongBan();
    this.getChiNhanh();
    this.test();
  },

  methods: {
    sortTable(key) {
      if (key === this.sortKey) {
        this.sortDirection *= -1;
      } else {
        this.sortDirection = 1;
        this.sortKey = key;
      }
    },

    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.pageCount) {
        this.currentPage = pageNumber;
      }
    },

    onFileChange(e) {
      this.fileName = e.target.files[0];
      this.url = URL.createObjectURL(this.fileName);
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
    },

    onFileChange_Addnew(e) {
      this.formAddNew.fileName = e.target.files[0];
      this.formAddNew.url = URL.createObjectURL(this.formAddNew.fileName);
      this.formAddNew.fileName = e.target.files[0].name;
      this.formAddNew.selectedFile = e.target.files[0];
    },

    async getNhansu() {
      const res = await this.$axios.get("/api/empl/all-emp-tinhtuoinghihuu");

      this.listNhanSu = res.data.map((emp) => {
        // Tách ngày, tháng, năm từ chuỗi "dd/mm/yyyy"
        if (!emp.ngaySinh) return emp; // Kiểm tra nếu không có ngày sinh

        const [birthDay, birthMonth, birthYear] = emp.ngaySinh
          .split("/")
          .map(Number);
        const gender = Number(emp.gioiTinh) === 1 ? 1 : 0;
        const isNangNhocDocHai = emp.isNangNhocDocHai;

        // console.log(
        //   `Ngày sinh: ${birthDay}, Tháng sinh: ${
        //     birthMonth - 1
        //   }, Năm sinh: ${birthYear}`
        // );

        // Giới hạn tuổi nghỉ hưu
        const limitNowYearVehuu_Men = 62;
        const limitNowYearVehuu_Women = 60;
        const limitMonthMen = 4,
          limitYearMen = 1966;
        const limitMonthWomen = 5,
          limitYearWomen = 1975;

        // Giới hạn tuổi nghỉ hưu nặng nhọc độc hại
        const limitNowYearVehuu_Men_Nhdh = 57;
        const limitNowYearVehuu_Women_Nndh = 55;
        const limitMonthMen_Nndh = 4,
          limitYearMen_Nndh = 1971;
        const limitMonthWomen_Nndh = 5,
          limitYearWomen_Nndh = 1980;

        // Hàm tính tuổi theo năm & tháng
        function calculateAge(day, month, year) {
          const today = new Date();
          const currentYear = today.getFullYear();
          const currentMonth = today.getMonth() + 1;
          const currentDay = today.getDate();

          let ageYears = currentYear - year;
          let ageMonths = currentMonth - month;

          if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
          }
          if (currentDay < day) {
            ageMonths--;
            if (ageMonths < 0) {
              ageMonths = 11;
              ageYears--;
            }
          }

          return {
            years: ageYears,
            months: ageMonths,
            totalMonths: ageYears * 12 + ageMonths,
          };
        }

        // Tính tuổi hiện tại
        const age = calculateAge(birthDay, birthMonth, birthYear);

        let thangNghihuDunghan, namNghihuuDunghan, tuoiNghiHuu135;

        // Chia ra 2 trường hợp. 1 là người trong nặng nhọc độc hại, 2 là người ở điều kiện bt
        // 1. nếu nặng nhọc độc hại
        // console.log(isNangNhocDocHai);
        if (isNangNhocDocHai == 1) {
          let data = gender === 1 ? huuNam_Nndh : huuNu_Nndh;
          if (gender === 1) {
            if (
              birthYear > limitYearMen_Nndh ||
              (birthYear === limitYearMen_Nndh &&
                birthMonth >= limitMonthMen_Nndh)
            ) {
              namNghihuuDunghan = birthYear + limitNowYearVehuu_Men - 5;
              thangNghihuDunghan = birthMonth + 1;
              // console.log(limitNowYearVehuu_Men_Nhdh);

              tuoiNghiHuu135 = limitNowYearVehuu_Men_Nhdh;
            } else {
              const result = data.find(
                (item) =>
                  item.thang === birthMonth.toString() &&
                  item.namSinh === birthYear.toString()
              );
              if (result) {
                namNghihuuDunghan = result.namHuongHuu;
                thangNghihuDunghan = result.thangHuongHuu;
                tuoiNghiHuu135 = result.tuoiNghiHuu;
              } else {
                namNghihuuDunghan = "2021";
                thangNghihuDunghan = "Trước tháng 5";
                tuoiNghiHuu135 = 55;
              }
            }
          } else {
            if (
              birthYear > limitYearWomen_Nndh ||
              (birthYear === limitYearWomen_Nndh &&
                birthMonth >= limitMonthWomen_Nndh)
            ) {
              namNghihuuDunghan = birthYear + limitNowYearVehuu_Women - 5;
              thangNghihuDunghan = birthMonth + 1;
              tuoiNghiHuu135 = limitNowYearVehuu_Women_Nndh;
            } else {
              const result = data.find(
                (item) =>
                  item.thang === birthMonth.toString() &&
                  item.namSinh === birthYear.toString()
              );
              if (result) {
                namNghihuuDunghan = result.namHuongHuu;
                thangNghihuDunghan = result.thangHuongHuu;
                tuoiNghiHuu135 = result.tuoiNghiHuu;
              } else {
                namNghihuuDunghan = "2021";
                thangNghihuDunghan = "Trước tháng 6";
                tuoiNghiHuu135 = 50;
              }
            }
          }
        } else {
          let data = gender === 1 ? huuNam : huuNu;

          // console.log(typeof gender);

          // Xác định năm & tháng nghỉ hưu
          // Xác định năm và tháng nghỉ hưu
          if (gender === 1) {
            if (
              birthYear > limitYearMen ||
              (birthYear === limitYearMen && birthMonth >= limitMonthMen)
            ) {
              namNghihuuDunghan = birthYear + limitNowYearVehuu_Men;
              thangNghihuDunghan = birthMonth + 1;
              tuoiNghiHuu135 = limitNowYearVehuu_Men;
            } else {
              const result = data.find(
                (item) =>
                  item.thang === birthMonth.toString() &&
                  item.namSinh === birthYear.toString()
              );
              if (result) {
                namNghihuuDunghan = result.namHuongHuu;
                thangNghihuDunghan = result.thangHuongHuu;
                tuoiNghiHuu135 = result.tuoiNghiHuu;
              }
            }
          } else {
            if (
              birthYear > limitYearWomen ||
              (birthYear === limitYearWomen && birthMonth >= limitMonthWomen)
            ) {
              namNghihuuDunghan = birthYear + limitNowYearVehuu_Women;
              thangNghihuDunghan = birthMonth + 1;
              tuoiNghiHuu135 = limitNowYearVehuu_Women;
            } else {
              const result = data.find(
                (item) =>
                  item.thang === birthMonth.toString() &&
                  item.namSinh === birthYear.toString()
              );
              if (result) {
                namNghihuuDunghan = result.namHuongHuu;
                thangNghihuDunghan = result.thangHuongHuu;
                tuoiNghiHuu135 = result.tuoiNghiHuu;
              }
            }
          }
        }

        // **Xử lý tháng vượt quá 12**
        if (thangNghihuDunghan > 12) {
          thangNghihuDunghan -= 12;
          namNghihuuDunghan += 1;
        }

        // console.log(`Năm nghỉ hưu: ${namNghihuuDunghan}`);
        // console.log(`Tháng nghỉ hưu: ${thangNghihuDunghan}`);
        // console.log(tuoiNghiHuu135);

        // Tính số tháng còn lại đến khi nghỉ hưu (tính chính xác hơn theo ngày)
        function calculateMonthsUntilRetirement(year, month) {
          const today = new Date();
          const retirementDate = new Date(year, month - 1, 1); // Date: month là 0-based

          const diffInMonths =
            (retirementDate.getFullYear() - today.getFullYear()) * 12 +
            (retirementDate.getMonth() - today.getMonth());

          // Nếu hôm nay đã qua ngày 1 thì chưa đủ 1 tháng nữa → trừ đi 1
          if (today.getDate() > 1) {
            return diffInMonths - 1;
          }

          return diffInMonths;
        }

        const remainingMonths = calculateMonthsUntilRetirement(
          namNghihuuDunghan,
          thangNghihuDunghan
        );

        // console.log(
        //   `Số tháng còn lại đến khi nghỉ hưu: ${remainingMonths} tháng`
        // );

        // **Tính số tháng đến tuổi nghỉ hưu**
        const retirementAgeMonths =
          gender === 1
            ? limitNowYearVehuu_Men * 12
            : limitNowYearVehuu_Women * 12;
        const thangConLaiNghiHuu = retirementAgeMonths - age.totalMonths;

        // Lấy ngày hiện tại
        const todayNow = new Date();
        // const futureDate = new Date(todayNow);
        // Tạo mốc thời điểm đến tháng hưởng hưu (ví dụ: mốc 01/tháng/năm)
        const futureDate = new Date(
          namNghihuuDunghan,
          thangNghihuDunghan - 1,
          1
        );

        // Cộng số tháng còn lại vào ngày hiện tại
        // futureDate.setMonth(futureDate.getMonth() + thangConLaiNghiHuu);

        // Lấy ngày, tháng, năm nghỉ hưu
        const ngayNghiHuu = futureDate.getDate();
        const thangNghiHuu = futureDate.getMonth() + 1; // Vì getMonth() trả về từ 0-11
        const namNghiHuu = futureDate.getFullYear();

        // tính số ngày còn lại

        // Tính số ngày còn lại đến ngày nghỉ hưu
        const timeDiff = futureDate.getTime() - todayNow.getTime();
        let soNgayConLai = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        // Xử lý nếu soNgayConLai là NaN
        if (isNaN(soNgayConLai)) {
          soNgayConLai = 0;
        }

        // console.log(
        //   `Ngày nghỉ hưu chính xác: ${ngayNghiHuu}/${thangNghiHuu}/${namNghiHuu}`
        // );

        // console.log(
        //   `Số tháng còn lại để đạt tuổi nghỉ hưu: ${thangConLaiNghiHuu} tháng`
        // );

        const startDate = new Date(birthYear, birthMonth - 1, birthDay);
        const totalDays = Math.ceil(
          (futureDate - startDate) / (1000 * 60 * 60 * 24)
        );

        // Trả về dữ liệu nhân sự có thêm thông tin
        return {
          ...emp,
          namNghiHuu: namNghihuuDunghan,
          thangNghiHuu: thangNghihuDunghan,
          thoiDiemNghiHuu: `${thangNghihuDunghan}/${namNghihuuDunghan}`,
          tuoiHienNayNam: `${age.years} năm`,
          tuoiHienNayThang: `${age.months} tháng`,
          tongThangTuoi: age.totalMonths,
          thangConLaiNghiHuu: remainingMonths,
          ngayNghiChinhXac: `${ngayNghiHuu}/${thangNghiHuu}/${namNghiHuu}`,
          soNgayConLai: soNgayConLai,
          tuoiNghiHuu135: tuoiNghiHuu135,
        };
      });

      // console.log(this.listNhanSu);
    },

    async getPhongBan() {
      const res = await this.$axios.get("/api/danhmucs/dmphongban");
      //   console.log(data);
      this.dmPhongBan = res.data;
    },

    async getChiNhanh() {
      const res = await this.$axios.get("/api/danhmucs/dmchinhanh");
      //   console.log(data);
      this.dmChiNhanh = res.data;
    },

    async test() {
      const res = await this.$axios.get("/api/empl/all-emp-tinhtuoinghihuu");

      let birthDay = 11;
      let birthMonth = 5;
      let birthYear = 1965;
      let gender = 1;
      let isNangNhocDocHai = 1;

      // console.log(
      //   `Ngày sinh: ${birthDay}, Tháng sinh: ${
      //     birthMonth - 1
      //   }, Năm sinh: ${birthYear}`
      // );

      // Giới hạn tuổi nghỉ hưu
      const limitNowYearVehuu_Men = 62;
      const limitNowYearVehuu_Women = 60;
      const limitMonthMen = 4,
        limitYearMen = 1966;
      const limitMonthWomen = 5,
        limitYearWomen = 1975;

      // Giới hạn tuổi nghỉ hưu nặng nhọc độc hại
      const limitNowYearVehuu_Men_Nhdh = 57;
      const limitNowYearVehuu_Women_Nndh = 55;
      const limitMonthMen_Nndh = 4,
        limitYearMen_Nndh = 1971;
      const limitMonthWomen_Nndh = 5,
        limitYearWomen_Nndh = 1980;

      // Hàm tính tuổi theo năm & tháng
      function calculateAge(day, month, year) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();

        let ageYears = currentYear - year;
        let ageMonths = currentMonth - month;

        if (ageMonths < 0) {
          ageYears--;
          ageMonths += 12;
        }
        if (currentDay < day) {
          ageMonths--;
          if (ageMonths < 0) {
            ageMonths = 11;
            ageYears--;
          }
        }

        return {
          years: ageYears,
          months: ageMonths,
          totalMonths: ageYears * 12 + ageMonths,
        };
      }

      // Tính tuổi hiện tại
      const age = calculateAge(birthDay, birthMonth, birthYear);

      console.log(age);

      let thangNghihuDunghan, namNghihuuDunghan, tuoiNghiHuu135;

      // Chia ra 2 trường hợp. 1 là người trong nặng nhọc độc hại, 2 là người ở điều kiện bt
      // 1. nếu nặng nhọc độc hại
      // console.log(isNangNhocDocHai);
      if (isNangNhocDocHai == 1) {
        let data = gender === 1 ? huuNam_Nndh : huuNu_Nndh;
        if (gender === 1) {
          if (
            birthYear > limitYearMen_Nndh || // 1965 < 1966
            (birthYear === limitYearMen_Nndh &&
              birthMonth >= limitMonthMen_Nndh)
          ) {
            namNghihuuDunghan = birthYear + limitNowYearVehuu_Men - 5;
            thangNghihuDunghan = birthMonth + 1;
            console.log(namNghihuuDunghan);
            console.log(thangNghihuDunghan);
            tuoiNghiHuu135 = limitNowYearVehuu_Men_Nhdh;
            console.log(tuoiNghiHuu135);
          } else {
            const result = data.find(
              (item) =>
                item.thang === birthMonth.toString() &&
                item.namSinh === birthYear.toString()
            );
            if (result) {
              namNghihuuDunghan = result.namHuongHuu;
              thangNghihuDunghan = result.thangHuongHuu;
              tuoiNghiHuu135 = result.tuoiNghiHuu;
              console.log(namNghihuuDunghan);
              console.log(thangNghihuDunghan);
              console.log(tuoiNghiHuu135);
            } else {
              namNghihuuDunghan = birthYear + limitNowYearVehuu_Men - 5;
              thangNghihuDunghan = birthMonth + 1;
              console.log(namNghihuuDunghan);
              console.log(thangNghihuDunghan);
              tuoiNghiHuu135 = limitNowYearVehuu_Men_Nhdh;
              console.log(tuoiNghiHuu135);
            }
          }
        } else {
          if (
            birthYear > limitYearWomen_Nndh ||
            (birthYear === limitYearWomen_Nndh &&
              birthMonth >= limitMonthWomen_Nndh)
          ) {
            namNghihuuDunghan = birthYear + limitNowYearVehuu_Women - 5;
            thangNghihuDunghan = birthMonth + 1;
            tuoiNghiHuu135 = limitNowYearVehuu_Women_Nndh;
            console.log(namNghihuuDunghan);
            console.log(thangNghihuDunghan);
            console.log(tuoiNghiHuu135);
          } else {
            const result = data.find(
              (item) =>
                item.thang === birthMonth.toString() &&
                item.namSinh === birthYear.toString()
            );
            if (result) {
              namNghihuuDunghan = result.namHuongHuu;
              thangNghihuDunghan = result.thangHuongHuu;
              tuoiNghiHuu135 = result.tuoiNghiHuu;
              console.log(namNghihuuDunghan);
              console.log(thangNghihuDunghan);
              console.log(tuoiNghiHuu135);
            }
          }
        }
      } else {
        let data = gender === 1 ? huuNam : huuNu;

        // console.log(typeof gender);

        // Xác định năm & tháng nghỉ hưu
        // Xác định năm và tháng nghỉ hưu
        if (gender === 1) {
          if (
            birthYear > limitYearMen ||
            (birthYear === limitYearMen && birthMonth >= limitMonthMen)
          ) {
            namNghihuuDunghan = birthYear + limitNowYearVehuu_Men;
            thangNghihuDunghan = birthMonth + 1;
            tuoiNghiHuu135 = limitNowYearVehuu_Men;
          } else {
            const result = data.find(
              (item) =>
                item.thang === birthMonth.toString() &&
                item.namSinh === birthYear.toString()
            );
            if (result) {
              namNghihuuDunghan = result.namHuongHuu;
              thangNghihuDunghan = result.thangHuongHuu;
              tuoiNghiHuu135 = result.tuoiNghiHuu;
            }
          }
        } else {
          if (
            birthYear > limitYearWomen ||
            (birthYear === limitYearWomen && birthMonth >= limitMonthWomen)
          ) {
            namNghihuuDunghan = birthYear + limitNowYearVehuu_Women;
            thangNghihuDunghan = birthMonth + 1;
            tuoiNghiHuu135 = limitNowYearVehuu_Women;
          } else {
            const result = data.find(
              (item) =>
                item.thang === birthMonth.toString() &&
                item.namSinh === birthYear.toString()
            );
            if (result) {
              namNghihuuDunghan = result.namHuongHuu;
              thangNghihuDunghan = result.thangHuongHuu;
              tuoiNghiHuu135 = result.tuoiNghiHuu;
            }
          }
        }
      }

      // **Xử lý tháng vượt quá 12**
      if (thangNghihuDunghan > 12) {
        thangNghihuDunghan -= 12;
        namNghihuuDunghan += 1;
      }

      // console.log(`Năm nghỉ hưu: ${namNghihuuDunghan}`);
      // console.log(`Tháng nghỉ hưu: ${thangNghihuDunghan}`);
      // console.log(tuoiNghiHuu135);

      // Tính số tháng còn lại đến khi nghỉ hưu (tính chính xác hơn theo ngày)
      function calculateMonthsUntilRetirement(year, month) {
        const today = new Date();
        const retirementDate = new Date(year, month - 1, 1); // Date: month là 0-based

        const diffInMonths =
          (retirementDate.getFullYear() - today.getFullYear()) * 12 +
          (retirementDate.getMonth() - today.getMonth());

        // Nếu hôm nay đã qua ngày 1 thì chưa đủ 1 tháng nữa → trừ đi 1
        if (today.getDate() > 1) {
          return diffInMonths - 1;
        }

        return diffInMonths;
      }

      const remainingMonths = calculateMonthsUntilRetirement(
        namNghihuuDunghan,
        thangNghihuDunghan
      );

      console.log(
        `Số tháng còn lại đến khi nghỉ hưu: ${remainingMonths} tháng`
      );

      // **Tính số tháng đến tuổi nghỉ hưu**
      const retirementAgeMonths =
        gender === 1
          ? limitNowYearVehuu_Men * 12
          : limitNowYearVehuu_Women * 12;
      const thangConLaiNghiHuu = retirementAgeMonths - age.totalMonths;

      // Lấy ngày hiện tại
      const todayNow = new Date();
      // const futureDate = new Date(todayNow);
      // Tạo mốc thời điểm đến tháng hưởng hưu (ví dụ: mốc 01/tháng/năm)
      const futureDate = new Date(namNghihuuDunghan, thangNghihuDunghan - 1, 1);

      // Cộng số tháng còn lại vào ngày hiện tại
      // futureDate.setMonth(futureDate.getMonth() + thangConLaiNghiHuu);

      // Lấy ngày, tháng, năm nghỉ hưu
      const ngayNghiHuu = futureDate.getDate();
      const thangNghiHuu = futureDate.getMonth() + 1; // Vì getMonth() trả về từ 0-11
      const namNghiHuu = futureDate.getFullYear();

      // tính số ngày còn lại

      // Tính số ngày còn lại đến ngày nghỉ hưu
      const timeDiff = futureDate.getTime() - todayNow.getTime();
      let soNgayConLai = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      // Xử lý nếu soNgayConLai là NaN
      if (isNaN(soNgayConLai)) {
        soNgayConLai = 0;
      }

      // console.log(
      //   `Ngày nghỉ hưu chính xác: ${ngayNghiHuu}/${thangNghiHuu}/${namNghiHuu}`
      // );

      // console.log(
      //   `Số tháng còn lại để đạt tuổi nghỉ hưu: ${thangConLaiNghiHuu} tháng`
      // );

      const startDate = new Date(birthYear, birthMonth - 1, birthDay);
      const totalDays = Math.ceil(
        (futureDate - startDate) / (1000 * 60 * 60 * 24)
      );
    },
  },
};
</script>

<style lang="css">
@import "@/assets/customCss/common.css";

@import "@/assets/customCss/footerTable.css";

.modal-card-detail {
  width: 950px;
  height: 700px;
}

.modal-card-edit {
  width: 950px;
  height: 700px;
}

.modal-card-addnew {
  width: 950px;
  height: 700px;
}
</style>
