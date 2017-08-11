/**
 * This is the module
 */

const BASE_URL = process.env.BASE_URL || 'http://apps.wavana.com/magicnumber'
const web = require('request-promise-native')

/*
 * return the square root of a magic number to an asynchronous callback function
 */
async function getMagicNumberSqrt(x, y, callback) {
  let magicNumber
  let err

  try {
    magicNumber = await web({
      headers: {
        'User-Agent': 'Node.JS/8'
      },
      method: 'get', json: true,
      url: `${BASE_URL}?x=${+x}&y=${+y}`
    })
  } catch (ex) {
    err = ex
  }

  return setImmediate(() => callback(err, Math.sqrt(magicNumber)))
}

function callbackHandler(err, marigNumSqrt){
  console.log('the square root of a magic number:', marigNumSqrt)
}

// export module interface
module.exports = getMagicNumberSqrt

// self running example
if (!module.parent){
  Promise.all([getMagicNumberSqrt(1, 2, callbackHandler)])
    .then(() => console.log('Launch of `getMagicNumberSqrt`: OK'))
    .catch((ex) => console.error('!Error', ex)
  )
}
