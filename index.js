import characterData from '/data.js'
import Character from '/Character.js'

let monstersArray = ["Pete", "Baby", "Zurg"];
let iswaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    if(!iswaiting) {
        wizard.getDiceHtml()
        monster.getDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()

        if(wizard.dead) {
            endGame()
        }
        else if(monster.dead){
            iswaiting = true
            if(monstersArray.length > 0){
                setTimeout(() => {
                    monster = getNewMonster()
                    render()
                    iswaiting = false
                }, 1000)
            }
            else{
                endGame()
            }
        }
    }
    
}

function endGame() {
    iswaiting = true 
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "Buzz Wins" :
            "The monster is Victorious"

    const endEmoji = wizard.health > 0 ? " 🚀 " : "☠️"

    setTimeout(() => {
        document.body.innerHTML = `
        <div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>
        ` 
    }, 1200)                
  
}

document.getElementById('attack-button').addEventListener("click", attack)

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(characterData.Buzz)
let monster = getNewMonster()
render()








