import { Component } from "react";

export interface MockedClassProps {
    value?: string;
}

class MockedClassComponent extends Component<MockedClassProps> {
    constructor(props: MockedClassProps) {
        super(props);
        throw new Error('MockedClassComponent was rendered');
    }
};

export default MockedClassComponent;