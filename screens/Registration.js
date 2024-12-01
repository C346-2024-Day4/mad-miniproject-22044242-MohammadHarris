import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { USERS } from '../Data';

const Registration = ({navigation}) => {



    return (
        <View style={{marginTop:60, marginHorizontal:20}}>
            {/* header */}
            <Text style={{fontSize:20, fontWeight:'bold'}}>WakeUsUp</Text>


            <View style={{minHeight:500, marginTop:20}}>
                <Text>Test Accounts</Text>

                {USERS.map((user)=>(
                     <TouchableOpacity key={user.id} style={{ padding:10, backgroundColor:user?.hue, borderRadius:10, marginVertical:10}}
                     onPress={()=>navigation.navigate('client', {user: user})}
                     >
                         <Text style={{verticalAlign:'center', textAlign:'center', color:'white', fontSize:20}}>{user.name} Account</Text>
                     </TouchableOpacity>
                ))}

            </View>
            {/* middle */}
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <View style={{width:10, height:10, backgroundColor:'gray', borderRadius:20, marginHorizontal:7}}></View>
                <View style={{width:10, height:10, backgroundColor:'gray', borderRadius:20, marginHorizontal:7}}></View>
                <View style={{width:10, height:10, backgroundColor:'gray', borderRadius:20, marginHorizontal:7}}></View>
                <View style={{width:10, height:10, backgroundColor:'gray', borderRadius:20, marginHorizontal:7}}></View>
            </View>

            {/* buttons  */}
            <View style={{marginTop:20}}>
                <TouchableOpacity style={{ padding:10, backgroundColor:'red', borderRadius:10, marginVertical:10}}
                onPress={()=>navigation.navigate('client', {user: USERS[0]})}
                >
                    <Text style={{verticalAlign:'center', textAlign:'center', color:'white', fontSize:20}}>Create Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ padding:10, backgroundColor:'black', borderRadius:10}}
                onPress={()=>navigation.navigate('client', {user: USERS[1]})}
                >
                    <Text style={{verticalAlign:'center', textAlign:'center', color:'white', fontSize:20}}>Test Account</Text>
                </TouchableOpacity>

                <Text style={{fontSize:17, textAlign:'center', marginVertical:20}}>Already have an Account?</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

})

export default Registration;
