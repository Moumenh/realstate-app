import React from 'react'
import { View } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import { List, ListItem, Text, Icon, Right, Left, Body, Button } from 'native-base';
import { connect } from 'react-redux'
import Constants from "expo-constants";
import firebase from '../../Firebase/firebase'
import { setUser } from '../../Redux/User/userAction'
import { styles } from "./styles";
const auth = firebase.auth()

const ProfileScreen = ({ navigation, setUser, role, name }) => {

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
        <View style={styles.container}>
            <List>
                <ListItem icon onPress={() => navigation.navigate("Details")}>
                    <Left>
                        <Icon active type='MaterialCommunityIcons' style={styles.icon_lg} name="account-details" />
                    </Left>
                    <Body>
                        <Text style={styles.listItem} >
                            {name}
                        </Text>
                    </Body>
                    <Right>
                        <Icon name='arrow-forward' />
                    </Right>
                </ListItem>
                {
                    role === 3 && <ListItem icon onPress={() => navigation.navigate("Agency Requests")}>
                        <Left>
                            <Icon active type='MaterialIcons' style={styles.icon_lg} name="library-add" />
                        </Left>
                        <Body>
                            <Text style={styles.listItem} >
                                Agency Requests
                            </Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward' />
                        </Right>
                    </ListItem>
                }
                {
                    role === 2 && <ListItem icon onPress={() => navigation.navigate("Register new employee")}>
                        <Left>
                            <Icon active type='AntDesign' style={styles.icon_lg} name="addusergroup" />
                        </Left>
                        <Body>
                            <Text style={styles.listItem} >
                                register new employee
                            </Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward' />
                        </Right>
                    </ListItem>
                }
                {
                    role === 3 && <ListItem icon onPress={() => navigation.navigate("Agency list")}>
                        <Left>
                            <Icon active type='Fontisto' style={styles.icon_sm} name="nav-icon-list-a" />
                        </Left>
                        <Body>
                            <Text style={styles.listItem} >
                                agency list
                            </Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward' />
                        </Right>
                    </ListItem>
                }
                {
                    role === 2 && <ListItem icon onPress={() => navigation.navigate("Employee list")}>
                        <Left>
                            <Icon active type='Feather' style={styles.icon_sm} name="users" />
                        </Left>
                        <Body>
                            <Text style={styles.listItem} >
                                employee list
                            </Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward' />
                        </Right>
                    </ListItem>
                }
                {
                    role === 2 && <ListItem icon onPress={() => navigation.navigate("Customers List")}>
                        <Left>
                            <Icon active type='AntDesign' style={styles.icon_sm} name="piechart" />
                        </Left>
                        <Body>
                            <Text style={styles.listItem} >
                                Customers
                            </Text>
                        </Body>
                        <Right>
                            <Icon name='arrow-forward' />
                        </Right>
                    </ListItem>
                }
                <ListItem icon onPress={() => navigation.navigate("About")}>
                    <Left>
                        <Icon active type='AntDesign' style={styles.icon_sm} name="exclamationcircleo" />
                    </Left>
                    <Body>
                        <Text style={styles.listItem} >
                            About
                        </Text>
                    </Body>
                    <Right>
                        <Icon name='arrow-forward' />
                    </Right>
                </ListItem>
                <ListItem icon onPress={logOut}>
                    <Left>
                        <Icon active type='MaterialIcons' style={styles.icon_sm} name="logout" />
                    </Left>
                    <Body>
                        <Text style={styles.listItem} >
                            Sign Out
                        </Text>
                    </Body>
                    <Right>
                        <Icon name='arrow-forward' />
                    </Right>
                </ListItem>
            </List>
        </View>
    )
}

const mapStateToProps = ({ user: { role, name } }) => {
    return {
        role, name
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)