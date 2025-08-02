import { icons } from '@/app/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({title,images,ids,year,rating}:Movie) => {
  return (
    <Link href={`/movies/${ids.imdb}`} asChild>
      <TouchableOpacity className='w-[30%]'>
        <Image 

          source={{
            uri:images.poster[0] ? `https://${images.poster[0]}` : `https://placehold.co/600x400/1a1a1a/ffffff.png`
          }}

          className='w-full h-52 rounded-lg'
          resizeMode="cover"
        />
        <Text className='text-white font-bold text-sm mt-2' numberOfLines={1}>{title}</Text>

        <View className='flex-row items-center justify-start gap-2 w-full'>
            <Image source={icons.star} className='size-4'/>
            <Text className='text-xs text-white font-medium mt-1'>{Math.round(rating)}</Text>
        </View>
        <Text className='text-xs text-light-300 font-medium mt-1'>{year}</Text> 
      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard