import { FC } from "react";
import { MockedElement } from "./setupMockComponent";
import {MatcherFunction, screen} from '@testing-library/react';

function buildMatcherFunctionForComponent<PropType>(mockComponent: FC<PropType>): MatcherFunction {
    return (_, element) => {
        const mockedElement = element as unknown as MockedElement<PropType>;
        return mockedElement.component === mockComponent;
    };
}

/**
 * Attempt to find the mocked element. Throws if not exactly one is found.
 */
export function getByMockComponent<PropType>(mockComponent: FC<PropType>): MockedElement<PropType> {
    return screen.getByTestId(buildMatcherFunctionForComponent(mockComponent));
}

/**
 * Attempt to find all mocked elements. Throws if none found.
 */
export function getAllByMockComponent<PropType>(mockComponent: FC<PropType>): MockedElement<PropType>[] {
    return screen.getAllByTestId(buildMatcherFunctionForComponent(mockComponent));
}

/**
 * Attempt to find the mocked element. Returns null if not found. Throws if multiple found.
 */
export function queryByMockComponent<PropType>(mockComponent: FC<PropType>): MockedElement<PropType> | null {
    return screen.queryByTestId(buildMatcherFunctionForComponent(mockComponent));
}

/**
 * Attempt to find all mocked element. Returns empty array if not found.
 */
export function queryAllByMockComponent<PropType>(mockComponent: FC<PropType>): MockedElement<PropType>[] {
    return screen.queryAllByTestId(buildMatcherFunctionForComponent(mockComponent));
}

/**
 * Attempt to find the mocked element. Reject if not eventually found or multiple are found.
 */
export function findByMockComponent<PropType>(mockComponent: FC<PropType>): Promise<MockedElement<PropType>> {
    return screen.findByTestId(buildMatcherFunctionForComponent(mockComponent));
}

/**
 * Attempt to find all the mocked element. Rejects if non are eventually found.
 */
export function findAllByMockComponent<PropType>(mockComponent: FC<PropType>): Promise<MockedElement<PropType>[]> {
    return screen.findAllByTestId(buildMatcherFunctionForComponent(mockComponent));
}
