//Color matching game
const model = {
    uniqueColors : ['red', 'blue', 'green', 'teal', 'brown', 'violet', 'pink', 'black'],
    tileColors : [],
    tileLength: document.querySelectorAll('#board > li').length,
    counter: 0 
};

const controller = {
    createTiles : (arr) => {
        for(let i =0; model.tileColors.length < model.tileLength; i++ ) {
            let tempSelection = model.uniqueColors[Math.floor(Math.random() * model.uniqueColors.length)];
            if((controller.count(model.tileColors, tempSelection) < 2) || (controller.count(model.tileColors, tempSelection) == undefined))
                model.tileColors.push(tempSelection)
        }
    },
    count(arr, val) {
        let temp =  arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
        return temp[val]
    },
    increaseCounter: () => view.renderSteps(++model.counter),
    clickHandler : (e) => {
        if(!e.target.classList.contains("froze")) {
            let clickedIndex = (Array.from(e.currentTarget.children).indexOf(e.target))
            view.renderColor(model.tileColors[clickedIndex], e.target);
        }
    }
}

const view = {
    init: () => {
        controller.createTiles(model.uniqueColors)
        document.getElementById('board').addEventListener('click', controller.clickHandler)
    },
    renderSteps: (counter) => {
        document.getElementById('steps').innerHTML = `Steps: ${counter}`;
    }, 
    renderColor : (color, elem) => {
        elem.style.backgroundColor = color; 
    }, 
    resetToOriginal : () => {

    }
}
view.init();