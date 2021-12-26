import React from 'react'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { UIManager } from 'react-native'
import { colors } from '../../InfraStructure/colors';

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MyCreditCardInput = ({ name, setValid, setCardInfo }) => {

    const onChange = async (formData) => {
        const { values, status } = formData;
        const isIncomplete = Object.values(status).includes("incomplete") || Object.values(status).includes("invalid");
        const expiry = values.expiry.split("/");
        const card = {
            number: values.number,
            exp_month: expiry[0],
            exp_year: expiry[1],
            cvc: values.cvc,
            name: name,
        };
        if (!isIncomplete) {
            setCardInfo(card)
            setValid(true)
        } else {
            setValid(false)
        }
    };

    return <CreditCardInput
        allowScroll
        autoFocus
        cardImageFront={require("../../../assets/images/card-front.png")}
        cardImageBack={require("../../../assets/images/card-back.png")}
        validColor='lightgreen'
        inputStyle={{ color: colors.text.primary }}
        inputContainerStyle={{ borderBottomWidth: 1, borderBottomColor: colors.brand.primary }}
        onChange={onChange}
    />;
};

export default MyCreditCardInput;