chrome.extension.getBackgroundPage().console.log("testing init of oauth..");

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  // Use the token.

  chrome.extension.getBackgroundPage().console.log("got oauth..");
  onAuthorized(token);
});

function onAuthorized(token) {
  chrome.extension.getBackgroundPage().console.log("starting GET..");
  var x = new XMLHttpRequest();
    x.open('GET', 'https://www.googleapis.com/calendar/v3/calendars/primary?alt=json&access_token=' + token);
    x.onload = function() {
        alert(x.response);
    };
    x.send();
  chrome.extension.getBackgroundPage().console.log("sent GET..");
};



/*var oauth = ChromeExOAuth.initBackgroundPage({
  'request_url': 'https://www.google.com/accounts/OAuthGetRequestToken',
  'authorize_url': 'https://www.google.com/accounts/OAuthAuthorizeToken',
  'access_url': 'https://www.google.com/accounts/OAuthGetAccessToken',
  'consumer_key': 'anonymous',
  //'consumer_key': 'AIzaSyDf8CrUtjTVlpaX_LFbzc3hY3t8YF_43C8',
  //'consumer_key': "956653605342-rpb4s17gar3puaco892is1grme0uh6j0.apps.googleusercontent.com",
  //'consumer_secret': "xOvNg9vrTIIqpNYlsvTlojrl",
  'consumer_secret': 'anonymous',
  'scope': 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly',
  //'scope': 'https://www.googleapis.com/auth/calendar',
  'app_name': 'w2m-autofill'
});

chrome.extension.getBackgroundPage().console.log("done with init of oauth..");

function callback(resp, xhr) {
  chrome.extension.getBackgroundPage().console.log(resp);
};

function onAuthorized() {
  chrome.extension.getBackgroundPage().console.log("starting GET..");
  var url = 'https://www.googleapis.com/calendar/v3/calendars/primary';
  var request = {
    'method': 'GET',
    'parameters': {'alt': 'json'},
    'headers' : {
      'Content-Type': 'application/json'
    }
  };

  chrome.extension.getBackgroundPage().console.log("made request var..");

  // Send: GET https://docs.google.com/feeds/default/private/full?alt=json
  oauth.sendSignedRequest(url, callback, request);
  chrome.extension.getBackgroundPage().console.log("sent GET..");
};

chrome.extension.getBackgroundPage().console.log("starting authorize..");

oauth.authorize(function() {
  //chrome.extension.getBackgroundPage().console.log("starting authorize..");
  
  // ... Ready to fetch private data ...
  chrome.extension.getBackgroundPage().console.log("done with authorize..");
  onAuthorized();
  
});
*/



//curl 'https://www.google.com/accounts/OAuthGetRequestToken?oauth_callback=chrome-extension%3A%2F%2Fkipgnenemmljdephanlghjlbdlecogka%2F_generated_background_page.html%3Fchromeexoauthcallback%3Dtrue&oauth_consumer_key=956653605342-rpb4s17gar3puaco892is1grme0uh6j0.apps.googleusercontent.com&oauth_nonce=zHY3X&oauth_signature=cL7W8CbfE9QNfh3MiMGwU7%2FZFUI%3D&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1413068354&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwwww.googleapis.com%2Fauth%2Fcalendar.readonly&xoauth_displayname=when2meet%20Autofill' -H 'accept-encoding: gzip,deflate,sdch' -H 'accept-language: en-US,en;q=0.8' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36' -H 'accept: */*' -H 'cookie: GAPS=1:oHT33aFewrNCJrheXJcnmmQqLp8SKA:5GGWc_l_zvJbDi9I; PREF=ID=de552bd5cedfdef5:U=3e673fa0c5492c26:FF=0:LD=en:TM=1406999309:LM=1406999400:GM=1:S=HOt31VhR72jsRQM4; T=AKUaPmaiSbXMA61NzGM6uG0Or-EQZ8AEdbfJRj3LJT54WUUZEohVIRj0X61J-DxR1xbWuS74bHmKT1_fxvkDz46lheVzZI7fmg; GoogleAccountsLocale_session=en; HSID=ATgscPF-E80r388BN; SSID=Aktll2vhbwYyyvfxT; APISID=vpT_mq9NPdN1cm_H/Aap31m_Dx--clzGSE; SAPISID=WLaT1P3ZUQiRJ2PZ/AGID2hHFDGJqkcuNT; NID=67=nMiWbihax1zz3r754suF2ocwMeNk2WwOPHCrPJjZkfIOmtfaOQBcg0Vn2y40lplLaKTrg5Q4mjiHJG4vU-icOMfDEiWnpojUkHAQbWMpdDB71y3ohQ29KYQNbWsuFSY8Eb9_3-NGnCHeqzkx2SqoCkpNIBwsN1mlofs9a3N9Oh528ROTF8ZWfuFs28lww9yMGytOjAi0snQh5Ia93u1aUV1R4dCUIi1ru7gV9-PvOA; S=billing-ui-v3=xg-tVPMWobDrjpp0pPmI1Q:billing-ui-v3-efe=xg-tVPMWobDrjpp0pPmI1Q; SID=DQAAAPQAAACh5ow_8gy1mcW2dMaYijM5C1edrDwIJuBVe_9-hD8my3WCW9YU-MyAn_Aadbw3oTG3DHU-YyawFhW_RM6K9GUoirnEMn75P3H5DZZOAAzGrDwD1W_FMGaI9_4-NfjtNt3vqQLDXHtug5FNJmq6Q1bF1T-sKjAltwMUwohTDO494FDn4ynOt3zxL7cN4PWh6WdnELFm6sF0Q0_LMrEAgvIAS61nxZGnW3ND9-YRRyR_yBU2dHCDS1DPo9KM1JttmKWwCxGEhosrpJTbMyZyH6byWOaKT1-FzfOmt13dInHB-NqQdRYPSCNu_gj1JHS9-uu0q0Qph_ARJX0GxCtukHjy' -H 'x-client-data: CI62yQEIpLbJAQiptskBCMG2yQEI7IjKAQjFlMoBCN6WygE=' --compressed






