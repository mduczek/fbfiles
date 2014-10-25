  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '547089228759608',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });


  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');

  }
  
  function checkIfFile(fileName){
	var file_hosting_prefixes = ['https://docs.google'];
	for(var i=0; i<file_hosting_prefixes.length; i++){
		if(fileName.indexOf(file_hosting_prefixes[i]) === 0){
			return true;
		}
	}
	return false;
}
  
  function displayFolder(groupId){
	FB.api('/'+groupId+'/feed', function(response) {
	  console.log(response);
	  var data = response['data'];

	  console.log(data);
	  var files = [];
	  for(var i=0; i<data.length; i++){
		var msg = data[i].message;
		var link_reg = /http\S*/;
		var myArray = link_reg.exec(msg);
		if(myArray){
			for(var j=0; j<myArray.length; j++){
				if(checkIfFile(myArray[j])){
					files.push({
						'link': myArray[j], 
						'post': msg,
						'date': data[i].created_time,
						'from': data[i].from
						})
				}
			}
		}
	
	  }
	  console.log(files);
	  return files;
	});
}
