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


}