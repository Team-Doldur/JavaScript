<div class="clearfix" style="margin-top: 30px">

    <!--Тук трябва да се зареждат категориите-->
    <div id="categories-container">Gategories</div>

    <div id="middle">
        <div id="album-info-container">
            <h1>{{name}}</h1>
            <p>
                Published by <span>{{author.username}}</span>
                on <span>{{createdAt}}</span>
            </p>
        </div>


        <!--Тук трябва да се зареждат снимките от албума-->
        <div id="pictures-in-album">Pictures in the album</div>
    </div>

    <div id="comments"></div>

</div>


<style>
    #categories-container, #middle, #comments {
        float: left;
    }

    #categories-container, #middle, #comments, #album-info-container, #pictures-in-album {
        border: 1px solid grey;
    }

    #categories-container, #comments {
        width: 20%;
        min-height: 580px;
    }

    #middle {
        width: 60%;
        min-height: 580px;
    }

    #pictures-in-album {
        min-height: 520px;
    }

    #categories-container, #pictures-in-album {
        color:red;
        font-size: 26px;
    }

    #album-info-container h1 {
        color: #0099e5;
        font-weight: normal;
        padding: 5px;
    }

    #album-info-container p {
        color: #888;
        font-size: 14px;
        font-style: italic;
        padding: 5px;
    }

</style>