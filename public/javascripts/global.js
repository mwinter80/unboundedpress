// TODO: see why you can not seek soundcloud player
// TODO: make all file i/o rest independent
// TODO: ditch restheart completely???
// Userlist data array for filling in info box
upcomingCount = 0
upcomingLoadedCount = 0;

// DOM Ready =============================================================
$(document).ready(function() {

  if (window.location.href.split('/').pop().split('.').pop() != "pdf") {
    populatePieces('primary');
    populatePieces('secondary');
    populatePublications();
    populateReleases();
    populatePerformances(2019, 'composer', true);
    populateTalks(2019, true);
    populateAbout();

    populateGallerySelector();
    if (window.location.href.split('/').pop().substring(0,3) != "#lg") {
      window.history.replaceState("object or string", "Title", "/");
  }  
}

  $( window ).resize(function() {
    resetDivHeights();
  });

  $(function() {
    $( document ).tooltip();
  });

  $(document).on('click','.scroll-to-div', function(event) {
    event.preventDefault();
    var target = "#" + this.getAttribute('data-target');
    $('html, body').animate({
      scrollTop: $(target).offset().top - 210
    }, 500);
    //window.history.pushState("object or string", "Title", this.getAttribute('data-target'));
  });

  $(window).scroll(function(event) {
    $(".header").css("margin-left", 0 - $(document).scrollLeft());
  });

  $('ul#piecesmiscworkslist').hide();
  $('#pieces .btn_less').hide();
  $('#pieces .btn_more').click(function(){
    $('ul#piecesmiscworkslist').show();
    $('#pieces .btn_more').hide();
    $('#pieces .btn_less').show();
    resetDivHeights();
  });
  $('#pieces .btn_less').click(function(){
    $('ul#piecesmiscworkslist').hide();
    $('#pieces .btn_less').hide();
    $('#pieces .btn_more').show();
    resetDivHeights();
  });

  embedAudioGallery(false);

  for (i = new Date().getFullYear(); i > 2000; i--){
    $('#yearpicker').append($('<option />').val(i).html(i));
  }

  $('#yearpicker').on('change', function() {
    $("#performanceeventslist").empty();
    //populatePerformances(parseInt(this.value), $('#eventtypepicker').val(), false);
    populatePerformances(parseInt(this.value), 'composer', false);
  });

  /*
  $('#eventtypepicker').append($('<option />').val('composer').html('as composer/artist'));
  $('#eventtypepicker').append($('<option />').val('performer').html('as performer/guest'));

  $('#eventtypepicker').on('change', function() {
    $("#performanceeventslist").empty();
    populatePerformances(parseInt($('#yearpicker').val()), this.value, false);
  });
*/

  $("img").load(function() {
    alert($(this).height());
    alert($(this).width());
  });

});

// Functions =============================================================
BASE_URL='https://restheart.unboundedpress.org';
//BASE_URL='https://dev2.unboundedpress.org';
//BASE_URL='http://127.0.0.1:8080';

function resetDivHeights(){

  //$('#pieces').height($('#writings').height() + 100);
  //$('#pieces').height($('#releases').height());
  //$('#releases').height($('#writings').height());

  $('#pieces').css('height', '1850px');
  //if($('#writings').height() >= $('#releases').height()){
  //  $('#pieces').height($('#writings').height());
  //} else {
  //  $('#pieces').height($('#releases').height());
  //}

  $('#talks').css('height', 'auto');
  $('#performances').css('height', 'auto');
  if($('#talks').height() >= $('#performances').height()){
    $('#events').height($('#talks').height());
    $('#performances').css('height', '100%');
  } else {
    $('#events').height($('#performances').height());
    $('#talks').css('height', '100%');
  }

}

function openAudioPlayer(data){

  $('#galleryPlayer').css('background-color', '#FDFDFD')

  if (data.soundcloud_secret){
    $('#galleryPlayer').html("<iframe id=sc_gallery width='325' height='110' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/"+data.soundcloud_trackid+"?secret_token="+data.soundcloud_secret+"&show_artwork=true&auto_play=true&maxheight=110&'></iframe>");
  } else {
    $('#galleryPlayer').html("<iframe id=sc_gallery width='325' height='110' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/"+data.soundcloud_trackid+"&show_artwork=true&auto_play=true&maxheight=110&'></iframe>");
  }

  var widget = SC.Widget('sc_gallery');

  widget.bind(SC.Widget.Events.FINISH, function() {
    embedAudioGallery(true);
  });
}

