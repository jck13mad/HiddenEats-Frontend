const itemsURL = "http://localhost:3000/items"
const commentsURL = "http://localhost:3000/comments"
const itemForm = document.getElementById("item-form")
const imageInput = document.getElementById("input-image-url")
const itemNameInput = document.getElementById("input-item-name")
const companyNameInput = document.getElementById("input-company-name")
const descriptionInput = document.getElementById("input-description")
const itemList = document.getElementById("item-list")
const searchBar = document.getElementById("searchBar")

searchBar.addEventListener("keyup", function(e){
    const searchInput = e.target.value.toLowerCase()
    const searchResult = Item.allItems.filter(item => {
        if (item.name.toLowerCase().includes(searchInput)){
            return true
        } 
    })
    Item.renderItems(searchResult)
})

itemForm.addEventListener("submit", Item.submitItem())

Item.fetchItems()