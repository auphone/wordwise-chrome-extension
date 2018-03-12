function initLangaugeList(items) {
  for(var key in langs) {
    var displayName = langs[key];
    var opt = '<option value="' + key + '">' + displayName + '</option>';
    $('#language').append(opt);
  }
  $('#language').val(items.lang);
  $('#language').select2();
  $('#cb-auto-trans').prop('checked', items.auto);
}

function initLevel(items) {
  $.ajax({
    method: 'GET',
    url: items.serverUrl + '/api/levels',
  }).done(function(result) {
    for(var i=1; i <= result.level; i++) {
      var input = '<input class="form-check-input" type="radio" name="level" value="'+i+'" id="lvl-'+i+'">';
      var label = '<label class="form-check-label" for="lvl-'+i+'"> Level '+i+'</label>';
      var wrap = '<div class="form-check form-check-inline">'+input+label+'</div>'
      $('#levels').append(wrap);
    }
    $('#levels input[value='+items.level+']').prop('checked', 'checked')
  });
}

function buildWatcher() {
  $('#language').change(function() {
    chrome.storage.sync.set({
      lang: this.value
    }, function() {});
  });
  $('#cb-auto-trans').change(function() {
    chrome.storage.sync.set({
      auto: this.checked
    }, function() {});
  });
  $('#levels').change(function() {
    chrome.storage.sync.set({
      level: $('input[name=level]:checked').val()
    }, function() {});
  });
  $('#password').change(function() {
    chrome.storage.sync.set({
      password: $(this).val()
    }, function() {});
  });
  // Timeout
  var urlInputTimeout = null;
  $('#server-url').keyup(function() {
    var self = this;
    console.log('?');
    if (urlInputTimeout) {
      clearTimeout(urlInputTimeout);
    }
    urlInputTimeout = setTimeout(function() {
      var val = $(self).val();
      if (val.endsWith('/')) {
        $(self).val(val.substring(0, val.length - 1));
      }
      chrome.storage.sync.set({
        serverUrl: $(self).val(),
      }, function() {});
    }, 1000);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    lang: 'zh-tw',
    auto: false,
    level: 1,
    serverUrl: 'http://localhost:4000',
    password: "",
  }, function(items) {
    initLevel(items);
    initLangaugeList(items);
    $('#password').val(items.password);
    $('#server-url').val(items.serverUrl);
    buildWatcher();
  });
}
document.addEventListener('DOMContentLoaded', restore_options);