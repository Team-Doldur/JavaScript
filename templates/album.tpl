<style>
    .album-name, .album-author{
        display: inline-block;
    }
</style>
{{#albums}}
<div>
    <div class="album-name"><a href="#/Category/{{&category}}/{{&address}}">{{name}}</a></div>
    {{#author}}
        <div class="album-author">Published by: <a href="#/users/{{&name}}">{{name}}</a></div>
    {{/author}}
</div>
{{/albums}}
