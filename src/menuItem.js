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

    static renderMenuItems(menuItem) {
        menuItemList.innerHTML = ""
        for (let menuItem of menuItems){
            menuItem.renderMenuItem()
        }
    }

    static fetchMenuItems(){
        fetch(menuItemsURL)
        .then(response => response.json())
        .then(menuItems => {
            for(let menuItem in menuItems.data){
                let newMenuItemList = new MenuItem(menuItem)
            }
        })
    }
    
}