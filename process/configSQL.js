const mssql = require('mssql')

const config = {
    server: 'NIN',
    database: 'WaterMonitoring',
    user: 'waterMonitoringLogin',
    password: 'seduoc10diem',
    encrypt: false
}

mssql
.connect(config)
.then(() => console.log('Connect to SQL database successfully.'))
.catch((err) => console.log('Error connecting' + err.message))

module.exports = mssql