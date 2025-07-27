async function fetchCoinGecko(id) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`);
    const json = await res.json();
    const coin = json[0];
    return { price: coin.current_price, change: coin.price_change_percentage_24h };
  } catch (err) {
    console.error("Villa í fetchCoinGecko fyrir", id, err);
    return null;
  }
}

async function updateElement(id, value) {
  const container = document.getElementById(id);
  const priceEl = container.querySelector(".price");
  const changeEl = container.querySelector(".change");

  if (!value) {
    priceEl.textContent = "N/A";
    changeEl.textContent = "";
    return;
  }

  priceEl.textContent = `$${value.price.toLocaleString()}`;
  changeEl.textContent = `${value.change.toFixed(2)}%`;
  changeEl.style.color = value.change >= 0 ? "#4caf50" : "#f44336";
}

async function updateDashboard() {
  const [btc, paxg] = await Promise.all([
    fetchCoinGecko("bitcoin"),
    fetchCoinGecko("pax-gold"),
  ]);

  updateElement("btc", btc);
  updateElement("paxg", paxg);
  updateElement("oil", { price: "N/A", change: 0 });
  updateElement("sp500", { price: "N/A", change: 0 });
}

updateDashboard();
setInterval(updateDashboard, 300000);
