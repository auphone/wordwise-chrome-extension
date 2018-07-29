function translate() {
  var words = getUniqueWordList();
  getTranslationFromServer(words);
}

function getUniqueWordList() {
  var words = [];
  var tags = ['p'];
  tags.forEach(function(tag) {
    var txts = $(tag).text().split(' ');
    for(var i in txts) {
      var txt = txts[i].replace(/[^a-z'A-Z]+/g, '').toLowerCase();
      if((stopWords.indexOf(txt) > -1) || (words.indexOf(txt) > -1)) {
        continue;
      }
      words.push(txt);
    }
  });
  return words;
}

function getTranslationFromServer(words) {
  chrome.storage.sync.get({
    lang: 'zh-tw',
    level: 1,
    serverUrl: 'http://localhost:4000',
    password: "",
  }, function(items) {
    $.ajax({
      method: 'POST',
      url: items.serverUrl + '/api/translate',
      data: $.param({
        words: words,
        lang: items.lang,
        level: items.level,
        password: items.password,
      }, true)
    }).done(function(result) {
      appendTranslations(result);
    });
  });
}

function appendTranslations(translations) {
  var tags = ['p', 'li'];
  tags.forEach(function(tag) {
    $(tag).each(function(idx, ele) {
      var html = $(ele).html();
      for (var en in translations) {
        var zhtw = translations[en];
        var regexp = new RegExp('\\b(?<!<)' + en + '(?!>)(?!\/>)\\b');
        html = html.replace(regexp, "<span class='ww-trans-word' data-before='" + zhtw + "'>" + en + "</span>")
      }
      $(ele).html(html);
    });
  });
}

function appendStyle() {
  $('body').addClass('ww-trans');
}