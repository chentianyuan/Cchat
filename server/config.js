const qiniu = require('qiniu')

const accessKey = 'u0I5FqedDGtmp4llUlQCryiP8oQtXcmQzyGxGgzM'
const secretKey = 'Bev9Suumon15ZrtMHmDJW5H1EOg5ybVeuBIhTSd_'

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
    scope: 'qiniu',
    expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}