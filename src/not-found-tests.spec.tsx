import { render, screen } from '@testing-library/react';
import React from 'react';
import { setupMockComponent, getMockElement } from './index';
import MockedComponent from './test-components/MockedComponent';

jest.mock('./test-components/MockedComponent');

const TestedComponent = () => {
    return <div>Nothing Here</div>;
};

beforeEach(() => {
    setupMockComponent(MockedComponent);
});

it('should error if getMockElement cannot find it', () => {
    render(<TestedComponent />);

    expect.assertions(1);
    try {
        getMockElement(MockedComponent);
    } catch (err) {
        console.error(err);
        expect(err).toBeDefined();
    }
});