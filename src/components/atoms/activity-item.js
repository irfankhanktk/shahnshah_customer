import React from 'react';
import { StyleSheet, TouchableOpacity, View} from 'react-native';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Row from './row';
import * as SVG from '../../assets/common-icons';
import Bold from '../../presentation/typography/bold-text';
import ImagePlaceholder from './Placeholder';
import Medium from '../../presentation/typography/medium-text';
import * as Progress from 'react-native-progress';
const ActivityItem = ({onPress,image=require('../../assets/images/carwash.png'),subImage=require('../../assets/images/carwash.png'),
                      price='0.0',rating=0,progress=0.5,bussinessName='Total Al Safeer Car Wash…',address='Sharjah Al nahada road',
                      bookingTime='12 February 2021-9:30 AM-10:00 AM',details='Lorem ipsum dolor Lorem ipsum dolor sit amet...',
                      subDetails='Lorem ipsum dolor sit amet...',isLiked=false, status='cancel',tab="schedule",onLikePress}) => {
    return (

      <View style={styles.CONTAINER}>
          <Row style={styles.UPPERROW}>
             <ImagePlaceholder containerStyle={styles.IMAGE} uri={image}/>
                <View style={{marginHorizontal:mvs(10),flex:1}}>
                <Medium numberOfLines={2} label={details}/>
                    <Regular label={subDetails} style={{fontSize:12}}/>
                    <Regular label={bookingTime} style={{fontSize:10,color:colors.primary}}/>
                </View>
             <View style={{alignItems:'center'}}>
                   {status=='schedule'||status=="complete"?
                    tab=="history"?
                    <Row style={styles.RATING}>
                        <SVG.Star/>
                         <Bold label={rating}/>
                    </Row>
                    :
                    <Progress.Circle size={36} color={status=="complete"?colors.green:colors.primary} borderColor={colors.gray} 
                     progress={progress} showsText textStyle={styles.PROGRESSTEXT} />

                   :null}
                  <Bold label={"$"+price} style={{marginTop:mvs(14)}}/>
             </View>
          </Row>
           <Row style={{...styles.UPPERROW,...styles.BOTTOMROW}}>
             <ImagePlaceholder containerStyle={styles.SUBIMAGE} uri={subImage}/>
                <View style={{marginHorizontal:mvs(10),flex:1}}>
                <Medium  label={bussinessName}/>
                <Regular label={address} style={{fontSize:13}}/>
                   
                </View>
             <View style={{alignItems:'flex-end'}}>
                 {
                     status=='schedule'?
                     <Row alignItems='center'>
                      <TouchableOpacity style={{...styles.BUTTON,backgroundColor:colors.lightPink}} onPress={onPress}>
                        <Regular label={'Cancel'} style={{...styles.BUTTONTEXT,color:colors.red}}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={{...styles.BUTTON,marginLeft:mvs(4)}} onPress={onLikePress}>
                        { isLiked==false?<SVG.Like style={{marginRight:mvs(5)}}/>:<SVG.Liked style={{marginRight:mvs(5)}}/>}
                        <Regular label={'Like'} style={{...styles.BUTTONTEXT}}/>
                      </TouchableOpacity>
                     </Row>
                    
                     :status=="complete"?
                      <TouchableOpacity style={{...styles.BUTTON}} onPress={onPress}>
                        { isLiked==false?<SVG.Like style={{marginRight:mvs(5)}}/>:<SVG.Liked style={{marginRight:mvs(5)}}/>}
                        <Regular label={isLiked==false?'Like':'Liked'} style={{...styles.BUTTONTEXT}}/>
                      </TouchableOpacity>
                     :status=="cancel"?
                      <TouchableOpacity style={{...styles.BUTTON,backgroundColor:colors.gray}} onPress={onPress}>
                        <Regular label={'Cancelled'} style={{...styles.BUTTONTEXT,color:colors.lightgrey1}}/>
                      </TouchableOpacity>
                     :null
                 }
                   
             </View>
           </Row>
      </View>
     
    );
};
export default ActivityItem;
const styles = StyleSheet.create({
    CONTAINER:{
        backgroundColor:colors.white,
        borderRadius:10,
        shadowColor:colors.shadow,
        padding:mvs(8),
        borderWidth:0.7,
        borderColor:colors.gray,
        marginTop:mvs(9.1)

    },
    IMAGE:{
       height:mvs(71),
       width:mvs(67),
       borderRadius:10
    },
    UPPERROW:{
        justifyContent:'space-between',
        alignItems:'center'
    },
    BOTTOMROW:{
        borderTopWidth:0.4,
        borderColor:colors.gray,
        marginTop:mvs(10),
        paddingVertical:mvs(15),
        paddingHorizontal:mvs(1)
    },
    PROGRESSTEXT:{
        color:colors.black,
        fontWeight:'bold',
        fontSize:10,
      
    },
    SUBIMAGE:{
        height:mvs(41),
        width:mvs(41),
        borderRadius:1000
     },
     BUTTON:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.lightYellow,
        width:mvs(80),
        height:mvs(29),
        borderRadius:6,
        paddingHorizontal:mvs(7)

     },
     BUTTONTEXT:{
         color:colors.primary,
     },
     RATING:{
        borderWidth:0.4, 
        borderRadius:10,
        shadowColor:colors.shadow ,
        borderColor:colors.gray,
        backgroundColor:colors.white,
        width:mvs(62),
        height:mvs(29),
        justifyContent:'space-evenly',
        alignItems:'center'
     }
});