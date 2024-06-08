// Declarando a url

let currentPageUrl = 'https://valorant-api.com/v1/agents';


// Toda vez que a página for carregada e recarregada, rodar essa função:

window.onload = async () => {   
    try{
        await loadCharacters(currentPageUrl);
    } catch(Error){
        console.log(Error);
        alert('Erro ao carregar informações dos cards.');
    }
};

// O que a função loadCharacters fará ao ser rodado, no qual tem como objetivo limpar o conteúdo ao dar reload na page.

async function loadCharacters(url){
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';  // Limpa os resultados anteriores, manipulando o texto de um determinado elemento HTML.

// Try e Catch: Armazenamento dos resultados da requisição / Iteração com o Array / conversão de dados para Json.

    try{
        const response = await fetch(url);
        const responseJson = await response.json(); 

        // Transcrevendo o HTML para JS:
        
        responseJson.data.forEach((character) => {   
            const card = document.createElement("div")
            card.style.backgroundImage = `url(${character.fullPortrait})`           
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")        
            characterName.className = "character-name"
            characterName.innerText = `${character.displayName}`     

            // Inserção de elementos:

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)
            
            // Colocando elementos dentro de modal ao clicar nos cards:

            card.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";

                const modalContent = document.getElementById("modal-content")  // getElementByClassName 
                modalContent.innerHTML = ''

                const characterImage = document.createElement("img");  // Foto do personagem
                characterImage.src = character.killfeedPortrait;
                characterImage.className = "character-image";

                const characterClassIcon = document.createElement("img"); // Ícone da Classe
                characterClassIcon.src = character.role.displayIcon;
                characterClassIcon.className = "character-roleIcon";

                const characterClass = document.createElement("span");  // Título de apresentação das habilidades -> Abilities
                characterClass.className = "character-details";
                characterClass.innerText = `${character.role.displayName}`;
            
                const characterRole = document.createElement("span");  // Nome da Classe pertencente -> Ex: Initiator
                characterRole.className = "character-classDetails";
                characterRole.innerText = `${character.role.displayName}`;

                const chararacterRoleDescription = document.createElement("div");  // Descrição das classes
                chararacterRoleDescription.className = "character-role-description";
                chararacterRoleDescription.innerText = `${character.role.description}`;
                chararacterRoleDescription.style.maxHeight = "200px";
                chararacterRoleDescription.style.overflowY = "auto";
                
                const characterAbilities = document.createElement("span");  // Titulo de habilidades -> Abilities
                characterAbilities.className = "character-abilities";
                characterRole.innerText = "Abilities: ";

                // Adiciona as habilidades como listagem
                character.abilities.forEach((ability) => {
                    const abilityItem = document.createElement("p");
                    abilityItem.innerText = ability.displayName;
                    characterAbilities.appendChild(abilityItem);
                });

                modalContent.appendChild(characterImage);
                modalContent.appendChild(characterClassIcon);
                modalContent.appendChild(characterClass);
                modalContent.appendChild(characterRole);
                modalContent.appendChild(chararacterRoleDescription);
                modalContent.appendChild(characterAbilities);
            };
            
            const mainContent = document.getElementById('main-content');
            mainContent.appendChild(card)
            
        });
        
        currentPageUrl = url

    }catch(error){
        alert('Erro ao carregar os personagens.')
        console.log(error)
    }
}


function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
  }