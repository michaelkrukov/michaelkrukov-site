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
  var id = findGetParameter("id") || "-1";

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState != 4) {
      return;
    }

    if (xmlHttp.status != 200) {
      document.getElementsByClassName("loader")[0].remove();

      document.getElementById("title").innerHTML = "Error occurred";
      document.getElementById("description").innerHTML = "Document is not found";
      document.getElementById("content").innerHTML = converter.makeHtml(
        "# Error occurred\n\nDocument is not found. Looks like ID is wrong or empty."
      );

      return;
    }

    var json = JSON.parse(xmlHttp.responseText);

    document.getElementsByClassName("loader")[0].remove();

    document.getElementById("title").innerHTML = json.title;
    document.getElementById("description").innerHTML = json.description;
    document.getElementById("content").innerHTML = converter.makeHtml(
      "# " + json.title + "\n\n" + json.description + "\n\n" + json.content
    );

    document.getElementById("content").innerHTML +=
      "<hr><details><summary>Source</summary><pre><code>" + json.content + "</code></pre></details>";
  }

  xmlHttp.open("GET", "https://api.myjson.com/bins/" + id, true)
  xmlHttp.send(null);
});
