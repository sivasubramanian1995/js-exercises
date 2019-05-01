var pocketElem = document.getElementById('pocket');
pocketElem.addEventListener('click', clickEventHandler)

function clickEventHandler(event) {
    var selectedText = event.target.innerHTML;
    if((selectedText).match(/^(?=.*\d)(?=[aA]).[0-4]$/)) pushAndSort(event.target, 0)
    else if((selectedText).match(/^(?=.*\d)(?=[bB]).[0-4]$/)) pushAndSort(event.target,1)
    else if((selectedText).match(/^(?=.*\d)(?=[cC]).[0-4]$/)) pushAndSort(event.target, 2)
}

function pushAndSort(element, column) {
    var listOfColumn= Array.from(document.querySelectorAll('.classifiedColumn')[column].querySelectorAll("li:not(:first-child)"))
    listOfColumn.push(element);
    var Col = listOfColumn.sort(function(a, b){
        if (a.innerHTML.toLowerCase() < b.innerHTML.toLowerCase()) {return -1;}
        else  {return 1;}
    });
    Col.forEach(el => document.querySelectorAll('.classifiedColumn')[column].appendChild(el));
    if(!pocketElem.querySelectorAll('li').length) pocketElem.remove()
}