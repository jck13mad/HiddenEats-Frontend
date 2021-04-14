const menuItemsURL = "http://localhost:3000/menuItems"
const commentsURL = "http://localhost:3000/comments"
const menuItemForm = document.getElementById("menu-item-form")
const imageInput = document.getElementById("input-image-url")
const menuItemNameInput = document.getElementById("input-menu-item-name")
const companyNameInput = document.getElementById("input-company-name")
const descriptionInput = document.getElementById("input-description")
const menuItemList = document.getElementById("menu-item-list")
const searchBar = document.getElementById("searchBar")

searchBar.addEventListener("keyup", function(e){
    const searchInput = e.target.value.toLowerCase()
    const searchResult = MenuItem.allMenuItems.filter(menuItem => {
        if (menuItem.name.toLowerCase().includes(searchInput)){
            return true
        } 
    })
    MenuItem.renderMenuItems(searchResult)
})

menuItemForm.addEventListener("submit", MenuItem.submitMenuItem)

MenuItem.fetchMenuItems()