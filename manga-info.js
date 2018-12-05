'use strict'

$(function(){
    
   const leftContainer = document.getElementById('left');
   const rightContainer = document.getElementById('right');
   const chapterTable = document.createElement("table"); 
   const descriptionBox = document.getElementById("description");
   const descriptionText = document.createElement("p");
   const titleText = document.createElement("h1");
   const mangaImage = document.createElement("img");
   
   chapterTable.setAttribute('class', 'chapterTable');  
   leftContainer.appendChild(chapterTable);
   descriptionBox.appendChild(titleText);
   descriptionBox.appendChild(descriptionText);
   rightContainer.appendChild(mangaImage);
    
    var mangaChapterEndPoint = 'https://www.mangaeden.com/api/manga/';
    var mangaid = getQueryVariable("clickedid");
    console.log (mangaid);
    fetchChapters(mangaid).then(function(data){ 
                  console.log(data);  
                  var chapters = data.chapters;
                  var description = data.description;
                  var mangaTitle = data.title;
                  var image = data.image;
                  description.replace(/\n/g, " ");
                  renderChapters(chapters);
                  renderDescriptionTitle(mangaTitle, description);
                  renderCoverImage(image);
             });
    
    
    
    function renderCoverImage(image) {
        mangaImage.src = 'https://cdn.mangaeden.com/mangasimg/' + image;
    }
    
    function renderDescriptionTitle(title, description) {
        
        titleText.textContent = title;
        descriptionText.textContent = description;
    }
    
    function renderChapters(chapters) {
           
        for (var index in chapters) {
            var currentChapter = chapters[index][2];
            var currentChapterDate = new Date(chapters[index][1]*1000).toDateString();
            console.log(currentChapter);
           
            var row = chapterTable.insertRow();
            var cell = row.insertCell();
            var cell2 = row.insertCell()
            cell.textContent = currentChapter;   
            cell2.textContent = currentChapterDate;
            chapterTable.appendChild(row);
        }
        
    }
    
    function fetchChapters(id) { 
        return $.get(mangaChapterEndPoint + id);
    } 
    
    function getQueryVariable(id) {
        var query = window.location.search.substring(1);
        return query.split("=")[1];
    }
    
    function handleError() {
        console.error(error);
    }
    
    
    
    
    
    
});