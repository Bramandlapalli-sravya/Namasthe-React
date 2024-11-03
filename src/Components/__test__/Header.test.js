import Header from '../Header/Header';
import { render,screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import store from '../../Redux/store';
import { BrowserRouter } from 'react-router-dom';

it('checking header is in dom or not', ()=> {
    render(
        <BrowserRouter>
            <Provider store={store}>
                <Header/>
            </Provider>
        </BrowserRouter>
)

    const cart = screen.getByRole('link', {name: 'Cart (0)'});
    expect(cart).toBeInTheDocument();
})

