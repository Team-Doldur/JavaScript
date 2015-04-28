<div class="albums-container clearfix">
    {{#albums}}
    <a href="#/Category/{{&category}}/{{&address}}">
        <div class="album-info">
            <div class="album-name"><strong>{{name}}</strong></div>
        </div>
    </a>
    {{/albums}}
</div>
