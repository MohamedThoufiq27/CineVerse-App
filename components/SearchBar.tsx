import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/app/constants/icons'

interface props{
    placeholder:string;
    onPress?: () => void;   
}

const SearchBar = ({onPress,placeholder}:props) => {
  return (
    <View className='flex-row items-center bg-transparent rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' tintColor='#ab8bff'/>
      <TextInput 
            onPress={onPress}
            placeholder={placeholder}
            value=""
            onChangeText={()=>{}}
            placeholderTextColor="#a8b5db"
            className='flex-1 ml-2 text-white'      
      />
    </View>
  )
}

export default SearchBar