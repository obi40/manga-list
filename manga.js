    'use strict'
    $(function(){

    const app = document.getElementById("root");
    const latest_updates = document.createElement("h1");
    latest_updates.setAttribute("id", "latest");
    app.appendChild(latest_updates);
    latest_updates.textContent = "Latest updates";
    const container = document.createElement("div");
    container.setAttribute('class', 'container'); 
    app.appendChild(container);   
    var mangalist = {};    
    var mangaListEndPoint = 'https://www.mangaeden.com/api/list/0/';    
    var badimage = 'https://cdn1.iconfinder.com/data/icons/file-type-18/512/file__type__document__format__computer__jpg__image_-512.png';    
    var limitedmangalist;
    var today  = new Date().getTime()/1000; 
    console.log(today);
    var d = new Date();
    d.setDate(d.getDate() - 2);
    var tda = d.getTime()/1000;
        
    //Begin
    fetchManga().then(function (data, status){
        if(status == 'success'){ 

           remapManga(data);
           limitmangalist();
           renderManga(); 
            
           $("body").on("click", "img", function(event){ 
              var clickedCard = $(this);
              var clickedCardId = clickedCard.data('id')
               window.open("manga-info.html?clickedid=" + clickedCardId);
               
           });
            
             $("body").on("click", ".btn", function(event){ 
               
                var input = document.getElementById("search").value;
                 
                 var id = searchMangaList(input);
                 console.log(id);
                 window.open("manga-info.html?clickedid=" + id);
               
           });
            
           
            
        }

        
        
        else {
            handleError();
        }

    });   

    function searchMangaList(input) {
        for (var index in mangalist) {
            var currentManga = mangalist[index];
            if(currentManga.title == input || currentManga.alias == input) {
                return currentManga.id;
            }
        }
    }    
        
    function limitmangalist() {
      limitedmangalist = Object.keys(mangalist).slice(0, 1000).reduce(function(newObj, current){
          newObj[current] = mangalist[current];
          return newObj;
      }, {});
      };                                                                                                                   
    function renderManga(){
    for (var index in mangalist){
        
        var currentManga = mangalist[index];
        if(currentManga.lastChapterDate <= today && currentManga.lastChapterDate >= tda){
        const card = document.createElement("div");
        card.setAttribute('class', 'card');
        const coverImage = $('<img>', {'src': 'https://cdn.mangaeden.com/mangasimg/' + currentManga.image});
        coverImage.on("error", function() {
        $(this).attr('src', badimage);
        });        
        coverImage.data('id', currentManga.id);
        const h1 = document.createElement("h1");
        h1.textContent = currentManga.title;
        container.appendChild(card);
        coverImage.appendTo(card);
        card.appendChild(h1);
    };
    }
    }
    function fetchManga() {
        return $.get(mangaListEndPoint);
    }
        
    function remapManga(data){
        for (var index = 0; index < data.manga.length; index++){
            var currentManga = data.manga[index];
            mangalist[currentManga.i] = {
                'title': currentManga.t, 
                'id': currentManga.i, 
                'alias': currentManga.a,
                'status': currentManga.s,
                'category': currentManga.c,
                'lastChapterDate': currentManga.ld,
                'hits': currentManga.h,
                'image': currentManga.im,
                
            };
            
        };
     }
        
    function handleError() {
        console.error(error);
    } 

    });

