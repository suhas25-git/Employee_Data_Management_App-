import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, FlatList, Modal, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const CreateEmployee = ({ navigation, route }) => {


    const getdetails = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "position":
                    return route.params.position
                case "picture":
                    return route.params.picture
            }

        }
        return ""


    }

    const [Name, setname] = useState(getdetails("name"))
    const [Phone, setphone] = useState(getdetails("phone"))
    const [Email, setemail] = useState(getdetails("email"))
    const [Salary, setsalary] = useState(getdetails("salary"))
    const [Picture, setpicture] = useState(getdetails("picture"))
    const [Position, setposotion] = useState(getdetails("position"))
    const [Model, setmodel] = useState(false)
    const [enableshift,setenableshift] = useState(false)

    

    const submitData = () => {
        fetch("http://fca0-157-33-105-169.ngrok.io/send", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: Name,
                email: Email,
                picture: Picture,
                phone: Phone,
                position: Position,
                salary: Salary
            })
        })
            .then(res => res.json(),
                navigation.navigate("Home"),
                Alert.alert("data uploaded"))
            .catch(err => {
                Alert.alert("something is wrong in submitting data")
            })

    }

    const updatedetails =()=> {

        fetch("http://fca0-157-33-105-169.ngrok.io/upt", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id:route.params._id,
                name: Name,
                email: Email,
                picture: Picture,
                phone: Phone,
                position: Position,
                salary: Salary
            })
        })
            .then(res => res.json(),
                navigation.navigate("Home"),
                Alert.alert("data updated success"))
            .catch(err => {
                Alert.alert("something is wrong in submitting data")
            })

    }


    const pickFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split('.')[1]}`,//the code that uploading 
                    name: `test.${data.uri.split('.')[1]}`
                }
                handleupload(newfile)

            }
        } else {
            Alert.alert("you need to give permission to work")

        }
    }

    const pickFromcamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            if (!data.cancelled) {
                let newfile = {
                    uri: data.uri,
                    type: `test/${data.uri.split('.')[1]}`,//when we get any image from gallery it have a special linkaddress from that we gat our required data
                    name: `test.${data.uri.split('.')[1]}`
                }
                handleupload(newfile)

            }
        } else {
            Alert.alert("you need to give permission to work")

        }
    }

    const handleupload = (image) => {//we have to upload an image
        const data = new FormData()
        data.append('file', image)//which file to upload
        data.append('upload_preset', 'employeeapp')//preset on the cloud 
        data.append("cloud_name", "suhas25")//name of the account

        fetch("https://api.cloudinary.com/v1_1/suhas25/image/upload", {//the link of upload directory(post request)
            method: 'post',
            body: data
        }).then(res => res.json()).//parcing into json and printing
            then(data => {
                console.log(data)
                setpicture(data.url)
                setmodel(false)
            }).catch(err => {
                Alert.alert("somthis is wrong in img uploading")
            })
    }

    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
        <View >
            <KeyboardAvoidingView behavior="position">
                <TextInput
                    label="Name"
                    style={styles.inputstyle}
                    theme={theme}
                    value={Name}
                    onFocus={() => setenableshift(false)}
                    mode="outlined"
                    onChangeText={text => setname(text)}
                />
                <TextInput
                    label="Phone"
                    style={styles.inputstyle}
                    theme={theme}
                    value={Phone}
                    onFocus={() => setenableshift(false)}
                    mode="outlined"
                    onChangeText={text => setphone(text)}
                />
                
                <TextInput
                    label="Email"
                    style={styles.inputstyle}
                    theme={theme}
                    value={Email}
                    onFocus={() => setenableshift(false)}
                    mode="outlined"
                    onChangeText={text => setemail(text)}
                />                                                                                                       
                    <TextInput
                        label="Position"
                        style={styles.inputstyle}
                        theme={theme}
                        value={Position}
                        onFocus={() => setenableshift(true)}
                        mode="outlined"
                        onChangeText={text => setposotion(text)}
                    />
                <TextInput
                    label="Salary"
                    style={styles.inputstyle}
                    theme={theme}
                    value={Salary}
                    onFocus={()=>setenableshift(true)}
                    mode="outlined"
                    onChangeText={text => setsalary(text)}
                />

                {route.params ?
                    <Button icon="update"
                        mode="contained"
                        style={styles.inputstyle}
                        theme={theme}
                        onPress={() => updatedetails()}>
                        Update-Image
                    </Button>
                    :

                <Button icon={Picture == "" ? "upload" : "check"}
                    mode="contained"
                    style={styles.inputstyle}
                    theme={theme}
                    onPress={() => setmodel(true)}>
                    Upload Image
                </Button>}

                {route.params?
                    <Button icon="update"
                        mode="contained"
                        style={styles.inputstyle}
                        theme={theme}
                        onPress={() => updatedetails()}>
                        Update-details
                    </Button>

                :

                <Button icon="content-save"
                    mode="contained"
                    style={styles.inputstyle}
                    theme={theme}
                    onPress={() => submitData()}>
                    Save
                </Button>}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={Model}
                    onRequestClose={() => setmodel(false)}>
                    <View style={styles.modalView}>

                        <View style={styles.modalButtonview}>
                            <Button icon="camera-account"
                                mode="outlined"
                                theme={theme}
                                onPress={() => pickFromcamera()}>
                                Camera
                            </Button>
                            <Button icon="image-area"
                                mode="outlined"
                                theme={theme}
                                onPress={() => pickFromGallery()}>
                                Gallary
                            </Button>
                        </View>
                        <Button icon="keyboard-backspace"
                            mode="text"
                            theme={theme}
                            onPress={() => setmodel(false)}>
                            cancel
                        </Button>
                    </View>

                </Modal>
            </KeyboardAvoidingView>

        </View>
        </KeyboardAvoidingView>

    )
}
const theme = {
    colors: { primary: '#66b3ff' }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputstyle: {
        margin: 5
    },
    modalButtonview: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }, modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "#e6f3ff"
    }
})

export default CreateEmployee