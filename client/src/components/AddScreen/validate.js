const validate = values => {
    const errors = {};
    if(!values.showDate){
        errors.showDate = "Required";
    }
    return errors
};

export default validate