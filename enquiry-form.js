var accessKey ;

class getEnquiryForm{
    constructor() {
        window.onload = function(){
            if(document.getElementById('enquiry-form') != null){
                let enquiryId = document.getElementById('enquiry-form');
                let dataId;
                if(enquiryId){
                    accessKey = enquiryId.getAttribute('accesskey');
                    dataId = enquiryId.getAttribute('data-id');
                }
                let fontFamily = window.getComputedStyle(enquiryId)['font-family'];
                if (!enquiryId) return;
                enquiryId.innerHTML += `
                <iframe id="myHtml" src="index.html?id=${accessKey.split('=')[0]}&ff=${fontFamily}&denv=${dataId}&bId=${accessKey.split('=')[1]}" style="width:100%;height:calc(100vh - 20px);border:none;"></iframe>
                `
            }
        }
    }
}

enquiryForm = new getEnquiryForm()