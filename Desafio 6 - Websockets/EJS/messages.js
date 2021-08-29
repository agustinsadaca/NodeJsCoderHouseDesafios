const fs = require('fs')

 class Message {
    constructor() {}
    async save(message) {
        let maxId = 0
        maxId = await fs.promises
            .readFile('./messages.json', 'utf-8')
            .then((data) => {
                data = JSON.parse(data)
                if (Object.keys(data).length === 0) {
                    message['id'] = 1
                    maxId = 1
                } else {
                    data.map((messages) =>
                        messages['id'] > maxId
                            ? (maxId = messages['id'])
                            : maxId,
                    )
                    maxId = ++maxId
                    message['id'] = maxId
                }
                data.push({'id':message['id'],'email':message['email'],'message':message['message'],date:message['date']})
                
                fs.writeFile(
                    './messages.json',
                    JSON.stringify(data, null, 2),
                    (error) => {
                        if (error) {
                            console.log(error)
                            throw new Error('Error: ' + error.message)
                        } else {
                            console.log('Creado con exito')
                           
                        }
                    },
                )
                return maxId
            })
            .catch((error) => console.log(error))
      
        
        return maxId
    }

    async getAll() {
        let myObject = {}
        myObject = await fs.promises
            .readFile('./messages.json', 'utf-8')
            .then((data) => {
                myObject = data
                return myObject
            })
        return myObject
    }

    
}

module.exports = {Message}