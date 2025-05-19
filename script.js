let apiUrl = localStorage.getItem('sheetApi');
if (!apiUrl) {
  apiUrl = prompt("Google Apps ScriptのAPI URLを入力してください：");
  if (!apiUrl) {
    alert("URLが入力されていません。再読み込みしてください。");
    throw new Error("API URL未入力");
  }
  localStorage.setItem('sheetApi', apiUrl);
}

const grid = document.getElementById('grid');

// 一覧取得APIにリクエスト（全データ返すようApps Script側も修正必要）
fetch(`${apiUrl}?mode=all`)
  .then(res => res.json())
  .then(data => {
    data.forEach(company => {
      const tile = document.createElement('div');
      tile.className = 'icon-tile';
      tile.innerHTML = `<img class="icon-img" src="${company.logo}" alt="${company.company}">`;
      tile.onclick = () => {
        window.open(company.url, '_blank');
        alert(`【${company.company}】\nユーザー名: ${company.username}\nパスワード: ${company.password}`);
      };
      grid.appendChild(tile);
    });
  })
  .catch(err => {
    console.error("企業一覧の取得に失敗しました", err);
    alert("企業データの取得に失敗しました。API URLやスプレッドシートをご確認ください。");
  });

