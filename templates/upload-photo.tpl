<section>
    <div class="upload-photo">
        <div class="upload-btn">
            <label for="upload-photo">
                <input type="file" id="upload-photo"/>
            </label>
        </div>
        <div class="photo-details">
            <ul>
                <li>
                    <label for="photo-title">
                        <h4>Title</h4>
                    </label>
                    <input type="text" id="photo-title"/>
                </li>
                <li>
                    <label for="photo-category">
                        <h4>Category</h4>
                    </label>
                    <select name="" id="photo-category">
                        {{#categories}}
                        <option value="{{id}}">
                            <span>{{name}}</span>
                        </option>
                        {{/categories}}
                    </select>
                </li>
                <li>
                    <label for="photo-album">
                        <h4>Album</h4>
                    </label>
                    <select name="" id="photo-album">
                        {{#albums}}
                        <option>
                            <span>{{name}}</span>
                        </option>
                        {{/albums}}
                    </select>
                </li>
            </ul>

        </div>
        <div class="buttons">
            <a href="#/Photo">Cancel</a>
            <a href="#/Photo">Publish</a>
        </div>
    </div>
</section>