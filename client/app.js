(function(){
  var root_path = "http://localhost:3000";

  $("form").on('submit', function(e){
    console.log('mmmmm')
    e.preventDefault();
    var $this = $(this);
    var beforeSend = require_secure($this);
    $.ajax({
      "url": root_path + $this.attr('action'),
      "data" : $this.serialize(),
      "beforeSend" : beforeSend
    }).done(function(data){
      if(data.token){
        sessionStorage['token'] = data.token
      }
      else{
        $('#response.ok').html( JSON.stringify(data) )
        $('#response.fail').html( '' )
      }
    }).fail(function(data,error,status){
      $('#response.ok').html( '' )
      $('#response.fail').html( JSON.stringify(data) )
    }).always(function(){
      $('body').removeClass('loading')
    });
  })

  var require_secure = function(jForm){
    if(jForm.data('secure')){
      return function(xhr, settings){
        $('body').addClass('loading');
        console.log("SECURE");
        return xhr.setRequestHeader('Authorization', "Token token=\""+token()+"\"");
      };
    }
    else {
      return function(){
        $('body').addClass('loading');
      }
    }
  };

  var token = function(){
    return sessionStorage['token'];
  }
})();
