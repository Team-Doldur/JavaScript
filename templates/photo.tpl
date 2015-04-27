<ul>
    {{#photos}}
    <li>
        <a href="{{& address}}"><img src="{{& address}}" alt="{{name}}" style="width: 200px; height: 200px; float: left;"/></a>
    </li>
    {{/photos}}
</ul>