class FormValidation {

    static checkRequired(element) {
        if(element.validity.valueMissing){
            return true;
        }else {
            return false;
        }
    }

    static checkMisMatch(element) {
        if(element.validity.typeMismatch){
            return true;
        }else {
            return false;
        }
    }

    static checkBadInput(element) {
        if(element.validity.badInput){
            return true;
        }else {
            return false;
        }
    }

    static checkLength(element) {
        if(element.validity.tooShort){
            return true;
        }else {
            return false;
        }
    }

}

export { FormValidation }