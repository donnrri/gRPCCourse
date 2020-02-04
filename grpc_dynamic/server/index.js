const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')

/*
GRPC service for definition of greet service
*/

const greetProtoPath = path.join(__dirname, '..', 'protos', 'greet.proto')
const greetProtoDefinition = protoLoader.loadSync(greetProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const greetPackageDefinition = grpc.loadPackageDefinition(greetProtoDefinition).greet


function greet(call, callback) {
 var firstName = call.request.greeting.first_name;

 var lastName = call.request.greeting.last_name;

 callback(null, {result: "Hello " + firstName + " " + lastName})

}


function main() {
    const server = new grpc.Server()
    
    server.addService(greetPackageDefinition.GreetService.service,
        {greet:greet}
        )
    server.bind("127.0.0.1:4000", grpc.ServerCredentials.createInsecure())
    server.start()
    console.log("dynamic example running localhost:4000")
}

main()