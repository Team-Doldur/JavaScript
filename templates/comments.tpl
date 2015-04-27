<div id="comments-container" style="clear: both;">
    <div id="comments-list">
        {{#comments}}
        <div class="comment">
            <div>
                {{text}}
            </div>
            <div>
                By <span>{{authorName}}</span>
                on <span>{{createdAt}}</span>
            </div>

        </div>
        {{/comments}}
    </div>
    <hr/>
    <div id="comment-form">
        <form action="#/StoreComment" method="post">
            <label for="comment-author">Name</label>
            <input type="text" name="author" id="comment-author"/>
            <label for="comment-email">Email</label>
            <input type="email" name="email" id="comment-email"/>
            <label for="comment-text">Comment</label>
            <textarea name="comment-text" id="comment-text" rows="5" cols="28"></textarea>
            <button type="submit">Post Comment</button>
        </form>
    </div>
</div>
<style>
    #comments-container {
        padding: 10px;
    }

    #comment-form {
    }

    #comment-form label {
        color: #0099e5;
        font-size: 14px ;
        margin-bottom: 10px;
    }

    #comment-form input {
        font-size: 14px;
        padding: 8px 10px;
        color: #525558;
        border: 1px solid #ccc;
        width: 100%;
    }

    #comment-text {
        display: block;
        border: 1px solid #ccc;
    }

    #comment-form button {
        color: #fff;
        border-radius: 3px;
        padding: 5px 15px;
        font-weight: bold;
        background-color: #0099e5;
        border: 1px solid #08c;
        text-shadow: 0px 1px 0px #08c;
        cursor: pointer;
    }

    #comment-form input, #comment-text {
        margin-bottom: 10px;
    }
</style>