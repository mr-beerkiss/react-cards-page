'use strict';

import React, {Component} from 'react';
import Card from './Card.jsx';

import './styles/cards-list.css';

export default class CardsList extends Component {
    render() {

        const cards = this.props.designs.map( design => {
            console.debug(design);
            return (
                <Card key={design.id} design={design} />
            );
        })

        return (
            <ul className="cards-list">
                {cards}
            </ul>
        );

    } 
}