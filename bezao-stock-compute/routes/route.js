var express = require('express')
var router = express.Router()
var httpMsgs = require('http-msgs')
const axios = require('axios')
const yahooStockPrices = require('yahoo-stock-prices')


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/convert', (req, res) => {
    res.render('convert')
})

router.post('/getStockBtc', async (req, res) => {
    const stock = req.body.btc
         getStockPrice(stock).then((value) => {
            httpMsgs.sendJSON(req, res, value)
        })
    
})

router.post('/getStockTesla', async (req, res) => {
    const stock = req.body.tes
         getStockPrice(stock).then((value) => {
            httpMsgs.sendJSON(req, res, value)
        })
    
})

router.post('/getStockAppl', async (req, res) => {
    const stock = req.body.appl
         getStockPrice(stock).then((value) => {
            httpMsgs.sendJSON(req, res, value)
        })
})

router.post('/getStockAmzn', async (req, res) => {
    const stock = req.body.amzn
         getStockPrice(stock).then((value) => {
            httpMsgs.sendJSON(req, res, value)
        })
})

router.post('/convertCurrency', (req, res) => {
    const data = req.body
    convertCurrency(data.to, data.from, data.amount, req, res)
})



async function getStockPrice(sym){
    return await yahooStockPrices.getCurrentData(sym)
}

async function convertCurrency(from, to, amount, req, res){  
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
          apikey: '8CZcFbzjrMHghxFI9PpaUCIA977ul4Ke'
      }
    };

    axios.get(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
    .then(data => httpMsgs.sendJSON(req, res, data.data))
    .catch(error => console.log('error', error));

    axios.get(`https://api.apilayer.com/fixer/convert?to=NGN&from=USD&amount=1`, requestOptions)
    .then(data => console.log(data))
    .catch(error => console.log('error', error));
}


module.exports = router

//8CZcFbzjrMHghxFI9PpaUCIA977ul4Ke

