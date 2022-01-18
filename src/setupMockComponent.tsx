import React, { ReactHTML, RefCallback, useEffect, useRef } from "react";
import { FC } from "react";

export type MockedComponent<PropType> = jest.MockedFunction<FC<PropType>>;

export type MockedElement<PropType = {}> = HTMLElement & {
    props: PropType, 
    component: MockedComponent<PropType>
};

export const mockElementTestId = 'rtl-mock-element';

function ensureIsMock<PropType>(mockedComponent: FC<PropType>) {
    if (!jest.isMockFunction(mockedComponent)) {
        throw new Error(`${mockedComponent.name} cannot be setup because it is not a Jest mock. Call "jest.mock('path/to/component')" first`);
    }
}

export interface MockComponentOptions {
    /**
     * The react element generated by the mock. `div` by default.
     */
    element?: keyof ReactHTML;
}

export function setupMockComponent<PropType>(mockedComponent: FC<PropType>, options?: MockComponentOptions) {
    ensureIsMock(mockedComponent);
    
    const mockImplementation: FC<PropType> = (props) => {
        const mockedElmentRef = useRef<MockedElement<PropType> | null>(null);
        useEffect(() => {
            if (mockedElmentRef.current) {
                mockedElmentRef.current.props = props;
            }
        }, [props]);

        const ref: RefCallback<HTMLDivElement> = (el) => {
            mockedElmentRef.current = el as unknown as MockedElement<PropType>;
            if (mockedElmentRef.current) {
                mockedElmentRef.current.component = comp;
            }
        };

        const type: keyof ReactHTML = options?.element ?? 'div';
        return React.createElement(type, {
            ref,
            'data-testid': mockElementTestId,
        }, props.children);
    };

    const comp = mockedComponent as MockedComponent<PropType>;
    comp.mockImplementation(mockImplementation);
}