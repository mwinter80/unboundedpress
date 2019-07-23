

$(document).ready(function() {

    var split, filename, grid;
    split = window.location.href.split('/');
    filename = split[split.length-1];
    grid = split[split.length-2];
    displayPDF(grid, filename);
    
});
    
function displayPDF(grid, filename) {
    var BASE_URL='http://dev.unboundedpress.org';
    $.getJSON(BASE_URL+"/unboundedpress/"+grid+".files?filter={'filename':'"+filename+"'}", function(data){
        var score, details;
        score = data._embedded['rh:file'];
        console.log(score);
        if (score) {
            var details = $('<object>').attr({
                data: BASE_URL + score[0]._links['rh:data'].href, 
                type: score.contentType, 
                width:'100%', 
                height:'100%'});
            $('#pdfdiv').html(details);
        }  else {
            $('#pdfdiv').html("file not found")
        }
        /*else {
            $.getJSON(BASE_URL+"/unboundedpress/scores.files?filter={'legacy_filename':'"+filename+"'}", function(data){
                var score, details;
                score = data._embedded['rh:file'];
                if (score) {
                    var details = $('<object>').attr({
                        data: BASE_URL + score[0]._links['rh:data'].href, 
                        type:'application/pdf', 
                        width:'100%', 
                        height:'100%'});
                    $('#pdfdiv').html(details);
                } else {
                    $('#pdfdiv').html("file not found")
                }
            });
        }*/
    });
}
