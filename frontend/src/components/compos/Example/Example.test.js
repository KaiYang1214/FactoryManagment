import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import init from 'jooks';
import MockAdapter from 'axios-mock-adapter';
import Example, { exampleHooks } from './Example';

const mock = new MockAdapter(axios);
mock.onGet('/example').reply(200, ['mock1', 'mock2']);
const hooks = init(exampleHooks);

describe('example component unit test', () => {
  test('should have proxy hooks', async () => {
    // trigger component did mount event.
    await hooks.mount();
    const { queryExample } = hooks.run();
    expect(queryExample.response[0]).toBe('mock1');
  });
  test('should render component well', () => {
    shallow(<Example />);
    expect(Example.state.count).toBe(9);
    Example.state.onButtonClick();
    expect(hooks.run().count).toBe(10);
  });
});
