import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Modal,Linking,Platform,Alert, } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';




const Profile = (props) => {

    const { _id, name, phone, email, position, salary, picture}= props.route.params.item

    const deletempoyes=()=> {
        fetch("http://fca0-157-33-105-169.ngrok.io/delete", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id:_id
            })
        })
            .then(deletempoyes => {
                Alert.alert(`${name} deleted successfully`),
                    props.navigation.navigate("Home")
            })
           
            .catch(err => {
            Alert.alert("somthis is wrong in deleting")
        })
    }


    const opendial=()=> {
        if(Platform.OS === 'android'){
            Linking.openURL(`tel:${phone}`)
        }
        else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }



    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#0033ff", "#6bc1ff"]}
                style={{ height: "30%" }}
            />
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{ width: 160, height: 160, borderRadius: 80, marginTop: -80 }}
                    source={{ uri: picture }}
                /></View>
            <View style={{ alignItems: "center",margin:15 }}>
                <Title style={{ fontSize: 20 }}>{name}</Title>
                <Text style={{ fontSize: 15 }} >{position}</Text>
            </View>

            <Card style={styles.mycard} onPress={() =>{ 
                Linking.openURL(`mailto:${email}` )
            } }>
                <View style={styles.cardView}>
                    <MaterialIcons name="email" size={32} color="black" /> 
                    <Text style={styles.mytext} >{email}</Text>
                </View>
            </Card>

            <Card style={styles.mycard} onPress={() => opendial()}>
                <View style={styles.cardView}>
                    <MaterialIcons name="phone" size={32} color="black" />
                    <Text style={styles.mytext} >{phone}</Text>
                </View>
            </Card>

            <Card style={styles.mycard}>
                <View style={styles.cardView}>
                    <MaterialIcons name="money" size={32} color="black" />
                    <Text style={styles.mytext} >{salary}</Text>
                </View>
            </Card>

            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "baseline" }}>

                <Button icon="account-edit"
                    color="#6bc1ff"
                    mode="text"
                    onPress={() => props.navigation.navigate("Create",
                        { _id, name, phone, email, position, salary, picture }
                        )}>
                    edit
                </Button>

                <Button icon="delete"
                    color="#6bc1ff"
                    mode="text"
                    onPress={() => deletempoyes()}>
                    Fire_employee
                </Button>
            </View>

           

        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    mycard: {
        margin: 3
       
    }, cardView: {
        flexDirection: "row",
        padding: 6
    },
    mytext:{
            fontSize:18,
            marginTop:3,
            marginLeft:3
    }

})

export default Profile