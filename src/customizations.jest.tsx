import { render } from '@testing-library/react';
import React from 'react';
import { setupMockComponent, getByMockComponent } from './index';
import MockedComponent from './test-components/MockedComponent';

jest.mock('./test-components/MockedComponent');

it('should use a custom element', () => {
    setupMockComponent(MockedComponent, {element: 'tr'});

    render(<table><tbody><MockedComponent /></tbody></table>);

    expect(getByMockComponent(MockedComponent).tagName).toEqual('TR');
});