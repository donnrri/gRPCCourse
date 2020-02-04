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

const client = new greetPackageDefinition.GreetService(
    "localhost:4000",
    grpc.credentials.createInsecure()
    )

function callGreetings(){

    var request = {
        greeting:{
            first_name: "Gerry",
            last_name: "Mordi"
        }
    }
    client.greet (request, (error, response) => {
        if(!error){
            console.log("Greeting " + response.result)
        }else{
            console.log(error)
        }
    })
}

function main(){
 callGreetings()
}


main()