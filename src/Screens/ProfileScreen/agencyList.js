import React from 'react'
import AgencyEmployeeList from "../../Components/AgencyEmployeeList/AgencyEmployeeList"
import { connect } from "react-redux"
import { setAgencyList } from "../../Redux/User/userAction"
import { db } from '../../Firebase/firebase'

const AgencyList = ({ agencyList, setAgencyList, id,role }) => {

    const fetchAgencyDataList = async () => {
        let arr = []
        const data = await db.collection('users').where('role', '==', 2).get()
        data.docs.map(element => {
            arr.push({ ...element.data(), id: element.id })
        })
        setAgencyList(arr)
        return arr
    }
    return (
        <AgencyEmployeeList list={agencyList} getList={fetchAgencyDataList} role={role} />
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setAgencyList: (list) => dispatch(setAgencyList(list))
    }
}
const mapStateToProps = ({ user: { agencyList, uid,role } }) => {
    return {
        agencyList, id: uid,role
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AgencyList)
