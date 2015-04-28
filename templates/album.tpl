<div class="albums-container clearfix">
    {{#albums}}
    <a href="#/Category/{{&category}}/{{&address}}">
        <div class="album-info">
            <div class="album-name">{{name}}</div>
        </div>
    </a>
    {{/albums}}
</div>
