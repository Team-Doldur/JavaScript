<section>
    <div class="signup-wrap">
        <div class="upload-photo">
            <div class="photo-details">
                <ul>
                    <li>
                        <label for="album-title">
                            <h4>Title</h4>
                        </label>
                        <input type="text" id="album-title" placeholder="Album name"/>
                    </li>
                    <li>
                        <label for="album-category">
                            <h4>Category</h4>
                        </label>
                        <select name="" id="album-category">
                            {{#categories}}
                            <option value="{{id}}">
                                <span>{{name}}</span>
                            </option>
                            {{/categories}}
                        </select>
                    </li>
                </ul>

            </div>
            <div class="buttons clearfix">
                <!--<a class="cancel-btn" href="#/">Cancel</a>-->
                <a class="submit-btn" id="new-album" href="#/NewAlbum">Publish</a>
            </div>
        </div>
    </div>
</section>
