export const getFormattedUserLookupData = (userData: any) => {
    
    
    if (userData.data) {
        const inputDate = new Date(userData.data.extendedFields.dob);
        const formattedDOBDate = `${inputDate.getFullYear()}/${(inputDate.getMonth() + 1).toString().padStart(2, '0')}/${inputDate.getDate().toString().padStart(2, '0')}`;
        const firstName = userData.data.profiles[0].firstName;
        const lastName = userData.data.profiles[0].lastName;
        const gender = userData.data.extendedFields.gender;
        const countryOfResidence = userData.data.extendedFields.country_of_residence;
        const state = userData.data.extendedFields.state;
        const zip = userData.data.extendedFields.zip;
        return {
            dob: formattedDOBDate,
            firstName,
            lastName,
            gender,
            countryOfResidence,
            state,
            zip
        }
    }

}