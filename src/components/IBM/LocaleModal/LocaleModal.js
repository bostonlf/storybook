import React, {useState} from 'react';
import {ComposedModal, ModalHeader, ModalBody, Search} from 'carbon-components-react';

import {CardLink} from '@carbon/ibmdotcom-react';
import {ArrowRight20} from '@carbon/icons-react';
import usen from "./usen-utf8.json"

const LocaleModal=({ifOpen, close}) => {


  const [ifDetailOpen, setIfDetailOpen]=useState(false);
  const [selectedRegion, setSelectedRegion]=useState(false);
  const [countryList, setCountryList]=useState([]);
  const [searchList, setSearchList]=useState([]);

  function openSearch(e) {
    setSelectedRegion(e)
    setIfDetailOpen(true)
    for (var i=0; i<usen.regionList.length; i++) {
      if (usen.regionList[i].name===e) {
        setCountryList(usen.regionList[i].countryList)
        setSearchList(usen.regionList[i].countryList)
      }
    }

  }

  function searchRegion(e) {
    let arr=[];
    for (var i=0; i<countryList.length; i++) {
      if (JSON.stringify(countryList[i]).toLowerCase().indexOf(e.toLowerCase())!==-1) {
        arr.push(countryList[i])
      }
  }
  setSearchList(arr)
}

  return (
    <>
     <ComposedModal
  open={ifOpen}
>
        {ifDetailOpen? (
          <>
            <ModalHeader
              label={<BackLogo setIfDetailOpen={setIfDetailOpen} />}
              title={selectedRegion}
              titleClassName="bx--type-beta"
              closeModal={(e)=>{close()}}
            >
            </ModalHeader>
            <ModalBody
              className="bx--locale-modal bx--locale-modal__filtering"
            >
              <div className="bx--locale-modal__filter">
                <div className="bx--locale-modal__search">
                  <Search
                    id="search-1"
                    labelText="Search"
                    onChange={(e)=>{searchRegion(e.target.value)}}
                    placeHolderText="Search by location or language"
                    size="xl"
                  />
                  {searchList.length>0?(
                  <p className="bx--locale-modal__search-text">This page is available in the following locations and languages</p>
                  ):(
                  <p className="bx--locale-modal__search-text">This page is unavailable in your preferred location or language</p>
                  )}
                </div>
                <div className="bx--locale-modal__list">

                  {searchList? (
                    searchList.map((searchList, i) => (
                      searchList.locale.length>1? (
                        searchList.locale.map((locale, j) => (
                          <a key={j} className="bx--locale-modal__locales" href={"https://www.ibm.com/"+searchList.locale[j][0]}>
                            <div className="bx--locale-modal__locales__name">{searchList.name}</div>
                            <div className="bx--locale-modal__locales__name">{searchList.locale[j][1]}</div>
                          </a>
                        ))):
                        (
                          <a key={i} className="bx--locale-modal__locales" href={"https://www.ibm.com/"+searchList.locale[0][0]}>
                            <div className="bx--locale-modal__locales__name">{searchList.name}</div>
                            <div className="bx--locale-modal__locales__name">{searchList.locale[0][1]}</div>
                          </a>
                        )
                    ))):(<></>)}
                </div>
              </div>

            </ModalBody>
          </>
        ):(
            <>
              <ModalHeader
                label={<TopLogo />}
                title="Select region"
                titleClassName="bx--type-beta"
                closeModal={(e)=>{close()}}
              >
              </ModalHeader>
              <ModalBody
                className="bx--locale-modal"
              >

                <div className="bx--grid bx--no-gutter bx--locale-modal__regions">
                  <div className="bx--row">
                    <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
                      <div onClick={() => {openSearch("Americas")}}>
                        <CardLink title="Americas" href="#" icon={<ArrowRight20 />} />
                      </div>
                    </div>
                    <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
                      <div onClick={() => {openSearch("Asia Pacific")}}>
                        <CardLink title="Asia Pacific" href="#" icon={<ArrowRight20 />} />
                      </div>
                    </div>
                  </div>
                  <div className="bx--row">
                    <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
                      <div onClick={() => {openSearch("Europe")}}>
                        <CardLink title="Europe" href="#" icon={<ArrowRight20 />} />
                      </div>
                    </div>
                    <div className="bx--col-sm-2 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
                      <div onClick={() => {openSearch("Middle East and Africa")}}>
                        <CardLink title="Middle East and Africa" href="#" icon={<ArrowRight20 />} />
                      </div>
                    </div>
                  </div>
                </div>

              </ModalBody>
            </>)}
      </ComposedModal>
      <ComposedModal
      >
      </ComposedModal>
    </>
  );
};


const TopLogo=() => (
  <>United States — English
    <svg
      focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" className="bx--locale-modal__label-globe"
    >
      <path d="M14 4a7 7 0 1 1-7 7 7 7 0 0 1 7-7m0-2a9 9 0 1 0 9 9 9 9 0 0 0-9-9z"></path><path d="M28 11a13.92 13.92 0 0 0-4.11-9.89l-1.41 1.41a12 12 0 0 1-16.92 17l-1.45 1.37A13.92 13.92 0 0 0 14 25v3h-4v2h10v-2h-4v-3.16A14 14 0 0 0 28 11z"></path>
    </svg>
  </>
);

const BackLogo=({setIfDetailOpen}) => (
  <>
    <span onClick={() => {setIfDetailOpen(false)}}>
      <svg
        focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true" className="bx--locale-modal__label-arrow"
      >
        <path d="M13 26l1.41-1.41L6.83 17H29v-2H6.83l7.58-7.59L13 6 3 16l10 10z"></path>
      </svg>
      Select region
    </span>
  </>
);

export default LocaleModal;
