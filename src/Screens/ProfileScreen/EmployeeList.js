import React from 'react'
import AgencyEmployeeList from "../../Components/AgencyEmployeeList/AgencyEmployeeList"
import { connect } from "react-redux"
import { setEmployeeList } from "../../Redux/User/userAction"
import { db } from '../../Firebase/firebase'

const EmployeeList = ({ employeeList, setEmployeeList, role }) => {


    const fetchEmployeeDataList = async (id) => {
        let arr = []
        const data = await db.collection('users').where('ownerId', '==', id).get()
        data.docs.map(element => {
            arr.push({ ...element.data(), id: element.id })
        })

        setEmployeeList(arr)
        return arr
    }
    return (
        <AgencyEmployeeList list={employeeList} getList={fetchEmployeeDataList} role={role} />
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setEmployeeList: (list) => dispatch(setEmployeeList(list))
    }
}
const mapStateToProps = ({ user: { employeeList, uid, role } }) => {
    return {
        employeeList, uid, role
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)