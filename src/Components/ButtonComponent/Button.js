import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { space } from '../../InfraStructure/spacing'
import { colors } from '../../InfraStructure/colors'

const styles = StyleSheet.create({
    button: {
        paddingVertical: space[2],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: space[1],
        alignSelf: 'flex-start',
        paddingHorizontal: space[3],
    }
})


const Button = ({ children, color, onPress, style, loading, labelColor, buttonUndo, undoTimer, disabled = false }) => {
    const [undo, setUndo] = useState(false)
    const [start, setStart] = useState(false)
    const [miliSeconds, setMiliSeconds] = useState(undoTimer * 1000 || 5000)
    const intervalRef = React.useRef(null)

    useEffect(() => {
        clearInterval(intervalRef.current)
        if (start) {
            if (undo) {
                onPress()
            }
            setMiliSeconds(5000)
            setStart(false)
            return
        }

        // return () => clearInterval(intervalRef.current)
    }, [start])

    const handlePress = async () => {

        let isDisabled = typeof disabled === 'boolean' ? disabled : disabled()

        if (!isDisabled && buttonUndo) {
            setUndo(!undo)
            intervalRef.current = setInterval(handleInterval, 1000)
        } else if (!isDisabled && !buttonUndo) {
            onPress()
        }
    }

    const handleInterval = () => {
        setMiliSeconds((time) => {
            if (time <= 0) {
                setStart(true)

                return time

            } else {
                setUndo(!undo)
            }
            const timeLeft = time - 1000
            return timeLeft
        })
    }
    const undoTask = () => {
        setStart(true)
        setUndo(!undo)
    }
    return (
        <TouchableOpacity activeOpacity={disabled ? 1 : 0.2} disabled={loading} onPress={() => undo ? undoTask() : handlePress()} style={{ ...styles.button, backgroundColor: color || colors.bg.primary, ...style }}>
            {loading ? <ActivityIndicator size='small' color='white' /> :
                <Text style={{ color: labelColor || 'white' }}>{undo ? `Undo (${miliSeconds / 1000})` : children}</Text>}
        </TouchableOpacity>
    )
}

export default Button