function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

document.addEventListener('DOMContentLoaded', () => {
    for(var i = 0; i < 6; i++){
        const random = getRandomInt(1, 151)
        fetchData(random)
    }
    
})

const fetchData = async (id) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        
        const pokemon = {
            img: data.sprites.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[3].base_stat,
            defensa: data.stats[2].base_stat,
        }
        

        drawCard(pokemon)
    } catch(error){
        console.log("error")
    }
}

const drawCard = (pokemon) => {
    console.log(pokemon)

    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template_card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()
    
    clone.querySelectorAll('.card .card_body_img')[0].setAttribute('src', pokemon.img)
    clone.querySelectorAll('.card_body_title')[0].innerHTML = `${pokemon.nombre} <span>${pokemon.hp}hp</span>`
    clone.querySelectorAll('.card_body_text')[0].textContent = pokemon.experiencia + ' Exp'
    clone.querySelectorAll('.card_footer_s h3')[0].textContent = pokemon.ataque + ' K'
    clone.querySelectorAll('.card_footer_s h3')[1].textContent = pokemon.especial + ' K'
    clone.querySelectorAll('.card_footer_s h3')[2].textContent = pokemon.defensa + ' K'

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}
