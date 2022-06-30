# React Testing Library Mock Component

## The Problem

[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is a popular testing library for react applications. It fundamentally changed how react applications are tested by advocating for a "deep by default" rendering strategy and asserting and interacting with a component more inline with the way a human does.

While I generally agree with Kent C. Dodds that we shouldn't mock every component any more than we should mock every private function in a module, there are times in more complicated applications where rendering complicated child components is impractical and difficult to maintain.

## The Solution

This library compliments `@testing-library/react` to make it easy to setup and mock components and assert that those components are holding the correct props.

## Setup

1. We assume that your project is already using [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) and either [Jest](https://jestjs.io) or [Vitest](https://vitest.dev)
2. Install this library
    ```bash
    npm install --save-dev @sourceallies/rtl-mock-component
    ```

## Usage

1. First, import this library and the component you are mocking in your test:
    ```Typescript
    import {setupMockComponent, getByMockComponent} from '@sourceallies/rtl-mock-component';
    import MyChildComponent from './MyChildComponent';
    ```
2. Next, mock the module just like any other mock:
    ```Typescript
    jest.mock('./MyChildComponent');
    ```
    or
    ```Typescript
    vi.mock('./MyChildComponent');
    ```
3. In a `beforeEach` method, call `setupMockComponent` and pass it the component you are mocking. This sets up the mock.
    ```Typescript
    beforeEach(() => {
        setupMockComponent(MyChildComponent);
    });
    ```
4. Now, when you call `render` with any ancestor component, the implementation will not be called and a stub element will be rendered in its place.
5. If you want to assert the component is in the dom you can do it as so:
    ```Typescript
    expect(getByMockComponent(MyChildComponent)).toBeInTheDocument();
    ```
6. `getMockComponent` and the other query functions return a `MockedComponentElement<T>` that extends from `HTMLElement` and adds a `props` property that can be asserted on. For example, to make sure that the component is currently rendered with the open prop set to true:
    ```Typescript
    expect(getByMockComponent(MyChildComponent).props.open).toBe(true);
    ```

    *Note:* this way of testing ensures that the component is **currently** rendered with the provided value. `toHaveBeenCalledWith` would only test that was ever rendered with the expected value.

### Customization

`setupMockComponent` takes an options argument that can change the behavior of the mock.

To change the element used from a div, pass the element name. This is useful when the mock is used in a place where only certain elements are valid (ex. a child of a `tbody` must be a `tr`)
