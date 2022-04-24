const express = require("express");
const { Contenedor } = require("./agustinsadaca");
const app = express();

app.get("/productos", (req, res, next) => {
  const contenedor = new Contenedor();
  contenedor.getAll().then((obj) =>
    res.send(
      `	
	${obj.map(
    (item) =>
      `
		<div class="row">
			<div class="column">
				<div class="card">
					<p>Id: ${item.id}</p>
					<p>Title: ${item.product.title}</p>
					<p>Price: ${item.product.price}</p>
					<img class="imagen" src="${item.product.thumbnail}">
				</div>
			</div>
		</div>

		
		<style>
		.imagen{width:50%}
		.column {
			float: left;
			width: 70%;
			padding: 10px 10px;
		}
		.row {margin: 0 -5px;display:inline-flex}
		.row:after {
			content: "";
			display: table;
			clear: both;
		}
		@media screen and (max-width: 600px) {
			.column {
				width: 100%;
				display: block;
				margin-bottom: 20px;
			}
		}
		.card {
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
			padding: 16px;
			text-align: center;
			background-color: #f1f1f1;
		}
		</style>
		`
  )}
	`
    )
  );
});

app.get("/productoRandom", (req, res, next) => {
  const contenedor = new Contenedor();
  contenedor.getAll().then((obj) => {
    const objRandom = obj[Math.floor(Math.random() * obj.length)];
    res.send(
      `
			<div class="card">
				<p>Id: ${objRandom.id}</p>
				<p>Title: ${objRandom.product.title}</p>
				<p>Price: ${objRandom.product.price}</p>
				<img class="imagen" src="${objRandom.product.thumbnail}">
			</div>
			
			<style>
			.imagen{width:10%}
			.column {
				float: left;
				width: 70%;
				padding: 10px 10px;
			}
			.row {margin: 0 -5px;display:inline-flex}
			.row:after {
				content: "";
				display: table;
				clear: both;
			}
			@media screen and (max-width: 600px) {
				.column {
					width: 100%;
					display: block;
					margin-bottom: 20px;
				}
			}
			.card {
				box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
				padding: 16px;
				text-align: center;
				background-color: #f1f1f1;
			}
			</style>
			`
    );
  });
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor express corriendo en port ${PORT}`);
});

server.on("error", (error) => console.log(error));
