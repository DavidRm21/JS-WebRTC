import * as constants from "./constants.js";
import * as elements from "./elements.js";

export const updatePersonalCode = (personalCode) => {
    const personalCodeParagraph = document.getElementById(
        "personal_code_paragraph"
    );
    console.log('PersonalCode = '+personalCode);
    personalCodeParagraph.innerHTML = personalCode;
};

export const showIncomingCallDialog = (callType, acceptCallHandler, rejectCallHandler) => {
    const callTypeInfo = callType === constants.callType.CHAT_PERSONAL_CODE 
    ? 'chat' 
    : 'video';

    const incomingCallDialog = elements.getIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);

};