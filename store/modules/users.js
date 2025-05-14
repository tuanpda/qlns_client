export const state = () => ({
  users: [],
  user: {},
});

export const getters = {
  getUsers: (state) => {
    return state.users;
  },
  getUser: (state) => {
    return state.user;
  },
};

export const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  // Get all data users
  async getUsers({ commit }) {
    try {
      // Gọi API để lấy danh sách người dùng
      const response = await this.$axios.get("/api/users/");
      // console.log(response);
      // Lưu trữ vào store
      commit("setUsers", response.data);
    } catch (error) {
      console.error(error);
    }
  },

  // Add new data
  async createUser({ commit }, data) {
    try {
      // console.log(data);
      const response = await this.$axios.post(
        "/api/users/account",
        data
      );
      // console.log(response);
      if (response.status == 200) {
        const reload = await this.$axios.get("/api/users/");
        commit("setUsers", reload.data);
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
  async updateUser({ commit }, data) {
    try {
      const response = await this.$axios.post(
        `/api/users/user/fix`,
        data
      );
      if (response.data.success == true) {
        const reload = await this.$axios.get("/api/users/");
        commit("setUsers", reload.data);
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
