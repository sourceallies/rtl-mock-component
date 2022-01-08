import { setupMockComponent } from './index';
import MockedComponent from './test-components/MockedComponent';

it('should throw an exception if the component is not a mock', () => {
    expect.assertions(1);
    try {
        setupMockComponent(MockedComponent);
    } catch (err: any) {
        expect(err.message).toEqual("MockedComponent cannot be setup because it is not a Jest mock. Call \"jest.mock('path/to/component')\" first");
    }
});