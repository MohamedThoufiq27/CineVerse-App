import React from 'react'
import { Image, Text, View } from 'react-native'
import { icons } from '../constants/icons'

const profile = () => {
  return (
    <View className='flex flex-1 justify-center items-center bg-primary'>
      <Image source={icons.person} className='size-15 mb-3' />
      <Text className='text-xl text-light-200'>profile</Text>
    </View>
  )
}

export default profile