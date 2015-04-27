<div class="main-content clearfix">
    <div class="categories-container">
        <h4>All categories</h4>
        <ul>
            {{#categories}}
            <li>
                <a href="#/Category/{{& address}}" id="{{& id}}">{{name}}</a>
            </li>
            {{/categories}}
        </ul>
    </div>
    <div id="albums" class="clearfix"></div>
</div>
