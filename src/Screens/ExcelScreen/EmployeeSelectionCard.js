import React, { useEffect, useState } from 'react'
import { Text, View, Pressable } from 'react-native'
import { CheckBox } from 'native-base'
import { colors } from '../../InfraStructure/colors'

const EmployeeSelectionCard = ({ employee, selectedEmployee, setEmployees, employees }) => {
    const [selected, setSelected] = useState(false)
    const [clicked, setClicked] = useState(false)
    useEffect(() => {
        if (clicked) {
            selectedEmployee(employees, setEmployees, selected, employee)
        }
        return () => setClicked(false)
    }, [selected])

    const handleClick = () => {
        setClicked(true)
        setSelected(!selected)
    }

    return (
        <Pressable disabled={employee.status === false} onPress={handleClick} style={{ borderRadius: 5, width: '80%', justifyContent: 'space-between', padding: 20, margin: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.bg.secondary, alignSelf: 'center' }}>
            <CheckBox  color={employee.status === false ? colors.text.disabled : colors.brand.secondary} checked={selected} />
            <Text style={{ color: "white", fontSize: 16 }}>{employee.displayName}</Text>
        </Pressable>
    )
}

export default EmployeeSelectionCard