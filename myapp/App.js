
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
 
export default function App() {


const[visible,setVisible]=useState(true);
const[name,setName]=useState(``);
const[password,setpassword]=useState(``);
const[num , setNum]=useState(null);

const RememberMe= async()=>{
const user ={

  name:name,
  password:password,
  num:num,
}

await AsyncStorage.setItem('user-info' ,JSON.stringify(user))

}


useEffect( ()=>{
const UseFonk=async()=>{
  const obj =  await AsyncStorage.getItem('user-info');
  const lastObj = JSON.parse(obj);
  setpassword(lastObj.password);
  setName(lastObj.name);
  setNum(lastObj.num);  }
 UseFonk();
},[])


const FORGET_ME=async()=>{
await AsyncStorage.removeItem('user-info')
  setpassword(null );
  setName(null );
  setNum( null);
}



  return (

    <View style={styles.container}>

{ name ?  <Text style={{fontSize:34,position:`absolute`,top:90,fontWeight:'bold'}}> Welcome again {name}</Text> :null}


               <View style={{width:300}}> 

       <TextInput style={styles.input_1} placeholder=' enter name'  value={name} onChangeText={(elen)=> setName(elen)} />

         <View style={styles.container_2}> 
            <TextInput style={styles.input_2}placeholder='enter password'  value={password}    secureTextEntry ={visible}   onChangeText={(elen)=> setpassword(elen)} />
            <TouchableOpacity onPress={()=> setVisible(pre => !pre)} >
              <AntDesign name="eye" size={24} color="black" />
              </TouchableOpacity> 
         </View>
       
      <TextInput style={styles.input_1} placeholder='enter phone'  inputMode='numeric' value={num} onChangeText={(elen)=> setNum(elen)} />

              </View>

               <View style={{justifyContent:`space-between`,width:300,flexDirection:`row`,marginTop:30}}> 
  <TouchableOpacity   onPress={()=> FORGET_ME()} ><Text  style={{fontSize:24 ,color:`#E72E8A`}}>FORGET ME</Text></TouchableOpacity>
  <TouchableOpacity  onPress={()=> RememberMe()}  ><Text style={{fontSize:24,color:`#00E5FA`}}>SAVE ME</Text></TouchableOpacity>
              </View>

              
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container_2:{
    flexDirection:`row`,
    justifyContent:`center`,
    alignItems:`center` ,
    backgroundColor:`#eaeaea`,
    borderRadius:25,
    marginBottom:3

  },
  input_1:{
    width:300,
    height:50,
    backgroundColor:`#eaeaea`,
    borderRadius:25,
    paddingLeft:100,
    marginBottom:3,

  },
  input_2:{
    width:270,
    height:50,
    backgroundColor:`#eaeaea`,
    borderRadius:25,
    paddingLeft:100,
    marginBottom:3,

  }
});
