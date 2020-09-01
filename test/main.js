import { assert } from 'chai';
import defaultAwesomeFunction, { awesomeFunction } from '../src/main';

describe('Awesome test.', () => {
    it('should test default awesome function', () => {
        const expectedVal = 'I am the Default Awesome Function, fellow comrade! - John';
        assert(defaultAwesomeFunction('John') === expectedVal, 'Default not awesome :(');
    });

    it('should test awesome function', () => {
        const expectedVal = 'I am just an Awesome Function';
        assert(awesomeFunction() === expectedVal, 'Named awesome :(');
    });
});