function embedAudioGallery(autoplay) {

  $('#galleryPlayer').css('background-color', '#FDFDFD')

  var uniqueRandoms = [];
  var numRandoms = 15;
  function makeUniqueRandom() {
    // refill the array if needed
    if (!uniqueRandoms.length) {
      for (var i = 0; i < numRandoms; i++) {
        uniqueRandoms.push(i);
      }
    }
    var index = Math.floor(Math.random() * uniqueRandoms.length);
    var val = uniqueRandoms[index];

    // now remove that value from the array
    uniqueRandoms.splice(index, 1);

    return val;
  }

  $('#galleryPlayer').html("<iframe id=sc_gallery class=audioGalleryFrame width='325' height='110' scrolling='yes' frameborder='no' src='https://w.soundcloud.com/player/?url=https://api.soundcloud.com/playlists/164294640&show_artwork=true&auto_play=true&maxheight=110&'></iframe>");

  var widget = SC.Widget('sc_gallery');

  widget.bind(SC.Widget.Events.READY, function() {
    widget.skip(makeUniqueRandom());
    if(!autoplay){
      widget.pause();
      widget.seekTo(0);
    }
  });

  widget.bind(SC.Widget.Events.FINISH, function() {
    widget.skip(makeUniqueRandom());
  });
}

function embedVideoGallery() {
  $.getScript('https://vimeo.com/api/v2/mwinter/videos.json?callback=embedVideoGallerySlider');
}

function embedVideoGallerySlider(videos) {

  $('#galleryPlayer').css('background-color', 'black')

  $('#galleryPlayer').html("");
  $('#galleryPlayer').append("<ul id='videogallerylist'>");

  for (var i = 0; i < videos.length; i++) {
    var iframe = "<div class='video-inner'><iframe id=vimeo_gallery class=videoGalleryFrame src='https://player.vimeo.com/video/"+videos[i].id+"?color=44bbff&amp;background=000000&amp;slideshow=0&amp;video_title=true&amp;video_byline=1' width='300px' height='140px' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>";

    var galleryli = $("<li id=videogallery_li_item_"+i+">").append(iframe);
    $('ul#videogallerylist').prepend(galleryli);
  }

  $('ul#videogallerylist').lightSlider({
    item:1,
    loop:true,
    pager: false,
    enableDrag: false,
    auto:true,
    pauseOnHover: true
  });
}

function openVideoPlayer(data){

  $('#galleryPlayer').html("<iframe id=vimeo_gallery class=videoGalleryFrame src='//player.vimeo.com/video/"+data.vimeo_trackid+"?autoplay=1&portrait=0&color=44bbff&amp;background=000000&amp;video_title=1&amp;video_byline=1' width='325' height='140' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>");

}

function embedImageGallery() {

  $('#galleryPlayer').css('background-color', 'black')
  $('#galleryPlayer').html("");
  $('#galleryPlayer').append("<ul id='imagegallerylist'>");

  $.getJSON(BASE_URL + '/unboundedpress/image_gallery/_aggrs/image_gallery?pagesize=200', function(data) {
    var objCount = 0
    var len=Object.keys(data._embedded).length;
    $.each(data._embedded, function(index, data){

      var galleryli;

      var img, thumb, head;
      img = data.img;
      thumb = data.thumb;
      if (typeof thumb === 'undefined' ) {
        thumb = img;
      } else if (thumb.length === 0 ) {
        thumb = img;
      }
      if (img) {
        var imgsrc = BASE_URL + "/unboundedpress/images.files/" + img._id['$oid'] +"/binary";
        var thumbsrc = BASE_URL + "/unboundedpress/images.files/" + thumb._id['$oid'] +"/binary";

        galleryli = $("<li id=imagegallery_li_item"+index+" href='"+imgsrc+"' data-download-url='/images/"+data.image+"'>'");
        $('ul#imagegallerylist').prepend(galleryli);
        galleryli.append($('<div>').addClass('video-inner').append($('<img>').attr({src: thumbsrc}).css('max-height','100%').css('max-width','100%')));
      }

      objCount++;
      if(objCount == len){

        $('ul#imagegallerylist').lightSlider({
          item:1,
          loop:true,
          pager: false,
          enableDrag: false,
          auto:true,
          pauseOnHover: true,
          //adaptiveHeight:true,
          onSliderLoad: function(el) {
            el.lightGallery({
              selector: '#imagegallerylist .lslide',
              galleryId: 'images_gallery'
            });
          }
        });

      }

    });
  });

}

