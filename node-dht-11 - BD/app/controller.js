const express = require('express');
const { ArduinoData } = require('./serial')
const router = express.Router();
const executar = require('./connection');


router.get('/temperature', (request, response, next) => {

    let sum = ArduinoData.ListTemp.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoData.ListTemp.length).toFixed(2);

    response.json({
        data: ArduinoData.ListTemp,
        total: ArduinoData.ListTemp.length,
        average: isNaN(average) ? 0 : average,
    });

});

router.get('/humidity', (request, response, next) => {

    let sum = ArduinoData.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoData.List.length).toFixed(2);

    response.json({
        data: ArduinoData.List,
        total: ArduinoData.List.length,
        average: isNaN(average) ? 0 : average,
    });

});

router.post('/sendData', (request, response) => {
    temperatura = ArduinoData.ListTemp[ArduinoData.ListTemp.length - 1];
    umidade = ArduinoData.List[ArduinoData.List.length - 1];
    
    // var request = new sql.Request();
    var sql = `INSERT INTO [dbo].[medidas2](temperatura,umidade, d4ta) VALUES(${temperatura}, ${umidade}, CURRENT_TIMESTAMP)`;
    executar(sql)
    response.sendStatus(200);
})

module.exports = router;