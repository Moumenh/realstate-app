import React, { useState, useEffect } from 'react'
import { View, ScrollView, RefreshControl, Text } from 'react-native'
import { colors } from "../../InfraStructure/colors";
import SearchInput from "../SearchComponent/SearchComponent"
import AgencyEmployeeCard from './AgencyEmployeeCard'
import { connect } from "react-redux"
import { setEmployeeList, setAgencyList } from "../../Redux/User/userAction"


const AgencyEmployeeList = ({ list, getList, id, setEmployeeList, setAgencyList, role }) => {
    const [filteredData, setFilteredData] = useState(list)
    const [dataList, setDataList] = useState(list)
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (role === 3) {
            let dataTotal = 0
            dataList.forEach((data) => {
                if (data.total) {
                    dataTotal += data.total
                }
            })

            setTotal(dataTotal)
        }
    }, [])

    useEffect(() => {
        if (role === 3) {
            setAgencyList(filteredData)
        }

        if (role === 2) {
            setEmployeeList(filteredData)
        }
    }, [filteredData])

    const filteredSearchData = (data) => {
        let res = dataList.filter(element => {
            return element?.displayName?.toLowerCase().includes(data.toLowerCase())
        })
        setFilteredData(res)
    }

    return (
        <View style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <SearchInput onChangeText={filteredSearchData} />
            {role === 3 && <Text style={{ color: 'white', fontSize: 16, alignSelf: 'flex-start', marginLeft: 22, marginTop: 12 }}>Total: ${total}</Text>}
            <ScrollView style={{ marginTop: 25, width: "100%" }}
                refreshControl={
                    <RefreshControl
                        colors={[`${colors.brand.primary}`]}
                        tintColor={colors.brand.primary}
                        refreshing={loading}
                        onRefresh={async () => {
                            setLoading(true)
                            const data = await getList(id)
                            setFilteredData(data)
                            setLoading(false)
                        }}
                    />
                }
            >
                {
                    filteredData.length > 0 && filteredData.map((employee, i) => {
                        return (
                            <AgencyEmployeeCard key={i} employee={employee} />
                        )

                    })
                }
            </ScrollView>
        </View>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeeList: (list) => dispatch(setEmployeeList(list)),
        setAgencyList: (list) => dispatch(setAgencyList(list))

    }
}
const mapStateToProps = ({ user: { uid } }) => {
    return {
        id: uid
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AgencyEmployeeList)
