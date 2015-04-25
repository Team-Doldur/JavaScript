{{#albums}}
<div>
    <div class="album-name"><a href="#/Category/{{&category}}/{{&name}}">{{name}}</a></div>
    {{#author}}
        <div class="album-author"><a href="#/users/{{$author}}">{{author}}</a></div>
    {{/author}}
</div>
{{/albums}}
