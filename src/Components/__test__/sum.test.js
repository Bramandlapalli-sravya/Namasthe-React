import {sum} from '../Body/Home/sum';

test('sum of two numbers', ()=> {
  const result = sum(1,2);

  //Assertion 
  expect(result).toBe(3);
})