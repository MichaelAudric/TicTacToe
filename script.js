let arr = [["","",""] , ["","",""] , ["","",""]];
let player1 = true;
let won = false;

function reset() {
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            arr[i][j] = "";
        }
    }
    player1 = true;
    updateTurn();
    resetWin();
    won = false;
}

function updateTurn()
{
    const turn = document.querySelector("#turn");
    if (player1 === true)
    {
        turn.textContent = "Player1's turn";
    }

    else
    {
        turn.textContent = "Player2's turn";    
    }
}

function display() {
    const rows = document.querySelector("#board").children;
    for(let i = 0; i < 3; i++)
    {
        const squares = rows.item(i).children;
        for(let j = 0; j < 3; j++)
        {
            squares.item(j).textContent = arr[i][j];
        }
    }
}

function resetWin(){
    const result = document.querySelector("#result");
    result.textContent = "-";
}

function updateWin(){
    const result = document.querySelector("#result");
    result.textContent = (player1 === false ? "Player1" : "Player2") + " wins!";
}

function check(i,j) {
    //check vertical
    let ind1 = i;
    let ind2 = j;
    let temp = 0;
    while(ind1 >= 0 && arr[ind1][j] === arr[i][j])
    {
        temp++;
        ind1--;
    }
    ind1 = i+1;
    while(ind1 < 3 && arr[ind1][j] === arr[i][j])
    {
        temp++;
        ind1++;
    }
    if(temp === 3) return true;

    //check horizontal
    ind2 = j;
    temp = 0;
    while(ind2 >= 0 && arr[i][ind2] === arr[i][j])
    {
        temp++;
        ind2--;
    }
    ind2 = j+1;
    while(ind2 < 3 && arr[i][ind2] === arr[i][j])
    {
        temp++;
        ind2++;
    }
    if(temp === 3) return true;

    //check right diagonal
    temp = 0;
    ind1 = i;
    ind2 = j;
    while(ind1 >= 0 && ind2 < 3 && arr[ind1][ind2] === arr[i][j])
    {
        temp++;
        ind1--;
        ind2++;
    }
    ind1 = i+1;
    ind2 = j-1;
    while(ind1 < 3 && ind2 >= 0 && arr[ind1][ind2] === arr[i][j])
    {
        temp++;
        ind1++;
        ind2--;
    }
    if(temp === 3) return true;

    //check left diagonal
    temp = 0;
    ind1 = i;
    ind2 = j;
    while(ind1 >= 0 && ind2 >= 0 && arr[ind1][ind2] === arr[i][j])
    {
        temp++;
        ind1--;
        ind2--;
    }
    ind1 = i+1;
    ind2 = j+1;
    while(ind1 < 3 && ind2 < 3 && arr[ind1][ind2] === arr[i][j])
    {
        temp++;
        ind1++;
        ind2++;
    }
    if(temp === 3) return true;

    //return false
    return false;

}

const restart = document.querySelector("#restart");
restart.addEventListener("click" , () => {
    reset();
    display();
});

const rows = document.querySelector("#board").children;
for(let i = 0; i < 3; i++)
{
    const squares = rows.item(i).children;
    for(let j = 0; j < 3; j++)
    {
        squares.item(j).addEventListener("click" , () => {
            if(arr[i][j] === "" && won === false)
            {
                arr[i][j] = (player1 ? "X" : "O");
                display();
                player1 = !player1;
                updateTurn();
                won = check(i,j);
                if(won === true){
                    updateWin();
                }
            }
        });
    }
}

updateTurn();