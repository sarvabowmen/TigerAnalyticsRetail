import { configureStore } from '@reduxjs/toolkit'
import { pricingFeedReducer } from './redux/storedetails/reducer';

const reducer = {
    pricingFeeds: pricingFeedReducer,
  }

  const preloadedState = {
    pricingFeeds: [],
  }
  
export default configureStore({
  reducer: reducer
})