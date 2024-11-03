import { render, act, screen } from "@testing-library/react";
import RestaurantCatogeory from "../Body/Home/RestaurantCatogeory";
import store from '../../Redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MOCK_DATA from '../MockDataApi/mockData.json';
import '@testing-library/jest-dom';


global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA) // Ensure it returns the mock data
    });
});

// console.log(MOCK_DATA, 'mock-data')


it('load each restaurant menu component', async ()=> {
    await act( async ()=> {
        render(
            <BrowserRouter>
            <Provider store={store}>
                <RestaurantCatogeory/>
            </Provider>
        </BrowserRouter>
        )
    })


    const recommended = screen.getByText('Drinks (9)')

    expect(recommended).toBeInTheDocument();
} )