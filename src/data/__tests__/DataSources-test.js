'use strict';

import DataSources from '../DataSources';

describe('DataSources', () => {
    it('getsCardData', () => {
        DataSources.getCardsData({
            cb: function(data){
                expectToBeTruthy(data);
            }
        });

        

    });
});