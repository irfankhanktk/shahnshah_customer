import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import Buttons from '../../../components/atoms/Button';
import ImagePlaceholder from '../../../components/atoms/Placeholder';
import {CustomHeader} from '../../../components/molecules/header/header-1x';
// import HomeCard from './../../../components/molecules/home-card/home-card';
import Regular from '../../../presentation/typography/regular-text';
import {mvs} from '../../../services/metrices';
import DIVIY_API from '../../../store/api-calls';
import {Home_Styles as styles} from './search-styles';

const Search = props => {
  const {colors} = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [selectedCat, setSelectedCat] = React.useState(1);
  const {
    user_info,
    categories,
    home_categories,
    fetchSubCategories,
    fetchHomeCategories,
  } = props;

  React.useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setLoading(true);
      await fetchHomeCategories();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fetchSubCategories(selectedCat);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedCat]);
  const renderHomeCard = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => props?.navigation?.navigate('CategoryDetails', {item})}
        style={styles.card}>
        <ImagePlaceholder uri={item?.image} containerStyle={styles.image} />
        <View
          style={{
            paddingVertical: mvs(10),
            position: 'absolute',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: mvs(10),
            top: mvs(20),
            backgroundColor: colors.primary,
            paddingHorizontal: mvs(20),
          }}>
          <Regular style={{color: colors.white}} label={item?.name} />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{...styles.conntainer, backgroundColor: colors.background}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={colors.text} />
        </View>
      </View>
    );
  } else if (home_categories?.data?.length === 0 && !loading) {
    return (
      <View style={{...styles.conntainer, backgroundColor: colors.background}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Regular label={'No record found'} />
        </View>
      </View>
    );
  }
  return (
    <View style={{...styles.conntainer, backgroundColor: colors.background}}>
      <CustomHeader
        title="Diviy"
        style={{flexDirection: 'row-reverse'}}
        userIcon
        colors={colors}
      />
      {console.log('{home_categories?.data::', home_categories?.data)}
      <View style={styles.body}>
        <View style={{marginVertical: mvs(20)}}>
          <ScrollView
            horizontal
            contentContainerStyle={{paddingHorizontal: mvs(22)}}>
            {home_categories?.data?.map((ele, key) => (
              <Buttons.ButtonPrimary
                key={key}
                onClick={() => setSelectedCat(ele?.id)}
                textStyle={{
                  color:
                    ele?.id === selectedCat ? colors?.white : colors.primary,
                }}
                style={{
                  backgroundColor:
                    ele?.id === selectedCat ? colors.primary : colors.card,
                  width: null,
                  height: mvs(38),
                  paddingHorizontal: mvs(10),
                  marginRight: mvs(10),
                }}
                title={ele?.name}
              />
            ))}
          </ScrollView>
        </View>
        <FlatList
          data={categories?.data}
          contentContainerStyle={{paddingHorizontal: mvs(22)}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderHomeCard}
          // onEndReachedThreshold={0.5}
          // onEndReached={() => getHomePosts(setPageLoading, 0)}
        />
      </View>
    </View>
  );
};

export default Search;
