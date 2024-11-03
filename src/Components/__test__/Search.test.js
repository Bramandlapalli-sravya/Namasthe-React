import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Body from '../Body/Home/Body';
import store from '../../Redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MOCK_DATA from '../MockDataApi/mockData.json';

global.fetch = jest.fn(()=> {
   return Promise.resolve({
    json: ()=> {
        return Promise.resolve(MOCK_DATA);
    }
   })
})

test('search testing', async()=> {
   await act( async()=> {
    render(
        <BrowserRouter>
        <Provider store={store}>
            <Body/>
        </Provider>
    </BrowserRouter>
    )
   }) 

    const search = screen.getByPlaceholderText('search for a recipe..');

    await fireEvent.change(search, {target: {value: 'em'}})

    // expect(search).toBeInTheDocument();
    await waitFor(() => {
        const cards = screen.getAllByTestId('resCard');
        // console.log(cards, 'cardss')
        expect(cards.length).toBe(2);
    })
  
})