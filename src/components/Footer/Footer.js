import React from 'react';
import Footer from '../IBM/Footer';
// import MiniFooter from '../IBM/MiniFooter';



const CustomFooter=() => {
    return (
        <Footer links={links} />
        /*
<MiniFooter links={links} />
*/
    )
}
const links={
    firstCol: [
        {
            "title": "Marketplace",
            "url": "https://www.ibm.com/products?lnk=fdi"
        },
        {
            "title": "Redbooks",
            "url": "https://www.redbooks.ibm.com/?lnk=fdi"
        },
        {
            "title": "Services",
            "url": "https://www.ibm.com/services?lnk=fdi"
        },
        {
            "title": "Industries",
            "url": "https://www.ibm.com/industries?lnk=fdi"
        },
        {
            "title": "IBM Research",
            "url": "https://research.ibm.com/?lnk=fdi"
        },
        {
            "title": "Case studies",
            "url": "https://www.ibm.com/case-studies?lnk=fdi"
        },
        {
            "title": "Demos",
            "url": "https://www.ibm.com/demos/?lnk=fdi"
        },
        {
            "title": "Financing",
            "url": "https://www.ibm.com/financing?ref=ibmfooter&lnk=fdi"
        }
    ],
    secondCol: [
        {
            "title": "Developers",
            "url": "https://www.ibm.com/developerworks/?lnk=fif"
        },
        {
            "title": "Business Partners",
            "url": "https://www-356.ibm.com/partnerworld/wps/servlet/ContentHandler/partnerworld-home?lnk=fif"
        },
        {
            "title": "Federal and state contracts",
            "url": "https://www.ibm.com/industries/sled-contracts?lnk=fif"
        }
    ],
    thirdCol: [
        {
            "title": "Developers",
            "url": "https://www.ibm.com/developerworks/?lnk=fif"
        },
        {
            "title": "Business Partners",
            "url": "https://www-356.ibm.com/partnerworld/wps/servlet/ContentHandler/partnerworld-home?lnk=fif"
        },
        {
            "title": "Federal and state contracts",
            "url": "https://www.ibm.com/industries/sled-contracts?lnk=fif"
        }
    ],
    forthCol: [
        {
            "title": "Careers",
            "url": "https://www.ibm.com/employment/?lnk=fab"
        },
        {
            "title": "Events",
            "url": "https://www.ibm.com/events?lnk=fab"
        },
        {
            "title": "Latest news",
            "url": "https://newsroom.ibm.com/?lnk=fab"
        },
        {
            "title": "Investor relations",
            "url": "https://www.ibm.com/investor/?lnk=fab"
        },
        {
            "title": "Diversity and inclusion",
            "url": "https://www.ibm.com/employment/us/diverse/?lnk=fab"
        },
        {
            "title": "Corporate responsibility",
            "url": "https://www.ibm.org/?lnk=fab"
        },
        {
            "title": "About IBM",
            "url": "https://www.ibm.com/ibm/us/en/?lnk=fab"
        }
    ],
    fifthCol: [
        {
            "linkClass": "ibm-twitter-encircled-link",
            "title": "Twitter",
            "url": "https://www.twitter.com/ibm"
        },
        {
            "linkClass": "ibm-linkedin-encircled-link",
            "title": "LinkedIn",
            "url": "https://www.linkedin.com/company/ibm"
        },
        {
            "linkClass": "ibm-facebook-encircled-link",
            "title": "Facebook",
            "url": "https://www.facebook.com/ibm"
        },
        {
            "linkClass": "ibm-youtube-encircled-link",
            "title": "YouTube",
            "url": "https://www.youtube.com/ibm"
        }
    ],
    miniFooter: [
        {
            "title": "Contact IBM",
            "url": "https://www.ibm.com/contact/us/en/?lnk=flg-cont-usen&_ga=2.265762895.1132876092.1575954173-1381957854.1575954173"
        },
        {
            "title": "Privacy",
            "url": "https://www.ibm.com/privacy/us/en/?lnk=flg-priv-usen&_ga=2.265762895.1132876092.1575954173-1381957854.1575954173"
        },
        {
            "title": "Terms of use",
            "url": "https://www.ibm.com/us-en/legal?lnk=flg-tous-usen&_ga=2.265762895.1132876092.1575954173-1381957854.1575954173"
        },
        {
            "title": "Accessibility",
            "url": "https://www.ibm.com/accessibility/us/en/?lnk=flg-acce-usen&_ga=2.266810574.1132876092.1575954173-1381957854.1575954173"
        }
    ],

};

export default CustomFooter;
