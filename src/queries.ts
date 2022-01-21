import { FC } from "react";
import { MockedElement } from "./setupMockComponent";
import {MatcherFunction, screen, within} from '@testing-library/react';

function buildMatcherFunctionForComponent<PropType>(mockComponent: FC<PropType>): MatcherFunction {
    return (_, element) => {
        const mockedElement = element as unknown as MockedElement<PropType>;
        return mockedElement.component === mockComponent;
    };
}

function resolveQueries(options?: QueryOptions) {
    if (options?.container) {
        return within(options?.container);
    }
    return screen;
}

/**
 * A set of options that can be passed to the `*ByMockComponent` functions
 */
export interface QueryOptions {
    /**
     * If provided, search for mocked components only within this container
     */
    container: HTMLElement
}

/**
 * Attempt to find the mocked element. Throws if not exactly one is found.
 */
export function getByMockComponent<PropType>(mockComponent: FC<PropType>, options?: QueryOptions): MockedElement<PropType> {
    return resolveQueries(options).getByTestId(buildMatcherFunctionForComponent(mockComponent));
}

/**
 * Attempt to find all mocked elements. Throws if none found.
 */
export function getAllByMockComponent<PropType>(mockComponent: FC<PropType>, options?: QueryOptions): MockedElement<PropType>[] {
    return resolveQueries(options).getAllByTestId(buildMatcherFunctionForComponent(mockComponent));
}

/**
 * Attempt to find the mocked element. Returns null if not found. Throws if multiple found.
 */
export function queryByMockComponent<PropType>(mockComponent: FC<PropType>, options?: QueryOptions): MockedElement<PropType> | null {
    return resolveQueries(options).queryByTestId(buildMatcherFunctionForComponent(mockComponent));
}

/**
 * Attempt to find all mocked element. Returns empty array if not found.
 */
export function queryAllByMockComponent<PropType>(mockComponent: FC<PropType>, options?: QueryOptions): MockedElement<PropType>[] {
    return resolveQueries(options).queryAllByTestId(buildMatcherFunctionForComponent(mockComponent));
}

/**
 * Attempt to find the mocked element. Reject if not eventually found or multiple are found.
 */
export function findByMockComponent<PropType>(mockComponent: FC<PropType>, options?: QueryOptions): Promise<MockedElement<PropType>> {
    return resolveQueries(options).findByTestId(buildMatcherFunctionForComponent(mockComponent));
}

/**
 * Attempt to find all the mocked element. Rejects if non are eventually found.
 */
export function findAllByMockComponent<PropType>(mockComponent: FC<PropType>, options?: QueryOptions): Promise<MockedElement<PropType>[]> {
    return resolveQueries(options).findAllByTestId(buildMatcherFunctionForComponent(mockComponent));
}
