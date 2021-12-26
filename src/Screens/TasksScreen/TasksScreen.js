import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, RefreshControl, ActivityIndicator, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'

import FilesTitle from './FilesTitle'
import { styles } from "./styles";
import { colors } from '../../InfraStructure/colors'

import { db } from '../../Firebase/firebase'


const TasksScreen = ({ uid }) => {

    const [tasks, setTasks] = useState({})
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {
        setLoading(true)
        await cleanTasks()
        let taskObj = {}
        let fileNames = []
        const tasksLists = await db.collection(`users/${uid}/tasks`).get()
        tasksLists.docs.forEach((list) => {
            taskObj[list.id] = list.data()
            fileNames.push(list.id)
        })
        setTasks(taskObj)
        setFiles(fileNames)
        setLoading(false)
    }

    const cleanTasks = async () => {
        const tasksLists = await db.collection(`users/${uid}/tasks`).where('newTasks', '==', []).get()
        tasksLists.docs.forEach((list) => {
            list.ref.delete()
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tasks</Text>
            <FlatList
                refreshControl={
                    <RefreshControl
                        colors={[`${colors.brand.primary}`]}
                        tintColor={colors.brand.primary}
                        refreshing={loading}
                        onRefresh={() => {
                            getTasks()
                        }}
                    />
                }
                data={files}
                renderItem={({ item, index }) => <FilesTitle key={item} fileName={item} file={tasks[item]} />}
                keyExtractor={(item, index) => item}

            />
            {(files.length == 0) &&
                <View style={{ position: 'absolute', justifyContent: 'center', bottom: '30%', width: '100%' }}>
                    <Image style={{ width: "70%", aspectRatio: 1.45, alignSelf: 'center' }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/real-estate-dev-9daac.appspot.com/o/assets%2FnoTasks.png?alt=media&token=d36d50ba-e187-4bba-9cf5-b1f4e581cc59' }}
                    />
                    <Text style={{ color: colors.text.primary, fontSize: 20, textAlign: 'center', marginVertical: 10 }}>No Tasks, Just Chill ...</Text>
                </View>
            }


        </View>
    )
}

const mapStateToProps = ({ user: { uid } }) => {
    return {
        uid
    }
}

export default connect(mapStateToProps)(TasksScreen)