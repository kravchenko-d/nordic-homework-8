const app = document.getElementById("app")

const popup = document.getElementById("popup")
const popupBody = document.getElementById("popup-body")

const counter_n = document.getElementById("counter")
let counter_s = document.createElement("span")
counter_n.appendChild(counter_s)

const leaderboard = document.getElementById("leaderboard")
const player = document.getElementById("player")

let counter = 0
let arr = []
let results = []
let error = false

for (let i = 1; i < 16; i++) {
    const item = i
    arr.push(item)
}

arr.push("")

const newarr = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr
}

newarr(arr)

const cells = []

for (let i = 0; i < 16; i++){
    let cell = document.createElement("div")
    cell.classList.add("cell")

    app.appendChild(cell)

    cells.push(cell.innerText = newarr(arr[i]))
    
    cell.addEventListener("click", (event) => onClickCell(event, i))
}

let newcell = true
let temp = ""
let checkWinArr = []

function onClickCell(event, index) {
    let i = Math.floor(index / 4)
    let j = index % 4

    if(newcell &&
        index+4 <= 15 &&
        app.children[index+4].innerText == "" &&
        app.children[index].innerText !== "")
    {
        temp = app.children[index].innerText
        newcell = false
        app.children[index].innerText = null
        checkWinArr.length = 0
        compare.length = 0
        compareError.length = 0
    }
    else if(newcell &&
        index-4 >= 0 &&
        app.children[index-4].innerText == "" &&
        app.children[index].innerText !== "")
    {
        temp = app.children[index].innerText
        newcell = false
        app.children[index].innerText = null
        checkWinArr.length = 0
        compare.length = 0
        compareError.length = 0
    }
    else if(
            newcell &&
            index+1 <= 15 &&
            app.children[index+1].innerText == "" &&
            app.children[index].innerText !== "" &&
            j !== 3
        ){
            temp = app.children[index].innerText
            newcell = false
            app.children[index].innerText = null
            checkWinArr.length = 0
            compare.length = 0
            compareError.length = 0
    }
    else if(
            newcell &&
            index-1 >= 0 &&
            app.children[index-1].innerText == "" &&
            app.children[index].innerText !== "" &&
            j !== 0
        ){
            temp = app.children[index].innerText
            newcell = false
            app.children[index].innerText = null
            checkWinArr.length = 0
            compare.length = 0
            compareError.length = 0
    }
    else if(
            newcell &&
            (index >= 0 || app.children[index-4].innerText !== "") &&
            (index >= 0 || app.children[index-1].innerText !== "") &&
            (index <= 15 || app.children[index+1].innerText !== "") &&
            (index <= 15 || app.children[index+4].innerText !== "") &&
            app.children[index].innerText !== ""
        ){      
            return
        }
    else if(
            temp == "" &&
        app.children[index].innerText == ""
    ){
        return
    }
    else
    {
        if (app.children[index].innerText == "")
        {
            app.children[index].innerText = temp
            newcell = true
            temp = ""
            counter++
            for (index = 0; index < 16; index++){
                checkWinArr.push(parseInt(app.children[index].innerText))
                }
            checkWin()
        }
    }
    counter_s.innerText = `${counter}`
}

let checkArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, NaN]
let errorArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11, 13, 14, 15, NaN]

let compare = []
let compareError = []

function checkWin() {
    for (let i = 0; i < checkWinArr.length; i++) {
        for (let j = 0; j < checkArr.length; j++) {
            if (checkWinArr[i] === checkArr[j] && i == j) {
                compare.push(checkWinArr[i])
            }
        }
        for (let j = 0; j < errorArr.length; j++) {
            if (checkWinArr[i] === errorArr[j] && i == j) {
                compareError.push(checkWinArr[i])
            }
        }
    }
    
    if (compare.length == 15) {
        showWinPopup()
        error = false
    }
    if (compareError.length == 15){
        showWinPopup()
        error = true
    }
}

function showWinPopup(){
    popupBody.innerHTML = `Победа! </br> Ваш счёт: ${counter}`
    popup.style.display = "flex"
    const button = document.getElementById('button')
    button.addEventListener("click", (event) => onClickButton(event))
}

function onClickButton(event) {

    if (counter != 0){
        popup.style.display = "none"

        newarr(arr)
        for (let i = 0; i < app.children.length; i++){
            app.children[i].innerText = newarr(arr[i])
        }        
        const name = player.value
        let item
        
        if (error) {
            item = {
                player: name,
                score: counter,
                extra: "-"
            }
        }
        else {
            item = {
                player: name,
                score: counter,
                extra: "+"
            }
        }
    
        results.push(item)
        saveResult()
        counter = 0
        error = false
    }
}

function saveResult(){
    let str = ''

    results.sort((a, b) => a.score - b.score)

    for(let i of results){
        str += i.player + ": " + i.score + " " + i.extra + "</br>"
    }
    leaderboard.innerHTML = str
}