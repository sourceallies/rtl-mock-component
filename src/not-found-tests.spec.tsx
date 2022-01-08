import { render, screen } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { setupMockComponent, getByMockComponent } from './index';
import { findAllByMockComponent, findByMockComponent, getAllByMockComponent, queryAllByMockComponent, queryByMockComponent } from './queries';
import MockedComponent from './test-components/MockedComponent';

jest.mock('./test-components/MockedComponent');

const TestedComponent = () => {
    return <div>Nothing Here</div>;
};

beforeEach(() => {
    setupMockComponent(MockedComponent);
});

it('should error if getByMockComponent cannot find it', () => {
    render(<TestedComponent />);

    expect(() => getByMockComponent(MockedComponent)).toThrow();
});

it('should error if multiple components exist', () => {
    render(<div><MockedComponent /><MockedComponent /></div>);

    expect(() => getByMockComponent(MockedComponent)).toThrow();
});

it('should error if getAllByMockComponent cannot find it', () => {
    render(<TestedComponent />);

    expect(() => getAllByMockComponent(MockedComponent)).toThrow();
});

it('should return null if queryByMockComponent cannot find it', () => {
    render(<TestedComponent />);

    expect(queryByMockComponent(MockedComponent)).toBeNull();
});

it('should return an empty array if queryAllByMockComponent cannot find it', () => {
    render(<TestedComponent />);

    expect(queryAllByMockComponent(MockedComponent)).toEqual([]);
});

it('should reject if findByMockComponent cannot find it', async () => {
    render(<TestedComponent />);

    expect(findByMockComponent(MockedComponent)).rejects.toBeDefined();
});

it('should reject if findByMockComponent finds multiple', async () => {
    render(<div><MockedComponent /><MockedComponent /></div>);

    expect(findByMockComponent(MockedComponent)).rejects.toBeDefined();
});

it('should reject if findAllByMockComponent cannot find it', async () => {
    render(<TestedComponent />);

    expect(findAllByMockComponent(MockedComponent)).rejects.toBeDefined();
});