function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

/* ------------------------------------------------------------------------ */

var converter = new showdown.Converter();

window.addEventListener("load", function() {
  var id = findGetParameter("id");

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState != 4) {
      return;
    }

    if (xmlHttp.status != 200) {
      return;
    }

    var json = JSON.parse(xmlHttp.responseText);

    document.getElementById("title").innerHTML = json.title;
    document.getElementById("description").innerHTML = json.description;
    document.getElementById("content").innerHTML = converter.makeHtml(
      "# " + json.title + "\n\n" + json.description + "\n\n" + json.content
    );
  }

  xmlHttp.open("GET", "https://api.myjson.com/bins/" + id, true)
  xmlHttp.send(null);
});
