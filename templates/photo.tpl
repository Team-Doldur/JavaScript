<div id="album-wrapper" class="clearfix">
    <div class="photos-container">
        <h1>Album: </span>{{albumName}}</h1>
        <ul class="clearfix">
            {{#photos}}
            <li class="picture">
                <a href="{{& address}}"><img src="{{& address}}" alt="{{name}}" /></a>
            </li>
            {{/photos}}
        </ul>
    </div>
    <div id="comments"></div>
</div>