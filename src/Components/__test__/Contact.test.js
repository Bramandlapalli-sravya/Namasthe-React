import Contact from '../Body/Contact/Contact';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Contact page test cases', ()=> { // this is something like a block of same component 
    
    beforeAll(()=> {
        console.log('before all')
    })

    beforeEach(()=> {
        console.log('before each')
    })

    test('check whether loaded contact page or not', ()=> {
        render(<Contact/>)
     const nameInput =  screen.getByLabelText('Name:');
    
     //Assertion
     expect(nameInput).toBeInTheDocument();
    });

    // or 

    // it('check whether loaded contact page or not', ()=> { // it can also be written
    //     render(<Contact/>)
    //  const nameInput =  screen.getByLabelText('Name:');
    
    //  //Assertion
    //  expect(nameInput).toBeInTheDocument();
    // });
    
    test('whether button is there or not', ()=> {
        render(<Contact/>)
        const button = screen.getByText('Submit');
    
         //Assertion
        expect(button).toBeInTheDocument();
    })

})

