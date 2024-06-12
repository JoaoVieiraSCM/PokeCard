const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};

const mainFetch = () => {
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const input = document.getElementById("searchInput").value.toLowerCase();

    fetch(url+input)
    .then(response=>response.json())
    .then(json=>pokemon(json))
    .catch(error=>{console.log(error);alert("Este não é um pokemon, tente novamente!")})
}

const pokemon = (tudo) => {
    document.querySelector(".poke-name").innerText = tudo.forms[0].name;
    document.querySelector(".poke-photo").innerHTML = `<img src="${tudo.sprites.other.dream_world.front_default}"  style="width: 50%;height: auto;"/>`
    document.querySelector(".hp > span").innerText = tudo.stats[0].base_stat;
    document.querySelector(".attack").innerText = tudo.stats[1].base_stat;
    document.querySelector(".defense").innerText = tudo.stats[2].base_stat;
    document.querySelector(".weight").innerText = tudo.weight;
    document.getElementById("card").style = `background: radial-gradient(circle at 50% 0%, ${color(tudo.types[0].type.name)} 36%, transparent 36%);`;
    document.querySelector(".container").style = `border: 4px solid ${color(tudo.types[0].type.name)};`
    
    pokedex(tudo)

    document.getElementById("searchInput").value = '';

    deletar()
    document.querySelector(".counter").innerText = document.getElementById("pokemons-list").childElementCount;
}

const color = (type) => {
    for(let item in typeColor){
        if (type === item){
            return typeColor[item];
        }
    }
    return undefined;
}

//Trazer para o dialog a imagem e nome do pokemon (cópia do card)

//incrementar contador
const pokedex = (tudo) => {
    if (document.getElementById("searchInput").value != '' && verificar(tudo.forms[0].name)){
        const pokemonList = document.getElementById("pokemons-list");

        let li = document.createElement("li")
        li.className = 'pokemon-captured';
        li.innerHTML = 
        `<img src="${tudo.sprites.other.dream_world.front_default}" alt="${tudo.forms[0].name}">
        <p>${tudo.forms[0].name}</p>
        <button class="excluir">Soltá-lo</button>
        `

        pokemonList.appendChild(li);
    }
}

const verificar = (nome) => {
    const todos = document.querySelectorAll(".pokemon-captured > p");
    for(let p of todos){
        if(p.innerText === nome){
            alert("Aviso: Este pokémon já existe em sua pokedex!");
            return false
        }
    }
    return true
}


const deletar = () => {
    document.querySelectorAll(".excluir").forEach((atual)=>{
      atual.addEventListener("click",()=>{
          let pai = atual.parentElement;
          pai.parentElement.removeChild(pai);
          return alert(`${pai.children[1].innerText} foi solto!`);
      });
    })
}
