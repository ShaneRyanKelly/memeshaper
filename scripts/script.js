var click_count = 0;
var current_comic = 0;
var latest_comic = 0;

$(function() {
  homeclick();
});

$(".comic").click(function(event){
  comicclick();
});

$(".home").click(function(event){
  homeclick();
});

$(".store").click(function(event){
  storeclick();
});


$(".first").click(function(event){
  firstclick();
});

$('.previous').click(function(event){
  previousclick();
});

$('.next').click(function(event){
  nextclick();
});

$('.last').click(function(event){
  comicclick();
});

// comicclick controls both the comic button in nav bar
//  and the get latest button control
function comicclick(){
  $(".controls").css("visibility", "visible")
  if (current_comic <= latest_comic || latest_comic == 0)
  {
    $.ajax({
        type: "GET",
        url: "./scripts/getcomic.php",
        cache: false,
        success: function(result){
          result = JSON.parse(result)
          $('.canvas').html(result.latestcomic);
          console.log(result.latestcomicnum);
          current_comic = result.latestcomicnum;
          latest_comic = result.latestcomicnum;
        }
    });
  }
}

function homeclick(){
  $(".controls").css("visibility", "hidden")
  $.ajax({
      type: "GET",
      url: "./scripts/gethome.php",
      cache: false,
      success: function(result){
        $(".canvas").html(result);
      }
  });
}

function storeclick(){
  $(".controls").css("visibility", "hidden")
  $.ajax({
           type: "GET",
           url: "./scripts/getstore.php",
           cache: false,
           success: function(result){
                 console.log(result);
                 result = JSON.parse(result);
                 var itemname = '<h1>' + result[0].itemname + "</h1>";
                 var itemimg = '<img src="' + result[0].imagepath + '" class="img-thumbnail img-responsive" \>';
                 var itemdescription = '<h3>' + result[0].itemdescription + "</h3>";
                 var page = itemname+itemimg+itemdescription;
                 $('.canvas').html(page);
           }
  });
}

// calls backend for button controls on comic page
function firstclick(){
  if (current_comic > 2)
  {
    current_comic = 2;
    $.ajax({
      type: "GET",
      url: "./scripts/getprevious.php",
      data: {comicindex: current_comic},
      cache: false,
      success: function(result){
        result = JSON.parse(result)
        $('.canvas').html(result.requestedcomic);
        console.log(result.requestedcomicindex);
      }
    });
  }
}

function nextclick(){
  var nextcomic = current_comic + 1;
  if (current_comic < latest_comic)
  {
    $.ajax({
      type: "GET",
      url: "./scripts/getprevious.php",
      data: {comicindex: nextcomic},
      cache: false,
      success: function(result){
        result = JSON.parse(result)
        $('.canvas').html(result.requestedcomic);
        console.log(result.requestedcomicindex);
        current_comic = result.requestedcomicindex;
        current_comic = nextcomic;
      }
    });
  }
  else if (click_count >= 100){
    $('.canvas').html("<p>you have found the secret room!!!!</p>")
  }
  else{
    click_count++;
  }
}

function previousclick(){
  var previouscomic = current_comic - 1;
  if (current_comic > 2)
  {
    $.ajax({
      type: "GET",
      url: "./scripts/getprevious.php",
      data: {comicindex: previouscomic},
      cache: false,
      success: function(result){
        result = JSON.parse(result)
        $('.canvas').html(result.requestedcomic);
        console.log(result.requestedcomicindex);
        current_comic = result.requestedcomicindex;
        current_comic = previouscomic;
      }
    });
  }
  else if (click_count >= 100){
    $('.canvas').html("<p>you have found the secret room!!!!</p>")
  }
  else{
    click_count++;
  }
}
