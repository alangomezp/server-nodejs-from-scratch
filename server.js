const http = require('node:http')
const charizardJSON = require('./pokemon/charizard.json')

const port = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      switch (url) {
        case '/':
          res.end('<h1>Bienvenido a mi pagina</h1><hr><a href="./pokemon/charizard">ver pokemon</a>')
          break

        case '/pokemon/charizard':
          res.writeHead(200, ['Content-Type', 'application/json'])
          res.end(JSON.stringify(charizardJSON))
          break

        default:
          res.end('<h1>404 Not Found</h1>')
          break
      }
      break

    case 'POST':
      switch (url) {
        case '/create/pokemon':{
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            data.timestamp = Date.now()
            res.writeHead(201, ['Content-Type', 'application/json'])
            res.end(JSON.stringify(data))
          })
        }
          break

        default:
          res.end('<h1>Bad Request</h1>')
          break
      }
      break
    case 'PUT':
      switch (url) {
        case '/put/charizard':
          res.end('<h1>Charizard Actualizado</h1>')
          break

        default:
          res.end('<h1>404 Not Found</h1>')
          break
      }
      break

    case 'DELETE':
      switch (url) {
        case '/delete/charizard':
          res.end('<h1>Charizard Eliminado</h1>')
          break

        default:
          res.end('<h1>404 Not Found</h1>')
          break
      }
      break

    default:
      res.end('<h1>400 Bad Request</h1>')
      break
  }
})

server.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
})
