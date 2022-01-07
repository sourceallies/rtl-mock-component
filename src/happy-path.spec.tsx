import { render, screen } from '@testing-library/react';
import React from 'react';
import { setupMockComponent, getMockElement } from './index';
import MockedComponent from './test-components/MockedComponent';

jest.mock('./test-components/MockedComponent');

const TestedComponent = ({value}: {value: string}) => {
    return (
        <div>
            <MockedComponent value={value}/>
        </div>
    );
};

beforeEach(() => {
    setupMockComponent(MockedComponent);
});

it('should render a div', () => {
    render(<TestedComponent value='val' />);

    expect(getMockElement(MockedComponent).tagName).toEqual('DIV');
});

it('should have the prop held', () => {
    render(<TestedComponent value='val' />);

    expect(getMockElement(MockedComponent).props.value).toEqual('val');
});

it('should hold the last value on a re-render', () => {
    const {rerender} = render(<TestedComponent value='val' />);
    rerender(<TestedComponent value='new-val' />);

    expect(getMockElement(MockedComponent).props.value).toEqual('new-val');
});