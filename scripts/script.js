var click_count = 0;

var current_comic = 0;
var latest_comic = 0;

var current_daily = 0;
var latest_daily = 0;

var page = "";

$(function() {
  homeclick();
});

// event listeners for nav-button clicks
$(".comic").click(function(event){
  comicclick();
});

$(".daily").click(function(event){
  dailyclick();
});

$(".home").click(function(event){
  homeclick();
});

$(".store").click(function(event){
  storeclick();
});

// event listeners for on-screen control clicks
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
  if (page === "comic")
  {
    comicclick();
  }
  else if (page === "daily")
  {
    dailyclick();
  }
});

// comicclick controls both the comic button in nav bar
//  and the get latest button control
function comicclick(){
  $(".controls").css("visibility", "visible");
  page = "comic"
  if (current_comic <= latest_comic || latest_comic == 0)
  {
    $.ajax({
        type: "GET",
        url: "./scripts/getcomic.php",
        cache: false,
        success: function(result){
          result = JSON.parse(result)
          $('.canvas').html(result.latestcomic);
          //console.log(result.latestcomicnum);
          current_comic = result.latestcomicnum;
          latest_comic = result.latestcomicnum;
        }
    });
  }
}

function dailyclick(){
  $(".controls").css("visibility", "visible");
  page = "daily";
  if (current_comic <= latest_comic || latest_comic == 0)
  {
    $.ajax({
      type: "GET",
      url: "./scripts/getdaily.php",
      cache: false,
      success: function(result){
        result = JSON.parse(result)
        $('.canvas').html(result.latestdaily);
        current_daily = result.latestdailynum;
        latest_daily = current_daily;
      }
    });
  }
}

function homeclick(){
  $(".controls").css("visibility", "hidden");
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
  $(".controls").css("visibility", "hidden");
  $.ajax({
           type: "GET",
           url: "./scripts/getstore.php",
           cache: false,
           success: function(result){
                 //console.log(result);
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
  if (page === "comic")
  {
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
          //console.log(result.requestedcomicindex);
        }
      });
    }
  }
  else if (page === "daily")
  {
    if (current_daily > 2)
    {
      current_daily = 2;
      $.ajax({
        type: "GET",
        url: "./scripts/getold.php",
        data: {dailyindex: current_daily},
        cache: false,
        success: function(result){
          result = JSON.parse(result)
          $('.canvas').html(result.latestdaily);
          //console.log(result.requestedcomicindex);
        }
      });
    }
  }

}

function nextclick(){
  if (page === "comic")
  {
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
          //console.log(result.requestedcomicindex);
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
  else if (page === "daily")
  {
    var nextdaily = current_daily + 1;
    if (current_daily < latest_daily)
    {
      $.ajax({
        type: "GET",
        url: "./scripts/getold.php",
        data: {dailyindex: nextdaily},
        cache: false,
        success: function(result){
          result = JSON.parse(result)
          $('.canvas').html(result.latestdaily);
          //console.log(result.requestedcomicindex);
          current_daily = result.latestdailynum;
          current_daily = nextcomic;
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
}

function previousclick(){
  if (page === "comic")
  {
    var nextcomic = current_comic - 1 ;
    if (current_comic > 2)
    {
      $.ajax({
        type: "GET",
        url: "./scripts/getprevious.php",
        data: {comicindex: nextcomic},
        cache: false,
        success: function(result){
          result = JSON.parse(result)
          $('.canvas').html(result.requestedcomic);
          //console.log(result.requestedcomicindex);
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
  else if (page === "daily")
  {
    var nextdaily = current_daily - 1;
    if (current_daily > 2)
    {
      $.ajax({
        type: "GET",
        url: "./scripts/getold.php",
        data: {dailyindex: nextdaily},
        cache: false,
        success: function(result){
          result = JSON.parse(result)
          $('.canvas').html(result.latestdaily);
          //console.log(result.requestedcomicindex);
          current_daily = result.latestdailynum;
          current_daily = nextdaily;
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
}
