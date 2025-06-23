<template>
  <div class="box">
    <div class="is-flex is-justify-content-space-between is-align-items-center">
      <strong class="title is-5">Attendance Overview</strong>
      <button class="button is-small is-light">📅 Today</button>
    </div>

    <hr class="navbar-divider" />

    <canvas id="myChart3" style="max-height: 400px"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  mounted() {
    const ctx = document.getElementById("myChart3");

    new Chart(ctx, {
      // type: "line", // <-- đổi type ở đây
      // type: "bar",
      // type: "pie",
      type: "radar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Số điểm danh",
            data: [12, 19, 3, 5, 2],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            borderColor: "#36A2EB",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  },
};
</script>
