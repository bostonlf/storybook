import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Row, Grid, Column} from '../Grid';
import {ComposedModal, ModalHeader,ModalBody,Search, Button} from 'carbon-components-react';
import {Globe16, Globe20} from '@carbon/icons-react'
import LocaleContainer from '../../../container/LocaleContainer';


const Footer=({links, Logo}) => {
  const {firstCol, secondCol, thirdCol, forthCol, fifthCol, miniFooter}=links;

  const [ifOpen, setIfOpen]=useState(false);


  function open() {
    setIfOpen(true);
  }
  function close() {
    setIfOpen(false);
  }

  function headerLabel() {
    return (
      <>
       United States — English <label>    </label>
      <Globe16 />
      </>
    )
  }

  return (

    <footer className="bx--footer">

<ComposedModal
  open={ifOpen}
  onClose={close}
>
<ModalHeader
    label={headerLabel()}
    labelClassName="bx-footer-headingtop"
    title="Select region"
    titleClassName="bx-footer-heading"
  >
     <Search
  defaultValue=""
  id="search-1"
  labelText="Search"
  name=""
  onChange={function noRefCheck(){}}
  placeHolderText="Search by location or language"
  type="text"
/>
</ModalHeader>
  <ModalBody
  className="bx--locale-modal__filter"
  >
<LocaleContainer />
  </ModalBody>
  </ComposedModal>
  <ComposedModal
>
  </ComposedModal>
      <Grid className="grid">
        <Row>
          <Column colLg={3}>
            <Logo />
          </Column>
          <Column colLg={3}>
            <ul className="nav">
              <h5 className="listTitle">Discover</h5>
              {firstCol&&
                firstCol.map((link, i) => (
                  <li key={i} className="listItem">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.title}>
                      {link.title}
                    </a>
                  </li>
                ))}
            </ul>
            <ul className="nav">
              <h5 className="listTitle">Information for...</h5>
              {secondCol&&
                secondCol.map((link, i) => (
                  <li key={i} className="listItem">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.title}>
                      {link.title}
                    </a>
                  </li>
                ))}
            </ul>
          </Column>
          <Column colLg={3}>
            <ul className="nav">
              <h5 className="listTitle">Connect with us</h5>
              {thirdCol&&
                thirdCol.map((link, i) => (
                  <li key={i} className="listItem">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.title}>
                      {link.title}
                    </a>
                  </li>
                ))}
            </ul>
            <ul className="nav">
              <h5 className="listTitle">About IBM</h5>
              {forthCol&&
                forthCol.map((link, i) => (
                  <li key={i} className="listItem">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.title}>
                      {link.title}
                    </a>
                  </li>
                ))}
            </ul>
          </Column>
          <Column colLg={3}>
            <ul className="nav">
              <h5 className="listTitle">Follow IBM</h5>
              {fifthCol&&
                fifthCol.map((link, i) => (
                  <li key={i} className="listItem">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.title}>
                      {link.title}
                    </a>
                  </li>
                ))}
            </ul>
          </Column>
        </Row>
        <Row>
          <Column colLg={3}>
            <Button
              kind="secondary"
              renderIcon={Globe20}
              onClick={open}
            >
              United States — English
              </Button>
          </Column>
          <Column colLg={9}>
          </Column>
        </Row>
        <br />
        <Row>
          <Column colLg={3}>
            <nav className="legal-nav"></nav>
          </Column>
          <Column colLg={9}>
            <nav className="legal-nav">
              <ul className="legal-nav-list">
                {miniFooter&&
                  miniFooter.map((link, i) => (
                    <li key={i} className="legal-nav-list-item">
                      <a href={link.url} className="bx--link" aria-label={link.title}>
                        {link.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </nav>
          </Column>
        </Row>
      </Grid>
    </footer>
  );
};

const IBMLogo=() => (
  <svg
    className="bx--footer-logo__link"
    width="81"
    height="32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fillRule="evenodd">
      <path d="M0 32h15.689v-2.038H0zM0 27.721h15.689v-2.038H0zM4.483 23.442h6.724v-2.037H4.483zM4.483 19.164h6.724v-2.038H4.483zM4.483 14.885h6.724v-2.037H4.483zM4.482 10.606h6.724V8.568H4.482zM0 6.327h15.689V4.29H0zM0 2.049h15.689V.011H0zM17.93 29.963V32h16.504a8.521 8.521 0 0 0 5.54-2.037H17.93zM17.93 25.683v2.038h23.914a8.535 8.535 0 0 0 .85-2.038H17.93zM22.412 23.442h6.724v-2.037h-6.724zM40.124 17.126H22.412v2.038H41.77a8.62 8.62 0 0 0-1.645-2.038M22.413 12.848v2.036h17.786a8.612 8.612 0 0 0 1.644-2.037h-19.43zM42.693 6.327a8.447 8.447 0 0 0-.85-2.037H17.93v2.037h24.763zM39.974 2.049a8.521 8.521 0 0 0-5.54-2.037H17.93v2.037h22.044zM22.412 10.606h6.724V8.568h-6.724zM35.453 10.606h7.29a8.603 8.603 0 0 0 .248-2.038h-7.538v2.038zM35.453 21.405v2.037h7.538c0-.703-.09-1.384-.248-2.037h-7.29zM57.457 0H44.825v2.038h13.34zM44.826 32h11.21v-2.038h-11.21zM44.826 27.72h11.21v-2.038h-11.21zM49.309 23.439h6.727v-2.038h-6.727zM49.309 19.159h6.727v-2.038h-6.727zM69.488 32h11.21v-2.038h-11.21zM69.488 27.72h11.21v-2.038h-11.21zM69.488 23.439h6.726v-2.038h-6.726zM69.487 19.159h6.726v-2.038h-6.726zM69.488 14.879h6.726V12.84H63.606l-.707 2.038h5.903l.686-1.94zM61.916 12.84H49.31v2.039h6.726v-1.94l.686 1.94h5.903zM76.213 8.56H65.091l-.707 2.038h11.83zM68.06 0l-.706 2.038h13.344V0zM62.757 32l.72-2.038h-1.432zM61.254 27.72h3.015l.72-2.038h-4.455zM59.743 23.44h6.037l.72-2.039h-7.476zM58.232 19.159h9.06l.719-2.038h-10.5zM49.309 10.598h11.83l-.707-2.038H49.309zM65.868 6.318h14.83V4.28H66.576zM58.947 4.28H44.826v2.038h14.828z" />
    </g>
  </svg>
);


Footer.defaultProps={
  links: {
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
  },
  // Content: DefaultContent,
  Logo: IBMLogo,
};

Footer.propTypes={
  /**
   * Specify the first and second columns of your links
   */
  links: PropTypes.exact({
    firstCol: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    secondCol: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    thirdCol: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    forthCol: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    fifthCol: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    miniFooter: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  }),
};

export default Footer;
