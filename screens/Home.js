import React, { useState,useEffect }from 'react';
import { StyleSheet, Text, View, Image, FlatList,Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper'

const Home = (props) => {

    const [data,setData]= useState([])
    const [loading,setloading]=useState(true)


    const fetchdata = ()=> {
        fetch("http://fca0-157-33-105-169.ngrok.io")
            .then(res => res.json())
            .then(results => {
                setData(results)
                setloading(false)
            }).catch(err => {
                Alert.alert("somthis is wrong")})

    }


    useEffect(() =>{
        fetchdata()
    },[])
    
    const render_list = ((item) => {
        return (
            <Card style={styles.mycard} key={item.id}
                onPress={() => props.navigation.navigate("Profile",{item})}>
                <View style={styles.cardView}>
                    <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: item.picture }}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.position}</Text>
                    </View>

                </View>

            </Card>)
    })
    return (
        <View style={{ flex: 1, }}>
        
        
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return render_list(item)
                    }}
                keyExtractor={item =>item._id}
                 onRefresh={()=>fetchdata()}
                 refreshing={loading}

                />

            
            <FAB
                style={styles.fab}
                large={true}
                icon="plus"
                theme={{ colors: { accent: '#006aff' } }}
                onPress={() => props.navigation.navigate("Create")}
            />
        </View>


    )
}

const styles = StyleSheet.create({
    mycard: {
        margin: 5,
        padding: 5,

    },
    cardView: {
        flexDirection: "row",
        padding: 6
    },
    text: {
        fontSize: 18,


    }, fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})


export default Home