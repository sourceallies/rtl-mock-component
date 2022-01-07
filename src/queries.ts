import { FC } from "react";
import { MockedElement } from "./setupMockComponent";
import {MatcherFunction, screen} from '@testing-library/react';

function buildMatcherFunctionForComponent<PropType>(mockComponent: FC<PropType>): MatcherFunction {
    return (_, element) => {
        const mockedElement = element as unknown as MockedElement<PropType>;
        return mockedElement.component === mockComponent;
    };
}

export function getMockElement<PropType>(mockComponent: FC<PropType>): MockedElement<PropType> {
    return screen.getByTestId(buildMatcherFunctionForComponent(mockComponent));
}