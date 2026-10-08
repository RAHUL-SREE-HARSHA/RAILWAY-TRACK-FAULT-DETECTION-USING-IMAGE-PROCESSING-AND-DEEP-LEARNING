let boardDiv = document.getElementById("board")

let selected = null

const pieces = {
    "r":"♜","n":"♞","b":"♝","q":"♛","k":"♚","p":"♟",
    "R":"♖","N":"♘","B":"♗","Q":"♕","K":"♔","P":"♙"
}

function drawBoard(fen){

    boardDiv.innerHTML=""

    let rows = fen.split(" ")[0].split("/")

    for(let r=0;r<8;r++){

        let col=0

        for(let char of rows[r]){

            if(!isNaN(char)){

                for(let i=0;i<char;i++){
                    createSquare(r,col,"")
                    col++
                }

            }else{

                createSquare(r,col,char)
                col++

            }

        }

    }

}

function createSquare(r,c,piece){

    let square=document.createElement("div")

    square.classList.add("square")

    if((r+c)%2==0)
    square.classList.add("white")
    else
    square.classList.add("black")

    square.dataset.pos=String.fromCharCode(97+c)+(8-r)

    if(piece!="")
        square.innerHTML=pieces[piece]

    square.onclick=clickSquare

    boardDiv.appendChild(square)
}

function clickSquare(){

    if(selected==null){

        selected=this.dataset.pos
        this.style.border="3px solid red"

    }else{

        let move=selected+this.dataset.pos

        fetch("/move",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({move:move})
        })
        .then(res=>res.json())
        .then(data=>{
            selected=null
            loadBoard()
        })

    }

}

function loadBoard(){

fetch("/board")
.then(res=>res.json())
.then(data=>{
    drawBoard(data.board)
})

}

loadBoard()