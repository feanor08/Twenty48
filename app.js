let nCrossn=4;
let target=2048;

//
//
//Making of the Grid
function nameGrids(n){
    var bod=document.getElementById("drawing-board");
    for(var i=0;i<n;i++){        
        var row =document.createElement("div");
        row.className = "row";
        for(var j=1;j<=n;j++){
            var idNum=(i*n)+j;
            var cell =document.createElement("div");
            cell.className="grid-square";
            row.appendChild(cell);
            cell.setAttribute("id","cell"+((i*n)+j));
        }
        bod.appendChild(row);
    }
}
//
//
//Starting the game. Adding the random 2s
function startGame(){
    var cell;
    for(var i=0;i<(nCrossn/2);i++){
        cell="cell"+Math.ceil(Math.random()*((nCrossn*nCrossn-1)+1));
        
        document.getElementById(cell).innerText=2;
    }
}
//
//
//Get the Current Matrix
function getMatrix(){
    var cell;
    var counter=1;
    var row=[];
    var theMatrix=[];
    for(var i=0;i<nCrossn;i++){
        row=[];
        for(j=0;j<nCrossn;j++){
            cell=document.getElementById("cell"+counter);            
            if(cell.innerHTML){
                row.push(parseInt(cell.innerHTML));
                
            }else{
                row.push(0);
            }
            counter++;
            
        }
        theMatrix.push(row);
        
        
    }
    return theMatrix;    
}
//
//
//Rotate the matrix n times 
function rotateAntiClockWise(n,theMatrix){    
    var temp;      
    while(n>0){
        for (var i=0; i<nCrossn; i++){
            for (var j=i; j<nCrossn; j++){
                temp=theMatrix[i][j];
                theMatrix[i][j]=theMatrix[j][i];
                theMatrix[j][i]=temp;           
            }
        }   
        for(var i=0;i<nCrossn;i++){
            for(var j=0,k=(nCrossn-1);j<k;j++,k--){
                temp=theMatrix[j][i];
                theMatrix[j][i]=theMatrix[k][i];
                theMatrix[k][i]=temp;
            }
        }
        n--;
    }
    return theMatrix;
}
//
//
//function to add elemnets in the column
function SummingRows(zeroCountNeeded){
    var totalRow=[];    
    var rowMatrix=[];

    //Need to shift elements inside the row so that zeroes are at the beginning
    for(var i=0;i<zeroCountNeeded.length;i++){
        if(zeroCountNeeded[i]!=0)
            rowMatrix.push(zeroCountNeeded[i]);
    }
    while(zeroCountNeeded.length!=rowMatrix.length){
        rowMatrix.unshift(0);
    }

    //Do the Summing
    for(var i=(rowMatrix.length-1);i>=0;i--){
        if(rowMatrix[i-1]&&rowMatrix[i-1]==rowMatrix[i]){
            totalRow.unshift(rowMatrix[i-1]+rowMatrix[i]); 
            rowMatrix[i-1]=0;
        }else if(rowMatrix[i]==0){
            //do nothing

        }else{
            totalRow.unshift(rowMatrix[i]);        
        }
    }    
    for(i=0;totalRow.length<rowMatrix.length;i++){
        totalRow.unshift(0);
    }
     
    return totalRow; 
}
//
//
//function to add a random 2
function addRandomTwo(theMatrix){
    var count=[];
    var cell;
    var tile;
    //stores the cell which dont have a current innerText
    for(var i=1;i<=(nCrossn*nCrossn);i++){
        cell=document.getElementById("cell"+i);
        if(!cell.innerText){ 
            count.push(i);            
        }
    }
    tile=Math.ceil(Math.random()*count.length);
    if(count.length>0){
    cell=document.getElementById("cell"+count[tile-1]);
    //10% chance of className "4" coming 
    var value=Math.random() < 0.9 ? "2" : "4";
    cell.innerText=value;
    }else{
        alert("Game Over!");
    }
    
}

function printer(oldMatrix,turn){
    var counter=1;
    var newMatrix=[];
    for(var i=0;i<nCrossn;i++){
        newMatrix.push(SummingRows(oldMatrix[i]));
    }           
    newMatrix=rotateAntiClockWise(turn,newMatrix);
    for(var i=0;i<nCrossn;i++){
        for(var j=0;j<nCrossn;j++){                        
            cell=document.getElementById("cell"+counter); 
            cell.innerText="";               
            if(newMatrix[i][j]!=0){
                cell.innerText=newMatrix[i][j];
            }
            counter ++;
        }
    }
    return newMatrix;
}

function AddColorTiles(){
    var idNum;
    var cName;
    var cell;
    
    for(var i=0;i<nCrossn;i++){        
        for(var j=1;j<=nCrossn;j++){
            idNum=(i*nCrossn)+j;            
            cell =document.getElementById("cell"+idNum);
            cell.className="grid-square";
            if(cell.innerText){
                
                cName="class"+parseInt(cell.innerText);
                cell.classList.add(cName);
            }else{
                cell.class="class0 grid-square";
            }
        }
    }
}


nameGrids(nCrossn);
startGame();
AddColorTiles();



document.onkeydown = function(e) {
    var cell;
    var oldMatrix = [];
    var newMatrix=[];
    
     switch (e.keyCode) {
            case 39:
            //Right            
                oldMatrix=getMatrix();                
                oldMatrix=rotateAntiClockWise(0,oldMatrix);
                newMatrix=printer(oldMatrix,0);                   
                addRandomTwo(newMatrix);
                AddColorTiles();
            break;
        
        case 37:
            //left
            oldMatrix=getMatrix();
            oldMatrix=rotateAntiClockWise(2,oldMatrix);
            newMatrix=printer(oldMatrix,2);
            addRandomTwo(newMatrix);
            AddColorTiles();
            break;
        case 38:
            //Up
            oldMatrix=getMatrix();
            oldMatrix=rotateAntiClockWise(3,oldMatrix);
            newMatrix=printer(oldMatrix,1);
            addRandomTwo(newMatrix);
            AddColorTiles();
            break;
        case 40:
            //Down
            oldMatrix=getMatrix();
            oldMatrix=rotateAntiClockWise(1,oldMatrix);
            newMatrix=printer(oldMatrix,3);
            addRandomTwo(newMatrix);
            AddColorTiles();
            break;
    }
};



