'use strict';

import React, {Component} from 'react';
import './styles/card.css';

export default class Card extends Component {
    render() {
         return (
            <li className="card">
                <div className="image-wrapper">
                    <img src={this.props.design.previewImages[0].cataloguePageThumbUrl} />
                    <button>Preview</button>
                </div>
                <h3>{this.props.design.designName}</h3>
                <h4>{this.props.design.type} card, from {this.getLowestPrice(this.props.design.prices)}</h4>
            </li>
        );
    }

    getLowestPrice(prices) {
        let lowestPrice = Number.MAX_VALUE;
        let lowestIndex = -1;

        prices.forEach((next, index) => {
            let price = this.priceAsInt(next.price);
            lowestPrice = price < lowestPrice ? price : lowestPrice
            lowestIndex = index;
        }); 

        return prices[lowestIndex].price;
    }

    priceAsInt(price) {
        const matches = price.match(/(\D*)([0-9]+)(\D*)([0-9]*)(\D*)/);

        const major = matches[2] | 0;
        const minor = matches[4] | 0;

        return (minor > 0 ? major * 100 : major ) + minor;
    }
}