var grpc = require("grpc")
var greets = require('../../server/protos/greet_pb')
var service = require('../../server/protos/greet_grpc_pb')

function callLongGreeting() {
    // Created our server client
    var client = new service.GreetServiceClient(
      "localhost:50051",
      grpc.credentials.createInsecure()
    );
  
    var request = new greets.LongGreetRequest();
  
    var call = client.longGreet(request, (error, response) => {
      if (!error) {
        console.log("Server Response: ", response.getResult());
      } else {
        console.error(error);
      }
    });
  
    let count = 0,
      intervalID = setInterval(function() {
        console.log("Sending message " + count);
  
        var request = new greets.LongGreetRequest();
        var greeting = new greets.Greeting();
        greeting.setFirstName("Paulo");
        greeting.setLastName("Dichone");
  
        request.setGreet(greeting);
  
        var requestTwo = new greets.LongGreetRequest();
        var greetingTwo = new greets.Greeting();
        greetingTwo.setFirstName("Stephane");
        greetingTwo.setLastName("Maarek");
  
        requestTwo.setGreet(greetingTwo);
  
        call.write(request);
        call.write(requestTwo);
  
        if (++count > 3) {
          clearInterval(intervalID);
          call.end(); //we have sent all the messages!
        }
      }, 1000);
  }

  function main() {

    callLongGreeting()
 }
 
 
 main()