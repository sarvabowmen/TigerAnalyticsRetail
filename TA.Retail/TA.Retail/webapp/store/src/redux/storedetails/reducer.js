import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  entities: [{
    "id": 1,
    "sku": "CL-SAN-LT-8-BLU",
    "name": "Socks",
    "price": 100,
    "currencySymbol": "USD",
    "date": "2023-02-01T09:00:00"
  },
  {
    "id": 2,
    "sku": "CL-SAN-LT-8-RED",
    "name": "Socks",
    "price": 120,
    "currencySymbol": "GBP",
    "date": "2023-02-01T09:00:00"
  }],
  loading: false,
  error: false,
}


export const importPricingFeeds = createAsyncThunk(
    //action type string
    'store/importPriceFeeds',
    // callback function
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('files', file[0]);
      const res = await fetch('https://localhost:44337/api/Store/pricing/bulk', {  method: 'POST', body: formData }).then(
      (data) => data.json()
    )
    return res;
        } catch (err) {
            // You can choose to use the message attached to err or write a custom error
            return rejectWithValue('Opps there seems to be an error')
          }
  })

export const getPricingFeeds = createAsyncThunk(
  //action type string
  'store/getPriceFeeds',
  // callback function
  async (thunkAPI) => {

    const res = await fetch('http://localhost:3000/api/Store/pricing/all', { headers: { "Access-Control-Allow-Origin": "*" } }).then(
    (data) => data.json()
  )
  return res;
})


export const updateProduct = createAsyncThunk(
    //action type string
    'store/updateProduct',
    // callback function
    async (product) => {
  
      const res = await fetch('http://localhost:3000/api/Store/product', { method: 'POST', body: JSON.stringify(product), headers: {
        "Content-Type": "application/json"
      }}).then(
      (data) => data.json()
    )
    return res;
  })


export const pricingFeedSlice = createSlice({
  name: 'pricingfeeds',
  initialState,
  reducers: {},
  extraReducers: {
    [getPricingFeeds.pending]: (state) => {
        state.loading = true
        state.error =  false;
      },
      [getPricingFeeds.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.entities = payload
        state.error =  false;
      },
      [getPricingFeeds.rejected]: (state) => {
        state.loading = false;
        state.error =  true;
      },
      [importPricingFeeds.pending]: (state) => {
        state.loading = true
        state.error =  false;
      },
      [importPricingFeeds.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.entities = payload
        state.error =  false;
      },
      [importPricingFeeds.rejected]: (state) => {
        state.loading = false;
        state.error =  true;
      },
      [updateProduct.pending]: (state) => {
        state.loading = true
        state.error =  false;
      },
      [updateProduct.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.entities = payload
        state.error =  false;
      },
      [updateProduct.rejected]: (state) => {
        state.loading = false;
        state.error =  true;
      },
  },
})

export const pricingFeedReducer = pricingFeedSlice.reducer