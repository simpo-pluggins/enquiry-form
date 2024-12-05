var id;
var bId;
var contactResponseData;
var env;
var templates;
spacingLayout = {
    none: '1.5rem',
    small: '3rem',
    medium: '5rem',
    large: '6rem',
    remove: '0rem'
}

class enquiryMin {
    constructor() {
        // window.onload = function () {
        setTimeout(() => {
                const urlParams = new URLSearchParams(window.location.search);
            let fontFamily = urlParams.get('ff');
            id = urlParams.get('id');
            bId = urlParams.get('bId');
            // bId = window.localStorage.getItem('bId');
            // env = window.localStorage.getItem('denv');
            env = urlParams.get('denv');

            if (fontFamily) {
                document.body.style.fontFamily = decodeURIComponent(fontFamily);
            }
            if (id) {
                fetchingAPIUrl(id, env)
                getSuccessTemplateValues(id);
            }
            }, 200);
        // }
    }
}

function getSuccessTemplateValues(){
    let fetchUrl;
    if(env === 'PRE-PROD'){
        fetchUrl = `https://dev-api.simpo.ai/crm/templates?businessId=${bId}&status=true`
    }
    else if(env === 'PROD'){
        fetchUrl = `https://api.simpo.ai/crm/templates?businessId=${bId}&status=true`
    }
    fetch(fetchUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(response => {
        templates = response.data.data[0].templates;

        console.log(templates);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function fetchingAPIUrl(id, env) {
    let getEnquiryFormApiUrl;
    if (env === 'PRE-PROD') {
        getEnquiryFormApiUrl = `https://dev-api.simpo.ai/business/v3/website/${id}/pages/list`
    }
    else if (env === 'PROD') {
        getEnquiryFormApiUrl = `https://api.simpo.ai/business/v3/website/${id}/pages/list`
    }
    fetchEnquiryFormData(getEnquiryFormApiUrl);
}

function fetchEnquiryFormData(getEnquiryFormApiUrl) {
    fetch(getEnquiryFormApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(response => {
            response.data[0].components.forEach(element => {
                if ((element.sectionType.split(' ').join('_')).toUpperCase() === 'CONTACT_US') {
                    element?.content?.contactField?.fields.forEach(item => {
                        item.sendingValue = ''
                    });
                    contactResponseData = element;
                }
            });
            creatingEnquiryForm(contactResponseData)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function creatingEnquiryForm(data) {
    console.log(data);
    const formWithoutImage = document.getElementById('form_without_image');
    const formWithImage = document.getElementById('form_with_image');

    if (data.content.image && data.content.image.showImage) {
        formWithImageFn(data, formWithImage, formWithoutImage)
    }
    else {
        formWithoutImageFn(data, formWithImage, formWithoutImage)
    }
}

function formWithImageFn(data, formWithImage, formWithoutImage) {
    formWithImage.style.display = 'block';
    formWithoutImage.style.display = 'none';

    const enquiryFormMini = document.getElementById('enquiry_form_mini');
    const enquiryFormImage = document.getElementById('load_enquiry_image');

    if (data.styles.positionLayout.value === 'right') {
        enquiryFormMini.classList.add('flex-lg-row-reverse');
        Object.assign(enquiryFormMini.style, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            height: '100%',
            position: 'relative'
        })
    }
    else if (data.styles.positionLayout.value === 'left') {
        enquiryFormMini.classList.add('flex-lg-row');
        Object.assign(enquiryFormMini.style, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            height: '100%',
            position: 'relative'
        });
    }

    //include spacing
    includeSpacing(data?.styles?.layout?.spacing, enquiryFormMini)

    //form image
    if (enquiryFormImage) {
        enquiryFormImage.src = data?.content?.image?.url
        enquiryFormImage.alt = data?.content?.image?.altText

        const xPosition = data?.content?.image?.position?.x + '%' || 'center';
        const yPosition = data?.content?.image?.position?.y + '%' || 'center';

        enquiryFormImage.style.objectPosition = `${xPosition} ${yPosition}`;
    }
    contentSectionAndFields(data)
}

function contentSectionAndFields(data) {
    const contentPart = document.getElementById('content_section');
    if (contentPart) {
        if (data?.styles.positionLayout.value === 'top') {
            contentPart.classList.add('pt-5')
        }
        loadCotentTitleDescription(data);
        loadContentInputFields(data);
        loadButtonValue(data);
    }
}

function loadCotentTitleDescription(data) {
    const loadFormTitleDescription = document.getElementById('load_form_title_description');
    if (loadFormTitleDescription) {
        if (data?.content?.inputText && Array.isArray(data.content.inputText)) {
            data?.content?.inputText.forEach(item => {
                const element = document.createElement('div');
                // element.classList.add('mt-2');
                if (item.isRTE) {
                    const rteContent = document.createElement('div');
                    rteContent.innerHTML = item.value;
                    element.appendChild(rteContent);
                    if (item.label.toUpperCase() === 'HEADING') {
                        rteContent.classList.add('heading-large', 'lh-2', 'mb-3')
                    }
                    else {
                        rteContent.classList.add('body-large', 'lh-2', 'mb-3')
                    }
                }
                else {
                    const textContent = document.createElement('p');
                    textContent.textContent = item.value;
                    element.appendChild(textContent);
                }

                loadFormTitleDescription.appendChild(element);
            });
        }
    }
}

function loadContentInputFields(data) {
    const loadFormContentField = document.getElementById('load_form_input_fields');
    if (loadFormContentField) {
        if (data?.content?.contactField?.fields && Array.isArray(data.content.contactField.fields)) {
            data?.content?.contactField?.fields.forEach(field => {
                const fieldContainer = document.createElement('div');
                fieldContainer.classList.add('mb-3', 'single_input');

                const label = document.createElement('label');
                label.setAttribute('for', field.label);
                label.classList.add('form-label');
                label.textContent = field.label;

                if (field.required) {
                    const redStar = document.createElement('span');
                    redStar.textContent = ' *';
                    redStar.style.color = 'red';
                    label.appendChild(redStar);
                }

                // Check the field type
                if (field.type === 'text' || field.type === 'number') {
                    const input = document.createElement('input');
                    input.type = field.type;
                    input.id = ((field.label).split(' ').join('_')).toLowerCase();
                    input.name = field.label;
                    input.placeholder = 'Enter ' + field.label.toLowerCase()
                    input.classList.add('form-control');
                    input.required = field.required || false;
                    input.value = field.sendingValue || '';

                    input.addEventListener('input', (e) => {
                        field.sendingValue = e.target.value;
                        // console.log(field);
                    });

                    fieldContainer.appendChild(label);
                    fieldContainer.appendChild(input);
                } else if (field.type === 'dropdown') {
                    const select = document.createElement('select');
                    select.id = ((field.label).split(' ').join('_')).toLowerCase();
                    select.name = field.label;
                    select.classList.add('form-select');
                    select.required = field.required || false;

                    const defaultOption = document.createElement('option');
                    defaultOption.textContent = `Select ${field.label}`;
                    defaultOption.disabled = true;
                    defaultOption.selected = true;
                    select.appendChild(defaultOption);

                    field.options.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.value;
                        optionElement.textContent = option.label;
                        select.appendChild(optionElement);
                    });

                    select.addEventListener('change', (e) => {
                        field.sendingValue = e.target.value;
                        // console.log(field);
                    });

                    fieldContainer.appendChild(label);
                    fieldContainer.appendChild(select);
                }

                loadFormContentField.appendChild(fieldContainer);
            });
        }
    }
}

function loadButtonValue(data) {
    const loadsendButton = document.getElementById('sendButton');
    if (loadsendButton) {
        loadsendButton.innerHTML = data?.content?.contactField?.button;
        const buttonData = data.action.buttons[0]

        loadsendButton.id = buttonData.id
        Object.assign(loadsendButton.style, {
            border: buttonData.styles.type === 'Outline' ? '2px solid #000' : 'none',
            backgroundColor: buttonData.styles.type === 'Outline' ? 'transparent' : '#000',
            color: buttonData.styles.type === 'Outline' ? '#000' : '#fff',
            borderRadius: buttonData.styles.shape === 'Round' ? '5px' : '4px',
            padding: '10px 20px',
            cursor: 'pointer'
        })
    }
}

function includeSpacing(spacing, enquiryMini) {
    //spacing top
    if (spacing.top === 'small') {
        enquiryMini.style.paddingTop = spacingLayout.small
    }
    else if (spacing.top === 'medium') {
        enquiryMini.style.paddingTop = spacingLayout.medium
    }
    else if (spacing.top === 'large') {
        enquiryMini.style.paddingTop = spacingLayout.large
    }
    else if (spacing.top === 'none') {
        enquiryMini.style.paddingTop = spacingLayout.none
    }
    else if (spacing.top === 'remove') {
        enquiryMini.style.paddingTop = spacingLayout.remove
    }

    //spacing botton
    if (spacing.bottom === 'small') {
        enquiryMini.style.paddingBottom = spacingLayout.small
    }
    else if (spacing.bottom === 'medium') {
        enquiryMini.style.paddingBottom = spacingLayout.medium
    }
    else if (spacing.bottom === 'large') {
        enquiryMini.style.paddingBottom = spacingLayout.large
    }
    else if (spacing.bottom === 'none') {
        enquiryMini.style.paddingBottom = spacingLayout.none
    }
    else if (spacing.bottom === 'remove') {
        enquiryMini.style.paddingBottom = spacingLayout.remove
    }
}

function buttonClicked() {
    let missingFields = [];

    contactResponseData.content.contactField.fields.forEach(element => {
        if (element.required && !element.sendingValue.trim()) {
            missingFields.push({ id: `${(element.label.split(' ').join('_')).toLowerCase()}`, label: element.label });
        }
    });

     const errorMessages = document.querySelectorAll('.error-message');
     errorMessages.forEach(error => error.remove());

     if(missingFields.length > 0){
        missingFields.forEach(item => {
            let inputField = document.getElementById(item.id);
            let container = inputField.parentElement;

            // Create and append error message
            let errorMessage = document.createElement('small');
            errorMessage.classList.add('error-message');
            Object.assign(errorMessage.style, {
                position: 'absolute',
                color: 'red',
                marginTop: '3px'
            });
            errorMessage.textContent = `Please enter ${item.label.toLowerCase()}`;
            container.appendChild(errorMessage);
        });
     }
     else{
        submitContactForm()
        // openPopup('SUCCESS')
     }
}

emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

var sendingData = {
    businessId: '',
    name: '',
    mobileNo: '',
    email: '',
    message: '',
    moreInfo: {}
  }
async function submitContactForm(){
    let submitFormEndPoint ;

    if(env === 'PRE-PROD'){
        submitFormEndPoint = `https://dev-api.simpo.ai/business/contact`
    }
    else if(env === 'PROD'){
        submitFormEndPoint = `https://api.simpo.ai/business/contact`
    }
    sendingData.businessId = bId
    let instance = contactResponseData.content.contactField.fields;
    for (let index = 0; index < instance.length; index++) {
        if((instance[index].label.split(' ').join('_')).toLowerCase().includes("student_name") || 
      ((instance[index].label.split(' ').join('_')).toLowerCase().includes("student") && (instance[index].label.split(' ').join('_')).toLowerCase().includes("name"))){
          sendingData.name = instance[index].sendingValue
        }
        else if((instance[index].label).toLowerCase().includes("email") || (instance[index].label).toLowerCase().includes("mail")){
            sendingData.email = instance[index].sendingValue
        }
        else if(instance[index].label.includes("Message")){
            sendingData.message = instance[index].sendingValue
        }
        else if((instance[index].label).toLowerCase().includes("phone") || (instance[index].label).toLowerCase().includes("mobile") || (instance[index].label).toLowerCase().includes("contact")){
            sendingData.mobileNo = instance[index].sendingValue
        }
        else{
          let key = instance[index].label
          let value = instance[index].sendingValue
          sendingData.moreInfo[key] = value
        }
      }

    try {
        const response = await fetch(submitFormEndPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendingData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        openPopup('SUCCESS')
    } catch (error) {
        openPopup('FAILED')
    }
      
}

function openPopup(ev) {
    let originalData = templates[ev];

    const templateImage = document.getElementById('success_fail_image');
    const templateTitle = document.getElementById('success_fail_title');
    const templateMessage = document.getElementById('success_fail_message');
    const templateButton = document.getElementById('succes_fail_button');

    if(templateImage){
        templateImage.src = originalData.attachmentUrl;
        templateImage.alt = ev+' image'
    }
    if(templateTitle){
        templateTitle.innerHTML = originalData?.name;
    }
    if(templateMessage){
        templateMessage.innerHTML = originalData?.message;
    }
    if(templateButton){
        templateButton.innerHTML = originalData?.buttons[0].label;
    }

    var myModal = new bootstrap.Modal(document.getElementById('successModal'));
    myModal.show();

    document.getElementById('successModal').addEventListener('hidden.bs.modal', function () {
        clearFormData();
    });
}

function clearFormData() {
    contactResponseData?.content?.contactField.fields.forEach(field => {
        const elementId = (field.label.split(' ').join('_')).toLowerCase();
    
        let selectElement = document.getElementById(elementId);
    
        if (selectElement) {
            console.log(document.getElementById(elementId).value)
            selectElement.value = '';
            
            field.sendingValue = '';
            const defaultOption = selectElement.querySelector('option[disabled]');
            if (defaultOption) {
                defaultOption.selected = true;
            }
        }
    });
    
}

function formWithoutImageFn(data, formWithImage, formWithoutImage) {
    formWithImage.style.display = 'none';
    formWithoutImage.style.display = 'block';
}

enquiry = new enquiryMin()
