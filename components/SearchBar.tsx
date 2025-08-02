import { icons } from '@/app/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface props{
    placeholder:string;
    onPress?: () => void;   
    value?:string;
    onChangeText?:(text:string) => void;
}

const SearchBar = ({onPress,placeholder,value,onChangeText}:props) => {
  return (
    <View className='flex-row items-center bg-transparent rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' tintColor='#ab8bff'/>
      <TextInput 
            onPress={onPress}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#a8b5db"
            className='flex-1 ml-2 text-white'      
      />
    </View>
  )
}

export default SearchBar