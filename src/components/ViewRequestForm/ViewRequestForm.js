import React, { useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  TextInput,
} from 'carbon-components-react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { getCompany } from '../../actions/act_company';

import PurchaseTypeList from '../../components/PurchaseTypeList';
import ErrorPage from '../../components/ErrorPage';
import ViewContactContainer from '../../container/ViewContactContainer';
import ViewFileContainer from '../../container/ViewFileContainer';
import HistoryContainer from '../../container/HistoryContainer';
import Menu from '../../components/Menu';


const ViewRequestForm = ({ history, userRole }) => {

  const ifConnect = useSelector(state => state.request.ifConnect, shallowEqual);
  const data = useSelector(state => state.request.selected, shallowEqual);
  const ifRedirect = useSelector(state => state.request.ifRedirect, shallowEqual);

  const [message, setMessage] = useState(" ")

  // initial state
  const [contacts, setContacts] = useState([]);
  const [purchaseType, setPurchaseType] = useState(null)
  const [requestId, setRequestId] = useState(null)
  const [status, setStatus] = useState("NEW")
  const [schedule25, setSchedule25] = useState("")
  const [schedule30, setSchedule30] = useState("")
  const [scheduleMediobanca, setScheduleMediobanca] = useState("")
  const [scheduleSondrio, setScheduleSondrio] = useState("")
  const [scheduleU, setScheduleU] = useState("")
  const [address, setAddress] = useState(null)
  const [subcontractor, setSubcontractor] = useState(null)
  const [businesscontinuity, setBusinessContinuity] = useState(false)
  const [city, setCity] = useState(null)
  const [companyName, setCompanyName] = useState(null)
  const [country, setCountry] = useState("Please select")
  const [province, setProvice] = useState(null)
  const [supplierType, setSupplierType] = useState(null)
  const [vatnumber, setVATNumber] = useState(null)
  const [zipcode, setZipCode] = useState(null)
  const [files, setFiles] = useState(true)
  const [historyLog, setHistoryLog] = useState(null)

  const [ifPrimary, setIfPrimary] = useState(false);

  const dispatch = useDispatch();

  /* Use Effect BEGIN */

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  useEffect(() => {
    if (ifRedirect) {
      history.push("/" + userRole + "/requestactive");
    }
  }, [ifRedirect, history, userRole]);

  useEffect(() => {
    if (data) {
      setMessage(null)
      setPurchaseType(data.content.purchaseType)
      setRequestId(data.content.requestId)
      setStatus(data.content.status)
      if (data.content.schedule) {
        setSchedule25(data.content.schedule.schedule25)
        setSchedule30(data.content.schedule.schedule30)
        setScheduleMediobanca(data.content.schedule.scheduleMediobanca)
        setScheduleSondrio(data.content.schedule.scheduleSondrio)
        setScheduleU(data.content.schedule.scheduleU)
      }

      setSupplierType(data.content.vendor.supplierType)
      if (data.content.vendor.supplierType === "PRIMARY") {
        setIfPrimary(true)
        setCompanyName(data.content.vendor.subcontractor)
      }
      else {
        setIfPrimary(false)
        setCompanyName(data.content.vendor.primarySupplierCompanyName)
        setSubcontractor(data.content.vendor.subcontractor)
      }
      setVATNumber(data.content.vendor.vatNumber)
      setBusinessContinuity(data.content.vendor.businessContinuity)
      setAddress(data.content.vendor.address)
      setCity(data.content.vendor.city)
      setProvice(data.content.vendor.province)
      setZipCode(data.content.vendor.zipCode)
      setCountry(data.content.vendor.country)
      setContacts(data.content.contacts ? data.content.contacts : [])
      setHistoryLog(data.content.actionHistory)
    }
  }, [data]);


  /* Use Effect END */

  function displayForm(e) {
    setPurchaseType(e)
    switch (e) {
      case "Please select":
        setMessage(" ");
        break;
      case "hardware":
        setMessage("Please contact V-TServices Procurement to initiate the Vendor's assessment");
        break;
      case "software":
        setMessage("Please contact V-TServices Procurement to initiate the Vendor's assessment");
        break;
      default:
        setMessage(null);
    }
  }

  function purchaseTypeCellValue(e) {
    if (e === "V_TS_INTERNAL") {
      return "V-TS Internal";
    }
    else if (e === "CUSTOMER") {
      return "Customer";
    }
    else {
      return e;
    }
  }
  function supplierTypeCellValue(e) {
    if (e === "PRIMARY") {
      return "Primary";
    }
    else if (e === "SUBCONTRACTOR") {
      return "Subcontractor";
    }
    else {
      return e;
    }
  }

  /* Button Text and ACTION  END */

  return (
    ifConnect ? (
      <>
        <Menu userRole={userRole} />
        <br /><br /><br />
        <Breadcrumb noTrailingSlash aria-label="Page navigation">
          <BreadcrumbItem>
            <Link href={"../welcome"}>V-TServices Vendor Management Portal</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={"../requestactive"}>Search</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="landing-page__heading">View a Request</h1>
        <br /><hr /><br />
        {message ? (
          <>
            <PurchaseTypeList purchaseType={purchaseType} displayForm={displayForm} />
          </>
        ) : (<></>)}
        {message ? (<><br /><br /><h5>{message}</h5></>) : (
          <>

            <TextInput
              id="displaypuchasetype"
              readOnly
              labelText={<strong>Purchase Type:</strong>}
              value={purchaseTypeCellValue(purchaseType)}
            />
            <br />
            <TextInput
              id="displaystatus"
              readOnly
              labelText={<strong>Status:</strong>}
              value={status}
            />
            <br />

            <TextInput
              id="s25"
              readOnly
              labelText={<strong>Schedule 25:</strong>}
              value={schedule25 ? schedule25 : ""}
            />
            <br />

            <TextInput
              id="s30"
              readOnly
              labelText={<strong>Schedule 30:</strong>}
              value={schedule30 ? schedule30 : ""}
            />
            <br />
            <TextInput
              id="ssodrio"
              readOnly
              labelText={<strong>Schedule Sondrio:</strong>}
              value={scheduleSondrio ? scheduleSondrio : ""}
            />
            <br />
            <TextInput
              id="su"
              readOnly
              labelText={<strong>Schedule U:</strong>}
              value={scheduleU ? scheduleU : ""}
            />
            <br />
            <TextInput
              id="smedio"
              readOnly
              labelText={<strong>Schedule Mediobanca:</strong>}
              value={scheduleMediobanca ? scheduleMediobanca : ""}
            />
            <br />


            <TextInput
              id="displaysuppliertype"
              readOnly
              labelText={<strong>Supplier Type:</strong>}
              value={supplierTypeCellValue(supplierType)}
            />
            <br />
            {ifPrimary ? (
              <>
                <TextInput
                  id="displaycompany"
                  readOnly
                  labelText={<strong>Company name:</strong>}
                  value={companyName}
                />
                <br />
              </>

            ) : (<>
              <TextInput
                id="displaysuppliercompany"
                readOnly
                labelText={<strong>Primary supplier company name:</strong>}
                value={companyName}
              />
              <br />
              <TextInput
                id="displaysubcontractor"
                readOnly
                labelText={<strong>Subcontractor:</strong>}
                value={subcontractor}
              />
              <br />
            </>)}
            <TextInput
              id="displayvat"
              readOnly
              labelText={<strong>VAT Number:</strong>}
              value={vatnumber}
            />
            <br />
            <TextInput
              id="displaybusinesscontinuity"
              readOnly
              labelText={<strong>Business Continuity:</strong>}
              value={businesscontinuity ? businesscontinuity : "NO"}
            />
            <br />
            <TextInput
              id="displayaddress"
              readOnly
              labelText={<strong>Address:</strong>}
              value={address}
            />
            <br />
            <TextInput
              id="displaycity"
              readOnly
              labelText={<strong>City:</strong>}
              value={city}
            />
            <br />
            <TextInput
              id="displayprovince"
              readOnly
              labelText={<strong>Province:</strong>}
              value={province}
            />
            <br />
            <TextInput
              id="displayzip"
              readOnly
              labelText={<strong>ZIP-code:</strong>}
              value={zipcode}
            />
            <br />
            <TextInput
              id="displaycountry"
              readOnly
              labelText={<strong>Country:</strong>}
              value={country}
            />
            <br />
            <ViewContactContainer contacts={contacts} />
            <br />
            <ViewFileContainer requestId={requestId} setFiles={setFiles} />
            <br />
            <HistoryContainer historyLog={historyLog} />
          </>

        )
        }
      </>
    ) : (
        <ErrorPage />
      )
  )
};
export default ViewRequestForm;