const app = {
    init(selectors) {
        this.dinos =[]
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document.querySelector(selectors.formSelector).addEventListener('submit', this.addDinoFromForm.bind(this))

        //focus in on an input box
        document.querySelector(selectors.formSelector).dinoName.focus()
        
        this.load()
//html5 way is adding autofocus in html as an attribute //required can be placed in html to require something in the input

    },

    load () {
        //load the JSON from localStorage
        const dinoJSON = localStorage.getItem('dinos')
        //convert the JSCON back into an array
        const dinoArray = JSON.parse(dinoJSON)
        //set this.dinos with the dinos from that array
        if (dinoArray) {
        dinoArray.reverse().map(this.addDino.bind(this))
        }
    },

    addDino(dino) {
        const listItem = this.renderListItem(dino)
        //this.list.appendChild(listItem)
        //this.list.prepend(listItem) //not widely supported let's use a more supported way
        this.list.insertBefore(listItem, this.list.firstChild)
        //this.dinos.push(dino)//pushes dino to the array to the end

        //adding to the beginning of the array
        //unshift
        this.dinos.unshift(dino)
        this.save()

        ++ this.max
    },

    addDinoFromForm(ev) {//rename of addDino
        ev.preventDefault()
        //const dinoName = ev.target.dinoName.value
        const dino = {//this creates an object with a name property, and id property
            id: this.max + 1,
            name: ev.target.dinoName.value,
        }
        //console.log(dino.name, dino.id)
        
        //const listItem = this.renderListItem(dino)
        //this.list.appendChild(listItem)
        //this.list.prepend(listItem) //not widely supported let's use a more supported way
        //this.list.insertBefore(listItem, this.list.firstChild)
        //this.dinos.push(dino)//pushes dino to the array to the end

        //adding to the beginning of the array
        //unshift
        //this.dinos.unshift(dino)
        //this.save()
        //localStorage.setItem('dinos', JSON.stringify(this.dinos))
        this.addDino(dino)
        
        ev.target.reset()
    },

    save() {
        localStorage.setItem('dinos', JSON.stringify(this.dinos))
    },

    renderListItem (dino) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.datatset.id = dino.id
        
        item.querySelector('.dino-name').textContent = dino.name
        //const item = document.createElement('li')
        //item.textContent = dino.name
        item.querySelector('button.remove').addEventListener('click', this.removeDino.bind(this))
        
        return item
    },
    removeDino(ev) {
        const listItem = ev.target.closest('.dino')//closest is not latest in support
        listItem.remove()

        for (let i=0; i < this.dinos.length; i++) {
            const currentId = this.dinos[i].id.toString()
            if (listItem.dataset.id === currentId) {
                this.dinos.splice(i, 1)
                
                break;
                //console.log('found it')
            } 
        }
        this.save()

        //this.dinos.splice(?, 1)
        //console.log('remove')
    },

}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
    templateSelector: '.dino.template',
})