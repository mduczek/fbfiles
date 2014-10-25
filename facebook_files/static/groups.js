function checkIfFile(fileName){
    var file_hosting_prefixes = ['https://docs.google', 'https://drive.google','https://www.dropbox.com/s'];
    for(var i=0; i<file_hosting_prefixes.length; i++){
        if(fileName.indexOf(file_hosting_prefixes[i]) === 0){
            return true;
        }
    }
    return false;
}

function addToFiles(files, item){
    var msg = item.message;
    var link_reg = /http\S*/;
    var myArray = link_reg.exec(msg);
    if(myArray){
        for(var j=0; j<myArray.length; j++){
            if(checkIfFile(myArray[j])){
                files.push({
                    'link': myArray[j], 
                    'post': msg,
                    'date': item.created_time,
                    'from': item.from
                })
            }
        }
    }
}

function displayFolder(groupId){
    console.log("wchodzi tutaj");
    FB.api('/'+groupId+'/feed', function(response) {
		console.log(response);
	  	var data = response['data'];
	  	var files = [];
	  	var posts = [];
	  	for(var i=0; i<data.length; i++){
			if(data[i].comments){
				var comments = data[i].comments.data;
				for(var j=0; j<comments.length; j++){
					console.log(comments[j])
					posts.push(comments[j]);
				}
			}
			posts.push(data[i]);
	  	}
	  	console.log(posts);
	  	for(var i=0; i<posts.length; i++){
			addToFiles(files, posts[i]);
	  	}
	  	console.log(files);
        present_files(files);
        return files;
    });
}
