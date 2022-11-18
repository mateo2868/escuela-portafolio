module.exports = app => {
    return {
      curso: require('./curso')(app),
      estudio: require('./estudiante')(app),
    }
}