import { db } from "./firebase";


const createUserProfileDocument = async (userAuth, additionalData, navigation, Toast, setLoading) => {
    if (!userAuth) return;

    const userRef = await db.doc(`users/${userAuth.uid}`)

    const snapShot = userRef.get()

    if (!snapShot.exists) {
        const { email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                email,
                createdAt,
                status: true,
                ...additionalData
            })

            await db.collection('VerifiedEmployees').doc(email.toLocaleLowerCase()).delete()

            setLoading(false)

        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;

}

const emailValidation = (email) => {
    const emailRegexp = new RegExp("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");

    return emailRegexp.test(email)
};

const phoneValidation = (number) => {
    console.log('nice validation broo @Momen !!!');
    console.log('Welcome bro');
    let phone = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")

    return phone.test(number)
};

const keywords = (str) => {
    str = str.toLowerCase()
    str = str.split(' ')
    let arr = []
    let value = ''
    for (let i = 0; i < str.length; i++) {
        value = str[i][0]
        arr.push(value)
        for (let j = 1; j < str[i].length; j++) {
            value += str[i][j]
            arr.push(value)

        }
    }
    str = str.join(' ')
    value = str[0]
    for (let j = 1; j < str.length; j++) {
        value += str[j]
        arr.push(value)
    }
    arr = [... new Set(arr)]
    return arr
}

const getDataFirstCall = async (limit, status, setLoading, setLastDocRef, setData, setDataEmpty, setNoResults, uid, Toast) => {
    try {
        setLoading(true)
        setNoResults(false)

        const data = await db.collection('users').doc(uid).collection(status)
            .orderBy("createdAt", "desc")
            .limit(limit)
            .get()

        if (data.empty) {
            setNoResults(true)
        }

        setLastDocRef(data.docs[data.docs.length - 1])
        setData(data.docs.map((element) => element.data()))

        setLoading(false)
    } catch (err) {
        Toast.show({
            text: `${err.message}`,
            type: "danger"
        })
        setLoading(false)
    }
}

const getDataOnScroll = async (limit, status, setScrollLoading, setLastDocRef, setData, setDataEmpty, uid, Toast, prevData, LastDocRef) => {
    try {
        setScrollLoading(true)
        const data = await db.collection('users').doc(uid).collection(status)
            .orderBy("createdAt", "desc")
            .startAfter(LastDocRef)
            .limit(limit)
            .get()

        if (data.empty) {

            setScrollLoading(false)
            setDataEmpty(true)
            return
        }

        setLastDocRef(data.docs[data.docs.length - 1])

        const newData = data.docs.map((element) => element.data())

        setData([...prevData, ...newData])
        setScrollLoading(false)
    } catch (err) {
        Toast.show({
            text: `${err.message}`,
            type: "danger"
        })
        setScrollLoading(false)
        setDataEmpty(true)

    }

}

const getDataOnInputSearch = async (search, uid, status, setLastDocRef, setData, setNoResults, Toast) => {
    try {
        if (search.length > 2) {
            const items = []
            const res = await db.collection('users').doc(uid).collection(status)
                .orderBy("createdAt", "desc")
                .limit(5)
                .where('keywords', 'array-contains', search.toLocaleLowerCase())
                .get()

            res.forEach((item) => {
                items.push(item.data())
            })

            setLastDocRef(res.docs[res.docs.length - 1])
            setData(items)

            if (res.empty) {
                setNoResults(true)
            }

        }
    } catch (err) {
        Toast.show({
            text: `${err.message}`,
            type: "danger"
        })
        console.log(err.message)
    }
}

export { createUserProfileDocument, emailValidation, phoneValidation, keywords, getDataFirstCall, getDataOnScroll, getDataOnInputSearch }
