import React from 'react'
import {StatusBar} from 'react-native'

import {Home} from './src/pages/home'

export default function App(){
  return (
    <>
      <StatusBar backgroundColor="#121015" barStyle="light-content" />
      <Home />
    </>
  )
}

