let apiUrl = localStorage.getItem('sheetApi');
if (!apiUrl) {
  apiUrl = prompt("Google Apps ScriptのAPI URLを入力してください：");
  if (!apiUrl) {
    alert("URLが入力されていません。再読み込みしてください。");
    throw new Error("API URL未入力");
  }
  localStorage.setItem('sheetApi', apiUrl);
}

const companies = ["CyberAgent", "Mitsui", "Nomura"]; // スプレッドシートのcompany列と一致させる
const grid = document.getElementById('grid');

companies.forEach(company => {
  fetch(`${apiUrl}?company=${encodeURIComponent(company)}`)
    .then(res => res.json())
    .then(data => {
      const tile = document.createElement('div');
      tile.className = 'icon-tile';
      tile.innerHTML = `<img class="icon-img" src="${data.logo}" alt="${data.company}">`;
      tile.onclick = () => {
        window.open(data.url, '_blank');
        alert(`【${data.company}】\nユーザー名: ${data.username}\nパスワード: ${data.password}`);
      };
      grid.appendChild(tile);
    })
    .catch(err => console.error(`エラー: ${company}`, err));
});
