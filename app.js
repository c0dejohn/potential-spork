const express = require('express');
const app = express();
const path = require('path');
const apiRouter = express.Router();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const moment = require('moment');

app.use('/api', apiRouter);
app.use('/static', express.static('/public'));
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

// Motor de plantilla
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});
app.set('view engine', 'hbs');

const mensajes = [
	{ author: 'Juan', text: '¡Hola! que tal?' },
	{ author: 'Pedro', text: 'Muy bien y vos?' },
	{ author: 'Ana', text: 'Genial!' }
];

io.on('connection', (socket) => {
	console.log('usuario conectado');

	socket.emit('mensajes', mensajes);

	socket.on('new-message', function (dato) {
		dato.date = moment().format('LLLL');
		mensajes.push(dato);
		io.sockets.emit('mensajes', mensajes);
	});
});

app.get('/', (req, res) => {
	res.render('index');
});

server.listen(8080, () => {
	console.log(`Listening on port: http://localhost:${8080}`);
});
