'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Card from '../Card.jsx';

describe('Card', () => {
    it('renders', () => {
        const testCard = TestUtils.renderIntoDocument(<Card />);
        expect(testCard).toBeTruthy();
    });
});