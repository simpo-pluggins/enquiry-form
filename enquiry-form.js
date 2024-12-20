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
                const fontFamily = window.getComputedStyle(enquiryId)['font-family'] || null;
                const encodedFontFamily = encodeURIComponent(fontFamily);
                const id = encodeURIComponent(accessKey.split('=')[0]);
                const bId = encodeURIComponent(accessKey.split('=')[1]);
                if (!enquiryId) return;
                enquiryId.innerHTML += `
                <iframe id="myHtml" src="https://simpo-pluggins.github.io/enquiry-form/index.html?id=${id}&ff=${encodedFontFamily}&denv=${dataId}&bId=${bId}" style="width:100%;height:calc(100vh - 20px);border:none;"></iframe>
                `
            }
        }
    }
}

enquiryForm = new getEnquiryForm()
