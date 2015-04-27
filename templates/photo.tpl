<h1>{{albumName}}</h1>
<ul>
    {{#photos}}
    <li class="picture">
        <a href="{{& address}}"><img src="{{& address}}" alt="{{name}}" /></a>
    </li>
    {{/photos}}
</ul>
<div id="comments"></div>