function alterDate(date) {
  //this sets from given time
  //var offset = new Date().getTimezoneOffset();
  //date.setHours(date.getHours() + (offset / 60));

  //this sets from end of day
  date.setHours(23, 59, 0, 0);
  //var offset = new Date().getTimezoneOffset();
  //date.setHours(date.getHours() + (offset / 60));
  return date;
}

function formatISODate(isoDate) {
  var date = new Date(isoDate['$date']);
  //date = alterDate(date);
  return ("0" + (date.getMonth() + 1)).slice(-2) + "." + ("0" + date.getDate()).slice(-2) + "." + date.getFullYear();
}

function formatISOYear(isoDate) {
  var date = new Date(isoDate['$date']);
  return date.getFullYear();
}

function formatDate(date) {
  var date = new Date(date);
  var offset = new Date().getTimezoneOffset();

  //not clear why we need to offet this one and not the other
  date.setHours(date.getHours() + (offset / 60));
  date = alterDate(date);

  return ("0" + (date.getMonth() + 1)).slice(-2) + "." + ("0" + date.getDate()).slice(-2) + "." + date.getFullYear();
}

function openToggle(toggle){
  if(toggle){
    toggle.text("-");
  }
}

function closeToggle(toggle){
  if(toggle){
    toggle.text("+");
  }
}

function populatePieces(type) {
  var apiurl, listid, yearCount = 2100, imageGalleryCount = 0;
  if(type == 'primary'){
    apiurl = BASE_URL + "/unboundedpress/works/_aggrs/high_priority_works?pagesize=200";
    listid = 'ul#piecesworkslist'
  } else {
    apiurl = BASE_URL + "/unboundedpress/works/_aggrs/low_priority_works?pagesize=200";
    listid = 'ul#piecesmiscworkslist'
  }
  $.getJSON(apiurl, function(data) {

    if(type != 'primary'){
      $(listid).addClass('content-list').append($('<li>').append('miscellany').addClass('year_span'));
    }

    var objCount = 0;
    var len=Object.keys(data._embedded).length;

    $.each(data._embedded, function(index, data){

      var head, year, workli, work_data, score_data, image_data;

      work_data = data.work_data;
      score_data = data.score_data;
      image_data = data.image_data;

      head = $('<div>').addClass('header_span').css('width','90%')
      .append($('<span>').addClass('header_piece').append($('<h4>').append('<i>'+work_data.title+'</i>')));

      year = formatISOYear(work_data.date);
      if(type == 'primary' && yearCount > parseInt(year)) {
        $(listid).addClass('content-list').append($('<li>').append(year).addClass('year_span'));
        yearCount = parseInt(year);
      };

      workli = $('<li id=work_li_item'+index+'>');
      $(listid).addClass('content-list').append(workli.append(head));

      var audioButton, videoButton, documentButton, icons, doc;
      if (data.score_data) {
        documentButton = $('<button id=piece_document_button_'+index
        +" data-iframe='true' data-src='/scores/" + score_data.filename + "' data-download-url=''/scores/" + score_data.filename + "'>")
        .attr({title: "view"}).addClass('score_icon');

        documentButton.lightGallery({
          selector: 'this',
          width: '90%',
          hash: false,
          galleryId: "score_viewer_"+index
        });

        if(typeof doc != 'undefined'){
			} else{
        documentButton.on('onSlideItemLoad.lg', function(event, index){
           window.history.replaceState(null, null, "/scores/" + score_data.filename);
        });

        documentButton.on('onCloseAfter.lg', function(event, prevIndex, index){
            window.history.replaceState("object or string", "Title", "/");
        })

        }

      } else {
        documentButton = $('<button id=piece_document_button_'+index+">").attr({title: "score"}).addClass('score_icon');
        documentButton.css('visibility', 'hidden');
      }

      audioButton = $('<button id=piece_audio_button_'+index+'>').attr({title: "audio"}).addClass('audio_icon');
      if (typeof work_data.soundcloud_trackid === 'undefined') {
        audioButton.css('visibility', 'hidden')
      } else {
        audioButton.click(function() {
          openAudioPlayer(work_data);
        });
      };

      videoButton = $('<button id=piece_video_button_'+index+'>').attr({title: "video"}).addClass('video_icon');
      if (typeof work_data.vimeo_trackid === 'undefined') {
        videoButton.css('visibility', 'hidden')
      } else {
        videoButton.click(function() {
          openVideoPlayer(work_data);
        });
      };

      imageButton = $('<button id=piece_image_button_'+index+'>').attr({title: "images"}).addClass('photo_icon');
      if (typeof work_data.images === 'undefined') {
        imageButton.css('visibility', 'hidden')
      } else {
        imageButton.click(function() {

          var objCount = 0;
          var len=image_data.length;
          var srcList=[];
          $.each(image_data, function(index, image){
            var src = BASE_URL + "/unboundedpress/images.files/" + image._id['$oid'] +"/binary";
            srcList.push({"src":src})
            objCount++;
            if(objCount == len){
              $(this).lightGallery({
                dynamic: true,
                dynamicEl: srcList,
                galleryId: 'work_image_gallery_'+parseInt(imageGalleryCount)
              });

            }
          });
        });
      };

      icons = $('<span>').addClass('icon_span_piece').append([documentButton, audioButton, videoButton, imageButton]);
      head.append(icons);

      objCount++;
      if(objCount == len){
        resetDivHeights();
      }

    });
  });
}

