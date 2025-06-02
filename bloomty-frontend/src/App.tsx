import React, { useEffect } from 'react';
import './App.css';
import AppContainer from './components/appContainer/appContainer';
import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/mainPage/mainPage';
import CatalogPage from './pages/catalog/catalogPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProductPage from './pages/product/product';
import RegisterPage from './pages/registerPage/registerPage';
import GuestRoute from './components/routes/GuestRoute';
import { useAppDispatch } from './store/storeHooks';
import { checkAuth } from './store/user/user';
import ProtectedRoute from './components/routes/ProtectedRoute';
import OrderPage from './pages/order/orderPage';
import MePage from './pages/me/mePage';
import SearchPage from './pages/searchPage/searchPage';
import WhishlistPage from './pages/whishlistPage/whishlistPage';
import PromotionsPage from './pages/promotions/promotionsPage';
import AboutPage from './pages/about/aboutPage';
import HowOrderPage from './pages/howOrder/howOrderPage';
import PoliticaConfidicalnosti from "./pages/politicaConfidicialnosti/politicaConfidicialnosti";

function App() {

  return (
    <Provider store={store}>
      <Switch>
        <AppContainer>
          <Route path='/' children={<MainPage />} exact />
          <Route path='/catalog' children={<CatalogPage />} exact />
          <Route path='/product/:id' children={<ProductPage />} exact />
          <Route path='/search' children={<SearchPage />} exact />
          <Route path='/promotions' children={<PromotionsPage />} exact />
          <Route path='/about-us' children={<AboutPage />} exact />
          <Route path='/how-order' children={<HowOrderPage />} exact />
          <Route path='/politica-confidicialnosti' children={<PoliticaConfidicalnosti />} exact />

          <Route path='/register' children={
            <GuestRoute
              redirectPath="/"
            >
              <RegisterPage />
            </GuestRoute>
          } exact />

          <Route path='/order' children={
            <ProtectedRoute
              redirectPath="/"
            >
              <OrderPage />
            </ProtectedRoute>
          } />

          <Route path='/me' children={
            <ProtectedRoute
              redirectPath="/"
            >
              <MePage />
            </ProtectedRoute>
          } />

          <Route path='/wishlist' children={
            <ProtectedRoute
              redirectPath="/"
            >
              <WhishlistPage />
            </ProtectedRoute>
          } />

        </AppContainer>
      </Switch>
    </Provider>
  );
}

export default App;
