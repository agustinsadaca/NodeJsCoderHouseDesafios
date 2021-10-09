const fs = require('fs')

 class Message {
    constructor() {}
    async save(message) {
        const { db } = require( './sqlite3/db')

        try {
            const response = await db.insert(message).from('message')
            console.log('Productos insertados!')
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            db.destroy()
        }
        return 
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