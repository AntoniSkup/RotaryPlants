import { StyleSheet, Text, View ,TouchableOpacity,FlatList, Dimensions, Image} from 'react-native'
import React from 'react'
import { fetchAllClubs, fetchSumTrees } from '../../actions/queries'
import { useNavigation } from '@react-navigation/native'
import * as Progress from 'react-native-progress';

const {width,height} = Dimensions.get("window")

export default function Board() {

    const [leaderBoard, setLeaderBoard ] = React.useState()
    const [sumTrees, setSumTrees ] = React.useState(0)

    const nav = useNavigation()

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async ()=> {
        const fetchedClubs = await fetchAllClubs()
        setLeaderBoard(fetchedClubs)
        const fetchedSum = await fetchSumTrees()
        setSumTrees(fetchedSum)

    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.titleText}>Leaderboard</Text>
                <View style={{flexDirection:'row', marginBottom:5}}>
                    <Text style={styles.topFont}>Number of trees: </Text>
                    <Text style={styles.topFontBig}>{sumTrees}/1.2 Millions</Text>
                </View>
                
                {/* <Progress.Pie progress={0.4} size={50} showsText={true} /> */}
                {/* <Progress.Circle size={30} indeterminate={true} /> */}
                <Progress.Bar progress={sumTrees/1200000} width={width-100} height={30} color={'white'}/> 

            </View>
            
            <FlatList 
            data={leaderBoard}
            style={{flex:1, width:width, }}
            // contentContainerStyle={{alignItems:'center'}}
            renderItem={({index, item}) =>
            <View style={{width:'100%', justifyContent:'center',alignItems:'center',margin:5}}>
                <View style={[
                    (index == 0)?
                    styles.clubWinning
                    :
                        (index == 1)?
                        styles.clubSecond
                        :
                        (index == 2)?
                        styles.clubThird
                        :
                        styles.clubStat
                    , styles.shadow
                ]}>
                    <Text style={styles.clubIndex} >{index+1}</Text>
                    <Text style={styles.clubName} >{item?.name}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.clubTrees} >{item?.trees}</Text>
                        <Image source={(require('../../assets/tree.png'))} style={{width:30,height:30,marginRight:10}}  />

                    </View>
                    
                    

                </View>
            </View>

            }
            />
            <TouchableOpacity onPress={()=> nav.navigate('NewClub')} style={styles.button}>
                <Text style={styles.btnTxt}>Register a new club</Text>
                
            
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{ 
        justifyContent:'center',
        alignItems:'center',
        flex:1,
    },
    clubName:{
        color:"#17458f",
        fontSize:20,
        fontWeight:'bold',
        marginHorizontal:20
    },
    clubIndex:{
        color:"grey",
        fontSize:20,
        fontWeight:'bold',
        marginHorizontal:20
    },
    clubTrees:{
        color:"#1c01ff",
        fontSize:20,
        fontWeight:'bold',
        marginHorizontal:5
    },
    topContainer:{
        height:170, 
        width:'100%',
        backgroundColor:'#17458f',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        borderBottomLeftRadius:26,
        borderBottomRightRadius:25
        // flexDirection:'row'
    },
    topFont:{
        color:"white",
        fontSize:19
    },
    topFontBig:{
        color:"white",
        fontSize:19,
        fontWeight:'bold'
    },
    clubStat:{
        flexDirection:'row',
        height:60,
        width:'85%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"white",
        borderRadius:10
    },
    clubWinning:{
        flexDirection:'row',
        height:60,
        width:'85%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"white",
        borderRadius:10,
        borderColor:"#FFD700",
        borderWidth:3
    },
    clubSecond: {
        flexDirection:'row',
        height:60,
        width:'85%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"white",
        borderRadius:10,
        borderColor:"#C0C0C0",
        borderWidth:3
    },
    clubThird: {
        flexDirection:'row',
        height:60,
        width:'85%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"white",
        borderRadius:10,
        borderColor:"#b7410e",
        borderWidth:3
    },
    button:{
        paddingVertical:15,
        paddingHorizontal:15,
        borderRadius:20,
        backgroundColor:'#17458f',
        position:'absolute',
        bottom:30,
        zIndex:2
    },
    btnTxt:{
        color:'white',
        fontSize:24,
        fontWeight:'bold'
    },
    titleText:{
        color:'white',
        fontSize:25,
        fontWeight:"bold",
        margin:10
        
    },
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})