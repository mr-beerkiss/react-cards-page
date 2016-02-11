'use strict';

window.noop = window.noop || function() {};

const DataSource = (function() {

    var cardsCache = {};

    //http://localhost:8080/a/.rest/lazycards/v1/designs?nid=3fa3fdd5-abaa-4c53-9d65-cc166f196a27&nlocale=en_GB&bsessioncode=7f08f2e34cee9d67e95e134a6c576592&bchannelid=1002&occasionCategory=christmas&occasionName=christmas-cards&skip=15&limit=15

    const StaticParams = {
        NODE_ID: '3fa3fdd5-abaa-4c53-9d65-cc166f196a27',
        LOCALE: 'en_GB',
        SESSION_CODE: '7f08f2e34cee9d67e95e134a6c576592',
        CHANNEL_ID: '1002'
    };

    var getCardsCache = function(category, occasionName, flushCache ) {

        if ( !flushCache && isCached(cardsCache, category, occasionName) ) {
            if ( cardsCache[category][occasionName] !== null ) {
                return cardsCache[category][occasionName];
            }   
        }
            
        return cardsCache[category][occasionName] = null;
        
    };

    var setCardsCache = function(category, occasionName, data) {
        cardsCache[category][occasionName] = data;
    };

    var isCached = function(cache, category, occasionName) {
        if ( cardsCache.hasOwnProperty(category) ) {
            if ( cardsCache[category].hasOwnProperty(occasionName) ) {
                return true;
            } 
        } else {
            cardsCache[category] = {};
        }

        return false;
    };


 
    var getCardsData = function getCardsData(options, flushCache) {

        const category = options.category || 'christmas';
        const occasionName = options.occasionName || 'christmas-cards';
        const cb = options.cb || window.noop;

        const cachedRequest = getCardsCache(category, occasionName, flushCache);

        if ( cachedRequest === null ) {
            const skip = options.skip || 0;
            const limit = options.limit || 25;
            const url =  options.url || 'http://localhost:3001/proxy/a/.rest/lazycards/v1/designs';

            const unintestingParams = `nid=${StaticParams.NODE_ID}&nlocale=${StaticParams.LOCALE}&bsessioncode=${StaticParams.SESSION_CODE}&bchannelid=${StaticParams.CHANNEL_ID}`
            const interestingParams = `occasionCategory=${category}&occasionName=${occasionName}&skip=${skip}&limit=${limit}`;

            const dataURL = `${url}?${interestingParams}&${unintestingParams}`;

            // TODO: Figure out how to return a promise
            
            fetch(dataURL)
                .then(response => response.json() )
                .then(json => {
                    setCardsCache(category, occasionName, json);
                    cb(json);
                })
                .catch(ex => {
                    console.error('Error fetching cards data', ex);
                });    
        } else {
            cb(cachedRequest);
        }       
    }; 

    return Object.freeze({
        getCardsData
    });
})();

export default DataSource;