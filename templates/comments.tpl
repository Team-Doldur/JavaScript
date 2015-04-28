<div id="comments-container">
    <div id="comments-list">
        {{#comments}}
        <div class="comment">
            <div class="comment-text">
                {{text}}
            </div>
            <div class="comment-info">
                <p class="author">By <span>{{authorName}}</span></p>
                <p>{{date}}</p>
            </div>

        </div>
        {{/comments}}
    </div>
    <div id="comment-form">
        <form action="#/StoreComment" method="post">
            <input type="hidden" name="resourceType" value="{{resourceType}}"/>
            <input type="hidden" name="resourceId" value="{{resourceId}}"/>
            <label for="comment-text">Add comment</label>
            <textarea name="comment-text" id="comment-text" rows="5" style="width: 97%" required="required"></textarea>
            <label for="comment-author">Name</label>
            <input type="text" name="author" id="comment-author" required="required"/>
            <label for="comment-email">Email</label>
            <input type="email" name="email" id="comment-email" required="required"/>

            <button type="submit">Post</button>
        </form>
    </div>
</div>