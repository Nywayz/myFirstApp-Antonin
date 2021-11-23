if(localStorage.getItem("cachedTop")){
    console.log(localStorage.getItem("cachedTop"))
}

const linkToTop = `
<div>
    Bonjour monsieur __name__ !
    <button onClick="goToMain()">Vers la liste </button>
</div>
`

const focusedElement = `
<div>
    <div>
        <img style="height: 80px" src="__img__"/ alt="__alt__">
    </div>
    <div>__number__. __title__</div>
</div><br/>
`

const createTopElement = `
<div class="topElement"@>
    Lien vers l'image : <input type="text" class="elementLink" value="__oldImg__">
    Titre : <input type="text" class="elementTitle" value="__oldTitle__">
</div>
`

const alink = `<a onclick="goToFocus(__id__)">__title__</a><br/>`

const main = document.getElementById("main")

const htmlToElement = (html) => {
    const template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  };


const mainPageLinks = () => {

    let links = ``
    let link = ''
    let topList = JSON.parse(localStorage.getItem("top"))
    console.log(topList)

    if (topList.elements.length > 0){
        topList.elements.map(function(item){
            link = alink.replace("__id__", item.id).replace("__title__", item.title)
            links += link
        })
    }
    else {
        links = `<div>Vous n'avez pas encore créé de liste !</div>`
    }

    return htmlToElement('<div>'+links+'</div>')
}

function goToMain() {
    main.innerHTML = ""
    main.appendChild(htmlToElement('<button onclick="goToCreate()">+</button>'))
    main.appendChild(mainPageLinks())

    return null
}

function goToFocus(id) {
    document.getElementById("main").innerHTML = ""

    let topList = JSON.parse(localStorage.getItem("top"))
    let focusedTop = ""
    let focusedTopList = ""

    for(let i = 0; i < topList.elements.length; i++){
        if(topList.elements[i].id == id) {
            focusedTopList = topList.elements[i]
            break
        }
    }

    let actuN = 1
    focusedTopList.elements.map(function(item){
        console.log(item)
        focusedTopElement = focusedElement.replace("__img__", item.link).replace("__number__", actuN).replace("__alt__", item.title).replace("__title__", item.title)
        focusedTop += focusedTopElement
        actuN++
    })

    main.appendChild(htmlToElement('<button onclick="goToMain()">Retour</button>'))
    main.appendChild(htmlToElement("<h2>"+focusedTopList.title+"</h2>"))
    main.appendChild(htmlToElement("<div>"+focusedTop+"</div>"))

    


    return null
}

const addTopElement = () => {
    main.appendChild(htmlToElement(createTopElement.replace("__oldImg__", "").replace("__oldTitle__", "")))
}

function goToCreate() {
    document.getElementById("main").innerHTML = ""
    let content = ""

    if(localStorage.getItem("cachedTop")){
        cachedTop = localStorage.getItem("cachedTop")
        main.appendChild(htmlToElement('Titre : <input type="text" id="topTitle" value="'+cachedTop.title+'">'))

        cachedTop.elements.map(function(item){
            content = createTopElement.replace("__oldImg__", item.img).replace("__oldTitle__", item.title)

            main.appendChild(htmlToElement(content))
        })
        main.appendChild(htmlToElement('<button onclick="addCachedTop()">Valider</button>'))

        return false
    }
    main.appendChild(htmlToElement('<button onclick="goToMain()">Retour</button>'))
    main.appendChild(htmlToElement('<br/>'))
    main.appendChild(htmlToElement('Titre : '))
    main.appendChild(htmlToElement('<input type="text" id="topTitle"/>'))
    main.appendChild(htmlToElement('<br/>'))
    main.appendChild(htmlToElement('<button onclick="addTopElement()">Ajouter un élément</button>'))
    main.appendChild(htmlToElement('<button onclick="addCachedTop()">Valider</button>'))
    main.appendChild(htmlToElement('<br/>'))
    addTopElement()

    return false

}

goToTop = (id) => {
    console.log(id)
}

//   const fetchApiDone = (json) => {
//     const divList = document.getElementById("list");
//     json.forEach((manga, i) => {
//       const newDivManga = divManga
//         .replace("__link__", manga.link)
//         .replace("__src__", manga.img)
//         .replace("__top__", i + 1)
//         .replace("__title__", manga.name)
//         .replace("__description__", manga.description);
//       divList.appendChild(htmlToElement(newDivManga));
//     });
//   };