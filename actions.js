var from = "eng";
var dest = "ita";

var getSelected = function(){
    var t = '';
    if(window.getSelection) {
        t = window.getSelection();
    } else if(document.getSelection) {
        t = document.getSelection();
    } else if(document.selection) {
	t = document.selection.createRange().text;
    }
    return t.toString().trim();
}

$(document).ready(function(){
	$("body").on("dblclick", function(e) {
		var st = getSelected();
	    $.get("http://glosbe.com/gapi/translate?from=" + from + "&dest=" + dest + "&format=json&phrase=" + st, {}, function(data) {
	      var out = "<ul id='tooltip_list'>";
		  var wordslist = [];
		  var count = 0;
		  for (var i = 0; i < data.tuc.length && i < 5; i++) {
			if (data.tuc[i].phrase == undefined) {
				continue;
			}
			var word = data.tuc[i].phrase.text;
			if (word == undefined) {
				return;
			}
			out += "<li>" + word;
			count++;
			wordslist[i] = word;
			if (data.tuc[i].meanings != undefined) {
				for (var c=0; c<data.tuc[i].meanings.length; c++) {
					if (data.tuc[i].meanings[c].language == dest) {
						out += " <i>("+data.tuc[i].meanings[c].text+")</i>";
					}
				}
			}
			out +="</li>";
		  }
		  out += "</ul>";
		  if (count > 0) {
		  	$("body").append('<div id="tooltip" style="top: '+(e.pageY+10)+'px; left: '+e.pageX+'px"><span id="tooltip_title">'+st+'</span><br/><br/>'+out+'<br/><a class="tooltip_link" href="http://glosbe.com/en/it/'+st+'" target="_blank">More...</a></div>');
		  }
	  });
	});
	$("body").on("click", function() {
		$("#tooltip").remove();
	});
});

