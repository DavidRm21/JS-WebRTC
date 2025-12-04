import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js';

let connectedUserDetails = null;

const defaultConstraints = {
    audio: true,
    video: true
}

export const getLocalPreview = () => {
    navigator.mediaDevices.getUserMedia(defaultConstraints);
}

export const sendPreOffer = (callType, calleePersonalCode) => {

    connectedUserDetails = {
        callType,
        socketId: calleePersonalCode
    }

    if(callType === constants.callType.CHAT_PERSONAL_CODE || 
        callType === constants.callType.VIDEO_PERSONAL_CODE){
        
        const data = {
            callType,
            calleePersonalCode
        };

        ui.showCallingDialog(callingDialogRejectCallHandler);
        wss.sendPreOffer(data);
    }
};

export const handlePreOffer = (data) => {
    const { callType, callerSocketId } = data;
    connectedUserDetails = {
        socketId: callerSocketId,
        callType,
    };

    if(callType === constants.callType.CHAT_PERSONAL_CODE || 
        callType === constants.callType.VIDEO_PERSONAL_CODE
    ){
        console.log('showing call incoming');
        ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    };
};

const acceptCallHandler = () =>{
    console.log('Call accepted');
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
    ui.showCallElements(connectedUserDetails.callType);
};

const rejectCallHandler = () =>{
    console.log('Call reject');
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
}

const callingDialogRejectCallHandler = () => {
    console.log('rejecting the call');
}

const sendPreOfferAnswer = (preOfferAnswer) => {
    const data = {
        callerSocketId: connectedUserDetails.socketId,
        preOfferAnswer
    }
    ui.removeAllDialogs();
    wss.sendPreOfferAnswer(data);
}

export const handlePreOfferAnswer = (data) => {
    const { preOfferAnswer } = data;
    ui.removeAllDialogs();

    if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND){
        ui.showInfoDialog(preOfferAnswer);
        // show fialog that calle has not been found
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE){
        ui.showInfoDialog(preOfferAnswer);
        // show fialog that calle not available
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED){
        ui.showInfoDialog(preOfferAnswer);
        // show fialog that calle is rejected by the callee
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED){
        ui.showCallElements(connectedUserDetails.callType);
        // send webRTC offer
    }


}