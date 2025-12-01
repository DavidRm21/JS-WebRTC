export const updatePersonalCode = (personalCode) => {
    const personalCodeParagraph = document.getElementById(
        "personal_code_paragraph"
    );
    console.log('PersonalCode = '+personalCode);
    personalCodeParagraph.innerHTML = personalCode;
};