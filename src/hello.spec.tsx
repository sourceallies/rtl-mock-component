import {render, screen} from '@testing-library/react';
import React from 'react';

function HelloWorld() {
    return (
        <h1>Hello World</h1>
    );
}

test('render works', () => {
    render(<HelloWorld />);

    expect(screen.getByRole('heading', {name: 'Hello World'})).not.toBeNull();
});