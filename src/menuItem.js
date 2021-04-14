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

        const commentForm = document.createElement('form')
        commentForm.innerHTML += `<input type="text"  class="form-control" id="comment-input" placeholder="Comment Here">
        <input type="submit" class="btn btn-primary btn-sm" value="Add">`

        commentForm.addEventListener("submit", Comment.createComment)

        const commentList = document.createElement("ul")
        commentList.className = "list-group list-group-flush"
        commentList.dataset.id = this.id

        this.comments.forEach(comment => {
            let newComment = new Comment(comment)
            newComment.renderComment(commentList)
        })

        menuItemLI.append( h3, h4, img, p, commentForm, commentList, deleteBtn)
    }

    static submitMenuItem(e){
        e.preventDefault()
        fetch(menuItemsURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                image: imageInput.value,
                name: menuItemNameInput.value,
                company: companyNameInput.value,
                description: descriptionInput.value
            })
        })   
        .then(response => response.json())
        .then(menuItem => {
            let newMenuItem = new MenuItem(menuItem.data)
            menuItemForm.reset()
        })
    }

    deleteMenuItem(){
        const menuItemID = this.parentElement.dataset.id

        fetch(`${menuItemsURL}/${menuItemID}`,{
            method: "DELETE"
        })
        this.parentElement.remove()
    }
}