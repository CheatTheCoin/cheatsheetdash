async function getPrices() {
  const res = await fetch("/api/prices");
  return await res.json();
}

function updateElement(id, value) {
  const container = document.getElementById(id);
  if (!value) {
    container.querySelector(".price").textContent = "N/A";
    container.querySelector(".change").textContent = "";
    return;
  }
  container.querySelector(".price").textContent = `$${value.price.toLocaleString()}`;
  container.querySelector(".change").textContent = `${value.change.toFixed(2)}%`;
  container.querySelector(".change").style.color = value.change >= 0 ? "#4caf50" : "#f44336";
}

async function updateDashboard() {
  const prices = await getPrices();
  updateElement("btc", prices.btc);
  updateElement("paxg", prices.paxg);
  updateElement("oil", prices.oil);
  updateElement("sp500", prices.sp500);
}

updateDashboard();
setInterval(updateDashboard, 300000);
