class MenuItem {
    static allMenuItems = []

    constructor(menuItem){
        this.id = menuItem.id 
        this.name = menuItem.attributes.name
        this.image = menuItem.attributes.image 
        this.description = menuItem.attributes.description
        this.company = menuItem.attributes.company
        this.comments = menuItem.attributes.comments

        MenuItem.allMenuItems.push(this)
        this.renderMenuItem()
    }

    static renderMenuItems(menuItems) {
        menuItemList.innerHTML = ""
        for (let menuItem of menuItems){
            menuItem.renderMenuItem()
        }
    }

    static fetchMenuItems(){
        fetch(menuItemsURL)
        .then(response => response.json())
        .then(menuItems => {
            for(let menuItem of menuItems.data){
                let newMenuItemList = new MenuItem(menuItem)
            }
        })
    }


    renderMenuItem(){
        const menuItemLI = document.createElement('li')

        menuItemLI.dataset.id = this.id 
        menuItemList.appendChild(menuItemLI)

        const h3 = document.createElement('h3')
        h3.className=("card-header")
        h3.innerText = this.name 

        const h4 = document.createElement('h4')
        h4.className=("card-subtitle")
        h4.innerText = this.company

        const img = document.createElement('img')
        img.src = this.image 
        img.width = 250 
        
        const p = document.createElement('p')
        p.className=("card-text")
        p.innerText = this.description

        const deleteBtn = document.createElement("button")
        deleteBtn.className = "btn btn-primary btn-sm"
        deleteBtn.innerText = "Remove Hidden Eat"
        deleteBtn.addEventListener("click", this.deleteMenuItem)
    }
}