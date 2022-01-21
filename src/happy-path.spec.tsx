import { buildQueries, getByRole, render, screen, within } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { setupMockComponent, getByMockComponent } from './index';
import { findAllByMockComponent, findByMockComponent, getAllByMockComponent, queryAllByMockComponent, queryByMockComponent } from './queries';
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

    expect(getByMockComponent(MockedComponent).tagName).toEqual('DIV');
});

it('should have the prop held', () => {
    render(<TestedComponent value='val' />);

    expect(getByMockComponent(MockedComponent).props.value).toEqual('val');
});

it('should render any passed children', () => {
    render(
        <div>
            <MockedComponent><button>Save</button></MockedComponent>
        </div>
    );

    expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument();
});

it('should hold the last value on a re-render', () => {
    const {rerender} = render(<TestedComponent value='val' />);
    rerender(<TestedComponent value='new-val' />);

    expect(getByMockComponent(MockedComponent).props.value).toEqual('new-val');
});

it('should find via getByMockComponent', () => {
    render(<TestedComponent value='val' />);

    expect(getByMockComponent(MockedComponent)).toBeInTheDocument();
});

it('should find via getAllByMockComponent', () => {
    render(
        <div>
            <TestedComponent value='val' />
            <TestedComponent value='val' />
        </div>
    );
    const all = getAllByMockComponent(MockedComponent);
    expect(all).toHaveLength(2);
    expect(all[0]).toBeInTheDocument();
    expect(all[1]).toBeInTheDocument();
    expect(all[0]).not.toBe(all[1]);
});

it('should find via queryByMockComponent', () => {
    render(<TestedComponent value='val' />);

    expect(queryByMockComponent(MockedComponent)).toBeInTheDocument();
});

it('should find via queryAllByMockComponent', () => {
    render(
        <div>
            <TestedComponent value='val' />
            <TestedComponent value='val' />
        </div>
    );
    const all = queryAllByMockComponent(MockedComponent);
    expect(all).toHaveLength(2);
    expect(all[0]).toBeInTheDocument();
    expect(all[1]).toBeInTheDocument();
    expect(all[0]).not.toBe(all[2]);
});

it('should find via findByMockComponent', async () => {
    const TimedFunction = () => {
        const [visible, setVisible] = useState(false);
        useEffect(() => {
            const handle = setTimeout(() => setVisible(true), 10);
            return () => clearTimeout(handle);
        }, []);
        return <div>{visible && <MockedComponent value='' />}</div>;
    };
    render(<TimedFunction />);

    expect(await findByMockComponent(MockedComponent)).toBeInTheDocument();
});

it('should find via findAllByMockComponent', async () => {
    const TimedFunction = () => {
        const [visible, setVisible] = useState(false);
        useEffect(() => {
            const handle = setTimeout(() => setVisible(true), 10);
            return () => clearTimeout(handle);
        }, []);
        return (
            <div>
                {visible && <span><MockedComponent value='' /><MockedComponent value='' /></span>}
            </div>
        );
    };
    render(<TimedFunction />);

    const all = await findAllByMockComponent(MockedComponent);
    expect(all).toHaveLength(2);
    expect(all[0]).toBeInTheDocument();
    expect(all[1]).toBeInTheDocument();
    expect(all[0]).not.toBe(all[2]);
});

describe('Searching within a containing element', () => {
    it('should find within an element via getByMockComponent', () => {
        render(
            <ul>{['A', 'B'].map(value => <li key={value}><MockedComponent value={value} /></li>)}</ul>
        );

        const container = screen.getAllByRole('listitem')[0];
        expect(getByMockComponent(MockedComponent, {container}).props.value).toEqual('A');
    });

    it('should find within an element via getAllByMockComponent', () => {
        render(
            <ul>{['A', 'B'].map(value => 
                <li key={value}>
                    <MockedComponent value={value} />
                    <MockedComponent value={value} />
                </li>)}
            </ul>
        );

        const container = screen.getAllByRole('listitem')[0];
        const all = getAllByMockComponent(MockedComponent, {container});
        expect(all).toHaveLength(2);
        expect(all[0].props.value).toEqual('A');
        expect(all[1].props.value).toEqual('A');
        expect(all[0]).not.toBe(all[1]);
    });

    it('should find within an element via queryByMockComponent', () => {
        render(
            <ul>{['A', 'B'].map(value => 
                <li key={value}>
                    <MockedComponent value={value} />
                </li>)}
            </ul>
        );

        const container = screen.getAllByRole('listitem')[0];
        expect(queryByMockComponent(MockedComponent, {container})?.props.value).toEqual('A');
    });

    it('should find within an element via queryAllByMockComponent', () => {
        render(
            <ul>{['A', 'B'].map(value => 
                <li key={value}>
                    <TestedComponent value={value} />
                    <TestedComponent value={value} />
                </li>)}
            </ul>
        );

        const container = screen.getAllByRole('listitem')[0];
        const all = queryAllByMockComponent(MockedComponent, {container});
        expect(all).toHaveLength(2);
        expect(all[0]).toBeInTheDocument();
        expect(all[1]).toBeInTheDocument();
        expect(all[0]).not.toBe(all[1]);
    });

    it('should find within an element via findByMockComponent', async () => {
        const TimedFunction = () => {
            const [visible, setVisible] = useState(false);
            useEffect(() => {
                const handle = setTimeout(() => setVisible(true), 10);
                return () => clearTimeout(handle);
            }, []);
            return <div>{visible && <MockedComponent value='' />}</div>;
        };
        render(
            <ul>{['A', 'B'].map(value => 
                <li key={value}>
                    <TimedFunction />
                </li>)}
            </ul>
        );

        const container = screen.getAllByRole('listitem')[0];
        expect(await findByMockComponent(MockedComponent, {container})).toBeInTheDocument();
    });

    it('should find within an element via findAllByMockComponent', async () => {
        const TimedFunction = () => {
            const [visible, setVisible] = useState(false);
            useEffect(() => {
                const handle = setTimeout(() => setVisible(true), 10);
                return () => clearTimeout(handle);
            }, []);
            return (
                <div>
                    {visible && <span><MockedComponent value='' /><MockedComponent value='' /></span>}
                </div>
            );
        };
        render(
            <ul>{['A', 'B'].map(value => 
                <li key={value}>
                    <TimedFunction />
                    <TimedFunction />
                </li>)}
            </ul>
        );

        const container = screen.getAllByRole('listitem')[0];
        const all = await findAllByMockComponent(MockedComponent, {container});
        expect(all).toHaveLength(2);
        expect(all[0]).toBeInTheDocument();
        expect(all[1]).toBeInTheDocument();
        expect(all[0]).not.toBe(all[1]);
    });
});