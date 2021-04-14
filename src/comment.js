class Comment {
    constructor(comment){
        this.id = comment.id 
        this.content = comment.content 
        this.menu_item_id = comment.menu_item_id
    }

    static createComment(e){
        e.preventDefault()
        const li = document.createElement('li')
        const commentContent = e.target.children[0].value
        const commentList = e.target.previousElementSibling
        const menuItemID = e.target.parentElement.dataset.id

        Comment.submitComment(commentContent, commentList, menuItemID, li)
        e.target.reset()
    }

    renderComment(commentList){
        const li = document.createElement('li')
        li.className = "list-group-item"
        li.dataset.id = this.id
        li.innerText = this.content

        const lnbr = document.createElement('br')
        const deleteBtn = document.createElement('button')
        deleteBtn.className = "badge badge-pill badge-primary"
        deleteBtn.innerText = "Remove Comment"

        li.append(lnbr, deleteBtn)

        deleteBtn.addEventListener("click", this.deleteComment)
        commentList.appendChild(li)
    }


}