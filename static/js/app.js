/**
 * Our Vue.js application.
 *
 * This manages the entire front-end website.
 */

// set up for apis
 let CRYPTOCOMPARE_API_URI="https://www.cryptocompare.com/api/data/coinlist/";
 let COINMARKET_API_URI="https://api.coinmarketcap.com";

 let updateInterval=60*1000;

 let app=new Vue
 ({ 
        
    el:"#app",
    data:
    {
        coins:[],
        coinData:{}
    },
    methods:
    {
           /**
             * Get the top 10 cryptocurrencies by value.  This data is refreshed every 5
             * minutes by the backing API service.
          */
        getCoins: function()
        {
            let self = this;

            axios.get(COINMARKET_API_URI + "/v1/ticker/?limit=10")
                .then((resp) => {
                this.coins = resp.data;
                })
                .catch((err) => {
                console.error(err);
                });
        },
          /**
             * Load up all cryptocurrency data.  This data is used to find what logos
             * each currency has, so we can display things in a friendly way.
          */
        getCoinData: function()
        {

            let self = this;
/*
if(axios.get("https://cors.io/?"+CRYPTOCOMPARE_API_URI)!=null){
                axios.get("https://cors.io/?"+CRYPTOCOMPARE_API_URI)
*/
            if(axios.get(CRYPTOCOMPARE_API_URI)!=null){
                axios.get(CRYPTOCOMPARE_API_URI)
                .then((resp) => {
                this.coinData = resp.data.Data;
                this.getCoins();
               
                })
                .catch((err) => {
                this.getCoins();
                console.error(err);
                });
              }

              else if(axios.get(CRYPTOCOMPARE_API_URI).resp!=null){
                axios.get(CRYPTOCOMPARE_API_URI)
                .then((resp) => {
                this.coinData = resp.data.Data;
                this.getCoins();
                })
                .catch((err) => {
                this.getCoins();
                console.error(err);
                });

              }
        },
            
          /**
             * Given a cryptocurrency ticket symbol, return the currency's logo
             * image.
          */
        getCoinImage:function(symbol)
       { 
           symbol = (symbol === "MIOTA" ? "IOT" : symbol);
           symbol = (symbol === "VERI" ? "VRM" : symbol);
           if(this.coinData[symbol].ImageUrl!=null){
            return "https://www.cryptocompare.com" +  this.coinData[symbol].ImageUrl;
           }
           else return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Arabic_Question_mark_%28RTL%29.svg/250px-Arabic_Question_mark_%28RTL%29.svg.png"
       }, 

       getColor: (num) => 
       {
            return num > 0 ? "color:green;" : "color:red;";
       },

       
       
      

    },

     created:function()
       {
           console.log("ran");
          this.getCoinData();
       }

 });

 setInterval(() => {
  app.getCoins();
}, updateInterval);
