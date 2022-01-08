import { FC } from "react";
import { MockedElement } from "./setupMockComponent";
import {MatcherFunction, screen} from '@testing-library/react';

function buildMatcherFunctionForComponent<PropType>(mockComponent: FC<PropType>): MatcherFunction {
    return (_, element) => {
        const mockedElement = element as unknown as MockedElement<PropType>;
        return mockedElement.component === mockComponent;
    };
}

export function getByMockComponent<PropType>(mockComponent: FC<PropType>): MockedElement<PropType> {
    return screen.getByTestId(buildMatcherFunctionForComponent(mockComponent));
}

export function getAllByMockComponent<PropType>(mockComponent: FC<PropType>): MockedElement<PropType>[] {
    throw new Error('Not implemented');
}

export function queryByMockComponent<PropType>(mockComponent: FC<PropType>): MockedElement<PropType> | null {
    throw new Error('Not implemented');
}

export function queryAllByMockComponent<PropType>(mockComponent: FC<PropType>): MockedElement<PropType>[] {
    throw new Error('Not implemented');
}

export function findByMockComponent<PropType>(mockComponent: FC<PropType>): Promise<MockedElement<PropType>> {
    throw new Error('Not implemented');
}

export function findAllByMockComponent<PropType>(mockComponent: FC<PropType>): Promise<MockedElement<PropType>[]> {
    throw new Error('Not implemented');
}
