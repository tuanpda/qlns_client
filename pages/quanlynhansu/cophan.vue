<template>
  <div style="background-color: #e9ecef; padding: 10px">
    <div class="box">
      <div>
        <span style="color: #ff7f50" class="icon is-small is-left">
          <i class="far fa-money-bill-alt"></i>
        </span>
        <span style="font-weight: bold; font-size: large"
          >Danh sách Cổ đông công ty</span
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
              />
            </div>
            <!-- <div class="control">
              <button class="button is-info">Tìm kiếm</button>
            </div> -->
            <div class="control">
              <button @click="addNewHuman" class="button is-success is-small">
                Thêm mới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <p style="padding: 5px; font-size: 15px">
        Tổng số cổ đông: <strong>{{ countCodong.tongSoCodong }}</strong
        ><br />
        Tổng cổ phần:
        <strong>{{ countCodong.tongCoPhan.toLocaleString() }}</strong>
      </p>
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
              <th style="font-size: small; text-align: center">Đơn vị</th>
              <th style="font-size: small; text-align: center">
                Căn cước công dân
              </th>
              <th style="font-size: small; text-align: center">Địa chỉ</th>
              <th style="font-size: small; text-align: center">
                Số cổ phần tự do
              </th>
              <th style="font-size: small; text-align: center">
                Cổ phần hạn chế
              </th>
              <th style="font-size: small; text-align: center">Tổng</th>
              <th style="font-size: small; text-align: center">Ghi chu</th>
              <th></th>
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
                {{ item.tenPhong }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.soCccd }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.diaChi }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.cophantudo | formatNumber }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.cophanhanche | formatNumber }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.tong | formatNumber }}
              </td>
              <td
                style="
                  font-size: small;
                  text-align: center;
                  vertical-align: middle;
                "
              >
                {{ item.ghichu }}
              </td>
              <td style="text-align: center; vertical-align: middle">
                <a
                  @click="
                    userRole == 1 || userRole == 2 ? editHuman(item) : null
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

    <!-- modal view detail human -->
    <div class="">
      <div :class="{ 'is-active': isActive }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-detail box">
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
                  <i class="far fa-user-circle"></i>
                </span>
                <span style="font-weight: bold">Hồ sơ chi tiết</span>
              </div>
              <div>
                <button
                  @click="isActive = false"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>
            </div>

            <hr class="navbar-divider" />

            <div class="columns">
              <div class="column is-3">
                <img
                  :src="detailHuman.anhHoSo"
                  style="
                    width: 180px;
                    height: 210px;
                    object-fit: cover;
                    padding: 10px;
                    border: 2px solid #a3cfbb;
                    border-radius: 8px; /* Bo tròn nhẹ */
                    background-color: #f8f9fa; /* Màu nền nhẹ để tôn ảnh */
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Đổ bóng nhẹ */
                  "
                />
              </div>
              <div class="column">
                <div class="column">
                  <div
                    class="box"
                    style="background-color: #f8f9fa; border-radius: 8px"
                  >
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                    >
                      <h3
                        class="title is-5"
                        style="
                          margin: 0;
                          border-bottom: 2px solid #f1aeb5;
                          padding-bottom: 5px;
                          flex-grow: 1;
                        "
                      >
                        <span style="font-weight: bold; color: #dc3545">{{
                          detailHuman.hoTen
                        }}</span>
                      </h3>
                      <template v-if="detailHuman.status == 1">
                        <span
                          style="
                            color: white;
                            background-color: #28a745;
                            padding: 3px 10px;
                            border-radius: 5px;
                            font-size: 14px;
                            font-weight: bold;
                            white-space: nowrap;
                            margin-left: 10px;
                          "
                        >
                          ONLINE
                        </span>
                      </template>
                      <template v-else>
                        <span
                          style="
                            color: white;
                            background-color: #f1aeb5;
                            padding: 3px 10px;
                            border-radius: 5px;
                            font-size: 14px;
                            font-weight: bold;
                            white-space: nowrap;
                            margin-left: 10px;
                          "
                        >
                          OFFLINE
                        </span>
                      </template>
                    </div>

                    <div class="columns" style="margin-top: 10px">
                      <div class="column">
                        <p>
                          <strong>📌 Mã nhân viên:</strong>
                          <span style="font-weight: bold; color: #198754">{{
                            detailHuman.maNhanVien
                          }}</span>
                        </p>
                        <p>
                          <strong>🎂 Ngày sinh:</strong>
                          <span style="font-weight: bold; color: #198754">{{
                            detailHuman.ngaySinh
                          }}</span>
                        </p>
                      </div>
                      <div class="column is-6">
                        <p>
                          <strong>📞 Số điện thoại:</strong>
                          <span style="font-weight: bold; color: #198754">{{
                            detailHuman.soDienThoai
                          }}</span>
                        </p>
                        <p>
                          <strong>🚻 Giới tính:</strong>
                          <span style="font-weight: bold; color: #198754">{{
                            detailHuman.gioiTinh == 1 ? "Nam" : "Nữ"
                          }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column">
                        <p>
                          <i
                            class="fas fa-user-tie"
                            style="color: #6610f2; margin-right: 5px"
                          ></i>
                          <strong>Vị trí công tác:</strong>
                          <span style="font-weight: bold; color: #dc3545">
                            {{ detailHuman.viTriCongTac || "Không có" }}
                          </span>
                        </p>

                        <p>
                          <i
                            class="fas fa-hotel"
                            style="color: #6610f2; margin-right: 5px"
                          ></i>
                          <strong>Đơn vị công tác:</strong>
                          <template v-if="detailHuman.isphongban == 1">
                            <span style="font-weight: bold; color: #dc3545">
                              {{ detailHuman.phongBan || "Không có" }}
                            </span>
                          </template>
                          <template v-else>
                            <span style="font-weight: bold; color: #dc3545">
                              {{ detailHuman.chiNhanh || "Không có" }}
                            </span>
                          </template>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr class="navbar-divider" />

            <div class="columns">
              <!-- Cột thông tin mở rộng -->
              <div class="column">
                <p>
                  <i
                    class="fas fa-calendar-alt"
                    style="color: #fd7e14; margin-right: 5px"
                  ></i>
                  <strong>Thời gian bắt đầu tham gia đóng BHXH:</strong>
                  <span style="font-weight: bold; color: #0d6efd">
                    {{ detailHuman.thoiGianBatdauTgBhxh || "Không có" }}
                  </span>
                </p>

                <p>
                  <i
                    class="fas fa-file-contract"
                    style="color: #fd7e14; margin-right: 5px"
                  ></i>
                  <strong>Loại hợp đồng:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.loaiHd || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="far fa-hourglass"
                    style="color: #fd7e14; margin-right: 5px"
                  ></i>
                  <strong>Thời hạn bắt đầu hợp đồng:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.thoiHanHd_Batdau || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="fas fa-flag-checkered"
                    style="color: #fd7e14; margin-right: 5px"
                  ></i>
                  <strong>Thời hạn kết thúc hợp đồng:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.thoiHanHd_Ketthuc || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="fas fa-user-tie"
                    style="color: #fd7e14; margin-right: 5px"
                  ></i>
                  <strong>Ngày bổ nhiệm chức vụ:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.ngayBonhiemChucvu || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="fas fa-graduation-cap"
                    style="color: #fd7e14; margin-right: 5px"
                  ></i>
                  <strong>Trình độ học vấn:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.trinhDoHocVan || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="fab fa-leanpub"
                    style="color: #fd7e14; margin-right: 5px"
                  ></i>
                  <strong>Trình độ chuyên môn:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.trinhDoChuyenMon || "Không có"
                  }}</span>
                </p>
              </div>
            </div>

            <hr class="navbar-divider" />

            <div class="columns">
              <!-- Cột thông tin mở rộng -->
              <div class="column">
                <p>
                  <i
                    class="fas fa-users"
                    style="color: #dc3545; margin-right: 5px"
                  ></i>
                  <strong>Dân tộc:</strong>
                  <span style="font-weight: bold; color: #0d6efd">
                    {{ detailHuman.danToc || "Không có" }}
                  </span>
                </p>

                <p>
                  <i
                    class="fas fa-church"
                    style="color: #dc3545; margin-right: 5px"
                  ></i>
                  <strong>Tôn giáo:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.tonGiao || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="fas fa-id-card-alt"
                    style="color: #dc3545; margin-right: 5px"
                  ></i>
                  <strong>Số Chứng minh nhân dân:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.soCmnd || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="far fa-calendar"
                    style="color: #dc3545; margin-right: 5px"
                  ></i>
                  <strong>Ngày cấp CMND:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.ngayCap_cmnd || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="fas fa-globe-europe"
                    style="color: #dc3545; margin-right: 5px"
                  ></i>
                  <strong>Nơi cấp CMND:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.noiCap_cmnd || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="far fa-id-card"
                    style="color: #dc3545; margin-right: 5px"
                  ></i>
                  <strong>Số Căn cước công dân:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.soCccd || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="far fa-calendar-alt"
                    style="color: #dc3545; margin-right: 5px"
                  ></i>
                  <strong>Ngày cấp CCCD:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.ngayCap_Cccd || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="fas fa-globe-americas"
                    style="color: #dc3545; margin-right: 5px"
                  ></i>
                  <strong>Nơi cấp CCCD:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.noiCap_Cccd || "Không có"
                  }}</span>
                </p>
              </div>
            </div>

            <hr class="navbar-divider" />

            <div class="columns">
              <!-- Cột thông tin mở rộng -->
              <div class="column">
                <p>
                  <i
                    class="far fa-bookmark"
                    style="color: #198754; margin-right: 5px"
                  ></i>
                  <strong>Nơi khai sinh:</strong>
                  <span style="font-weight: bold; color: #0d6efd">
                    {{ detailHuman.noiKhaiSinh || "Không có" }}
                  </span>
                </p>

                <p>
                  <i
                    class="fas fa-map"
                    style="color: #198754; margin-right: 5px"
                  ></i>
                  <strong>Địa chỉ hộ khẩu:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.diaChiHoKhau || "Không có"
                  }}</span>
                </p>

                <p>
                  <i
                    class="fas fa-home"
                    style="color: #198754; margin-right: 5px"
                  ></i>
                  <strong>Địa chỉ thường trú:</strong>
                  <span style="font-weight: bold; color: #0d6efd">{{
                    detailHuman.diaChiHienNay || "Không có"
                  }}</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- modal editer human -->
    <div class="">
      <div :class="{ 'is-active': isActive_Edit }" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content modal-card-edit box">
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
                <span style="font-weight: bold">Hiệu chỉnh hồ sơ dữ liệu</span>
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

            <div v-if="detailHuman" style="margin-top: 10px">
              <div class="field">
                <label class="label is-small">Họ tên</label>
                <div class="control">
                  <input
                    v-model="detailHuman.hoTen"
                    ref="nameInput"
                    class="input is-small"
                    type="text"
                  />
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column is-4">
                  <label class="label is-small">Đang làm - Thôi việc?</label>
                  <div class="field">
                    <label class="switch" style="vertical-align: middle">
                      <input v-model="detailHuman.status" type="checkbox" />
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Dân tộc</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.danToc"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Dân tộc</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.tonGiao"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Số điện thoại</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.soDienThoai"
                        class="input is-small"
                        type="number"
                        maxlength="12"
                        minlength="12"
                        ref="phoneInput"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Ngày sinh</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.ngaySinh"
                        class="input is-small"
                        type="text"
                        ref="ngaysinhInput"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Giới tính</label>
                    <div class="control">
                      <div class="select is-small is-fullwidth">
                        <select v-model="detailHuman.gioiTinh">
                          <option value="" disabled>Chọn giới tính</option>
                          <option value="1">Nam</option>
                          <option value="0">Nữ</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column is-5">
                  <div class="field">
                    <label class="label is-small">Vị trí công tác</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.viTriCongTac"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="column">
                  <template v-if="detailHuman.isphongban == 1">
                    <div class="field">
                      <label class="label is-small">Phòng ban</label>
                      <div class="control">
                        <input
                          v-model="detailHuman.phongBan"
                          class="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="field">
                      <label class="label is-small">Chi nhánh</label>
                      <div class="control">
                        <input
                          v-model="detailHuman.chiNhanh"
                          class="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column is-3">
                  <div class="field">
                    <label class="label is-small" style="color: #dc3545"
                      >Đổi Phòng ban / Chi nhánh ?</label
                    >
                    <div class="control">
                      <div class="select is-fullwidth is-small">
                        <select @change="pbcnChange($event)">
                          <option value="1">Phòng ban</option>
                          <option value="0">Chi nhánh</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <template v-if="isPbCn == 1">
                    <div class="field">
                      <label class="label is-small" style="color: #dc3545"
                        >Chọn Phòng ban khác</label
                      >
                      <div class="control">
                        <div class="select is-fullwidth is-small">
                          <select
                            @change="phongBanChange_Edit"
                            v-model="detailHuman.maPhong"
                          >
                            <option
                              v-for="pb in dmPhongBan"
                              :key="pb.maPhongBan"
                              :value="pb.maPhongBan"
                            >
                              {{ pb.tenPhongBan }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="field">
                      <label class="label is-small" style="color: #dc3545"
                        >Chọn Chi nhánh khác</label
                      >
                      <div class="control">
                        <div class="select is-fullwidth is-small">
                          <select
                            @change="chiNhanhChange_Edit"
                            v-model="detailHuman.maChiNhanh"
                          >
                            <option
                              v-for="pb in dmChiNhanh"
                              :key="pb.maChiNhanh"
                              :value="pb.maChiNhanh"
                            >
                              {{ pb.tenChiNhanh }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column is-3">
                  <div class="field">
                    <label class="label is-small"
                      >Thời gian bắt đầu TG BHXH</label
                    >
                    <div class="control">
                      <input
                        v-model="detailHuman.thoiGianBatdauTgBhxh"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-3">
                  <div class="field">
                    <label class="label is-small">Loại hợp đồng</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.loaiHd"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-3">
                  <div class="field">
                    <label class="label is-small">Thời hạn bắt đầu</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.thoiHanHd_Batdau"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-3">
                  <div class="field">
                    <label class="label is-small">Thời hạn kết thúc</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.thoiHanHd_Ketthuc"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Ngày bổ nhiệm</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.ngayBonhiemChucvu"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Trình độ học vấn</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.trinhDoHocVan"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Trình độ chuyên môn</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.trinhDoChuyenMon"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Số Chứng minh nhân dân</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.soCmnd"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Ngày cấp</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.ngayCap_cmnd"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Nơi cấp</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.noiCap_cmnd"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Số Căn cước công dân</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.soCccd"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Ngày cấp</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.ngayCap_Cccd"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column is-4">
                  <div class="field">
                    <label class="label is-small">Nơi cấp</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.noiCap_Cccd"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="field">
                <label class="label is-small">Nơi khai sinh</label>
                <div class="control">
                  <input
                    v-model="detailHuman.noiKhaiSinh"
                    class="input is-small"
                    type="text"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label is-small">Địa chỉ hộ khẩu</label>
                <div class="control">
                  <input
                    v-model="detailHuman.diaChiHoKhau"
                    class="input is-small"
                    type="text"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label is-small">Địa chỉ thường trú</label>
                <div class="control">
                  <input
                    v-model="detailHuman.diaChiHienNay"
                    class="input is-small"
                    type="text"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label is-small">Ghi chú</label>
                <div class="control">
                  <input
                    v-model="detailHuman.ghichu"
                    class="input is-small"
                    type="email"
                    placeholder="Ghi chú thêm"
                  />
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <div class="field">
                    <div v-if="detailHuman.anhHoSo" class="column">
                      <div id="preview">
                        <img :src="detailHuman.anhHoSo" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <div v-if="url" class="column">
                      <div id="preview">
                        <img :src="url" />
                      </div>
                      <span style="color: red" class="icon is-small is-left">
                        <i @click="remove" class="far fa-trash-alt"
                          ><a>Xóa ảnh</a></i
                        >
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div class="field is-grouped-function">
                <div class="control">
                  <button
                    @click="onSaveEdit()"
                    class="button is-success is-small"
                  >
                    Ghi dữ liệu
                  </button>
                </div>
                &nbsp;
                <div class="control">
                  <button
                    @click="isActive_Edit = false"
                    class="button is-danger is-small"
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
                <span style="font-weight: bold">Hiệu chỉnh hồ sơ</span>
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

            <div style="margin-top: 10px">
              <div class="columns is-multiline">
                <div class="column">
                  <div class="field">
                    <label class="label is-small">Họ tên</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.hoTen"
                        ref="nameInput"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label is-small">Số căn cước công dân</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.soCccd"
                        class="input is-small"
                        type="number"
                        maxlength="12"
                        minlength="12"
                        ref="phoneInput"
                      />
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label is-small">Ngày cấp</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.ngayCap"
                        class="input is-small"
                        type="text"
                        ref="ngaysinhInput"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column">
                  <div class="field">
                    <label class="label is-small">Địa chỉ</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.diaChi"
                        class="input is-small"
                        type="text"
                        ref="ngaysinhInput"
                      />
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label is-small">Ghi chú</label>
                    <div class="control">
                      <input
                        v-model="detailHuman.ghichu"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column">
                  <div class="field">
                    <label class="label is-small"
                      >Phòng ban / Chi nhánh ?</label
                    >
                    <div class="control">
                      <div class="select is-fullwidth is-small">
                        <select @change="pbcnChange($event)">
                          <option value="1">Phòng ban</option>
                          <option value="0">Chi nhánh</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <template v-if="isPbCn == 1">
                    <div class="field">
                      <label class="label is-small">Chọn Phòng ban</label>
                      <div class="control">
                        <div class="select is-fullwidth is-small">
                          <select v-model="detailHuman.donVi">
                            <option
                              v-for="pb in dmPhongBan"
                              :key="pb.maPhongBan"
                              :value="pb.tenPhongBan"
                            >
                              {{ pb.tenPhongBan }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="field">
                      <label class="label is-small">Chọn Chi nhánh</label>
                      <div class="control">
                        <div class="select is-fullwidth is-small">
                          <select v-model="detailHuman.donVi">
                            <option
                              v-for="cn in dmChiNhanh"
                              :key="cn.maChiNhanh"
                              :value="cn.tenChiNhanh"
                            >
                              {{ cn.tenChiNhanh }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column">
                  <label class="label is-small">Cổ phần tự do</label>
                  <input
                    v-model="detailHuman.cophantudo"
                    class="input is-small"
                    type="number"
                  />
                </div>
                <div class="column">
                  <label class="label is-small">Cổ phần hạn chế</label>
                  <input
                    v-model="detailHuman.cophanhanche"
                    class="input is-small"
                    type="number"
                  />
                </div>
                <div class="column">
                  <label class="label is-small">Tổng</label>
                  <input
                    v-model="detailHuman.tong"
                    class="input is-small"
                    type="number"
                    disabled
                  />
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column">
                  <label class="label is-small">Tên loại cổ phần</label>
                  <div class="control">
                    <div class="select is-small is-fullwidth">
                      <select
                        @change="changeLoaiCoPhan"
                        v-model="detailHuman.tenloaicp"
                      >
                        <option value="" disabled>Chọn loại cổ phần</option>
                        <option value="Đang làm việc">Đang làm việc</option>
                        <option value="Cổ đông là đơn vị">
                          Cổ đông là đơn vị
                        </option>
                        <option value="Đã nghỉ việc">Đã nghỉ việc</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <label class="label is-small">Loại cổ phần</label>
                  <input
                    v-model="detailHuman.loaicp"
                    class="input is-small"
                    type="text"
                  />
                </div>
              </div>

              <hr />

              <div class="field is-grouped-function">
                <div class="control">
                  <button
                    @click="onSaveEdit"
                    class="button is-success is-small"
                  >
                    Ghi dữ liệu
                  </button>
                </div>
                &nbsp;
                <div class="control">
                  <button
                    @click="isActive_Edit = false"
                    class="button is-danger is-small"
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

    <!-- modal add new human -->
    <div class="">
      <div :class="{ 'is-active': isActive_AddNew }" class="modal">
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
                <span style="font-weight: bold">Thêm mới cổ đông</span>
              </div>
              <div>
                <button
                  @click="isActive_AddNew = false"
                  class="button is-small is-info"
                >
                  Thoát
                </button>
              </div>
            </div>

            <hr class="navbar-divider" />

            <div style="margin-top: 10px">
              <div class="columns is-multiline">
                <div class="column">
                  <div class="field">
                    <label class="label is-small">Họ tên</label>
                    <div class="control">
                      <input
                        v-model="formAddNew.hoTen"
                        ref="nameInput"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label is-small">Số căn cước công dân</label>
                    <div class="control">
                      <input
                        v-model="formAddNew.soCccd"
                        class="input is-small"
                        type="number"
                        maxlength="12"
                        minlength="12"
                        ref="phoneInput"
                      />
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label is-small">Ngày cấp</label>
                    <div class="control">
                      <input
                        v-model="formAddNew.ngayCap"
                        class="input is-small"
                        type="text"
                        ref="ngaysinhInput"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column">
                  <div class="field">
                    <label class="label is-small">Địa chỉ</label>
                    <div class="control">
                      <input
                        v-model="formAddNew.diaChi"
                        class="input is-small"
                        type="text"
                        ref="ngaysinhInput"
                      />
                    </div>
                  </div>
                </div>

                <div class="column">
                  <div class="field">
                    <label class="label is-small">Ghi chú</label>
                    <div class="control">
                      <input
                        v-model="formAddNew.ghichu"
                        class="input is-small"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column">
                  <div class="field">
                    <label class="label is-small"
                      >Phòng ban / Chi nhánh ?</label
                    >
                    <div class="control">
                      <div class="select is-fullwidth is-small">
                        <select @change="pbcnChange($event)">
                          <option value="1">Phòng ban</option>
                          <option value="0">Chi nhánh</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <template v-if="isPbCn == 1">
                    <div class="field">
                      <label class="label is-small">Chọn Phòng ban</label>
                      <div class="control">
                        <div class="select is-fullwidth is-small">
                          <select v-model="formAddNew.donVi">
                            <option
                              v-for="pb in dmPhongBan"
                              :key="pb.maPhongBan"
                              :value="pb.tenPhongBan"
                            >
                              {{ pb.tenPhongBan }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="field">
                      <label class="label is-small">Chọn Chi nhánh</label>
                      <div class="control">
                        <div class="select is-fullwidth is-small">
                          <select v-model="formAddNew.donVi">
                            <option
                              v-for="cn in dmChiNhanh"
                              :key="cn.maChiNhanh"
                              :value="cn.tenChiNhanh"
                            >
                              {{ cn.tenChiNhanh }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column">
                  <label class="label is-small">Cổ phần tự do</label>
                  <input
                    v-model="formAddNew.cophantudo"
                    class="input is-small"
                    type="number"
                  />
                </div>
                <div class="column">
                  <label class="label is-small">Cổ phần hạn chế</label>
                  <input
                    v-model="formAddNew.cophanhanche"
                    class="input is-small"
                    type="number"
                  />
                </div>
                <div class="column">
                  <label class="label is-small">Tổng</label>
                  <input
                    v-model="formAddNew.tong"
                    class="input is-small"
                    type="number"
                    disabled
                  />
                </div>
              </div>

              <div class="columns is-multiline">
                <div class="column">
                  <label class="label is-small">Tên loại cổ phần</label>
                  <div class="control">
                    <div class="select is-small is-fullwidth">
                      <select
                        @change="changeLoaiCoPhan"
                        v-model="formAddNew.tenloaicp"
                      >
                        <option value="" disabled>Chọn loại cổ phần</option>
                        <option value="Đang làm việc">Đang làm việc</option>
                        <option value="Cổ đông là đơn vị">
                          Cổ đông là đơn vị
                        </option>
                        <option value="Đã nghỉ việc">Đã nghỉ việc</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <label class="label is-small">Loại cổ phần</label>
                  <input
                    v-model="formAddNew.loaicp"
                    class="input is-small"
                    type="text"
                  />
                </div>
              </div>

              <hr />

              <div class="field is-grouped-function">
                <div class="control">
                  <button
                    @click="onSaveAddNew"
                    class="button is-success is-small"
                  >
                    Thêm mới
                  </button>
                </div>
                &nbsp;
                <div class="control">
                  <button
                    @click="isActive_AddNew = false"
                    class="button is-danger is-small"
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
</template>

<script>
import Swal from "sweetalert2";
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
        soCccd: "",
        ngayCap: "",
        diaChi: "",
        cophantudo: 0,
        cophanhanche: 0,
        tong: 0, // sẽ tự tính từ 2 trường trên

        tenloaicp: "", // chọn từ dropdown
        loaicp: "", // gán tự động theo tên loại

        donVi: "",

        ghichu: "",

        createdBy: "", // gán bằng user đang đăng nhập
        createdAt: null, // gán trong hàm thêm
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

    "formAddNew.cophantudo": "updateTong",
    "formAddNew.cophanhanche": "updateTong",
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

    // sortedTable() {
    //   return this.listNhanSu.sort((a, b) => {
    //     if (a[this.sortKey] < b[this.sortKey]) return -1 * this.sortDirection;
    //     if (a[this.sortKey] > b[this.sortKey]) return 1 * this.sortDirection;
    //     return 0;
    //   });
    // },

    sortedTable() {
      return this.filteredTable.sort((a, b) => {
        // 🔄 Sửa từ listNhanSu -> filteredTable
        if (a[this.sortKey] < b[this.sortKey]) return -1 * this.sortDirection;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * this.sortDirection;
        return 0;
      });
    },

    // countCodong() {
    //   return this.sortedTable.filter((item) => item).length;
    // },

    countCodong() {
      const data = this.sortedTable.filter((item) => item); // đảm bảo không null

      const tongSoCodong = data.length;

      const tongCoPhan = data.reduce((sum, item) => {
        const giaTri = parseInt(item.tong); // ép chuỗi về số nguyên
        return sum + (isNaN(giaTri) ? 0 : giaTri);
      }, 0);

      return {
        tongSoCodong,
        tongCoPhan,
      };
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

    updateTong() {
      const tuDo = Number(this.formAddNew.cophantudo) || 0;
      const hanChe = Number(this.formAddNew.cophanhanche) || 0;
      this.formAddNew.tong = tuDo + hanChe;
    },

    async pbcnChange(e) {
      // console.log(e.target.value);
      this.isPbCn = e.target.value;
    },

    async phongBanChange(e) {
      const selectedMaPhongBan = e.target.value;
      this.formAddNew.phongBan = selectedMaPhongBan;

      // Tìm phòng ban có mã tương ứng
      const selectedPhongBan = this.dmPhongBan.find(
        (pb) => pb.maPhongBan === selectedMaPhongBan
      );

      // Nếu tìm thấy, gán tên phòng ban
      if (selectedPhongBan) {
        this.formAddNew.donVi = selectedPhongBan.tenPhongBan;
      } else {
        this.formAddNew.donVi = ""; // Nếu không tìm thấy, đặt rỗng
      }

      // console.log("Mã phòng ban:", this.formAddNew.donVi);
    },

    async chiNhanhChange(e) {
      const selectedMaChiNhanh = e.target.value;
      this.formAddNew.chiNhanh = selectedMaChiNhanh;

      // Tìm phòng ban có mã tương ứng
      const selectedChiNhanh = this.dmChiNhanh.find(
        (pb) => pb.maChiNhanh === selectedMaChiNhanh
      );

      // Nếu tìm thấy, gán tên phòng ban
      if (selectedChiNhanh) {
        this.formAddNew.donVi = selectedChiNhanh.tenChiNhanh;
      } else {
        this.formAddNew.donVi = ""; // Nếu không tìm thấy, đặt rỗng
      }

      // console.log("Mã phòng ban:", this.formAddNew.donVi);
    },

    async phongBanChange_Edit(e) {
      this.detailHuman.maChiNhanh = "";
      this.detailHuman.chiNhanh = "";
      this.detailHuman.ischinhanh = 0;
      this.detailHuman.isphongban = 1;
      const selectedMaPhongBan = e.target.value;
      this.detailHuman.phongBan = selectedMaPhongBan;

      // Tìm phòng ban có mã tương ứng
      const selectedPhongBan = this.dmPhongBan.find(
        (pb) => pb.maPhongBan === selectedMaPhongBan
      );

      // Nếu tìm thấy, gán tên phòng ban
      if (selectedPhongBan) {
        this.detailHuman.phongBan = selectedPhongBan.tenPhongBan;
      } else {
        this.detailHuman.phongBan = ""; // Nếu không tìm thấy, đặt rỗng
      }

      // console.log("Mã phòng ban:", this.formAddNew.phongBan);
      // console.log("Tên phòng ban:", this.formAddNew.tenPhongBan);
    },

    async chiNhanhChange_Edit(e) {
      this.detailHuman.maPhongBan = "";
      this.detailHuman.phongBan = "";
      this.detailHuman.ischinhanh = 1;
      this.detailHuman.isphongban = 0;
      const selectedMaChiNhanh = e.target.value;
      this.detailHuman.chiNhanh = selectedMaChiNhanh;

      // Tìm phòng ban có mã tương ứng
      const selectedChiNhanh = this.dmChiNhanh.find(
        (pb) => pb.maChiNhanh === selectedMaChiNhanh
      );

      // Nếu tìm thấy, gán tên phòng ban
      if (selectedChiNhanh) {
        this.detailHuman.chiNhanh = selectedChiNhanh.tenChiNhanh;
      } else {
        this.detailHuman.chiNhanh = ""; // Nếu không tìm thấy, đặt rỗng
      }

      // console.log("Mã phòng ban:", this.formAddNew.phongBan);
      // console.log("Tên phòng ban:", this.formAddNew.tenPhongBan);
    },

    async getNhansu() {
      const res = await this.$axios.get("/api/empl/all-emp-codong");
      //   console.log(data);
      this.listNhanSu = res.data;
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

    async viewHuman(data) {
      this.detailHuman = {};
      this.isActive = true;
      //   console.log(data);
      this.detailHuman = data;
    },

    async addNewHuman() {
      this.isActive_AddNew = true;
    },

    async validateForm() {
      const excludedFields = ["ghichu", "createdAt", "createdBy"]; // Các trường không bắt buộc

      for (const key in this.formAddNew) {
        if (
          !excludedFields.includes(key) &&
          (this.formAddNew[key] === "" ||
            this.formAddNew[key] === null ||
            this.formAddNew[key] === undefined)
        ) {
          await Swal.fire({
            title: "Lỗi nhập liệu!",
            text: `Vui lòng nhập đầy đủ thông tin cho trường: ${key}`,
            icon: "warning",
          });
          return false;
        }
      }

      return true; // Tất cả trường bắt buộc đều hợp lệ
    },

    changeLoaiCoPhan() {
      const tenloaicp = this.formAddNew.tenloaicp;
      if (tenloaicp == "Đang làm việc") {
        this.formAddNew.loaicp = 1;
      } else if (tenloaicp == "Cổ đông là đơn vị") {
        this.formAddNew.loaicp = 2;
      } else {
        this.formAddNew.loaicp = 3;
      }
    },

    async onSaveAddNew() {
      if (this.userRole == 1 || this.userRole == 2) {
        const isValid = await this.validateForm();
        if (!isValid) return;

        const result = await Swal.fire({
          title: `Xác nhận thêm cổ đông?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy`,
        });

        if (result.isConfirmed) {
          this.isLoading = true;
          const current = new Date();
          this.formAddNew.createdAt = current.toISOString();

          let data = new FormData();
          data.append("hoTen", this.formAddNew.hoTen);
          data.append("soCccd", this.formAddNew.soCccd);
          data.append("ngayCap", this.formAddNew.ngayCap);
          data.append("diaChi", this.formAddNew.diaChi);
          data.append("cophantudo", this.formAddNew.cophantudo);
          data.append("cophanhanche", this.formAddNew.cophanhanche);
          data.append("tong", this.formAddNew.tong);
          data.append("tenloaicp", this.formAddNew.tenloaicp);
          data.append("loaicp", this.formAddNew.loaicp);
          data.append("donVi", this.formAddNew.donVi);
          data.append("ghichu", this.formAddNew.ghichu || "");
          data.append("createdBy", this.user.username);
          data.append("createdAt", this.formAddNew.createdAt);

          try {
            const response = await this.$axios.post(
              "/api/empl/add-codong",
              data
            );
            if (response.status === 200) {
              this.isLoading = false;
              Swal.fire({
                title: "Thành công",
                text: `Đã thêm cổ đông: ${this.formAddNew.hoTen}`,
                icon: "success",
              });

              this.getNhansu(); // hoặc load lại danh sách nếu có
            }
          } catch (error) {
            this.isLoading = false;
            Swal.fire({
              title: "Lỗi",
              text: "Không thể thêm cổ đông!",
              icon: "error",
            });
            console.error(error);
          }
        }
      }
    },

    async editHuman(data) {
      //   console.log(data);

      this.detailHuman = {};
      this.isActive_Edit = true;
      this.detailHuman = data;
    },

    async onSaveEdit() {
      if (this.userRole == 1 || this.userRole == 2) {
        const result = await Swal.fire({
          title: `Xác nhận hiệu chỉnh dữ liệu nhân sự ?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận",
          denyButtonText: `Hủy`,
        });
        if (result.isConfirmed) {
          this.isLoading = true;

          let data = new FormData();
          data.append("hoTen", this.detailHuman.hoTen);
          data.append("soDienThoai", this.detailHuman.soDienThoai);
          data.append("ngaySinh", this.detailHuman.ngaySinh);
          data.append("gioiTinh", this.detailHuman.gioiTinh);
          data.append("viTriCongTac", this.detailHuman.viTriCongTac);
          data.append(
            "thoiGianBatdauTgBhxh",
            this.detailHuman.thoiGianBatdauTgBhxh
          );
          data.append("loaiHd", this.detailHuman.loaiHd);
          data.append("thoiHanHd_Batdau", this.detailHuman.thoiHanHd_Batdau);
          data.append("thoiHanHd_Ketthuc", this.detailHuman.thoiHanHd_Ketthuc);
          data.append("ngayBonhiemChucvu", this.detailHuman.ngayBonhiemChucvu);
          data.append("trinhDoHocVan", this.detailHuman.trinhDoHocVan);
          data.append("trinhDoChuyenMon", this.detailHuman.trinhDoChuyenMon);
          data.append("danToc", this.detailHuman.danToc || "Kinh");
          data.append("tonGiao", this.detailHuman.tonGiao || "Không");
          data.append("soCmnd", this.detailHuman.soCmnd);
          data.append("ngayCap_cmnd", this.detailHuman.ngayCap_cmnd);
          data.append("noiCap_cmnd", this.detailHuman.noiCap_cmnd);
          data.append("soCccd", this.detailHuman.soCccd);
          data.append("ngayCap_Cccd", this.detailHuman.ngayCap_Cccd);
          data.append("noiCap_Cccd", this.detailHuman.noiCap_Cccd);
          data.append("noiKhaiSinh", this.detailHuman.noiKhaiSinh);
          data.append("diaChiHoKhau", this.detailHuman.diaChiHoKhau);
          data.append("diaChiHienNay", this.detailHuman.diaChiHienNay);
          data.append("ghichu", this.formAddNew.ghichu);
          data.append("status", this.detailHuman.status);
          data.append("ischinhanh", this.detailHuman.ischinhanh);
          data.append("isphongban", this.detailHuman.isphongban);
          data.append("maPhongBan", this.detailHuman.maPhongBan);
          data.append("maChiNhanh", this.detailHuman.maChiNhanh);
          data.append("phongBan", this.detailHuman.phongBan);
          data.append("chiNhanh", this.detailHuman.chiNhanh);
          data.append("anhHoSoOld", this.detailHuman.anhHoSo);

          if (this.selectedFile) {
            data.append("anhHoSo", this.selectedFile, this.selectedFile.name);
          } else {
            data.append("anhHoSo", this.detailHuman.anhHoSo);
          }

          // Gửi dữ liệu qua API
          try {
            const response = await this.$axios.post(
              "/api/empl/update-empl",
              data
            );
            if (response.status === 200) {
              this.isLoading = false;
              Swal.fire({
                title: "Thành công",
                text: `Đã hiệu chỉnh nhân sự: ${this.detailHuman.hoTen}`,
                icon: "success",
              });
              // Reset form hoặc cập nhật danh sách
              this.getNhansu();
              this.remove();
            }
          } catch (error) {
            this.isLoading = false;
            Swal.fire({
              title: "Lỗi",
              text: "Có lỗi xảy ra khi thêm nhân viên!",
              icon: "error",
            });
            console.error(error);
          }
        }
      }
    },

    async onDelete(data) {
      if (this.userRole == 1 || this.userRole == 2) {
        const result = await Swal.fire({
          title: `Xác nhận xoá cổ đông này ?`,
          showDenyButton: true,
          confirmButtonText: "Xác nhận xoá",
          denyButtonText: `Hủy xoá`,
        });
        if (result.isConfirmed) {
          const dataPost = {
            id: data._id,
          };

          try {
            const res = await this.$axios.post(
              `/api/empl/delete/codong`,
              dataPost
            );
            if (res.status === 200) {
              Swal.fire({
                title: "Xoá thành công",
                text: `Đã xoá cổ đông ${data.hoTen}`,
                icon: "success",
              });
              this.getNhansu();
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
              title: `Lỗi! Không thể xoá`,
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

.modal-card-detail {
  width: 950px;
  height: 700px;
}

.modal-card-edit {
  width: 950px;
  height: 700px;
}

.modal-card-addnew {
  width: auto;
  height: auto;
}
</style>
