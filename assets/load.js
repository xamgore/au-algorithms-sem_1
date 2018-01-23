function encodeB64(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    (match, p1) => String.fromCharCode('0x' + p1)));
}

function decodeB64(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str)
    .split('')
    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join(''));
}

var getQueryParam = name => {
    name = name.replace(/[\[\]]/g, "\\$&");
    var url     = window.location.href;
    var regex   = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);

    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "))
};


window.onload = e => {
  hljs.initHighlighting();

  var paragraph = getQueryParam('p');
  if (paragraph) {
    var node = document.evaluate(decodeB64(paragraph), document, null, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;

    node.style.border = "4px dashed rgba(244, 67, 54, 0.58)";
    node.style.margin = '-10px';
    node.style.padding = '5px 10px';
    node.scrollIntoView()
  }

  var hideTimeout, opacityTimeout;

  var offerChange = () => {
    r = window.getSelection();
    if (r.toString().length < 2) return;

    var $button = document.querySelector('#mistake');
    var rect = r.getRangeAt(0).getBoundingClientRect();
    var relative = document.body.parentNode.getBoundingClientRect();
    $button.style.top   = `${rect.bottom - relative.top}px`;
    $button.style.right = `${-rect.right + relative.right}px`;
    $button.style.display = 'flex';
    $button.style.opacity = 1;

    var wholeParagraph = r.anchorNode.parentNode.innerText;
    var cite = wholeParagraph.split('\n').map(s => '> ' + s).join('\n');
    var url = location.href.replace(location.hash, '').replace(location.search, '');
    var xpath = getElementXpath(r.anchorNode.parentNode);
    var backlink = `${url}?p=${encodeURIComponent(encodeB64(xpath))}`;

    var msg = `Ребят, кажется у вас [ошибка](${backlink}) во фразе \`${r.toString()}\`, в параграфе:\n${cite}\n\n`;
    var title = encodeURIComponent(`Ошибка в конспекте`);
    var link = `${newIssue}?title=${title}&body=${encodeURIComponent(msg)}`;
    console.log(link);

    var hide = () => {
      opacityTimeout = setTimeout(() => $button.style.opacity = 0, 3000);
      hideTimeout    = setTimeout(() => $button.style.display = 'none', 4000)
    };

    $button.onclick = () => window.open(link, '_blank').focus();
    $button.onmouseleave = _ => hide();
    $button.onmouseover  = _ => {
      clearTimeout(opacityTimeout);
      clearTimeout(hideTimeout);
    };

    hide()
  };

  document.onmouseup = e => offerChange();
  document.touchend = e => { e.preventDefault(); offerChange(); }
};
