import React from 'react';
import { render } from '@testing-library/react';
import { setupMockComponent, getByMockComponent } from './index';
import MockedClassComponent from './test-components/MockedClassComponent';

jest.mock('./test-components/MockedClassComponent');

const TestedComponent = ({value}: {value: string}) => (
    <div>
        <MockedClassComponent value={value}/>
    </div>
);

beforeEach(() => {
    // @ts-ignore
    setupMockComponent(MockedClassComponent);
});

it('should render a div', () => {
    render(<TestedComponent value='val' />);

    // @ts-ignore
    expect(getByMockComponent(MockedClassComponent).tagName).toEqual('DIV');
});
