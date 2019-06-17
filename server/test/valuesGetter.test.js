import chai from 'chai';
import getValues from '../helpers/sqlValuesGetter';
import flags from '../models/mockDb/flag';

const { assert } = chai;

describe('SQL Values Getter', () => {

    it("should transform an array of objects to a valid sql queries' value", () => {
        assert.equal(getValues(flags),
            `(8,'Pricing','I have been in this industry for 50yrs and I hav never seen such pricing',2),(8,'Weird Demands','It just feels weird',5)`);
    });
});
