import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { icons } from '../constants/icons';
import { fetchMovieDetails } from '../services/api';
import useFetch from '../services/useFetch';

interface MovieInfoProps {
  label:string;
  value?:string | number | null;
}

const MovieInfo = ({label,value}:MovieInfoProps) => (
    <View className='flex-col items-start justify-center mt-5'>
        <Text className='text-light-200 font-normal text-sm'>{label}</Text>
        <Text className='text-light-100 font-bold text-sm mt-2'>{value || 'N/A'}</Text>
    </View>
)

const RatingBadge = ({ Source, Value }: Rating) => {
    // Defensive check
    if (!Source || !Value) {
        return null;
    }

    let icon = null;

    
    if (Source.includes('Internet Movie Database')) {
        
        icon = <FontAwesome name="imdb" color="#f5c518" size={24} />;
    } else if (Source.includes('Rotten Tomatoes')) {
        
        icon = <MaterialCommunityIcons name="movie-open" color="#fa320a" size={24} />;
    } else if (Source.includes('Metacritic')) {
        
        icon = <MaterialCommunityIcons name="star-circle" color="#33cc33" size={24} />;
    }

    return (
        <View className="flex-row items-center gap-3 bg-dark-100 p-3 rounded-lg">
            {icon}
            <View>
                <Text className="text-white font-bold">{Value}</Text>
                <Text className="text-gray-400 text-xs">{Source}</Text>
            </View>
        </View>
    );
};


const MovieDetails = () => {
  const {id} = useLocalSearchParams();
  
  const {data:movie,loading,errorMessage} = useFetch(()=>fetchMovieDetails(id as string));
  
  const formatRuntime = (Runtime:string) => {
    if (!Runtime || Runtime === "N/A") return '';
    const minutes = parseInt(Runtime);
    if (isNaN(minutes)) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatVotes = (votesStr:string) => {
    if (!votesStr) return '';
    const num = parseInt(votesStr.replace(/,/g, ''));
    if (isNaN(num)) return '';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
  };

  

  if(loading){
    return(
      <View className='bg-primary flex-1 items-center justify-center'>
        {loading && (
          <>
          <Image source={icons.logo} className='size-14' />
          <ActivityIndicator size='large' color='#0000ff' />
          </>
        )}
      </View>
    )
  }

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{
        paddingBottom:80
      }}>

        <View>
          <Image source={{uri:movie?.Poster}} className='w-full h-[500px]' resizeMode='stretch'/>
        </View>

        
        <View className='flex-row justify-between items-start mt-5 px-3'>
          <View className='flex-col items-start'>
            <Text className='text-white font-bold text-xl'>{movie?.Title}</Text>
            <View className='flex-row items-center gap-x-1 mt-2'>
              <Text className='text-light-200 text-sm'>{movie?.Year}</Text>
              <Text className='text-light-100 text-md'>•</Text>
              <Text className='text-light-200 text-sm'>{movie?.Rated}</Text>
              <Text className='text-light-100 text-md'>•</Text>
              <Text className='text-light-200 text-sm'>{formatRuntime(movie?.Runtime)}</Text>
            </View>
          </View>
          



          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
            <Image source={icons.star} className='size-4'/>
            <Text className='text-white font-bold text-sm'>{`${movie?.imdbRating}/10`}</Text>
            <Text className='text-light-200'>({formatVotes(movie?.imdbVotes)})</Text>
          </View>

          
        </View>

        <View className='flex flex-col justify-center items-start px-3 gap-x-2'>
          
              {movie?.Ratings && movie?.Ratings?.length > 0 && (
                <ScrollView horizontal>
                    <View className='flex flex-row flex-wrap gap-4 mb-4 mt-5'>
                      {movie?.Ratings?.map((rating:Rating) => <RatingBadge key={rating?.Source} {...rating} />)}
                    </View>
                </ScrollView>
              )}
          
          
          
          <MovieInfo label='Overview' value={movie?.Plot} />
          <MovieInfo label='Genre'value={movie?.Genre?.split(',').join(' • ') || 'N/A'} />
          <MovieInfo label='Box Office' value={(movie?.BoxOffice)} />
          <MovieInfo label="Release date" value={movie?.Released} />
          <MovieInfo label='Director' value={movie?.Director} />
          <MovieInfo label='Writer' value={movie?.Writer} />
          <MovieInfo label="Actors" value={movie?.Actors} />
          <MovieInfo label="Countries" value={movie?.Country} />
          <MovieInfo label="Language" value={movie?.Language} />
        </View>
          
      </ScrollView>
      
      <Link href={'/'} asChild>
      <TouchableOpacity className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'>
            <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' tintColor="#fff" />
            <Text className='text-white font-semibold text-base'>Go Back</Text>
      </TouchableOpacity>
      </Link>
    </View>
    
  )
}

export default MovieDetails