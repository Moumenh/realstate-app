import { Toast } from 'native-base'
import React, { useEffect, useState } from 'react'
import { View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import { colors } from '../../InfraStructure/colors'

import CallComponent from '../../Components/CallComponent/CallComponent'
import SearchInput from '../../Components/SearchComponent/SearchComponent'

import { getDataFirstCall, getDataOnScroll, getDataOnInputSearch } from '../../Firebase/firebaseFunctions'

const IntrestedScreen = ({ uid }) => {
    const [calls, setCalls] = useState([]);
    const [dataEmpty, setDataEmpty] = useState(false)
    const [scrollLoading, setScrollLoading] = useState(false)
    const [lastDocRef, setLastDocRef] = useState(null)
    const [loading, setLoading] = useState(false)
    const [noResults, setNoResults] = useState(false)

    useEffect(() => {
        getDataFirstCall(10, "Interested", setLoading, setLastDocRef, setCalls, setDataEmpty, setNoResults, uid, Toast)
    }, [])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    const handleScroll = (nativeEvent) => {
        if (isCloseToBottom(nativeEvent) && calls.length > 0 && !dataEmpty) {
            getDataOnScroll(10, "Interested", setScrollLoading, setLastDocRef, setCalls, setDataEmpty, uid, Toast, calls, lastDocRef)
        }
    }

    const handleSearch = (search) => {
        setDataEmpty(false)
        if (search.length > 2) {
            getDataOnInputSearch(search, uid, "Interested", setLastDocRef, setCalls, setNoResults, Toast)
        }
        if (search.length === 0) {
            getDataFirstCall(10, "Interested", setLoading, setLastDocRef, setCalls, setDataEmpty, setNoResults, uid, Toast)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <SearchInput onChangeText={handleSearch} style={{ width: '90%', margin: 24, height: 50 }} placeholder='Search..' iconSize={20} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
                onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
                onEndRscrollEventThrottle={400}
                refreshControl={
                    <RefreshControl
                        colors={[`${colors.brand.primary}`]}
                        tintColor={colors.brand.primary}
                        refreshing={loading}
                        onRefresh={async () => {
                            getDataFirstCall(10, "Interested", setLoading, setLastDocRef, setCalls, setDataEmpty, setNoResults, uid, Toast)
                            setDataEmpty(false)
                        }}
                    />
                }>
                {calls.map((call, i) => <CallComponent key={i} call={call} />)}
                {scrollLoading && <ActivityIndicator style={{ marginVertical: 10 }} size="large" color={colors.brand.primary} />}
            </ScrollView>
        </View>
    )
}

const mapStateToProps = ({ user: { uid } }) => {
    return {
        uid
    }
}

export default connect(mapStateToProps)(IntrestedScreen)