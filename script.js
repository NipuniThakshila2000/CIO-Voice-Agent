const cameraButton = document.querySelector("#cameraButton");
const cameraFrame = document.querySelector("#cameraFrame");
const conversationButton = document.querySelector("#conversationButton");
const emotionAvatar = document.querySelector("#emotionAvatar");
const emotionLabel = document.querySelector("#emotionLabel");
const confidenceLabel = document.querySelector("#confidenceLabel");
const historyTrack = document.querySelector("#historyTrack");
const stressValue = document.querySelector("#stressValue");
const energyValue = document.querySelector("#energyValue");
const moodValue = document.querySelector("#moodValue");
const resultsEmpty = document.querySelector("#resultsEmpty");
const resultsContent = document.querySelector("#resultsContent");
const resetButton = document.querySelector("#resetButton");
const generatorRange = document.querySelector("#generatorRange");
const generatorCount = document.querySelector("#generatorCount");
const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".app-page");

const historyValues = [42, 58, 66, 51, 74, 63, 82, 70, 76, 68, 86, 79];

function setCameraState(isActive) {
  cameraFrame.classList.toggle("is-active", isActive);
  cameraButton.classList.toggle("is-active", isActive);
  cameraButton.querySelector("span:last-child").textContent = isActive ? "Stop Camera" : "Start Camera";
}

function fillSentimentHistory() {
  historyTrack.classList.add("has-data");
  historyTrack.innerHTML = `
    <article class="history-card calm">
      <div class="history-visual">
        <div class="chart-card score-chart">
          <div class="chart-status">
            <span class="moon-mark" aria-hidden="true"></span>
            <span><em>Sentiment</em><b>Optimal</b></span>
          </div>
          <strong>87</strong>
          <small>Calm focus score</small>
          <div class="score-segment-line" aria-hidden="true">
            <i style="width: 34%"></i><b></b><i style="width: 12%"></i><b></b><i style="width: 16%"></i><i style="width: 38%"></i>
          </div>
          <div class="chart-footer"><span>Start</span><span>Current</span></div>
        </div>
      </div>
      <h3>Positive Tone</h3>
      <p>Voice pace and facial cues show steady engagement during the opening questions.</p>
    </article>
    <article class="history-card neutral">
      <div class="history-visual">
        <div class="chart-card stages-chart">
          <span class="chart-label">Stress pattern</span>
          <strong>62%</strong>
          <small>Moderate load across 8m 42s</small>
          <div class="sleep-stage-chart" aria-hidden="true">
            <div class="stage-columns">
              <i class="wake" style="height: 20px"></i><i class="stage low" style="height: 16px"></i>
              <i class="stage deep" style="height: 28px"></i><i class="marker" style="height: 48px"></i>
              <i class="stage mid" style="height: 36px"></i><i class="stage low" style="height: 20px"></i>
              <i class="marker" style="height: 52px"></i><i class="stage mid" style="height: 30px"></i>
              <i class="stage deep" style="height: 42px"></i><i class="stage low" style="height: 18px"></i>
              <i class="marker" style="height: 54px"></i><i class="stage mid" style="height: 34px"></i>
              <i class="stage low" style="height: 24px"></i><i class="wake" style="height: 22px"></i>
            </div>
            <div class="time-axis">
              <span>Q1</span><span>Q4</span><span>Q8</span><span>Q12</span>
            </div>
          </div>
        </div>
      </div>
      <h3>Stress Signal</h3>
      <p>Workload answers indicate pressure, but recovery and support signals remain stable.</p>
    </article>
    <article class="history-card stable">
      <div class="history-visual">
        <div class="chart-card guidance-chart">
          <div class="arc-scale" aria-hidden="true"><span>Low</span><span>Stable</span><span>High</span><i></i></div>
          <span class="moon-center" aria-hidden="true"></span>
          <small>Stable mood range</small>
          <strong>72 - 84</strong>
          <p>Healthy emotional consistency</p>
        </div>
      </div>
      <h3>Emotion Trend</h3>
      <p>Sentiment stays consistent with no sharp negative shifts across the session.</p>
    </article>
  `;
}

function clearSentimentHistory() {
  historyTrack.classList.remove("has-data");
  historyTrack.innerHTML = "<span>No sentiment data</span>";
}

function setSampleSentiment() {
  emotionAvatar.textContent = ":)";
  emotionLabel.textContent = "Calm focus";
  confidenceLabel.textContent = "Conf: 87%";
  stressValue.textContent = "Low";
  energyValue.textContent = "Good";
  moodValue.textContent = "Stable";
  fillSentimentHistory();
}

function clearSampleSentiment() {
  emotionAvatar.textContent = "-";
  emotionLabel.textContent = "No face";
  confidenceLabel.textContent = "Conf: 0%";
  stressValue.textContent = "--";
  energyValue.textContent = "--";
  moodValue.textContent = "--";
  clearSentimentHistory();
}

cameraButton.addEventListener("click", () => {
  const nextState = !cameraFrame.classList.contains("is-active");
  setCameraState(nextState);

  if (nextState) {
    setSampleSentiment();
  } else {
    clearSampleSentiment();
  }
});

conversationButton.addEventListener("click", () => {
  const isActive = conversationButton.classList.toggle("is-active");
  conversationButton.querySelector("span:last-child").textContent = isActive
    ? "Conversation Active"
    : "Start Conversation";
  resultsEmpty.hidden = isActive;
  resultsContent.hidden = !isActive;
});

resetButton.addEventListener("click", () => {
  conversationButton.classList.remove("is-active");
  conversationButton.querySelector("span:last-child").textContent = "Start Conversation";
  resultsEmpty.hidden = false;
  resultsContent.hidden = true;
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tabTarget;
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    pages.forEach((page) => {
      const isActive = page.dataset.page === target;
      page.classList.toggle("active", isActive);
      page.hidden = !isActive;
    });
  });
});

if (generatorRange && generatorCount) {
  const syncGeneratorRange = () => {
    const value = Number(generatorRange.value);
    const min = Number(generatorRange.min);
    const max = Number(generatorRange.max);
    const percent = ((value - min) / (max - min)) * 100;
    generatorCount.textContent = String(value);
    generatorRange.style.background = `linear-gradient(90deg, rgba(155, 76, 242, 0.92) 0%, rgba(155, 76, 242, 0.92) ${percent}%, rgba(255, 255, 255, 0.12) ${percent}%, rgba(255, 255, 255, 0.12) 100%)`;
  };

  generatorRange.addEventListener("input", syncGeneratorRange);
  syncGeneratorRange();
}
