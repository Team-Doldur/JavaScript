<h1><span id="comment-count">{{comments.length}}</span> Comments</h1>
<div id="comments-list">
    {{#comments}}
    <div class="comment">
        <div>
            By <span>{{author.username}}</span>
            on <span>{{createdAt}}</span>
        </div>
        <div>
            {{text}}
        </div>
    </div>
    {{/comments}}
</div>
<hr/>
<form action="">
    <label for="comment-author">Name</label>
    <input type="text" name="author" id="comment-author" style="border: 1px solid #000; display: block;"/>
    <label for="comment-email">Email</label>
    <input type="email" name="email" id="comment-email" style="border: 1px solid #000; display: block;"/>
    <label for="comment-text">Comment</label>
    <textarea name="comment-text" id="comment-text" cols="100" rows="10" style="border: 1px solid #000; display: block;"></textarea>
    <button type="submit">Post Comment</button>
</form>