function populateReleases() {

  $.getJSON(BASE_URL + "/unboundedpress/releases/_aggrs/releases?pagesize=200", function(data) {
    var objCount = 0
    var len=Object.keys(data._embedded).length;
    $.each(data._embedded, function(index, data){

      var releaseli;

      releaseli = $('<li id=release_li_item'+index+'>');
      $('ul#releaseslist').addClass('content-list').prepend(releaseli);

      var img, thumb, head;
      img = data.img;
      thumb = data.thumb;
      if (typeof thumb === 'undefined' ) {
        thumb = img;
      } else if (thumb.length === 0 ) {
        thumb = img;
      }
      if (img) {
        var imgsrc = BASE_URL + "/unboundedpress/album_art.files/" + img._id['$oid'] +"/binary";
        var thumbsrc = BASE_URL + "/unboundedpress/album_art.files/" + thumb._id['$oid'] +"/binary";

        head = $('<h4>').append($("<a href='"+imgsrc+"' data-download-url='/album_art/"+data.album_art+"'>")
        .append($('<img>').attr({src: thumbsrc}).css('width','100%')));
        releaseli.append(head);
      }

      objCount++;
      if(objCount == len){

        $('ul#releaseslist').lightGallery({
          thumbnail:true,
          selector: 'li h4 a ',
          width: '70%',
          galleryId: 'release_gallery'
        });

        resetDivHeights();

      }

    });
  });

}

function programDetails(program, isDetailed) {

  var text = "";
  for (i = 0; i < program.length; i++) {
    if(isDetailed){
      text += "<div class=event-pieces><i>"+program[i].work + "</i></div>";
      if(program[i].ensemble){
        text +="<div class=event-ensemble>" + program[i].ensemble + "</div>";
      };
      text+="<div class=event-performers>";
      var performers = program[i].performers;
      for (j = 0; j < performers.length; j++) {
        text += performers[j].name + " - ";
        var instruments = performers[j].instrument_tags;
        for (k = 0; k < instruments.length; k++) {
          text += instruments[k];
          if(k != instruments.length -1){
            text += ", ";
          }
        }
        if(j != performers.length -1){
          text += "; ";
        }
      }
      text += "</div>";
    } else {
      text += "<div class=upcoming-pieces><i>"+program[i].work + "</i>";
      if(program[i].ensemble){
        text += " - " + program[i].ensemble;
      };
      text += "</div>"
    }
  }

  return text;

}

