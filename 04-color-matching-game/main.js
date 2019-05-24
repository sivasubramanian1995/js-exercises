//Color matching game
const model = {
    uniqueColors : ['red', 'blue', 'green', 'teal', 'brown', 'violet', 'pink', 'black'],
    tileColors : [],
    tileLength: document.querySelectorAll('#board > li').length,
    counter: 0,
    tempElements: [] 
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
        controller.increaseCounter();
        if(!e.target.classList.contains("froze")) {
            let clickedIndex = (Array.from(e.currentTarget.children).indexOf(e.target))
            view.renderColor(model.tileColors[clickedIndex], e.target);
            model.tempElements.push(e.target)
            if(model.tempElements.length >= 2) {
                setTimeout(() => {
                    if(controller.checkColorsSimilarity(model.tempElements)) {
                        controller.freeze(model.tempElements)
                    } else {
                        view.resetToOriginal();
                    }
                    model.tempElements = []    
                }, 200);
            } 
        }
    },
    checkColorsSimilarity : (arr) => (arr[0].style.backgroundColor === arr[1].style.backgroundColor),
    freeze : (arr) => {
        arr[0].classList.add('froze'); arr[1].classList.add('froze');
        controller.isEnd();
    },
    isEnd : () => {
        let lists  = document.querySelectorAll('#board > li:not(.froze)');
        if(!lists.length) {
            document.getElementsByTagName('h3')[0].style.display = 'none';
            document.getElementsByTagName('h4')[0].style.display = 'block';
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
        let lists  = document.querySelectorAll('#board > li:not(.froze)');
        lists.forEach(elem => {
            view.renderColor('#CCC', elem)
        })
    }
}
view.init();