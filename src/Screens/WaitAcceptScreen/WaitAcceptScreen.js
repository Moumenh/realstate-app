import React from 'react'
import { View, Text, } from 'react-native'
import Button from '../../Components/ButtonComponent/Button'
import { connect } from 'react-redux'
import { setUser } from '../../Redux/User/userAction'
import { colors } from '../../InfraStructure/colors'
import { auth } from '../../Firebase/firebase'

const WaitAcceptScreen = ({ setUser }) => {
    const logOut = () => {
        auth.signOut().then(() => {
            setUser({
                name: null,
                email: null,
                role: null,
                uid: null,
                employeeList: [],
                agencyList: []
            })
        })

    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 50 }}>
            <Text style={{ color: 'white' }}>We Are Currentrly Reviewing Your Request, Please Wait Until We Accept It</Text>
            <View style={{ marginTop: 22 }}>

                <Button color={colors.brand.secondary} onPress={logOut}> LogOut </Button>
            </View>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(null, mapDispatchToProps)(WaitAcceptScreen)