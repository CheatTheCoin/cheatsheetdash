async function updatePrices() {
  try {
    const res = await fetch("/api/prices");
    const data = await res.json();

    document.querySelector("#btc-price").textContent = `$${data.bitcoin.price.toLocaleString()}`;
    document.querySelector("#btc-change").textContent = `${data.bitcoin.change.toFixed(2)}%`;

    document.querySelector("#paxg-price").textContent = `$${data.paxg.price.toLocaleString()}`;
    document.querySelector("#paxg-change").textContent = `${data.paxg.change.toFixed(2)}%`;
  } catch (err) {
    console.error("Villa að sækja gögn", err);
  }
}

updatePrices();
setInterval(updatePrices, 60000);
