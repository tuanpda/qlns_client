<template>
  <div class="box">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <strong class="title is-5">Độ tuổi lao động</strong>
      <button class="button is-small is-light">📅 Today</button>
    </div>

    <hr class="navbar-divider" />

    <canvas ref="ageChart" style="max-height: 400px"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  data() {
    return {
      chartInstance: null,
      chartData: [],
    };
  },
  mounted() {
    this.report();
  },

  methods: {
    async report() {
      try {
        const res = await this.$axios.get(`/api/empl/report-chart-age`);
        //   console.log(res);
        if (res.status == 200) {
          this.chartData = res.data;
        }

        // Sau khi có data, vẽ chart
        this.renderChart();
      } catch (err) {
        console.error("Lỗi tải dữ liệu biểu đồ:", err);
      }
    },

    renderChart() {
      // Xóa chart cũ nếu có
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      const ctx = this.$refs.ageChart.getContext("2d");
      const labels = this.chartData.map((item) => item.nhomTuoi);
      const data = this.chartData.map((item) => item.soLuong);

      this.chartInstance = new Chart(ctx, {
        type: "bar", // có thể đổi sang "pie", "doughnut", "polarArea", etc.
        data: {
          labels,
          datasets: [
            {
              label: "Số lượng",
              data,
              //   backgroundColor: "#36A2EB",
              // cho doughnut
              backgroundColor: [
                "#FF6384", // <25
                "#36A2EB", // 25-30
                "#FFCE56", // 31-35
                "#4BC0C0", // 36-40
                "#9966FF", // 41-45
                "#FF9F40", // >45
              ],
              borderColor: "#2980b9",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  precision: 0,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
        },
      });
    },
  },
};
</script>
