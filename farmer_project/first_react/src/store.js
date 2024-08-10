import {configureStore} from '@reduxjs/toolkit'

import Counter from './Redux/slices/Counter'
import UserFarmerLoginThunk from './Redux/slices/UserFarmerLoginThunk'
// to takes a proprty as reducers we need to add slices here so that the state can be acessed by globally

export const store=configureStore({
    reducer:{

        counter:Counter,
        userFarmer:UserFarmerLoginThunk
    }
})

