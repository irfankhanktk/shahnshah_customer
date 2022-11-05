import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const styles = StyleSheet.create({
  container:{
     flex:1,
    backgroundColor:colors.white,
    backgroundColor:colors.tabBackground
  },
  body:{
      flex:1,
      paddingHorizontal:mvs(32),
      paddingTop:mvs(1),
      backgroundColor:colors.white,
      paddingVertical:mvs(26)
  },
  welcomeText:{
   fontSize:18,
   marginTop:mvs(0),
   color:colors.black
  },
  welcomeSubText:{
   fontSize:15
  },
  input_container:{
      marginTop:mvs(1),
      paddingHorizontal:mvs(16)
  },
  button:{
      marginTop:mvs(40),
      height:mvs(60)
  },
  buttonText:{
   color:colors.black,
   fontSize:18,
   fontWeight:'bold'
  },
  profileImage:{
      alignSelf:'center',
      borderRadius:10000,
      height:mvs(60),
      width:mvs(60)
  },
  imageView:{
     
      height:mvs(60),
      width:mvs(60),
      borderRadius:1000,
      backgroundColor:colors.lightgrey2,
      justifyContent:'center',
      alignItems:'center',
  },
  cameraStyle:{
   bottom:mvs(55),
   position:'absolute',
   alignSelf:"flex-end"
  }
  ,
  phoneContainer: {
      flex:1,
      height: 50,
   },
    textInput: {
      paddingVertical: 0,
      borderLeftWidth:2.5,
      borderLeftColor:colors.gray,
      paddingLeft:mvs(10)
    },
    phoneNumberView:{
      backgroundColor: colors.white,
      width: '100%',
      padding: 0,
      borderRadius: mvs(10),
      paddingHorizontal: mvs(15),
      color: colors.primary,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height:mvs(60),
      borderRadius:10,
      borderWidth:1,
      borderColor:colors.gray,
      ...colors.shadow
    }

});
export default styles;
