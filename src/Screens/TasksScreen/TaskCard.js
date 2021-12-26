import React, { useState, useEffect, useRef } from 'react'
import {
    View, Text, Dimensions,
    Animated,
    TouchableOpacity,
    Linking
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux'
import { Toast, Icon } from 'native-base'

import Radio from '../../Components/RadioComponent/Radio'
import Button from '../../Components/ButtonComponent/Button'
import { colors } from '../../InfraStructure/colors'
import firebase, { db } from '../../Firebase/firebase'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { keywords } from '../../Firebase/firebaseFunctions'


const TaskCard = ({ task, user, fileName, deleteTask }) => {
    const [selected, setSelected] = useState(0)
    const [value, setValue] = useState(null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [done, setDone] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [called, setCalled] = useState(false)
    const [calledTime, setCalledTime] = useState(null)
    const [pressed, setPressed] = useState(false)


    const hours = Math.floor(calledTime / 1000 / 60 / 60) % 60
    const mins = Math.floor(calledTime / 1000 / 60) % 60
    const seconds = Math.floor(calledTime / 1000) % 60
    const formatTime = (time) => time < 10 ? `0${time}` : time

    useEffect(() => {
        if (pressed) {
            intervalLogic()
        }

    }, [pressed])

    const buttonDisabled = () => {
        if (!value) {
            Toast.show({
                text: `Please Enter ${task.Name || task.name} Status`,
                type: "warning",
            })
            return true
        }
        return false
    }

    const intervalLogic = async () => {

        setSubmitLoading(true)
        try {
            let customerName = task.Name || task.name
            await db.collection('users').doc(user.uid).collection('tasks').doc(fileName).update({
                newTasks: firebase.firestore.FieldValue.arrayRemove(task)
            })

            await db.collection('users').doc(user.uid).update({
                [value.split(' ').join('')]: firebase.firestore.FieldValue.increment(1)
            })

            await db.collection('users').doc(user.ownerId).collection('customers').doc().set({
                Name: customerName,
                Phone: task.Phone || task.phone,
                status: value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                called,
                callPeriod: `${formatTime(hours)}:${formatTime(mins)}:${formatTime(seconds)}`,
                employee: user.name,
                employeeId: user.uid
            })

            await db.collection('users').doc(user.uid).collection(value.split(' ').join('')).doc().set({
                Name: customerName,
                Phone: task.Phone || task.phone,
                status: value,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                called,
                callPeriod: `${formatTime(hours)}:${formatTime(mins)}:${formatTime(seconds)}`,
                keywords: keywords(customerName)
            })

            setSubmitLoading(false)
            setDone(true)
            setIsDisabled(true)
        } catch (err) {
            setSubmitLoading(false)
            console.log(err.message)
        }

    }

    const call = () => {
        Linking.openURL(`tel:${task.Phone || task.phone}`)
        setCalledTime(new Date().getTime())
        setCalled(true)
    }

    const leftSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity activeOpacity={0.6} onPress={deleteTask}>
                <View style={{ backgroundColor: colors.bg.primary, justifyContent: 'center', alignItems: 'center', height: 190, width: 75, marginLeft: 20 }}>
                    <Animated.View style={{ transform: [{ scale: scale }] }}>
                        <Icon active type='MaterialIcons' style={{ fontSize: 60, color: 'red' }} name='delete' />
                    </Animated.View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable
            renderLeftActions={
                done ? leftSwipe : null
            }

        >
            <Animated.View style={{ display: 'flex', flexDirection: 'row', backgroundColor: colors.bg.secondary, borderRadius: 5, width: '90%', alignSelf: 'center', marginBottom: 24, padding: 8, height: 190 }}>
                <View style={{ width: '50%' }}>
                    <Radio label='Interested' disabled={isDisabled} value='Interested' id={1} selected={selected} setSelected={setSelected} setValue={setValue} />
                    <Radio label='Call Back' disabled={isDisabled} value='Call Back' id={2} selected={selected} setSelected={setSelected} setValue={setValue} />
                    <Radio label='Not Interested' disabled={isDisabled} value='Not Interested' id={3} selected={selected} setSelected={setSelected} setValue={setValue} />
                    <Radio label='Unavailable' disabled={isDisabled} value='Unavailable' id={4} selected={selected} setSelected={setSelected} setValue={setValue} />
                </View>
                <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <AntDesign name='user' size={18} color={colors.brand.secondary} />
                            <Text style={{ color: colors.text.primary, fontSize: 18, marginLeft: 8 }}>{task.Name || task.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <Feather name='phone' size={18} color={colors.brand.secondary} />
                            <Text style={{ color: colors.text.primary, fontSize: 16, marginLeft: 8 }} onPress={call}>{task.Phone || task.phone}</Text>
                        </View>
                    </View>
                    {!done ?
                        <Button buttonUndo={true} undoTimer={5} onPress={() => {
                            setCalledTime(new Date().getTime() - calledTime)
                            setPressed(true)
                        }} loading={submitLoading} color={colors.brand.secondary} style={{ margin: 15 }} labelColor={colors.text.inverse} disabled={buttonDisabled}>Submit</Button> :
                        <Text style={{ color: colors.brand.secondary, fontSize: 18 }}>Done</Text>
                    }
                </View>
            </Animated.View>
        </Swipeable>
    )
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

export default connect(mapStateToProps)(TaskCard)