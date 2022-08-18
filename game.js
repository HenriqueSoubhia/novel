const textElement = document.querySelector("#text")
const optionButtonsElement = document.querySelector("#option-buttons")
let davi = ["imagens/davi-normal.png", "imagens/davi-feliz.png", "imagens/davi-fala.png"]

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerHTML = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
  if (textNode.img == "") {
    document.querySelector("#character-end").style.display = "none"
  } else {
    document.querySelector("#character-end").style.display = "block"
    document.querySelector("#character-end").src = textNode.img
  }
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Você está no seu primeiro dia de aula em sua escola nova',
    img: "",
    options: [
      {
        text: 'proximo',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "Andando pelos corredores você se depara com um homem a distância",
    img: "",
    options: [
      {
        text: 'proximo',
        nextText: 3
      }
    ]
  }, 
  {
    id: 3,
    text: 'Logo vocês se aproximam, ele está com uma camiseta preta, que destaca muito seus gigante músculos',
    img: davi[0],
    options: [
      {
        text: 'proximo',
        nextText: 4
      }
    ]
  }, 
  {
    id: 4,
    text: 'Com sua GIGANTESCA escápula esbarra em você,te derrubando',
    img: davi[0],
    options: [
      {
        text: 'proximo',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'Você fica tonta e tenta se levantar, o homem estende a sua mão oferecendo ajuda, e te diz:',
    img: davi[1],
    options: [
      {
        text: 'proximo',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: 'nem te via aí, meu whey com leite, quer ajuda?',
    img: davi[2],
    options: [
      {
        text: 'aceita a ajuda',
        nextText: 10
      },
      {
        text: 'ignorar',
        nextText: 10
      }
    ]
  },
]

startGame()