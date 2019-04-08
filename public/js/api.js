// wrap in IIFE to control scope

(function(){

   const baseURL = 'http://localhost:8082';

   function testAPIs(){
    // test list first
    var testId = '';
    var testJSON = {};
    // var urlEncodedData = "";
    // var urlEncodedDataPairs = [];
    // var name;

    // list
    callAPI('GET', '/api/posts', null, null)
      .then((list)=>{
        console.log('\n\n***************************\nlist results:');
        console.log(list);
        testId = list[0]._id;
        console.log(testId);
        // create
        // let input = document.querySelector('input[type="file"]')
        data = {
          'title': 'Post from API test',
          'date': '2020-01-01T00:00:00.000Z',
          'audience': 'All',
          'image': 'image from API test',
          'message':'This is an AJAX API test',
          'username': 'API Test'
        };
        // for(name in data) {
        //   urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        // }
        // urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
        // console.log(urlEncodedData);

        callAPI('POST', '/api/posts', null, data)
          .then((post)=>{
            postId = post._id;
            console.log("post "+JSON.stringify(post));
            savedpost = post;  // keep a handle to the created post object
            console.log('\n\n***************************\ncreate results:');
            console.log(post);

            // find
            callAPI('GET','/api/posts/'+postId, null, null)
              .then((post)=>{
                console.log('\n\n***************************\nfind results:');
                console.log(post);

                // update
                testJSON.description += ' appended by the AJAX API ';
                callAPI('PUT','/api/posts/'+postId, null, savedpost)
                  .then((post)=>{
                    console.log('\n\n***************************\nupdate results:');
                    console.log(post);

                    //delete
                    callAPI('DELETE', '/api/posts/'+postId, null, null)
                     .then((result)=>{
                       console.log('\n\n***************************\ndelete result:');
                       console.log(result);
                     })
                });
            });
        });
    })
    .catch((err)=>{
      console.error(err);
    });
}


  async function callAPI(method, uri, params, body){

    jsonMimeType = {
      'Content-type':'application/json'
    }
    try{
      /*  Set up our fetch.
       *   'body' to be included only when method is POST
       *   If 'PUT', we need to be sure the mimetype is set to json
       *      (so bodyparser.json() will deal with it) and the body
       *      will need to be stringified.
       *   '...' syntax is the ES6 spread operator.
       *      It assigns new properties to an object, and in this case
       *      lets us use a conditional to create, or not create, a property
       *      on the object. (an empty 'body' property will cause an error
       *      on a GET request!)
       */
      var response = await fetch(baseURL + uri, {
        method: method, // GET, POST, PUT, DELETE, etc.
        ...(method=='POST' ? {headers: jsonMimeType, body:JSON.stringify(body)} : {}),
        ...(method=='PUT' ?  {headers: jsonMimeType, body:JSON.stringify(body)} : {})
      });
      return response.json(); // parses response to JSON
    }catch(err){
      console.error(err);
      return "{'status':'error'}";
    }
  }

  // Calls our test function when we click the button
  //  afer validating that there's a file selected.
  document.querySelector('#testme').addEventListener("click", ()=>{testAPIs()});
})();