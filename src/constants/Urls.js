var apiurl = {};

let HOST = "https://w3-pre.ibm.com/tools/cpds/eu/dev";

//http://w3-pre.ibm.com/tools/cpds/eu/dev/common/sso-client/w3/login?clientId=vmp-local

let backendHost = process.env.REACT_APP_BACKEND_HOST;

if(process.env.NODE_ENV === 'production' 
    && typeof(backendHost) != undefined){
    HOST = backendHost;
}


apiurl.AUTHLOGIN = HOST + '/common/sso-client'; //Cloud
apiurl.AUTH = HOST + '/common/sso-server'; //Cloud

apiurl.HOST = HOST + '/vmp-api'; //Cloud

apiurl.CONSENT = apiurl.AUTH + '/w3/consent/'; //Cloud
apiurl.CONSENTCHOICE = apiurl.AUTH + '/w3/consent?choice='; //Cloud

//API
apiurl.USER = apiurl.AUTH+ '/customer';
apiurl.PRINCIPAL = apiurl.AUTH+ '/principal';

apiurl.REQUEST = apiurl.HOST+ '/request';
apiurl.ALLREQUEST = apiurl.HOST+ '/sm/request';
apiurl.REQUESTWORKFLOW = apiurl.HOST+ '/workflow/saveAndForward';
apiurl.REQUESTFORWARD= apiurl.HOST+ '/workflow/forward';
apiurl.REQUESTDUPLICATE= apiurl.HOST+ '/duplicate/request';

apiurl.COMPANY = apiurl.HOST+ '/support/param/primaryVendor';

apiurl.RECIPIENT = apiurl.HOST+ '/recipient';
apiurl.RECIPIENTBATCH = apiurl.HOST+ '/recipient/status';

module.exports = apiurl;
