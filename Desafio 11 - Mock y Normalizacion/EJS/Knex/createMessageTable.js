const { config } = require('./config.js')
const db = require('knex')(config)
async function createTable () {
	try {
		/* ------------------------------ tabla existe ------------------------------ */
		const exist = await db.schema.hasTable('mensaje')

		/* ------------------------------- crear tabla ------------------------------ */
		if (!exist) {
			await sqlite.schema.createTable('mensaje', (table) => {
				table.increments('id').primary().notNullable()
				table.string('email', 50).notNullable()
				table.string('message', 60).notNullable()
				table.date('date').notNullable()
		
			})

			console.log('Tabla creada')
		}
		// const user = await db.select().from('usuarios')
		// // 'select * from usuarios'
		// console.log(user)
	} catch (error) {
		console.log(error)
	} finally {
		db.destroy()
	}
}
module.exports ={createTable}