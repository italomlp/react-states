import * as fs from 'fs'

const serverFilename = 'db.json'
const exampleFilename = 'db.example.json'

fs.open(serverFilename, 'r', (err) => {
  if (err) {
    fs.copyFile(exampleFilename, serverFilename, (err) => {
      if (err) {
        throw err
      }
    })
  }
})
