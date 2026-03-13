// --- DOM Setup ---
const canvas = document.getElementById('pie');
const incomeInput = document.getElementById('income');
const taxIncomeInput = document.getElementById('tax-income');
const studentLoansInput = document.getElementById('student-loans');
const housingInput = document.getElementById('housing');
const essentialsInput = document.getElementById('essentials');
const lifestyleInput = document.getElementById('lifestyle')
const futureInput = document.getElementById('future')

let currentChart = null;

// Build chart config from current input values
function buildChartConfig() {
  const income = incomeInput
  const loans = studentLoansInput
  const housing = housingInput
  const essentials = essentialsInput
  const lifestyle = lifestyleInput
  const future = futureInput


  const labels = ['Housing', 'Essentials', 'Loans', 'Lifestyle', 'Future Proofing'];
  const data = [housing, essentials, loans, lifestyle, future];

  return {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        label: 'Monthly (USD)',
        data,
        backgroundColor: [
          '#8979FF', '#FF928A', '#3CC3DF', '#FFAE4C', '#537FF1'
        ]
      }]
    },
    options: {
      plugins: {
        title: { display: true, text: `Budget snapshot (${occuSelect ? occuSelect.value : 'N/A'})` }
      }
    }
  };
}

// Initialize Chart.js chart if available
function initChart() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not found - include Chart.js to render charts.');
    return null;
  }

  const cfg = buildChartConfig();
  currentChart = new Chart(canvas, cfg);
  return currentChart;
}

// Update existing chart data in-place to keep animation smooth
function refreshChart() {
  const cfg = buildChartConfig();
  if (!currentChart) {
    currentChart = initChart();
    return;
  }

  currentChart.data.labels = cfg.data.labels;
  currentChart.data.datasets[0].data = cfg.data.datasets[0].data;
  currentChart.options.plugins = cfg.options.plugins;
  currentChart.update();
}

document.body.addEventListener('input', () => {
    update();
});

update();
