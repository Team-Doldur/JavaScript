<section>
    <div class="signup-wrap">
        <div class="upload-photo">
            <div class="upload-btn">
                <label class="button button-large" for="upload-photo">
                    Browse photo
                    <input type="file" id="upload-photo"/>
                </label>
            </div>
            <div class="photo-details">
                <ul>
                    <li>
                        <label for="photo-title">
                            <h4>Title</h4>
                        </label>
                        <input type="text" id="photo-title" placeholder="img"/>
                    </li>
                    <li>
                        <label for="photo-category">
                            <h4>Category</h4>
                        </label>
                        <select name="" id="photo-category">
                            <option value="Ld3TEqHmpQ" selected>Uncategorized</option>
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
            <div class="buttons clearfix">
                <a class="cancel-btn" href="#/Photo">Cancel</a>
                <a class="submit-btn" href="#/Photo">Publish</a>
            </div>
        </div>
    </div>
</section>