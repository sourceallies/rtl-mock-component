import React, { RefCallback, useEffect, useRef } from "react";
import { FC } from "react";

export type MockedComponent<PropType> = jest.MockedFunction<FC<PropType>>;

export type MockedElement<PropType = {}> = HTMLElement & {
    props: PropType, 
    component: MockedComponent<PropType>
};

export const mockElementTestId = 'rtl-mock-element';

export function setupMockComponent<PropType>(mockedComponent: FC<PropType>) {
    const comp = mockedComponent as MockedComponent<PropType>;
    comp.mockImplementation((props: PropType) => {
        const mockedElmentRef = useRef<MockedElement<PropType> | null>(null);
        useEffect(() => {
            if (mockedElmentRef.current) {
                mockedElmentRef.current.props = props;
            }
        }, [props]);
        const refCallback: RefCallback<HTMLDivElement> = (el) => {
            mockedElmentRef.current = el as unknown as MockedElement<PropType>;
            if (mockedElmentRef.current) {
                mockedElmentRef.current.component = comp;
            }
        };
        return (
            <div ref={refCallback} data-testid={mockElementTestId} />
        );
    });
}