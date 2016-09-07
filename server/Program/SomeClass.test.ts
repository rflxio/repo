import { SomeClass } from "./SomeClass";
import { beforeEach, expect, it, describe } from "jasmine";

let someClass: SomeClass = null;

export default describe('Test', () => {
    beforeEach(() => {
        someClass = new SomeClass();
    });

    it('has to work', () => {
        expect(someClass.someMethod()).toEqual('Hello world!');
    });
});