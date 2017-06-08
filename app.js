const app = {
    init(selectors) {
        this.dinos =[]
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document.querySelector(selectors.formSelector).addEventListener('submit', this.addDino.bind(this))

        //focus in on an input box
        document.querySelector(selectors.formSelector).dinoName.focus()
//html5 way is adding autofocus in html as an attribute //required can be placed in html to require something in the input

    },

    addDino(ev) {
        ev.preventDefault()
        //const dinoName = ev.target.dinoName.value
        const dino = {//this creates an object with a name property, and id property
            id: this.max + 1,
            name: ev.target.dinoName.value,
        }
        //console.log(dino.name, dino.id)
        
        const listItem = this.renderListItem(dino)
        this.list.appendChild(listItem)
        //this.list.prepend(listItem) //not widely supported let's use a more supported way
        this.list.insertBefore(listItem, this.list.firstChild)
        //this.dinos.push(dino)//pushes dino to the array to the end

        //adding to the beginning of the array
        //unshift
        this.dinos.unshift(dino)



        
        ++ this.max
        ev.target.reset()


    },

    renderListItem (dino) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.datatset.id = dino.id
        
        item.querySelector('.dino-name').textContent = dino.name
        //const item = document.createElement('li')
        item.textContent = dino.name
        item.querySelector('button.remove').addEventListener('click', this.removeDino)
        
        return item
    },
    removeDino() {
        const listItem = ev.target.closest('.dino')//closest is not latest in support
        listItem.remove()
        //console.log('remove')
    },

}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
    templateSelector: '.dino.template',
})