<div class="albums-container clearfix">
    {{#albums}}
    <a href="#/Category/{{&category}}/{{&address}}">
        <div class="album-info">
            <div class="album-name">{{name}}</div>
            {{#author}}
                <div class="album-author">Published by: <a href="#/users/{{&name}}">{{name}}</a></div>
            {{/author}}
        </div>
    </a>
    {{/albums}}
</div>
