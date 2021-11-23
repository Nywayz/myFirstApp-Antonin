function updateCachedTop(){
    if(document.getElementsByName("topElement") && document.getElementsByClassName("elementTitle") && document.getElementsByClassName("elementLink")){
        let cachedTopValues = []
        for(let i = 0; i < document.getElementsByClassName("topElement").length; i++){
            let content = {
                title : document.getElementsByClassName("elementTitle")[i].value,
                link : document.getElementsByClassName("elementLink")[i].value
            }
            cachedTopValues.push(content)
        }

        let cachedTop = {
            title: document.getElementById("topTitle").value,
            elements : []
        }

        cachedTopValues.map(function(item){
            cachedTop.elements.push({
                "title": item.title,
                "link": item.link
            })
        })

        console.log(cachedTop)
        
        localStorage.setItem("cachedTop", JSON.stringify(cachedTop))   
    }
    else console.log("Wrong way")
}

function removeCachedTop(){
    localStorage.removeItem("cachedTop")
}

function addCachedTop(){
    if (document.getElementById('topTitle').value != ''){
        updateCachedTop()
        actualTop = JSON.parse(localStorage.getItem("top"))
        cachedTop = JSON.parse(localStorage.getItem("cachedTop"))
    
        actualTop.elements.push({
            id: actualTop.nextId,
            title: cachedTop.title,
            elements: cachedTop.elements
        })
    
        actualTop.nextId += 1
    
        localStorage.setItem("top", JSON.stringify(actualTop))
        localStorage.removeItem("cachedTop")
    }
    else {
        alert("Veuillez rentrer un titre pour votre top")
    }
}