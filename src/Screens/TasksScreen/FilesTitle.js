import React, { useState, useCallback } from 'react'
import { View, Text, FlatList, LayoutAnimation, Platform, UIManager } from 'react-native'
import { colors } from '../../InfraStructure/colors'
import TaskCard from './TaskCard'

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FilesTitle = ({ file, fileName }) => {
    const [tasks, setTasks] = useState(file?.newTasks)

    const deleteTask = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        let arr = tasks.filter((item) => item.id !== id)
        setTasks(arr);
    };

    const ITEM_HEIGHT = 190

    const getItemLayOut = useCallback((data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index
    }), [])

    return (
        <View >
            <View style={{ margin: 20 }}>
                <Text style={{ color: colors.text.primary, fontSize: 20 }}>{fileName.slice(0, fileName.length - 5)}</Text>
            </View>
            <View>

                <FlatList
                    data={tasks}
                    renderItem={({ item, index }) => <TaskCard task={item} index={index} fileName={fileName} deleteTask={() => deleteTask(item.id)} />}
                    keyExtractor={(item) => item.id}
                    getItemLayout={getItemLayOut}
                    maxToRenderPerBatch={5}
                />
            </View>

        </View>
    )
}

export default FilesTitle