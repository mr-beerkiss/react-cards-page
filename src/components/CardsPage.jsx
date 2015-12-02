'use strict';

import React, {Component} from 'react';
import CardsList from './CardsList.jsx';
import DataSources from '../data/DataSources';

export default class CardsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            designs: [],
            occasion : 'Default occassion'
        };
    }

    componentDidMount() {
        console.debug('cdm');
        DataSources.getCardsData({
            cb: function(data) {
                this.setState({
                    designs: data.designs,
                    occasion: data.occasion.displayValue
                });
            }.bind(this)
        });
    }

    render() {
        return (
            <section className="cardsPage">
                <h1>{this.state.occasion}</h1>
                <CardsList designs={this.state.designs} />
            </section>
        );
    }
}