function sortList(list) {
  var mylist = $(list);
  var listitems = mylist.children('li').get();
  listitems.sort(function(a, b) {
    return $(a).text().trim().toUpperCase().localeCompare($(b).text().trim().toUpperCase());
  })
  $.each(listitems, function(idx, itm) { mylist.append(itm); });
  return mylist;
}


function populatePerformances(year, eventType, loadUpcoming) {

  var currentToggle, currentDetailsDiv, col;

  if(eventType == 'composer'){
    col ="events";
  } else {
    col ="performer_events";
  }

  $.getJSON(BASE_URL + "/unboundedpress/"+col+"?filter={'$and':[{'start_date':{'$gte':{'$date':'2001-01-01T08:00:00Z'}}},{'start_date':{'$lte':{'$date':'"+(year+1).toString()+"-01-01T08:00:00Z'}}}]}&sort_by=-start_date&pagesize=50", function(data) {
    var objCount = 0;
    var len=Object.keys(data._embedded).length;
    $.each(data._embedded, function(index, data){

      var toggle, head, subHead, detailsdiv;

      toggle = $('<span id=event_toggle_'+index+'>').addClass('toggle').text('+');
      head = $('<span>').addClass('header_span')
      .append($('<h4>').append([toggle, '    ' + formatISODate(data.start_date) + ': ' + data.venue.city + ', ' + data.venue.state]));
      subHead = $('<div>').addClass('venue').append(data.venue.name);
      detailsdiv = $('<div id=event_details_'+index+'>');
      $('ul#performanceeventslist').addClass('content-list').append($('<li>').append(head).append([subHead, detailsdiv]));

      if(loadUpcoming && alterDate(new Date(data.start_date['$date'])) >=  new Date()){
        //toggle.remove();
        var clonedHead = head.clone(true);
        clonedHead.find('#event_toggle_'+index).remove();
        clonedHead.css('white-space', 'nowrap');
        clonedHead.find('h4').append('<span style="color: #7F7F7F; margin-left: 10px;">(performance)</span>');
        $('ul#upcominglist').css('width','100%').prepend($('<li>').append($('<div class=upcoming-inner>').append([clonedHead, subHead.clone(true), programDetails(data.program, true)])));
        upcomingCount++;
      }

      toggle.css('cursor', 'pointer'); head.css('cursor', 'pointer');

      head.click(function() {
        if( toggle.text() == "-" ) {
          closeToggle(toggle);
          detailsdiv.html("");
          resetDivHeights();
        } else {
          if(currentToggle){
            closeToggle(currentToggle);
            currentDetailsDiv.html("");
            resetDivHeights();
          }
          currentDetailsDiv = detailsdiv;
          currentToggle = toggle;
          openToggle(toggle);

          if(data.program){
            detailsdiv.append(programDetails(data.program, true));
          } else {
            detailsdiv.append(['<i>'+data.legacy_program+'</i>','<br>',data.legacy_performers]).addClass('event-details');
          }

          resetDivHeights();
        }
      });

      objCount++;
      if(objCount == len){
        resetDivHeights();
      }

    });

    //$('ul#performanceeventslist').children('li:gt(15)').hide();
    //resetDivHeights();

    if(loadUpcoming){
      upcomingLoadedCount++;
      //console.log(upcomingCount);
      if (upcomingLoadedCount==2) {

        if(upcomingCount == 0 && year == 2019){

          $('#upcoming').css('visibility', 'hidden')
        } else {

          $('#upcominglist').replaceWith(sortList('#upcominglist'));

          var autoplaySlider = $('#upcominglist').lightSlider({
            item:1,
            adaptiveHeight:false,
            auto:true,
            loop:true,
            pauseOnHover: true,
            pager: true,
            dropOnHover:false,
            speed: 1000,
            pause: 5000,
            mode: 'fade'
          });
          $('#upcominglist').css('padding-bottom','0px')

        }
      }
    }
  });
}

