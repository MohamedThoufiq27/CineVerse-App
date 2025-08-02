import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { icons } from '../constants/icons';
import { images } from '../constants/images';
import { fetchMovies } from '../services/api';
import { updateSearchCount } from '../services/appwrite';
import useFetch from '../services/useFetch';

const Search = () => {
  const [searchQuery,setSearchQuery] = useState<string>('');

  
  const { data: movies, loading, errorMessage , refetch,reset } = useFetch(() => fetchMovies({
    query: searchQuery
  }),false);

  useEffect(()=>{
    // updateSearchCount(searchQuery,movies[0]?.movie);

    const debouncedSearch = setTimeout( async () => {
      if(searchQuery.trim()){
        await refetch();
      }
      else{
        reset();
      }
    },1000);

    return () => clearTimeout(debouncedSearch);
  },[searchQuery])

  useEffect(() => {
  // Only run if we have a valid search query and results
  if (searchQuery.trim() && movies && movies.length > 0) {
    updateSearchCount(searchQuery, movies[0]?.movie);
  }
}, [movies]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>
      <FlatList 
        data={movies} 
        renderItem={({item})=>(
          <MovieCard {...item.movie} />
        )}
        keyExtractor={(item)=>item.movie.ids.imdb}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
            justifyContent:'center',
            gap:16,
            marginVertical:16
        }}
        contentContainerStyle={{paddingBottom:100}}
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
                <Image source={icons.logo}  className='w-12 h-10 '/>
            </View>

            <View className='my-5'>
                <SearchBar
                  placeholder='Search for movies...'
                  value={searchQuery}
                  onChangeText = {(text:string)=>setSearchQuery(text)}
                />
            </View>
            { loading  && (
              <ActivityIndicator size='large' color='#0000ff' className='mt-3'/> 
            )}

            {errorMessage && (
              <Text className='text-red-500 px-5 my-3'>
                Error:{errorMessage?.message}
              </Text>
            )}

            {!loading && !errorMessage && searchQuery.trim() && movies?.length>0 &&  (
                <Text className='text-xl text-white font-bold'>
                  Search results for {' '}
                  <Text className='text-accent'>{searchQuery}</Text>
                </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !errorMessage ? (
              <View className='mt-10 px-5'>
                <Text className='text-center text-gray-500'>
                  {searchQuery.trim() ? 'No Movies Found' : 'Search for a movie'}
                </Text>
              </View>
          )
          :(
            <View>
              <Text>found</Text>
            </View>
          )
        }
      />
    </View>
  )
}

export default Search