/**
 * Our Vue.js application.
 *
 * This manages the entire front-end website.
 */

// set up for apis
 let CRYPTOCOMPARE_API_URI="https://www.cryptocompare.com";
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
       getCoinData:function()
       {
            let self=this;
            
            axios.get(COINMARKET_API_URI+"/v1/ticker/?limit=10")
              .then((resp)=>{
                  this.coins=resp.data;
              })
              .catch((err)=>{
                  console.error(err);
              });  

       },
          /**
             * Get the top 10 cryptocurrencies by value.  This data is refreshed every 5
             * minutes by the backing API service.
          */
       getCoins:function()
       {


        
       },
          /**
             * Given a cryptocurrency ticket symbol, return the currency's logo
             * image.
          */
       getCoinImage:function(symbol){}

               


    }

    

 });