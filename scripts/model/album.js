var app = app || {};

define(['q', 'requestHandler'], function(Q){
    var categoryUrl;

    categoryUrl = "classes/Category";
    app.album = (function(){
       function Album(name, author, category){
           this.name = name;
           this.author = author;
           this.category = new app.category
       }
    });

    function setCategory(name){

    }
    function getCategoryByName(name){
        var categoriesRequest = app.categoryData.load("https://api.parse.com/1/");
        categoriesRequest.getCategories();
        var categories = categoriesRequest.caregoriesData.categories;

    }
});