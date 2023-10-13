const mssql = require('./configSQL');

const database = 'data'

const getData = async (req, res) => {
    const quantity = req.query.quantity
    const query = `SELECT TOP ${quantity}  * FROM ${database} ORDER BY timestamp DESC`

    await mssql.query(query)
    .then((data) => {
        res.json(data.recordsets)
    })
    .catch((err) => res.json('Have an error: ' + err.message))
}

const addData = async (data, res) => {
    const now = new Date().toISOString();
    const query = `
        INSERT INTO [dbo].[${database}]
        ([air_temperature], 
        [wind_speed_km_per_hour], 
        [humidity], 
        [wave_height_in_meter], 
        [water_temperature], 
        [UV_index], 
        [timestamp])
        VALUES (${data.air_temperature}, 
        ${data.wind_speed_km_per_hour}, 
        ${data.humidity}, 
        ${data.wave_height_in_meter}, 
        ${data.water_temperature}, 
        ${data.UV_index}, '${now}')
    `;
    // Sử dụng tham số trong truy vấn SQL
    await mssql.query(query);
  };
  

module.exports = {
    getData,
    addData,
}