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
             * Load up all cryptocurrency data.  This data is used to find what logos
             * each currency has, so we can display things in a friendly way.
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
             * Get the top 10 cryptocurrencies by value.  This data is refreshed every 5
             * minutes by the backing API service.
          */
        getCoinData: function() {
      let self = this;
        axios.get("http://cors.io/?u="+CRYPTOCOMPARE_API_URI)
        .then((resp) => {
          this.coinData = resp.data.Data;
          this.getCoins();
        })
        .catch((err) => {
          this.getCoins();
          console.error(err);
        });
    },
          /**
             * Given a cryptocurrency ticket symbol, return the currency's logo
             * image.
          */
        getCoinImage:function(symbol)
       { 
           symbol = (symbol === "MIOTA" ? "IOT" : symbol);
           symbol = (symbol === "VERI" ? "VRM" : symbol);
            return "https://www.cryptocompare.com" +  this.coinData[symbol].ImageUrl;
               
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