function populateTalks(year, loadUpcoming) {

  $.getJSON(BASE_URL + '/unboundedpress/talks?sort_by=date&pagesize=200', function(data) {
    var objCount = 0;
    var len=Object.keys(data._embedded).length;
    $.each(data._embedded, function(index, data){

      var head, subHead;

      head = $('<span>').addClass('header_span').append($('<h4>').append(formatDate(data.date) + ': ' + data.location));
      subHead = $('<div>').addClass('venue').append(data.title);
      $('ul#talkeventslist').addClass('content-list').prepend($('<li>').append([head, subHead]));

      if(loadUpcoming && alterDate(new Date(data.date)) >=  new Date()){
        var clonedHead = head.clone(true);
        clonedHead.css('white-space', 'nowrap');
        clonedHead.find('h4').append('<span style="color: #7F7F7F; margin-left: 10px;">(talk)</span>');
        $('ul#upcominglist').css('width','100%').prepend($('<li>').append($('<div class=upcoming-inner>').append([clonedHead, subHead.clone(true)])));
        upcomingCount++;
      }

      objCount++;
      if(objCount == len){
        resetDivHeights();
      }
    });

    if(loadUpcoming){
      upcomingLoadedCount++;
      if (upcomingLoadedCount==2) {

        if(upcomingCount == 0 && year == 2016){
          $('#upcoming').css('visibility', 'hidden')
        } else {

          //console.log(sortList('#upcominglist'));
          $('#upcominglist').replaceWith(sortList('#upcominglist'));

          var autoplaySlider = $('#upcominglist').lightSlider({
            item:1,
            adaptiveHeight:false,
            auto:true,
            loop:true,
            pauseOnHover: true,
            pager: true,
            dropOnHover:false,
            speed: 1000,
            pause: 5000,
            mode: 'fade'
          });
          $('#upcominglist').css('padding-bottom','0px')
        }

      }
    }

  });
}

