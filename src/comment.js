class Comment {
    constructor(comment){
        this.id = comment.id 
        this.content = comment.content 
        this.item_id = comment.item_id
    }

    static createComment(e){
        e.preventDefault()
        const li = document.createElement('li')
        const commentContent = e.target.children[0].value
        const commentList = e.target.previousElementSibling
        const itemID = e.target.parentElement.dataset.id

        Comment.submitComment(commentContent, commentList, itemID, li)
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

    static submitComment(commentContent, commentList, itemID){
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

            const item = Item.allItems.find(c => parseInt(c.id) === newComment.item_id)
            Item.comments.push(newComment)

            newComment.renderComment(commentList)
        })
    }

    deleteComment(){
        const commentID = this.parentElement.dataset.id
        fetch(`${commentsURL}/${commentID}`,{
            method: "DELETE"
        })
        
        this.parentElement.remove()
    }
}