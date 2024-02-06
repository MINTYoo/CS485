

async function getData(){
    let gameStart = true;
    try{
        const Data = await fetch("game.json")
        const getData = await Data.json()
        if(gameStart){
            gameStart = false
            let makeVisible = document.querySelectorAll(".input");
            makeVisible.forEach(ele =>{
                ele.style.visible = 'hidden'
                ele.style.display = 'block'
            })
        }

    }catch(err){
        console.log(err)
    }

}

function handleNext(){
    const next = document.getElementById('next')
    next.addEventListener("click", ()=>{
        
    })
}

getData()

