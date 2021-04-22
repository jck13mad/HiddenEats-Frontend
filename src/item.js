class Item {
    static allItems = []

    constructor(item){
        this.id = item.id 
        this.name = item.attributes.name
        this.image = item.attributes.image 
        this.description = item.attributes.description
        this.company = item.attributes.company
        this.comments = item.attributes.comments

        Item.allItems.push(this)
        this.renderItem()
    }

    static renderItems(items) {
        itemList.innerHTML = ""
        for (let item of items){
            item.renderItem()
        }
    }

    static fetchItems(){
        fetch(itemsURL)
        .then(response => response.json())
        .then(items => {
            for(let item of items.data){
                let newItemList = new Item(item)
            }
        })
    }


    renderItem(){
        const itemLI = document.createElement('li')

        itemLI.dataset.id = this.id 
        itemList.appendChild(itemLI)

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
        deleteBtn.addEventListener("click", this.deleteItem)

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

        itemLI.append( h3, h4, img, p, commentForm, commentList, deleteBtn)
    }

    static submitItem(e){
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
            itemForm.reset()
        })
    }

    deleteItem(){
        const itemID = this.parentElement.dataset.id

        fetch(`${itemsURL}/${itemID}`,{
            method: "DELETE"
        })
        this.parentElement.remove()
    }
}