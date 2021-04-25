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

function fetchItems(){
    fetch(itemsURL)
    .then(response => response.json())
    .then(response => {
        response.data.forEach(el => {
            let item = new Item(el)
            item.id = el.id
            item.name = el.attributes.name
            item.image = el.attributes.image
            item.description = el.attributes.description
            item.company = el.attributes.company
            item.renderItem()
        })
    })
}

fetchItems()

function fetchComments(){
    fetch(commentsURL)
    .then(response => response.json())
    .then(response => {
        response.forEach(el => {
            let comment = new Comment(el)
            comment.id = el.id
            comment.content = el.content 
            comment.item_id = el.item_id

            comment.renderComment()
        })
    })
}

fetchComments()

itemForm.addEventListener("submit", submitItem)

function submitItem(e){
    e.preventDefault()
    fetch(itemsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            image: imageInput.value,
            name: itemNameInput.value,
            company: companyNameInput.value,
            description: descriptionInput.value
        })
    })   
    .then(response => response.json())
    .then(item => {
        let newItem = new Item(item.data)
        newItem.renderItem()

        itemForm.reset()
    })
}

function submitComment(commentContent, commentList, itemID){
    fetch(commentsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            content: commentContent,
            item_id: itemID,
            commentList: commentList
        })
    })
    .then(response => response.json())
    .then(comment => {
        let newComment = new Comment(comment)
        Comment.allComments.push(newComment)
        newComment.renderComment(commentList)
    })
}
