var accessKey ;

class getEnquiryForm{
    constructor() {
        // window.onload = function(){
        setTimeout(() => {
                if(document.getElementById('enquiry-form') != null){
                let enquiryId = document.getElementById('enquiry-form');
                let dataId;
                if(enquiryId){
                    accessKey = enquiryId.getAttribute('accesskey');
                    dataId = enquiryId.getAttribute('data-id');
                }
                let fontFamily = window.getComputedStyle(enquiryId)['font-family'] || null;
                const id = encodeURIComponent(accessKey.split('=')[0]);
                const bId = encodeURIComponent(accessKey.split('=')[1]);
                localStorage.setItem('bId',accessKey.split('=')[1])
                localStorage.setItem('denv',dataId)
                const url = `https://simpo-pluggins.github.io/enquiry-form/index.html?id=${id}&ff=${fontFamily}&denv=${dataId}&bId=${bId}`;
                if (!enquiryId) return;
                enquiryId.innerHTML += `
                <iframe id="myHtml" src="https://simpo-pluggins.github.io/enquiry-form/index.html?id=${id}&ff=${fontFamily}&denv=${dataId}&bId=${bId}" style="width:100%;height:calc(100vh - 20px);border:none;"></iframe>
                `
            }
            }, 200);
        // }
    }
}

enquiryForm = new getEnquiryForm()
