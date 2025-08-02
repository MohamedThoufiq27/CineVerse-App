import React from 'react'
import { Image, Text, View } from 'react-native'
import { icons } from '../constants/icons'

const saved = () => {
  return (
    <View className='flex flex-1 justify-center items-center bg-primary'>
      <Image source={icons.save} className='size-15 mb-3' />
      <Text className='text-xl text-light-200'>Save</Text>
    </View>
  )
}



export default saved