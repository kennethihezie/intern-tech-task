var currency = 'USD'
var oBtc = ''
var oAppl = ''
var oTesla = ''
var oAmazon = ''

$(document).ready(function (){
    $.ajax({
        url: '/getStockBtc',
        data: {
            btc: 'BTC',
        },
        contentType: false,
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        success: function(req, res, data){
            oBtc = data.responseJSON.price
            setDataBtc(data.responseJSON)
        },
        error: function(err){
        
        }
    })

    $.ajax({
        url: '/getStockTesla',
        data: {
            tes: 'TSLA'
        },
        contentType: false,
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        success: function(req, res, data){
            oTesla = data.responseJSON.price
            setDataTes(data.responseJSON)
        },
        error: function(err){
        
        }
    })

    $.ajax({
        url: '/getStockAppl',
        data: {
            appl: 'APPL',
        },
        contentType: false,
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        success: function(req, res, data){
            oAppl = data.responseJSON.price
            setDataAppl(data.responseJSON)
        },
        error: function(err){
        
        }
    })

    $.ajax({
        url: '/getStockAmzn',
        data: {
            amzn: 'AMZN',
        },
        contentType: false,
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        success: function(req, res, data){
            oAmazon = data.responseJSON.price
            setDataAzmn(data.responseJSON)
        },
        error: function(err){
        
        }
    })
})


function setDataBtc(data){
    $('#btc_price').html(data.price)
    $('#btc_tab').html(data.price + ' ' + currency)
}

function setDataTes(data){
    $('#tes_price').html(data.price)
    $('#tes_tab').html(data.price + ' ' + currency)
}

function setDataAppl(data){
    $('#appl_price').html(data.price)
    $('#appl_tab').html(data.price + ' ' + currency)
}


function setDataAzmn(data){
    $('#am_price').html(data.price)
    $('#amzn_tab').html(data.price + ' ' + currency)
}
    
function convertNGN(){
    $('#cur_ngn').removeClass('badge badge-warning')
    $('#cur_usd').removeClass('badge badge-success')
    $('#cur_euro').removeClass('badge badge-warning')
  
    $('#cur_ngn').addClass('badge badge-success')
    $('#cur_usd').addClass('badge badge-warning')
    $('#cur_euro').addClass('badge badge-warning')

    $('#am_price').html('Loading....')
    $('#appl_price').html('Loading....')
    $('#tes_price').html('Loading....')
    $('#btc_price').html('Loading....')

    $('#amzn_tab').html('Loading....')
    $('#appl_tab').html('Loading....')
    $('#tes_tab').html('Loading....')
    $('#btc_tab').html('Loading....')



    $.ajax({
        url: '/convertCurrency',
        data: {
            from: currency,
            to: 'NGN',
            amount: 1
        },
        contentType: false,
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        success: function(req, res, data){
            console.log(oBtc);
            var rate = data.responseJSON.result

            var btc = {}
            console.log(parseFloat(oBtc));

            btc['price'] = parseFloat(oBtc) * rate
            setDataBtc(btc)

            var tes = {}
            tes['price'] = parseInt(oTesla) * rate
            setDataTes(tes)

            var appl = {}
            appl['price'] = parseInt(oAppl) * rate
            setDataAppl(appl)

            var amz = {}
            amz['price'] = parseInt(oAmazon) * rate
            setDataAzmn(amz)
        },
        error: function(err){
        
        }
    })
    currency = 'NGN'
}
  
function convertUSD(){
      $('#cur_ngn').removeClass('badge badge-success')
      $('#cur_usd').removeClass('badge badge-warning')
      $('#cur_euro').removeClass('badge badge-warning')
    
      $('#cur_ngn').addClass('badge badge-warning')
      $('#cur_usd').addClass('badge badge-success')
      $('#cur_euro').addClass('badge badge-warning')

      $('#am_price').html('Loading....')
      $('#appl_price').html('Loading....')
      $('#tes_price').html('Loading....')
      $('#btc_price').html('Loading....')


    $('#amzn_tab').html('Loading....')
    $('#appl_tab').html('Loading....')
    $('#tes_tab').html('Loading....')
    $('#btc_tab').html('Loading....')

      $.ajax({
        url: '/convertCurrency',
        data: {
            from: currency,
            to: 'USD',
            amount: 1
        },
        contentType: false,
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        success: function(req, res, data){
            var rate = data.responseJSON.result
            var btc = {}
            btc['price'] = parseInt(oBtc) * rate
            setDataBtc(btc)

            var tes = {}
            tes['price'] = parseInt(oTesla) * rate
            setDataTes(tes)

            var appl = {}
            appl['price'] = parseInt(oAppl) * rate
            setDataAppl(appl)

            var amz = {}
            amz['price'] = parseInt(oAmazon) * rate
            setDataAzmn(amz)
        },
        error: function(err){
        
        }
    })

      currency = 'USD'
}
  
function convertEURO(){
      $('#cur_ngn').removeClass('badge badge-success' || 'badge badge-warning')
      $('#cur_usd').removeClass('badge badge-success' || 'badge badge-warning')
      $('#cur_euro').removeClass('badge badge-warning')
    
      $('#cur_ngn').addClass('badge badge-warning')
      $('#cur_usd').addClass('badge badge-warning')
      $('#cur_euro').addClass('badge badge-success')

      $('#am_price').html('Loading....')
      $('#appl_price').html('Loading....')
      $('#tes_price').html('Loading....')
      $('#btc_price').html('Loading....')


    $('#amzn_tab').html('Loading....')
    $('#appl_tab').html('Loading....')
    $('#tes_tab').html('Loading....')
    $('#btc_tab').html('Loading....')

      $.ajax({
        url: '/convertCurrency',
        data: {
            from: currency,
            to: 'EUR',
            amount: 1
        },
        contentType: false,
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        success: function(req, res, data){
            var rate = data.responseJSON.result
            var btc = {}
            btc['price'] = parseInt(oBtc) * rate
            setDataBtc(btc)

            var tes = {}
            tes['price'] = parseInt(oTesla) * rate
            setDataTes(tes)

            var appl = {}
            appl['price'] = parseInt(oAppl) * rate
            setDataAppl(appl)

            var amz = {}
            amz['price'] = parseInt(oAmazon) * rate
            setDataAzmn(amz)

        },
        error: function(err){
        
        }
    })

      currency = 'EUR'
}
