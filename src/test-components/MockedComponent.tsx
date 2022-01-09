import { FC } from "react";

export interface MockedComponentProps {
    value?: string;
}

const MockedComponent: FC<MockedComponentProps> = () => {
    throw new Error('MockedComponent was rendered');
};

export default MockedComponent;