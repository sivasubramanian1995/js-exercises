const model = {
    pocketCurrentLength: document.getElementById('pocket').querySelectorAll('li').length,
    col0: [],
    col1: [],
    col2: []
}

const controller = {
    actionHandler: (event) => {
        var selectedText = event.target.innerHTML;
        if((selectedText).match(/^(?=.*\d)(?=[aA]).[0-4]$/)) controller.sortAndPush(event.target, 0)
        else if((selectedText).match(/^(?=.*\d)(?=[bB]).[0-4]$/)) controller.sortAndPush(event.target, 1)
        else if((selectedText).match(/^(?=.*\d)(?=[cC]).[0-4]$/)) controller.sortAndPush(event.target, 2)    
    },
    sortAndPush: (element, column) => {
        model['col'+column].push(element)
        let list = model['col'+column].sort(function(a, b){
            if (a.innerHTML.toLowerCase() < b.innerHTML.toLowerCase()) {return -1;}
            else  {return 1;}
        })
        view.renderLists(column)
        model.pocketCurrentLength--
        if(model.pocketCurrentLength == 0) view.removePocket()
    }
}

const view = {
    renderLists: (col) => model['col'+col].forEach(el => document.querySelectorAll('.classifiedColumn')[col].appendChild(el)),
    removePocket: () => document.getElementById('pocket').remove()
}

document.getElementById('pocket').addEventListener('click', controller.actionHandler)