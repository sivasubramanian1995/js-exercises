const model = {
    pocketElem:  document.getElementById('pocket'),
    listX: (column) => Array.from(document.querySelectorAll('.classifiedColumn')[column].querySelectorAll("li:not(:first-child)"))
}

const controller = {
    actionHandler: (event) => {
        let selectedText = event.target.innerHTML;
        if((selectedText).match(/^(?=.*\d)(?=[aA]).[0-4]$/)) controller.pushAndSort(event.target, 0)
        else if((selectedText).match(/^(?=.*\d)(?=[bB]).[0-4]$/)) controller.pushAndSort(event.target,1)
        else if((selectedText).match(/^(?=.*\d)(?=[cC]).[0-4]$/)) controller.pushAndSort(event.target, 2)
    },
    pushAndSort: (element, column) => {
        let list = model.listX(column)
        list.push(element)
        view.updateColumns(list.sort(function(a, b){
            if (a.innerHTML.toLowerCase() < b.innerHTML.toLowerCase()) {return -1;}
            else  {return 1;}
        }), column)
        if(!model.pocketElem.querySelectorAll('li').length) view.removePocketElem()
    }

}

const view = {
    updateColumns: (arr, column) => arr.forEach(el => document.querySelectorAll('.classifiedColumn')[column].appendChild(el)),
    removePocketElem: () => model.pocketElem.remove()
}

model.pocketElem.addEventListener('click', controller.actionHandler)