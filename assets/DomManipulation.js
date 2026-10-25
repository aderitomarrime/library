import { FormValidation } from "./FormValidation.js";
import { addBook } from "./script.js";

class DomManipulation {

    static addEventListenners() {
        const inputs = document.querySelectorAll("input[type='text'], input[type='radio'], input[type='number']");
        const submit = document.querySelector("button[id='send']");
        const form = document.querySelector("form");

        inputs.forEach((input)=> {
            input.addEventListener("input", (event)=>{
                DomManipulation.checkInput(event.target);
            })
        })

        submit.addEventListener("click", (event)=>{
            event.preventDefault();

            let result;

            const inputs = document.querySelectorAll("input[type='text'], input[type='radio'], input[type='number']");

            inputs.forEach(element=>{
                if(element.type == "text" || element.type == "number" || element.type == "radio") {

                    if(element.type == "number") {
  
                        if(FormValidation.checkBadInput(element)) {
                            this.displayErrorMessage(element, element.dataset.number);
                            result = true;
                        }else if(FormValidation.checkRequired(element)) {
                            this.displayErrorMessage(element, element.dataset.required);
                            result = true;
                        }else{
                            this.removeErrorMessage(element);
                            result += false;
                        }
                    //if the user doesnt insert or insert a invalid email show error message
                    }else if(FormValidation.checkRequired(element)) {
                            if(element.type == "radio" ) {
                                this.displayErrorMessage(element.parentNode, element.dataset.required);
                            }else {
                                this.displayErrorMessage(element, element.dataset.required);
                            }
                            result = true;
                        }else{
                            if(element.type == "radio" ) {
                                this.removeErrorMessage(element.parentNode);
                            }else {
                                this.removeErrorMessage(element);
                            }
                            result += false;
                        }
                    } 
            })

            if(!result){
                addBook();
            }

        })

    }

    static checkInput(element){  
        //check email input
        let result;
        if(element.type == "text" || element.type == "number" || element.type == "radio") {
            
            if(element.type == "number") {
  
                if(FormValidation.checkBadInput(element)) {
                    this.displayErrorMessage(element, element.dataset.number);
                    result = true;
                }else if(FormValidation.checkRequired(element)) {
                    this.displayErrorMessage(element, element.dataset.required);
                    result = true;
                }else{
                    this.removeErrorMessage(element);
                    result += false;
                }
                //if the user doesnt insert or insert a invalid email show error message
            }else if(FormValidation.checkRequired(element)) {
                this.displayErrorMessage(element, element.dataset.required);
                result = true;
            }else{
                if(element.type == "radio" ) {
                    this.removeErrorMessage(element.parentNode);
                }else {
                    this.removeErrorMessage(element);
                }
                result += false;
            }
        }
    }

    static displayErrorMessage(element, info){
        const errorMessage = element.parentNode.querySelector("span");
        errorMessage.textContent =`${info}`;
        errorMessage.className = "error active";
    }

    static removeErrorMessage(element){
        const errorMessage = element.parentNode.querySelector("span");
        errorMessage.textContent ="";
        errorMessage.className = "error";
    }
}

export { DomManipulation }