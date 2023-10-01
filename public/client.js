const socket = io.connect()

socket.on('mensajes', function (dato) {
  render(dato)
})

function render(dato) {
  document.getElementById('messages').innerHTML = dato
      .map(function (element, index) {
        return `<div>
              <strong class="text-primary">${element.author}</strong>:
              <em class="text-danger">[${element.date}]</em>
              <em class="text-success">${element.text}</em>
              </div>`
      })
      .join('')
}

function addMessages() {
  let mensaje = {
    author: document.getElementById('author').value,
    text: document.getElementById('text').value
  }
  socket.emit('new-message', mensaje)
}
