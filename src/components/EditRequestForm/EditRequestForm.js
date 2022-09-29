import React, {useEffect, useState} from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  TextInput,
  Select,
  SelectItem,
  Toggle,
  FileUploaderButton,
  TextArea,
  Loading,
  Button
} from 'carbon-components-react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {newRequest, updateRequest, duplicateRequest} from '../../actions/act_request';
import {addFile} from '../../actions/act_file';
import {getCompany} from '../../actions/act_company';

import PurchaseTypeList from '../../components/PurchaseTypeList';
import ScheduleList from '../../components/ScheduleList';
import SupplierTypeList from '../../components/SupplierTypeList';
import CountryList from '../../components/CountryList';
import ErrorPage from '../../components/ErrorPage';
import ContactContainer from '../../container/ContactContainer';
import ViewContactContainer from '../../container/ViewContactContainer';
import FileContainer from '../../container/FileContainer';
import ViewFileContainer from '../../container/ViewFileContainer';
import HistoryContainer from '../../container/HistoryContainer';
import Menu from '../../components/Menu';


const EditRequestForm=({history, userRole}) => {

  const ifConnect=useSelector(state => state.request.ifConnect, shallowEqual);
  const data=useSelector(state => state.request.selected, shallowEqual);
  const ifRedirect=useSelector(state => state.request.ifRedirect, shallowEqual);
  const companyList=useSelector(state => state.company.payload, shallowEqual);

  const [message, setMessage]=useState(" ")
  const noCompany="No Valid Company";

  // initial state
  const [contacts, setContacts]=useState([]);
  const [purchaseType, setPurchaseType]=useState(null)
  const [requestId, setRequestId]=useState(null)
  const [status, setStatus]=useState("NEW")
  const [schedule25, setSchedule25]=useState("")
  const [schedule30, setSchedule30]=useState("")
  const [scheduleMediobanca, setScheduleMediobanca]=useState("")
  const [scheduleSondrio, setScheduleSondrio]=useState("")
  const [scheduleU, setScheduleU]=useState("")
  const [address, setAddress]=useState(null)
  const [subcontractor, setSubcontractor]=useState(null)
  const [businesscontinuity, setBusinessContinuity]=useState(false)
  const [city, setCity]=useState(null)
  const [companyName, setCompanyName]=useState(null)
  const [primarySupplierId, setPrimarySupplierId]=useState(null)
  const [country, setCountry]=useState("Please select")
  const [province, setProvice]=useState(null)
  const [supplierType, setSupplierType]=useState(null)
  const [vatnumber, setVATNumber]=useState(null)
  const [zipcode, setZipCode]=useState(null)
  const [comment, setComment]=useState(null)
  const [file, setFile]=useState(null)
  const [files, setFiles]=useState(true)
  const [uploadLabelText, setUploadLabelText]=useState(null)
  const [uploadButtonDisplay, setUploadButtonDisplay]=useState(false)
  const [historyLog, setHistoryLog]=useState(null)

  const [ifInvalidVAT, setIfInvalidVAT]=useState(false)
  const [ifInvalidCompany, setIfInvalidCompany]=useState(false)
  const [ifInvalidSubcontractor, setIfInvalidSubcontractor]=useState(false)
  const [ifInvalidAddress, setIfInvalidAddress]=useState(false)
  const [ifInvalidCity, setIfInvalidCity]=useState(false)
  const [ifInvalidProvince, setIfInvalidProvince]=useState(false)
  const [ifInvalidZip, setIfInvalidZip]=useState(false)
  const [ifInvalidContact, setIfInvalidContact]=useState(false)
  const [ifPrimary, setIfPrimary]=useState(false);
  const [ifLoading, setIfLoading]=useState(false);
  const [ifDisplaySchedule, setIfDisplaySchedule]=useState(false);
  const [ifInvalidCountry, setIfInvalidCountry]=useState(false);

  const dispatch=useDispatch();

  /* Use Effect BEGIN */

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  useEffect(() => {
    if (ifRedirect) {
      history.push("/"+userRole+"/request");
    }
  }, [ifRedirect, history, userRole]);

  useEffect(() => {
    if (companyList&&companyList.length>0) {
      setPrimarySupplierId(companyList[0].key)
    }
  }, [companyList]);

  useEffect(() => {
    if (contacts.length!==0) {
      setIfInvalidContact(false)
    }
    else {
      setIfInvalidContact(true)
    }
  }, [contacts]);


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

      setIfDisplaySchedule(true);

      if(data.content.status==="New" || data.content.status==="Returned"){
        setIfDisplaySchedule(false)
      }else if(data.content.status==="Returned"){
        if(userRole==="Requestor"){
          setIfDisplaySchedule(false)
        }
      }

      setSupplierType(data.content.vendor.supplierType)
      if (data.content.vendor.supplierType==="PRIMARY") {
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
      setContacts(data.content.contacts? data.content.contacts:[])
      setHistoryLog(data.content.actionHistory)
    }
  }, [data]);

  useEffect(() => {
    if (file) {
      setUploadButtonDisplay(true)
    }
    else {
      setUploadButtonDisplay(false)
    }
  }, [file]);

  
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

  function onChangeCheck(e, setValue, setValid) {
    setValue(e)
    if (e) {
      setValid(false)
    }
    else {
      setValid(true)
    }
  }

  function changeSupplierType(e) {
    setSupplierType(e)
    if (e==="PRIMARY") {
      setIfPrimary(true)
    }
    else {
      setIfPrimary(false);
    }
  }

  function changeCountry(e) {
    setCountry(e)
    if (e==="Please select") {
      setIfInvalidCountry(true)
    }
    else {
      setIfInvalidCountry(false)
    }
  }

  function validateField() {
    if ((supplierType==="SUBCONTRACTOR"&&companyList.length===0)||(supplierType==="PRIMARY"&&companyName===null)||(supplierType==="PRIMARY"&&companyName==="")||(supplierType==="SUBCONTRACTOR"&&subcontractor===null)||(supplierType==="SUBCONTRACTOR"&&subcontractor==="")||country==="Please select"||vatnumber===null||vatnumber===""||address===null||address===""||city===null||city===""||province===null||province===""||zipcode===null||zipcode===""||contacts.length===0||files===false) {
      (supplierType==="PRIMARY"&&(companyName===null||companyName===""))? setIfInvalidCompany(true):setIfInvalidCompany(false);
      (supplierType==="SUBCONTRACTOR"&&(subcontractor===null||subcontractor===""))? setIfInvalidSubcontractor(true):setIfInvalidSubcontractor(false);
      country==="Please select"? setIfInvalidCountry(true):setIfInvalidCountry(false);
      (vatnumber&&vatnumber!=="")? setIfInvalidVAT(false):setIfInvalidVAT(true);
      (address&&address!=="")? setIfInvalidAddress(false):setIfInvalidAddress(true);
      (city&&city!=="")? setIfInvalidCity(false):setIfInvalidCity(true);
      (province&&province!=="")? setIfInvalidProvince(false):setIfInvalidProvince(true);
      (zipcode&&zipcode!=="")? setIfInvalidZip(false):setIfInvalidZip(true);
      contacts.length===0? setIfInvalidContact(true):setIfInvalidContact(false);
      return false;
    }
    else {
      return true;
    }
  }



  function editRequest(ops) {
    if (ops==="SAVE") {
      saveRequest()
    }
    else if  (ops==="DUPLICATE") {
      copyRequest()
    } 
    else {
      submitRequest(ops)
    }
  }

  function saveRequest() {
    var primaryCompanyName="";
    if (ifPrimary) {
      primaryCompanyName=companyName;
    }
    else {
      primaryCompanyName=subcontractor;
    }
    let params={
      contacts: JSON.parse(JSON.stringify(contacts).replace(/contactTypeKey/g, "contactType")),
      purchaseType: purchaseType,
      requestId: requestId,
      "schedule": {
        schedule25: schedule25? schedule25:"",
        schedule30: schedule30? schedule30:"",
        scheduleMediobanca: scheduleMediobanca? scheduleMediobanca:"",
        scheduleSondrio: scheduleSondrio? scheduleSondrio:"",
        scheduleU: scheduleU? scheduleU:"",
      },
      "vendor": {
        address: address? address:"",
        businessContinuity: businesscontinuity,
        city: city? city:"",
        companyName: primaryCompanyName? primaryCompanyName:"",
        country: country? country:"",
        primarySupplierId: primarySupplierId? primarySupplierId:"",
        province: province? province:"",
        supplierType: supplierType? supplierType:"",
        vatNumber: vatnumber? vatnumber:"",
        zipCode: zipcode? zipcode:"",
      }
    };
    setIfLoading(true)
    dispatch(newRequest(params));
  }

  function submitRequest(ops) {
    var primaryCompanyName="";
    if (ifPrimary) {
      primaryCompanyName=companyName;
    }
    else {
      primaryCompanyName=subcontractor;
    }
    let params={
      "forwardCommand": {
        comment: comment? comment:"",
        operation: ops,
      },
      "saveCommand": {
        contacts: JSON.parse(JSON.stringify(contacts).replace(/contactTypeKey/g, "contactType")),
        purchaseType: purchaseType,
        requestId: requestId,
        "schedule": {
          schedule25: schedule25? schedule25:"",
          schedule30: schedule30? schedule30:"",
          scheduleMediobanca: scheduleMediobanca? scheduleMediobanca:"",
          scheduleSondrio: scheduleSondrio? scheduleSondrio:"",
          scheduleU: scheduleU? scheduleU:"",
        },
        "vendor": {
          address: address? address:"",
          businessContinuity: businesscontinuity,
          city: city? city:"",
          companyName: primaryCompanyName? primaryCompanyName:"",
          country: country? country:"",
          primarySupplierId: primarySupplierId? primarySupplierId:"",
          province: province? province:"",
          supplierType: supplierType? supplierType:"",
          vatNumber: vatnumber? vatnumber:"",
          zipCode: zipcode? zipcode:"",
        }
      }
    }
    setIfLoading(true)
    dispatch(updateRequest(params));
  }

  function copyRequest() {
    setIfLoading(true)
    dispatch(duplicateRequest(requestId));

  }

  function uploadFile() {
    setUploadLabelText(null)
    dispatch(addFile(requestId, file));
    setFile(null)
  }




  /* Button Text and ACTION  BEGIN */

  function primaryButtonText() {
    if (data) {
      switch (data.content.status) {
        case "New":
          return "Save";
        case "Submitted to SM":
          return "Return";
        case "Approved by exception":
          return "Disable";
        case "Approved by customer":
          return "Disable";
        case "Returned":
          return "Submit";
        case "Approved by exception inactive":
          return "Reactivate";
        case "Approved by customer inactive":
          return "Reactivate";
        default:
          return "Save";
      }
    }
    else {
      return "Save";
    }
  }

  function saveButtonAction() {
    if (validateField()) {
      saveRequest();
    }
  }

  function primaryButtonAction() {
    if (validateField()) {
      editRequest(primaryButtonOperation())
    }
  }

  function primaryButtonOperation() {
    if (data) {
      switch (data.content.status) {
        case "New":
          return "SAVE";
        case "Submitted to SM":
          return "RETURN";
        case "Approved by exception":
          return "DISABLE";
        case "Approved by customer":
          return "DISABLE";
        case "Returned":
          return "CREATE_REQUEST";
        case "Approved by exception inactive":
          return "ENABLE";
        case "Approved by customer inactive":
          return "ENABLE";
        default:
          return "CREATE_REQUEST";
      }
    }
    else {
      return "CREATE_REQUEST"
    }
  }


  function secondaryButtonText() {
    if (data) {
      switch (data.content.status) {
        case "New":
          return "Submit";
        case "Submitted to SM":
          return "Reject";
        case "Approved by exception":
          return "Approved by customer";
        case "Approved by customer":
          return "Duplicate";
        default:
          return "Save";
      }
    }
    else {
      return "Submit";
    }
  }
  function secondaryButtonAction() {
    if (validateField()) {
      editRequest(secondaryButtonOperation())
    }
  }


  function secondaryButtonOperation() {
    if (data) {
      switch (data.content.status) {
        case "New":
          return "CREATE_REQUEST";
        case "Submitted to SM":
          return "REJECT";
        case "Approved by exception":
          return "APPROVE_BY_CUSTOMER";
          case "Approved by customer":
          return "DUPLICATE";
        default:
          return "CREATE_REQUEST";
      }
    }
    else {
      return "CREATE_REQUEST"
    }
  }

  function thirdButtonAction() {
    if (validateField()) {
      if (status==="Submitted to SM") {
      editRequest("APPROVE_BY_EXCEPTION")
      }
      else {
        editRequest("DUPLICATE")
      }
    }
  }

  function forthButtonAction() {
    if (validateField()) {
      editRequest("APPROVE_BY_CUSTOMER")
    }
  }

  function purchaseTypeCellValue(e) {
    if (e==="V_TS_INTERNAL") {
      return "V-TS Internal";
    }
    else if (e==="CUSTOMER") {
      return "Customer";
    }
    else {
      return e;
    }
  }
  function supplierTypeCellValue(e) {
    if (e==="PRIMARY") {
      return "Primary";
    }
    else if (e==="SUBCONTRACTOR") {
      return "Subcontractor";
    }
    else {
      return e;
    }
  }

  /* Button Text and ACTION  END */

  return (
    ifConnect? (
      <>
        <Menu userRole={userRole} />
        <br /><br /><br />
        <Breadcrumb noTrailingSlash aria-label="Page navigation">
          <BreadcrumbItem>
            <Link href={"../welcome"}>V-TServices Vendor Management Portal</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={"../request"}>Request</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="landing-page__heading">Create/Edit a Request</h1>
        <br /><hr /><br />
        {message? (
          <>
            <PurchaseTypeList purchaseType={purchaseType} displayForm={displayForm} />
          </>
        ):(<></>)}
        {message? (<><br /><br /><h5>{message}</h5></>):(

          (userRole==="Requestor"&&status!=="New"&&status!=="Returned")||status==="Rejected"? (
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
                value={schedule25?schedule25:""}
              />
              <br />
              
              <TextInput
                id="s30"
                readOnly
                labelText={<strong>Schedule 30:</strong>}
                value={schedule30?schedule30:""}
              />
              <br />
              <TextInput
                id="ssodrio"
                readOnly
                labelText={<strong>Schedule Sondrio:</strong>}
                value={scheduleSondrio?scheduleSondrio:""}
              />
              <br />
              <TextInput
                id="su"
                readOnly
                labelText={<strong>Schedule U:</strong>}
                value={scheduleU?scheduleU:""}
              />
              <br />
              <TextInput
                id="smedio"
                readOnly
                labelText={<strong>Schedule Mediobanca:</strong>}
                value={scheduleMediobanca?scheduleMediobanca:""}
              />
              <br />


              <TextInput
                id="displaysuppliertype"
                readOnly
                labelText={<strong>Supplier Type:</strong>}
                value={supplierTypeCellValue(supplierType)}
              />
              <br />
              {ifPrimary?(
                <>
                <TextInput
                id="displaycompany"
                readOnly
                labelText={<strong>Company name:</strong>}
                value={companyName}
              />
              <br />
              </>

              ):(<>
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
                value={businesscontinuity?businesscontinuity:"NO"}
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
              <ViewContactContainer contacts={contacts}/>
              <br />
              <ViewFileContainer requestId={requestId} setFiles={setFiles} />
              <br />
              <HistoryContainer historyLog={historyLog} />
            </>
          ):(

              <>
                <PurchaseTypeList purchaseType={purchaseType} displayForm={displayForm} />
                <br />
                <TextInput
                  id="status"
                  labelText={<strong>Status:</strong>}
                  value={status}
                />
                <br />
                {ifDisplaySchedule? (
                  <> <ScheduleList scheduleid="schedule25" schedulelabel="Schedule 25" schedule={schedule25} setSchedule={setSchedule25} />
                    <br />
                    <ScheduleList scheduleid="schedule30" schedulelabel="Schedule 30" schedule={schedule30} setSchedule={setSchedule30} />
                    <br />
                    <ScheduleList scheduleid="schedulesondrio" schedulelabel="Schedule Sondrio" schedule={scheduleSondrio} setSchedule={setScheduleSondrio} />
                    <br />
                    <ScheduleList scheduleid="scheduleu" schedulelabel="Schedule U" schedule={scheduleU} setSchedule={setScheduleU} />
                    <br />
                    <ScheduleList scheduleid="schedulemediobanca" schedulelabel="Schedule Mediobanca" schedule={scheduleMediobanca} setSchedule={setScheduleMediobanca} />
                    <br />
                  </>
                ):(<></>)}
                <SupplierTypeList supplierType={supplierType} changeSupplierType={changeSupplierType} />
                <br />
                <TextInput
                  id="companyName"
                  labelText={<strong>Company name:<span className="required-css-class">*</span></strong>}
                  onChange={(e) => {onChangeCheck(e.target.value, setCompanyName, setIfInvalidCompany)}}
                  invalid={ifInvalidCompany}
                  invalidText="A valid value is required"
                  defaultValue={companyName}
                  hideLabel={!ifPrimary}
                  type={ifPrimary? "text":"hidden"}
                />
                <br />
                {!ifPrimary? (
                  companyList&&companyList.length!==0? (
                    <>
                      <Select
                        type="hidden"
                        id="companyList"
                        onChange={(e) => {setPrimarySupplierId(e.target.value)}}
                        labelText={<strong>Primary supplier company name:<span className="required-css-class">*</span></strong>}>
                        {companyList.map(company => (
                          <SelectItem text={company.value} key={company.key} value={company.key} />
                        ))}
                      </Select>
                      <br />
                      <TextInput
                        id="subcontractor"
                        invalid={ifInvalidSubcontractor}
                        invalidText="A valid value is required"
                        labelText={<strong>Subcontractor:<span className="required-css-class">*</span></strong>}
                        onChange={(e) => {setSubcontractor(e.target.value)}}
                        defaultValue={subcontractor}
                        hideLabel={companyList&&companyList.length!==0? false:true}
                        type={companyList&&companyList.length!==0? "text":"hidden"} />
                      <br />
                    </>
                  ):(<><label><span className="required-css-class">{noCompany}</span></label><br /><br /></>)):(<></>)}
                <TextInput
                  id="vatnumber"
                  invalid={ifInvalidVAT}
                  invalidText="A valid value is required"
                  labelText={<strong>VAT Number:<span className="required-css-class">*</span></strong>}
                  onChange={(e) => {onChangeCheck(e.target.value, setVATNumber, setIfInvalidVAT)}}
                  defaultValue={vatnumber} />
                <br />
                <label className="bx--label"><strong>Business Continuity:<span className="required-css-class">*</span></strong></label>
                <Toggle
                  id="businesscontinuity"
                  labelA="NO"
                  labelB="YES"
                  onToggle={(toggle) => {setBusinessContinuity(toggle)}}
                  defaultToggled={businesscontinuity} />
                <br />
                <TextInput
                  id="address"
                  invalid={ifInvalidAddress}
                  invalidText="A valid value is required"
                  labelText={<strong>Address:<span className="required-css-class">*</span></strong>}
                  onChange={(e) => {onChangeCheck(e.target.value, setAddress, setIfInvalidAddress)}}
                  defaultValue={address} />
                <br />
                <TextInput
                  id="city"
                  invalid={ifInvalidCity}
                  invalidText="A valid value is required"
                  labelText={<strong>City:<span className="required-css-class">*</span></strong>}
                  onChange={(e) => {onChangeCheck(e.target.value, setCity, setIfInvalidCity)}}
                  defaultValue={city} />
                <br />
                <TextInput
                  id="province"
                  invalid={ifInvalidProvince}
                  invalidText="A valid value is required"
                  labelText={<strong>Province:<span className="required-css-class">*</span></strong>}
                  onChange={(e) => {onChangeCheck(e.target.value, setProvice, setIfInvalidProvince)}}
                  defaultValue={province} />
                <br />
                <TextInput
                  id="zipcode"
                  invalid={ifInvalidZip}
                  invalidText="A valid value is required"
                  labelText={<strong>ZIP-code:<span className="required-css-class">*</span></strong>}
                  onChange={(e) => {onChangeCheck(e.target.value, setZipCode, setIfInvalidZip)}}
                  defaultValue={zipcode}
                />
                <br />
                <CountryList country={country} changeCountry={changeCountry} ifInvalidCountry={ifInvalidCountry} />
                <br />
                <ContactContainer contacts={contacts} setContacts={setContacts} />
                <br />
                {ifInvalidContact? (
                  <span className="bx--form-requirement">At lease one contact is required</span>
                ):(<></>)}
                <br />  <br /><hr /><br /><br />
                <strong>Checklist:<span className="required-css-class">*</span></strong>
                <br /><br />
                <Link
                  href="https://ibm.box.com/s/o11r6on5rxh7ji8ydcu7y7899h0vyx5u"
                  target="_blank"
                >
                  Fill in and upload linked document 
          </Link>
                <br /><br />
                Select the files from your file system and save the document to upload.
        <br /><br />
                <FileUploaderButton
                  buttonKind="secondary"
                  labelText={uploadLabelText? uploadLabelText:"Browse"}
                  role="button"
                  onChange={(e) => {setFile(e.target.files[0])}}
                />
                <br /><br /><br />
                {uploadButtonDisplay? (
                  <>
                    <Button
                      onClick={() => {uploadFile()}}
                      kind="secondary"
                      size="small"
                    >
                      Upload
              </Button>
                    <br /><br /></>):(<></>)}
                <FileContainer requestId={requestId} setFiles={setFiles} />
                <br />
                {!files? (
                  <span className="bx--form-requirement">At lease one file is required</span>
                ):(<></>)}
                <br /><br /><hr /><br /> <br />
                <TextArea
                  cols={50}
                  id="comments"
                  labelText={<strong>Comments</strong>}
                  rows={4}
                  defaultValue={comment}
                  onChange={(e) => {setComment(e.target.value)}}
                />
                <br /><br /><br /><hr /><br /> <br />


                {status!=="New"?
                  (<>
                  <label>              </label>
                    <Button onClick={() => {saveButtonAction()}}>Save</Button>
                  </>
                  ):(<></>)}



                {status!=="Rejected"?
                  (<>
                  <label>              </label>
                    <Button onClick={() => {primaryButtonAction()}}>{primaryButtonText()}</Button>
                  </>
                  ):(<></>)}
                {status!=="Returned"&&status!=="Rejected"&&status!=="Approved by customer inactive"&&status!=="Approved by exception inactive"? (
                  <>
                    <label>              </label>
                    <Button onClick={() => {secondaryButtonAction()}}>{secondaryButtonText()}</Button>
                  </>
                ):(<></>)}
                 {status==="Submitted to SM"||status==="Approved by exception"? (
                  <>
                    <label>              </label>
                    <Button onClick={() => {thirdButtonAction()}}>{status==="Submitted to SM"?"Approve by exception":"Duplicate"}</Button>
                  </>
                ):(<></>)}
                {status==="Submitted to SM"? (
                  <>
                    <label>              </label>
                    <Button onClick={() => {forthButtonAction()}}>Approved by customer</Button>
                  </>
                ):(<></>)}
                {historyLog.length!==0? (
                  <HistoryContainer historyLog={historyLog} />
                ):(<></>)}
                <Loading
                  active={ifLoading}
                  small={false}
                  withOverlay={true}
                />
              </>

            )
        )
        }
      </>
    ):(
        <ErrorPage />
      )
  )
};
export default EditRequestForm;