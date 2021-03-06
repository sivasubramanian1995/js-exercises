const Templates = {}
const Listeners = {}
const Handlers  = {}

Listeners.authorView = () => {
    var elements = Array.from(document.querySelectorAll('.viewAuthor'))
    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            e.stopPropagation();
            Handlers.fetchAuthorData(e.target.getAttribute('data-userID'))
        });
    })
}

Listeners.scrollUp = () => {
    document.querySelector('.scrollUp').addEventListener('click', (e) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

Templates.listView = (data) => {
    return `<div class="cards">
        <span class="card-title ">${data.title}</span>
        <p>${data.body}</p>
        <a href="javascript:;" data-userID="${data.userId}" data-id="${data.id}" class="viewAuthor btn-custom">View Details</a>
    </div>`;
}

Templates.renderModalContent = (data) => {
    return `
        <div class="modal-content">
            <h4>${data.name}</h4>
            <p><strong>Username</strong> : ${data.username}</p>
            <p><strong>Company</strong> : ${data.company.name}</p>
            <p><strong>Phone</strong> : ${data.phone}</p>
            <p><strong>Email</strong> : ${data.email}</p>
            <p><strong>Website</strong> : ${data.website}</p>
            <p><strong>Address</strong> : ${data.address.suite}, ${data.address.street}, ${data.address.city} - ${data.address.zipcode}</p>
        </div>`;
}

Templates.noData = () => {
    return '<div class="nothing"></div>'
}

Templates.dead = () => {
    return '<div class="error"></div>'
}

Handlers.initializeList = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            return response.json();
        })
        .then(data => {
            if(data.length > 0) {
                data.forEach(val => {
                    document.querySelector('.app').innerHTML += Templates.listView(val)                
                });
                Listeners.authorView()    
            } else {
                document.querySelector('.app').innerHTML = Templates.noData()
            }
            document.querySelector('.progressbar').style.display='none'
        })
        .catch(ex => {
            console.log(ex);
            document.querySelector('.progressbar').style.display='none'
            document.querySelector('.app').innerHTML = Templates.dead()                
        })
}

Handlers.fetchAuthorData = (userId) => {
    if(localStorage.getItem(userId)) {
        Handlers.renderAuthorData(JSON.parse(localStorage.getItem(userId)))
    } else {
        document.querySelector('.progressbar').style.display='block';
        fetch('https://jsonplaceholder.typicode.com/users/'+userId)
            .then(response => {
                return response.json();
            })
            .then(data => {
                localStorage.setItem(userId, JSON.stringify(data))
                Handlers.renderAuthorData(data)
            })
            .catch(ex => {
                console.log(ex);
                document.querySelector('.progressbar').style.display='none'
                document.querySelector('.modal').innerHTML = Templates.dead()     
                var instance = M.Modal.init(document.querySelector('.modal'))
                instance.open();           
            })
    }
}

Handlers.renderAuthorData = (authorData) => {
    document.querySelector('.progressbar').style.display='none'
    if(Object.keys(authorData).length) {
        document.querySelector('.modal').innerHTML = Templates.renderModalContent(authorData);
    } else {
        document.querySelector('.modal').innerHTML = Templates.noData();
    }
    var instance = M.Modal.init(document.querySelector('.modal'))
    instance.open();
}

Handlers.initializeList();
Listeners.scrollUp();
localStorage.clear();
