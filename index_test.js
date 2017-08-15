const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const request = require('request-promise')
const app = require('./index')


test('validates transactions', async t => {
  const service = micro(app)

  const payload = {nonce:"0x1",gasPrice:"0x3",gas:"0x2",to:"0x38588822bea476d5e1d56cfc9ce9781fe5262196",value:"0x5",input:"0x",v:"0x25",r:"0x7969190e57d27eeb110fb8ec377912f8ba728c919f78019880f00c5eac13d183",s:"0x5010a63c7f5834ef68a2224a957ea3d19c42b496032bc4a7ceab4f5dc5898a77","hash":"0x3176c55cd1ddb2c136c9aed12cd1148a1ee6ccf61cba3a617d186bb29e27f00b"}
  const url = await listen(service)
  var options = {
    method: 'POST',
    uri: url,
    body: payload,
    json: true
  };
  const body = await request(options)

  t.deepEqual(body, payload)
  service.close()
})

test('recognizes invalid signatures', async t => {
  const service = micro(app)

  const invalidPayload = {gasPrice:"0x3",gas:"0x2",to:"0x38588822bea476d5e1d56cfc9ce9781fe5262196",value:"0x5",input:"0x",v:"0x25",r:"0x7969190e57d27eeb110fb8ec377912f8ba728c919f78019880f00c5eac13d183", "hash":"0x3176c55cd1ddb2c136c9aed12cd1148a1ee6ccf61cba3a617d186bb29e27f00b"}
  const url = await listen(service)
  var options = {
    method: 'POST',
    uri: url,
    body: invalidPayload,
    json: true
  };

  const body = await request(options).catch(err => {
    t.pass()
  })
  service.close()
})
