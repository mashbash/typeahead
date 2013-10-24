//setting up our URL, getting the relative URL
var userquery = '@{query}'

//set-up to use twitter typeahead
//assign to a variable because we want to pull the results out from the ajax response and use it
var result = $('.typeahead').typeahead([
  {
	  name: 'userQueries',
	  //we use this when we want to do an ajax call to the server
	  remote: {
	  	//we need url and we are setting it up to be readable by twitter, the query=%Query, is because server side
	  	//we are expecting a parameter query, can be named anything but the %QUERY must remain, this is what
	  	//twitter typeahead recognizes
	  	url: userquery + '?query=%QUERY',
	  	//filter function transforms the results into datums
	  	//refer to http://stackoverflow.com/questions/18934221/twitter-typeahead-js-remote-and-search-on-client
	  	filter: function (data) {
			    var results = [];
			    mapped = {};
			    //swapping key to be read as value
				$.each(data, function(key, value){
					mapped[value] = key;
					results.push(value);
				});
				return results;
			  }
	  },
	  //this sets after how many characters then start the ajax request
	  minLength: 3
  }
]);

//refer to https://github.com/twitter/typeahead.js/issues/244
result.on('typeahead:selected',function(evt,data){
    //pulling out key which was earlier saved as the value
	var key = mapped[data.value];
	//put into a hidden input field to be sent up to the server
	$('input[name="userId"]').val(key);
	//console.log('data==>' + key); //selected datum object
});


