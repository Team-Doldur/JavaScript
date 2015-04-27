<div id="comments-container">
    <div id="comments-list">
        {{#comments}}
        <div class="comment">
            <div class="comment-text">
                {{text}}
            </div>
            <div class="comment-info">
                <p class="author">By <span>{{authorName}}</span></p>
                <p>{{createdAt}}</p>
            </div>

        </div>
        {{/comments}}
    </div>
    <div id="comment-form">
        <form action="#/StoreComment" method="post">
            <label for="comment-text">Add comment</label>
            <textarea name="comment-text" id="comment-text" rows="5"  style="width: 97%"></textarea>
            <input type="hidden" name="resourceType" value="{{resourceType}}"/>
            <input type="hidden" name="resourceId" value="{{resourceId}}"/>
            <label for="comment-author">Name</label>
            <input type="text" name="author" id="comment-author"/>
            <label for="comment-email">Email</label>
            <input type="email" name="email" id="comment-email"/>

            <button type="submit">Post</button>
        </form>
    </div>
</div>