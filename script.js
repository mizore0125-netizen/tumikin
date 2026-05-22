const date = new Date();

function getDayString(day){
    if (day === 0) return '日曜日';
    if (day === 1) return '月曜日';
    if (day === 2) return '火曜日';
    if (day === 3) return '水曜日';
    if (day === 4) return '木曜日';
    if (day === 5) return '金曜日';
    if (day === 6) return '土曜日';
    return '';
}

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const dayStr = getDayString(date.getDay());
const formattedDate = `${year}年 ${month}月 ${day}日 ${dayStr}`;

// HTML要素取得
const todayDate = document.getElementById("today-date");
// HTMLへ表示
todayDate.textContent = formattedDate;

const button = document.getElementById("show-table");
const tableArea = document.getElementById("table-area");

let setCount = 1;

// 部位ボタン（クラス名が .check-table）を全て取得する
const partButtons = document.querySelectorAll('.check-table');
// 取得したボタン一つ一つに対して、クリックされたときの処理を登録する
partButtons.forEach(function(table) {
    table.addEventListener("click", function() {
        // クリックされたボタン自身（this）に 'selected' クラスを付け外しする
        this.classList.toggle("selected");
    })
})

function addSetRow(weight = "", reps = "") {
    const table = document.getElementById("workout-table");
    if (!table) return;
    setCount++;

    table.insertAdjacentHTML(
        "beforeend",
        `
        <tr>
            <td>${setCount}</td>
            <td><input type="number" min="0" step="0.25" class="weight-input" value="${weight}"> kg</td>
            <td><input type="number" min="0" class="reps-input" value="${reps}"> 回</td>
            <td><button class="copy-btn">コピー</button></td>
        </tr>
        `
    );
}

//etc.を押したら自由に部位が書き込めるようにしたいpartsTextをに組み込めるように、electedPartsに代入すればよい？
button.addEventListener("click",function(){
    const selectedElements = document.querySelectorAll(".check-table.selected")
    let selectedParts = [];
    selectedElements.forEach(function(element) {
        selectedParts.push(element.textContent);
    });
    let partsText = selectedParts.join(" / ");

    //Today's Lift: ${partsText}を取り消しで一回一回消えるようにする
    //種目名も追加するリストである程度用意した上で文字入力も可
    tableArea.innerHTML = `
    <h3>Place : ${placeText} </h3>
    <h3>Today's Lift : ${partsText} </h3>
    <table id="workout-table" border="1">
            <th>set</th>
            <th>重量</th>
            <th>回数</th>
            <th>操作</th>
        </tr>
        <tr>
            <td>1</td>
            <td><input type="number" min="0" step="0.25"> kg</td>
            <td><input type="number" min="0"> 回</td>
            <td><button class="copy-btn">コピー</button></td>
        </tr>
    </table> 
    `;
    // テーブルが表示されたらセット数を1にリセット
    setCount = 1;
});

const reset = document.getElementById("reset");
reset.addEventListener("click", () => {
    location.reload();
});

tableArea.addEventListener("click", function(event) {
    if (event.target.classList.contains("copy-btn")) {
        const row = event.target.closest("tr");
        const currentWeight = row.querySelector(".weight-input").value;
        const currentReps = row.querySelector(".reps-input").value;
        addSetRow(currentWeight, currentReps);
    }
});

tableArea.addEventListener("change", function(event) {
    if (event.target.classList.contains("reps-input")) {
        const allRepsInputs = document.querySelectorAll(".reps-input");
        const lastRepsInput = allRepsInputs[allRepsInputs.length - 1];
        if (event.target === lastRepsInput && event.target.value !== "") {
            addSetRow();
        }
    }
});