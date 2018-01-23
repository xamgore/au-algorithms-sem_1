'use strict';

let $ = s => document.querySelectorAll(s);

var links = $('.term');

for (var i=0; i < links.length; ++i) {
    var a = links[i];
    var content = terms[a.innerText].wiki.extract;
    a.setAttribute("data-popup", content.substring(0, 300) + (content.length > 300 ? "..." : ""));
    a.setAttribute("href", terms[a.innerText].wiki.wiki_url)
}