function populatePublications() {

  $.getJSON(BASE_URL + '/unboundedpress/publications/_aggrs/publications?pagesize=200', function(data) {
    var objCount = 0;
    var len=Object.keys(data._embedded).length;
    $.each(data._embedded, function(index, data){


      var head, subHead, publi;

      subHead = $('<div>').addClass('venue').append([data.entryTags.author, " "]);
      if (data.entryTags.booktitle){ subHead.append([data.entryTags.booktitle, ". "]) }
      if (data.entryTags.journal){ subHead.append([data.entryTags.journal, ". "]) }
      if (data.entryTags.editor){ subHead.append(["editors ", data.entryTags.editor, " "]) }
      if (data.entryTags.volume){ subHead.append(["volume ", data.entryTags.volume, ". "]) }
      if (data.entryTags.pages){ subHead.append([data.entryTags.pages, ". "]) }
      if (data.entryTags.publisher){ subHead.append([data.entryTags.publisher, ". "]) }
      subHead.append([data.entryTags.year, "."]);
      head = $('<span>').addClass('header_span')
      .append($('<span>').addClass('header_pub').append($('<h4>').append(data.entryTags.title)));
      publi = $('<li id=pub_li_item'+index+'>');
      $('ul#writingsworkslist').addClass('content-list').prepend(publi.append(head));

      var documentButton, icons, doc;

      doc = data.doc;

      if (typeof data.entryTags.howpublished != 'undefined') {
        var href = "";
        var download = "";
        if (typeof doc != 'undefined'){
          href = "/pubs/"+data.entryTags.howpublished;
          download = "' data-download-url='/pubs/"+data.entryTags.howpublished;
        } else {
	     href = data.entryTags.howpublished;
        }
	if (false /*href.substring(0, 4) == "http"*/){
console.log(href);
	     documentButton = $('<button id=piece_document_button_'+index+" onclick=' window.open('" + href.replace(/\//g, '\/') + "','_blank')>")
		.attr({title: "view"}).addClass('score_icon');
	} else {

	     documentButton = $('<button id=piece_document_button_'+index+" data-iframe='true' data-src='"+href+download+"'>")
		.attr({title: "view"}).addClass('score_icon');

		if(typeof doc != 'undefined'){

		 documentButton.lightGallery({
			  selector: 'this',
			  width: '90%',
                          hash: false,
			  galleryId: 'pub_viewer_'+index
			});

			if(typeof doc != 'undefined'){
                          documentButton.on('onSlideItemLoad.lg', function(event, index){
                           window.history.replaceState(null, null, href);
                          });

                          documentButton.on('onCloseAfter.lg', function(event, prevIndex, index){
                            window.history.replaceState("object or string", "Title", "/");
                          })

			} else{
			  documentButton.on('onBeforeSlide.lg', function(event, prevIndex, index){
			    $('.lg-inner').css('background-color', 'white')
			  });

                          documentButton.on('onSlideItemLoad.lg', function(event, index){
                           window.history.replaceState("object or string", "Title", "/redirect=" + href);
                          });

                          documentButton.on('onCloseAfter.lg', function(event, prevIndex, index){
                            window.history.replaceState("object or string", "Title", "/");
                          })

			}
		} else {
			//documentButton = $('<button id=piece_document_button_'+index+">").attr({title: "view"}).addClass('score_icon');
			documentButton.click(function() {
                          window.open(href);
			});
		}
	}


      } else {
        documentButton = $('<button id=piece_document_button_'+index+">").attr({title: "view"}).addClass('score_icon');
        documentButton.css('visibility', 'hidden');
      }

      icons = $('<span>').addClass('icon_span_pub').append(documentButton);
      head.append(icons)
      publi.append(subHead.css('width', '80%').css('margin-top', '-3px'))

      objCount++;
      if(objCount == len){
        resetDivHeights();
      }

    });
  });
}

function populateGallerySelector() {

  audioButton = $('<button id=gallery_audio_button>').attr({title: "audio"}).addClass('audio_icon');
  audioButton.click(function() {
    embedAudioGallery(true);
  });

  videoButton = $('<button id=gallery_video_button>').attr({title: "video"}).addClass('video_icon');
  videoButton.click(function() {
    embedVideoGallery();
  });

  imageButton = $('<button id=gallery_image_button>').attr({title: "image"}).addClass('photo_icon');
  imageButton.click(function() {
    embedImageGallery();
  });

  $('#gallerySelector').append([audioButton, videoButton, imageButton]);

}

function populateAbout() {

  var head = $('<h4>').append($('<div>').css('width', '50px').css('min-width', '50px').append('CV'));
  var documentButton = $("<button id=cv_button data-iframe='true' data-src='/cv'>").attr({title: "CV"}).addClass('score_icon');

  documentButton.lightGallery({
    selector: 'this',
    width: '90%',
    galleryId: 'cv'
  });

  head.append(documentButton).insertBefore('#mc_embed_signup');

  $('#my_image').html("");
  $('#my_image').append("<ul id='myimagegallerylist'>");

  $.getJSON(BASE_URL + '/unboundedpress/my_image_gallery/_aggrs/my_image_gallery?pagesize=200', function(data) {
    var objCount = 0
    var len=Object.keys(data._embedded).length;
    $.each(data._embedded, function(index, data){

      var galleryli;

      var img, thumb, head;
      img = data.img;
      thumb = data.thumb;
      if (typeof thumb === 'undefined' ) {
        thumb = img;
      } else if (thumb.length === 0 ) {
        thumb = img;
      }
      if (img) {
        var imgsrc = BASE_URL + "/unboundedpress/images.files/" + img._id['$oid'] +"/binary";
        var thumbsrc = BASE_URL + "/unboundedpress/images.files/" + thumb._id['$oid'] +"/binary";
        var caption = "<div class='caption'><p>photo credit: "+ data.credit +"</p></div>";
        galleryli = $("<li id=my_imagegallery_li_item"+index+" href='"+imgsrc+"' data-download-url='/images/"+data.image+"'>'");
        $('ul#myimagegallerylist').prepend(galleryli);
        galleryli.append($('<img>').attr({src: thumbsrc}).css('max-width','100%'))
        if (data.credit) {
          galleryli.append(caption);
        }
      }

      objCount++;
      if(objCount == len){

        $('ul#myimagegallerylist').lightSlider({
          item:1,
          loop:false,
          pager: false,
          dropOnHover:false,
          enableDrag: false,
          adaptiveHeight:true,
          //auto:true,
          onSliderLoad: function(el) {
            el.lightGallery({
              selector: '#myimagegallerylist .lslide',
              galleryId: 'portaits',
              //subHtmlSelectorRelative: true
            });
          }
        });

      }

    });
  });

}
