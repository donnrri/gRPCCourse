var grpc = require('grpc')
var greets = require('../server/protos/greet_pb')
var service = require('../server/protos/greet_grpc_pb')


/*
Implement gret grpc method
*/

function greet(call, callback){

    var greeting = new greets.GreetResponse()
    greeting.setResult( "hello " + call.request.getGreeting().getFirstName())

    callback(null, greeting)
}

//server streaming example
function greetManyTimes(call, callback) {
    var firstName = call.request.getGreeting().getFirstName();
  
    let count = 0,
      intervalID = setInterval(function() {
        var greetManyTimesResponse = new greets.GreetManyTimesResponse();
        greetManyTimesResponse.setResult(firstName);
  
        // setup streaming
        call.write(greetManyTimesResponse);
        if (++count > 9) {
          clearInterval(intervalID);
          call.end(); // we have sent all messages!
        }
      }, 1000);
  }
  
  function longGreet(call, callback) {
    call.on("data", request => {
      var fullName =
        request.getGreet().getFirstName() +
        " " +
        request.getGreet().getLastName();
  
      console.log("Hello " + fullName);
    });
  
    call.on("error", error => {
      console.error(error);
    });
  
    call.on("end", () => {
      var response = new greets.LongGreetResponse();
      response.setResult("Long Greet Client Streaming.....");
  
      callback(null, response);
    });
  }
  


function main () {
    var server = new grpc.Server()
    // start service of choice here
    server.addService(service.GreetServiceService, {
        greet: greet,
        greetManyTimes: greetManyTimes
      });
      server.bind("127.0.0.1:4000", grpc.ServerCredentials.createInsecure());
      server.start();

    console.log("Server runing on port 4000")

}

main()