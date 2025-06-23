export const state = () => ({
    // danh mục tỉnh / thành phố
    dm_Tinhs: [],
    dm_Tinh: {},

    // danh quận huyện
    dm_Quanhuyens: [],
    dm_Quanhuyen: {},
  });
  
  export const getters = {
    // danh mục tỉnh / thành phố
    getdmTinhs: (state) => {
      return state.dm_Tinhs;
    },
    getdmTinh: (state) => {
      return state.dm_Tinh;
    },

    // danh mục quận huyện
    getdmQuanhuyens: (state) => {
      return state.dm_Quanhuyens;
    },
    getdmQuanhuyen: (state) => {
      return state.dm_Quanhuyen;
    },
  };
  
  export const mutations = {
    // danh mục tỉnh / thành phố
    setdmTinhs(state, dm_Tinhs) {
      state.dm_Tinhs = dm_Tinhs;
    },
    setdmTinh(state, dm_Tinh) {
      state.dm_Tinh = dm_Tinh;
    },

    // danh mục quận huyện
    setdmQuanhuyens(state, dm_Quanhuyens) {
      state.dm_Quanhuyens = dm_Quanhuyens;
    },
    setdmQuanhuyen(state, dm_Quanhuyen) {
      state.dm_Quanhuyen = dm_Quanhuyen;
    },
  };
  
  export const actions = {
    // Get all data tỉnh
    async getdmTinhs({ commit }) {
      try {
        // Gọi API để lấy danh sách người dùng
        const response = await this.$axios.get("/api/danhmucs/dmtinh");
        // console.log(response.data);
        // Lưu trữ vào store
        commit("setdmTinhs", response.data);
      } catch (error) {
        console.error(error);
      }
    },

    // Get all data quận huyện
    async getdmQuanhuyens({ commit }) {
      try {
        // Gọi API để lấy danh sách người dùng
        const response = await this.$axios.get("/api/danhmucs/dmquanhuyen");
        // console.log(response.data);
        // Lưu trữ vào store
        commit("setdmQuanhuyens", response.data);
      } catch (error) {
        console.error(error);
      }
    },
  
    // Add new data
    async createChuongtrinhct({ commit }, data) {
      try {
        // console.log(data);
        const response = await this.$axios.post(
          "/api/chuongtrinhct/addlinhvuc",
          data
        );
        // console.log(response);
        if (response.status == 200) {
          const reload = await this.$axios.get("/api/chuongtrinhct/linhvuc1");
          commit("setChuongtrinhct", reload.data);
          return {
            success: true,
            message: "Created success !",
          };
        } else {
          return {
            success: false,
            message: "Create false !",
          };
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  
    // Update data
    async updateChuongtrinhct({ commit }, payload) {
      try {
        // console.log(payload.data);
        const response = await this.$axios.patch(
          `/api/chuongtrinhct/linhvuc/${payload._id}`,
          payload.data
        );
        // console.log(response);
        if (response.status == 200) {
          const reload = await this.$axios.get("/api/chuongtrinhct/linhvuc1");
          commit("setChuongtrinhct", reload.data);
          return {
            success: true,
            message: "Update success !",
          };
        } else {
          return {
            success: false,
            message: "Update false !",
          };
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  
    // Delete data
    async deleteChuongtrinhct({ commit }, chuongtrinhct) {
      try {
        const response = await this.$axios.delete(
          `/api/chuongtrinhct/linhvuc/${chuongtrinhct._id}`
        );
        // console.log(response);
        if (response.status == 200) {
          const reload = await this.$axios.get("/api/chuongtrinhct/linhvuc1");
          commit("setChuongtrinhct", reload.data);
          return {
            success: true,
            message: "Deleted success !",
          };
        } else {
          return {
            success: false,
            message: "Delete false !",
          };
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };
  