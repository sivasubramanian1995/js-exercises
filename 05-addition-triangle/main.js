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
        document.querySelector('.output').innerHTML = "";                                
        document.querySelector('.output').style.display = 'block';
        Model.setModifiedInput(Model.initialInput);
        for(let i = 0; i < Model.initialInput.length; i++) {
            Model.setPrevLevels(Model.modifiedInput, i)
            Controller.calculateNextLevel(Model.modifiedInput);
        }
        Model.prevLevel.forEach((val, index) => {
            var el = '';
            val.forEach((val2, index2) => {       
                var space = '&nbsp;';   
                if(index2 != 0)
                    el += space.repeat(val.length)
                el += val2;   
            })
            // setTimeout(() => {
                var div = document.createElement('div');  
                div.innerHTML = '<span class="list_'+index+'"  style="display: none;">'+el + '<br/>'.repeat(2) + '</span>'
                document.querySelector('.output').prepend(div)                              
            // }, 500*index);
        })
        Model.prevLevel.forEach((val, index) => {
            setTimeout(() => {
                document.querySelector('.list_'+index).style.display = 'block';
            }, 500*index);
        })

    }
}

Controller.serveView();
