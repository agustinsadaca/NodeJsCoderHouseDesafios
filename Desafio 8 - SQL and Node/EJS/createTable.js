const { db } = require( './db.js')

async function createTable () {
	try {
		/* ------------------------------ tabla existe ------------------------------ */
		const exist = await db.schema.hasTable('productos')

		/* ------------------------------- crear tabla ------------------------------ */
		if (!exist) {
			await db.schema.createTable('productos', (table) => {
				table.increments('id').primary().notNullable()
				table.string('title', 50).notNullable()
				table.float('price', 60).notNullable()
				table.string('thumbnail').notNullable()
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