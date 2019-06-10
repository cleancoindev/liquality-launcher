const { app } = require('electron')
const fs = require('fs')
const path = require('path')
const extract = require('extract-zip')
const request = require('request-promise-native')
const store = require('./store')

async function extractZip () {
  return new Promise((resolve, reject) => {
    extract(...arguments, err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

async function download (url, target) {
  return new Promise((resolve, reject) => {
    const zipStream = fs.createWriteStream(target)
    zipStream.on('finish', () => {
      resolve()
    })
    request(url).pipe(zipStream)
  })
}

function getSwapInterfacePath () {
  const version = store.get('swapInterface.version')
  return path.join(app.getPath('userData'), 'liquality-swap', `liquality-swap-${version}`)
}

module.exports = { extractZip, download, getSwapInterfacePath }
