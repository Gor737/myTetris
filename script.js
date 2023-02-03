let box = document.querySelector(".box")
let score = document.querySelector('.points')
let activScore = 0
let gameSpeed = 500
let id = null 




//zone

let playZone = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]


//figures

let figures ={
    O: [
        [1,1],  
        [1,1]
    ],
    T:[
        [1,1,1],  
        [0,1,0],
        [0,0,0]
    ],
    L:[
        [0,1,0],  
        [0,1,0],
        [0,1,1]
    ],
    J:[
        [0,1,0],  
        [0,1,0],
        [1,1,0]
    ],
    S:[
        [0,1,1],  
        [1,1,0],
        [0,0,0]
    ],
    Z:[
        [1,1,0],  
        [0,1,1],
        [0,0,0]
    ],
    I:[
        [0,1,0,0],  
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
}


let figuresArr = [figures['O'], figures['T'], figures['L'], figures['J'], figures['S'], figures['Z'], figures['I']]


//get figure

function getRandomFigure(arr){
   let figure = arr[Math.floor(Math.random() * 7)]
   return figure
}


let activTetro = {
    y: 0,
    x: 6,
    zone: [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ]
}

function addActivTetro(){
    removeOldTetro()
    for(let y = 0; y < activTetro.zone.length; y++){
        for(let x = 0; x < activTetro.zone[y].length; x++){
           if(activTetro.zone[y][x]){
            playZone[activTetro.y + y][activTetro.x + x] = activTetro.zone[y][x]
           }
        }
    }
}


function removeOldTetro(){
   for(let y = 0; y < playZone.length; y++){
       for(let x = 0; x < playZone[y].length; x++){
           if(playZone[y][x] === 1){
            playZone[y][x] = 0
           }
       }
    }
}



            //Stugum

function hasMove(){
    for(let y = 0; y < activTetro.zone.length; y++){
        for(let x = 0; x < activTetro.zone[y].length; x++){
            if((activTetro.zone)[y][x] && playZone[activTetro.y + y] === undefined ||
            (activTetro.zone)[y][x] && playZone[activTetro.y][activTetro.x + x] === undefined ||
            (activTetro.zone)[y][x] && playZone[activTetro.y + y][activTetro.x + x] === 2 ){
                return true
            }
        }
    }
    return false
}



               // draw playZone
 draw()
 addActivTetro()
 draw()


               // autoDown

function startGame(){
   autoDown()
   draw()
   setTimeout(startGame,gameSpeed)
}

 setTimeout(startGame,1000)




function autoDown(){
    activTetro.y += 1
            
    if(hasMove()){
        activTetro.y -= 1
        fixedPose()
        activTetro.zone = getRandomFigure(figuresArr)
        activTetro.x = 6
        activTetro.y = 0
        if(hasMove()){
            alert('GAME OVER')
            restart()
        }
    }

    addActivTetro()
        draw()
}




               //TetrisDraw

function draw(){

   main = ''
   for(let y = 0; y < playZone.length; y++){
      for(let x = 0; x < playZone[y].length; x++){
   
         if(playZone[y][x] === 1){
            main += `<div class = "nestedBox red"></div>`
         } else if(playZone[y][x] === 2){
            main += `<div class = "nestedBox yellow"></div>`
         } else {
            main += `<div class = "nestedBox"></div>`
         }
      }
   }
   
   box.innerHTML = main
}





          // down

function onKeyDown(event){
    if(event.key == "ArrowDown"){
            activTetro.y += 1
            
        if(hasMove()){
            activTetro.y -= 1
            fixedPose()
            activTetro.zone = getRandomFigure(figuresArr)
            activTetro.x = 6
            activTetro.y = 0
        }

        addActivTetro()
            draw()
    }
}

document.body.addEventListener('keydown', onKeyDown)




           // right

function onKeyRight(event){
    if(event.key == "ArrowRight"){
        activTetro.x += 1

        if(hasMove()){
            activTetro.x -= 1
        }

        addActivTetro()
        draw()
    }
}

document.body.addEventListener('keydown', onKeyRight)



           // left

function onKeyLeft(event){
    if(event.key == "ArrowLeft"){
        activTetro.x -= 1

        if(hasMove()){
            activTetro.x += 1
        }

        addActivTetro()
        draw()
    }
}

document.body.addEventListener('keydown', onKeyLeft)




// Remove Line

function removeLine(){
  let lines = 0

   for(let y = 0; y < playZone.length; y++){
      let canRemove = true
      for(let x = 0; x < playZone[y].length; x++){
         if(playZone[y][x] !== 2){
             canRemove = false
             break
         }
      }
      if(canRemove){ 
        playZone.splice(y,1)
        playZone.unshift([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]) 
        lines++
      }
    }

   switch(lines){
    case 1:
        activScore += 100
        break
    case 2:
        activScore += 300
        break
    case 3:
        activScore += 500
        break
    case 4:
        activScore += 700
        break
    default:
        break
   }

   score.innerHTML = activScore

   if(activScore >= 500 && activScore <= 1000){
    gameSpeed = 300
   } else if(activScore >= 1000 && activScore <= 1500){
    gameSpeed = 250
   } else if(activScore >= 1500 && activScore <= 2000){
    gameSpeed = 170
   }  else if(activScore > 2000){
    gameSpeed = 100
   }
   
}




// Fixation 

function fixedPose(){
      for(let y = 0; y < playZone.length; y++){
         for(let x = 0; x < playZone[y].length; x++){
               if(playZone[y][x] === 1){
               playZone[y][x] = 2
            }
         }
      }
      removeLine()
      //getRandomFigure(figuresArr)()
}










//Rotate

function rotate(){
    let activPose = activTetro.zone

    activTetro.zone = activTetro.zone[0].map((el,i) => 
        activTetro.zone.map((e) => e[i]).reverse()
  )

  if(hasMove()){
    activTetro.zone = activPose
  }
}

function onKeyE(event){
    if(event.key == "e" || event.key == "E"){
       rotate()
       addActivTetro()
       draw()
    }
}

document.body.addEventListener('keydown', onKeyE)




//Drop

function drop(){
    for(let y = 0; y < playZone.length; y++){
        activTetro.y += 1
        if(hasMove()){
            activTetro.y -= 1
            break
        }
    }
}


function onKeySpace(event){
    if(event.code == 'Space'){
       drop()
       addActivTetro()
       draw()
    }
}

document.body.addEventListener('keydown', onKeySpace)



// restart

function restart(){
    for(let y = 0; y < playZone.length; y++){
        for(let x = 0; x < playZone[y].length; x++){
            if(playZone[y][x]){
                playZone[y][x] = 0
            }
        }
    }
    activScore = 0
    gameSpeed = 500
    score.innerHTML = activScore
}