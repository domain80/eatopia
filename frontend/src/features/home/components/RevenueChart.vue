<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
)

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Revenue',
      data: [45, 35, 55, 40, 45, 30, 25],
      unit: '$',
      barThickness: 10,
      backgroundColor: '#00786f',
      borderRadius: 2,
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#1F2937',
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: (context: any) => `$${context.raw}k`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: false
      },
      ticks: {
        callback: (value: number) => `${value}k`
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>

<template>
  <Bar :data="chartData" :options="{
    responsive: true,

    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true
        },
      },
      x: {
        grid: {
          display: false
        }
      }

    }
  }" />
</template>
