export function addHistory(storeName, entry) {
  const history = JSON.parse(localStorage.getItem("storeHistory")) || {};

  if (!history[storeName]) {
    history[storeName] = [];
  }

  history[storeName].unshift({
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...entry,
  });

  localStorage.setItem("storeHistory", JSON.stringify(history));
}
