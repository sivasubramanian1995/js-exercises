// Triangle
const Model = {
    initialInput : [],
    modifiedInput : [],
    prevLevel: [],
    setModifiedInput : value => {
        Model.modifiedInput = value;
    },
    setinitialInput : value => {
        Model.initialInput = value;
    },
    setPrevLevels : (value, level) => {
        Model.prevLevel[level] = value;
    }
}

const Controller = {
    serveView : () => {
        if(Model.initialInput.length)
            View.renderTriangle()
        else 
            View.init();
    },
    formSubmitListener : (e) => {
        e.preventDefault(); 
        Model.setModifiedInput([]);
        Model.prevLevel = [];
        Model.setinitialInput( (document.getElementById('num').value).trim().split(' ') );
        Controller.serveView();
    },
    calculateNextLevel(currentLevel) {
        Model.setModifiedInput([])
        for(let i = 0; i < currentLevel.length; i++) {
            if(currentLevel[i+1] !== undefined) {
                Model.modifiedInput.push(parseInt(currentLevel[i]) + parseInt(currentLevel[i+1]))
            }
        }
    }
}

const View = {
    promptInput : () => {
        document.querySelector('.formGroup').style.display = 'block'
        document.querySelector('.output').style.display = 'none'
    },
    init : () => {
        View.promptInput();
        document.getElementById('inputForm'),addEventListener('submit', Controller.formSubmitListener)
    },
    renderTriangle : () => {
        // document.querySelector('.formGroup').style.display = 'none';
        document.querySelector('.output').innerHTML = "";                                
        document.querySelector('.output').style.display = 'block';
        Model.setModifiedInput(Model.initialInput);
        for(let i = 0; i < Model.initialInput.length; i++) {
            Model.setPrevLevels(Model.modifiedInput, i)
            Controller.calculateNextLevel(Model.modifiedInput);
        }
        Model.prevLevel.reverse();
        Model.prevLevel.forEach((val, index) => {
            val.forEach(val2 => {       
                var space = '&nbsp;';   
                document.querySelector('.output').innerHTML += space.repeat(index) + val2 + space.repeat(index);                                
            })
            document.querySelector('.output').innerHTML += '<br/>'.repeat(2);                                
        })

    }
}

Controller.serveView();
