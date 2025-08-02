import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { icons } from "../constants/icons";
import { images } from "../constants/images";
import "../globals.css";
import { fetchMovies } from "../services/api";
import { getTrendingMovies } from "../services/appwrite";
import useFetch from "../services/useFetch";

export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, errorMessage: movieError } = useFetch(() => fetchMovies({
    query: ''
  }));

 const {data : trendingMovies ,loading:trendingLoading, errorMessage:trendingError } = useFetch(getTrendingMovies);

  // console.log(movies);
  const renderHeader = () => (
    <View>
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <SearchBar
        onPress={() => { router.push('/Search'); } }
        placeholder="Search for a movie" 
      />
      {trendingMovies && (
        <>
          <View className="mt-10">
            <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
          </View>
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={
              ()=><View className="w-4"/>
            }
            data={trendingMovies}
            renderItem={({item,index})=>(
              <TrendingCard movie={item} index={index} />
            )}
            
            keyExtractor={(item) => String(item.movie_slug)}
           
          />
        </>
      )}
      <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      {(moviesLoading || trendingLoading) ? (
        <View className="flex-1 justify-center items-center">
             <Image source={icons.logo} className="w-12 h-10 mb-5"/>
             <ActivityIndicator size='large' color='#0000ff' />
        </View>
      ) : (movieError || trendingError) ? (
        <Text>{movieError?.message || trendingError?.message}</Text>
      ) : (<>
        
        <FlatList
          className="px-5"
          data={movies}
          renderItem={({ item }) => (
            <>
              <MovieCard {...item.movie} />
            </>
          )}
          keyExtractor={(item) => item.movie.ids.imdb} // It's good practice to add a keyExtractor
          ListHeaderComponent={renderHeader}
          numColumns={3}
          contentContainerStyle={{
            paddingBottom: 10
          }}
          columnWrapperStyle={{
            justifyContent:"flex-start",
            gap:15,
            paddingRight:3,
            marginBottom:10
          }}
        />
        </>
      )}
    </View>
  );
}