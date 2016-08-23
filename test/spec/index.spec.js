import chai, {expect}  from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {IdleTimer}  from '../../src/index';

chai.use(sinonChai);

describe('IdleTimer', () => {

    describe('#now()', ()=> {

        it('should have value', () => {
            expect(IdleTimer.now() <  new Date().getTime()).to.be.truth
        })

    });


});