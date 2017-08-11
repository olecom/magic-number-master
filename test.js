/**
 * This is the test
 */

var test = require('tape');
var nock = require('nock');

const BASE_URL_FQDN = 'http://apps.wavana.com'
const BASE_URL_URI = /magicnumber[?]x=[0-9.]+[&]y=[0-9.]+/

// disable anything to go out the tests
test('Before...', (t) => {
  nock.disableNetConnect()
  t.end()
})

// test the module code
test('getMagicNumberSqrt: requesting magic number from URL and returning sqrt of it', async (t) => {
  var getMagicNumberSqrt = require('./index.js')

  nock(BASE_URL_FQDN)
    .get(BASE_URL_URI)
    .reply(200, 123456789)

  getMagicNumberSqrt(1, 2, (err, magicSqrt) => {
    t.equal(magicSqrt, Math.sqrt(123456789));
    t.end();
  })
});

test('getMagicNumberSqrt: again with 12345 as magic number', async (t) => {
  var getMagicNumberSqrt = require('./index.js')

  nock(BASE_URL_FQDN)
    .get(BASE_URL_URI)
    .reply(200, 12345)

  getMagicNumberSqrt(1, 2, (err, magicSqrt) => {
    t.equal(magicSqrt, Math.sqrt(12345));
    t.end();
  })
});

test('getMagicNumberSqrt: check not equality', async (t) => {
  var getMagicNumberSqrt = require('./index.js')

  nock(BASE_URL_FQDN)
    .get(BASE_URL_URI)
    .reply(200, 12345)

  getMagicNumberSqrt(1, 2, (err, magicSqrt) => {
    t.notEqual(magicSqrt, Math.sqrt(1234));
    t.end();
  })
});

test('getMagicNumberSqrt: query string params', async (t) => {
  var getMagicNumberSqrt = require('./index.js')

  nock(BASE_URL_FQDN)
    .get(BASE_URL_URI)
    .reply(200, 12345)

  getMagicNumberSqrt('not a number', 2, (err, magicSqrt) => {
    if (err) t.end()
    else t.end('must not get here: wrong number argument')
  })
});


test('...after.', (t) => {
  nock.enableNetConnect()
  t.end()
})
