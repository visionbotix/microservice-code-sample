/**
 * Created by Taimoor on 23/04/2021.
 */
'use strict'

const PromiseReturns = require('bluebird')
const StandardError = require('standard-error')
const fs = require('fs')
const winston = require('../config/winston')
const config = require('../config/config')
const AWS = require('aws-sdk')

// Check if user has permission or not
function checkIfUserHasPermission (permissionName, permissionsArray) {
  for (let i = 0; i < permissionsArray.length; i++) {
    if (permissionName === permissionsArray[i].moduleName) {
      return true
    }
  }
  return false
}

function rejectPromise (message, code = null) {
  winston.error(message)
  return new PromiseReturns(function (resolve, reject) {
    reject(new StandardError({
      status: 'Error',
      message: message,
      statusCode: code
    }))
  })
}

function catchException (err) {
  winston.error(err)
  return rejectPromise(err.message, err.statusCode)
}

function putS3Object (s3, params) {
  return new PromiseReturns(function (resolve, reject) {
    s3.putObject(params, function (err) {
      if (err) {
        return rejectPromise(reject, err)
      }
      resolve()
    })
  })
}

function uploadImageToS3 (imageFile) {
  return new PromiseReturns(function (resolve) {
    if (imageFile) {
      const file = imageFile
      const fileName = file.originalname
      const filePath = config.s3.host_name + config.s3.bucket + '/' + config.s3.paths.original + fileName
      const s3Key = config.s3.paths.original + fileName

      AWS.config.update(config.s3.credentials)
      const s3 = new AWS.S3({ params: { Bucket: config.s3.bucket } })
      const params = {
        Key: s3Key,
        Body: fs.createReadStream(file.path),
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'application/octet-stream'
      }
      const obj = {
        s3: s3,
        params: params,
        filePath: filePath
      }
      return resolve(obj)
    } else {
      resolve(null)
    }
  })
}

module.exports = {
  checkIfUserHasPermission,
  rejectPromise,
  catchException,
  putS3Object,
  uploadImageToS3
}
