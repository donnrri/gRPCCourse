var grpc = require("grpc")
var greets = require('../../server/protos/greet_pb')
var service = require('../../server/protos/greet_grpc_pb')

function callGreetManyTimes() {
    // Created our server client
    var client = new service.GreetServiceClient(
      "localhost:4000",
      grpc.credentials.createInsecure()
    );
  
    // create request
  
    var request = new greets.GreetManyTimesRequest();
  
    var greeting = new greets.Greeting();
    greeting.setFirstName("Paulo");
    greeting.setLastName("Dichone");
  
    request.setGreeting(greeting);
  
    var call = client.greetManyTimes(request, () => {});
  
    call.on("data", response => {
      console.log("Client Streaming Response: ", response.getResult());
    });
  
    call.on("status", status => {
      console.log(status.details);
    });
  
    call.on("error", error => {
      console.error(error.details);
    });
  
    call.on("end", () => {
      console.log("Streaming Ended!");
    });
  }
function main() {

   callGreetManyTimes()
}


main()
