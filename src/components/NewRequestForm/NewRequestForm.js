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
  FileUploaderItem,
  TextArea,
  Loading,
  Button
} from 'carbon-components-react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {newRequest, addRequest} from '../../actions/act_request';
import {addFiles} from '../../actions/act_file';
import {getCompany} from '../../actions/act_company';

import PurchaseTypeList from '../../components/PurchaseTypeList';
import SupplierTypeList from '../../components/SupplierTypeList';
import CountryList from '../../components/CountryList';
import ContactContainer from '../../container/ContactContainer';
import Menu from '../../components/Menu';
// import Utility from '../../components/Utility';


const NewRequestForm=({history, userRole}) => {

  const newRequestId=useSelector(state => state.request.newRequestId, shallowEqual);
  const companyList=useSelector(state => state.company.payload, shallowEqual);
  const ifRedirect=useSelector(state => state.file.ifRedirect, shallowEqual);

  // initial state
  const [contacts, setContacts]=useState([]);
  const [purchaseType, setPurchaseType]=useState(null)
  const [address, setAddress]=useState(null)
  const [subcontractor, setSubcontractor]=useState(null)
  const [businesscontinuity, setBusinessContinuity]=useState(false)
  const [city, setCity]=useState(null)
  const [companyName, setCompanyName]=useState(null)
  const [primarySupplierId, setPrimarySupplierId]=useState(null)
  const [country, setCountry]=useState("Please select")
  const [province, setProvice]=useState(null)
  const [supplierType, setSupplierType]=useState("PRIMARY")
  const [vatnumber, setVATNumber]=useState(null)
  const [zipcode, setZipCode]=useState(null)
  const [comment, setComment]=useState(null)
  const [files, setFiles]=useState([])

  const [message, setMessage]=useState(" ")
  const noCompany="No Valid Company";

  const [ifLoading, setIfLoading]=useState(false);
  const [ifPrimary, setIfPrimary]=useState(true);
  const [ifInvalidCountry, setIfInvalidCountry]=useState(false);
  const [ifInvalidVAT, setIfInvalidVAT]=useState(false)
  const [ifInvalidCompany, setIfInvalidCompany]=useState(false)
  const [ifInvalidSubcontractor, setIfInvalidSubcontractor]=useState(false)
  const [ifInvalidAddress, setIfInvalidAddress]=useState(false)
  const [ifInvalidCity, setIfInvalidCity]=useState(false)
  const [ifInvalidProvince, setIfInvalidProvince]=useState(false)
  const [ifInvalidZip, setIfInvalidZip]=useState(false)
  const [ifInvalidContact, setIfInvalidContact]=useState(false)
  const [ifInvalidFile, setIfInvalidFile]=useState(false)


  const dispatch=useDispatch();

  /* User effect BEGIN */

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  // get Primary compnay
  useEffect(() => {
    if (companyList&&companyList.length>0) {
      setPrimarySupplierId(companyList[0].key)
    }
  }, [companyList]);

  // if redirect
  useEffect(() => {
    if (ifRedirect) {
      history.push("/"+userRole+"/request");
    }
  }, [ifRedirect, history, userRole]);

  // add file to request
  useEffect(() => {
    if (newRequestId!==null) {
      dispatch(addFiles(newRequestId, files));
    }
  }, [newRequestId, dispatch, files]);

  // if valid contacts
  useEffect(() => {
    if (contacts.length!==0) {
      setIfInvalidContact(false)
    }
    else {
      setIfInvalidContact(true)
    }
  }, [contacts]);

  // if valid files
  useEffect(() => {
    if (files.length>=0) {
      setIfInvalidFile(false)
    }
    else {
      setIfInvalidFile(true)
    }
  }, [files]);

  /* User effect END */

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
    if ((supplierType==="SUBCONTRACTOR"&&companyList.length===0)||(supplierType==="PRIMARY"&&companyName===null)||(supplierType==="PRIMARY"&&companyName==="")||(supplierType==="SUBCONTRACTOR"&&subcontractor===null)||(supplierType==="SUBCONTRACTOR"&&subcontractor==="")||country==="Please select"||vatnumber===null||vatnumber===""||address===null||address===""||city===null||city===""||province===null||province===""||zipcode===null||zipcode===""||contacts.length===0||files.length===0) {
      (supplierType==="PRIMARY"&&(companyName===null||companyName===""))? setIfInvalidCompany(true):setIfInvalidCompany(false);
      (supplierType==="SUBCONTRACTOR"&&(subcontractor===null||subcontractor===""))? setIfInvalidSubcontractor(true):setIfInvalidSubcontractor(false);
      country==="Please select"? setIfInvalidCountry(true):setIfInvalidCountry(false);
      (vatnumber&&vatnumber!=="")? setIfInvalidVAT(false):setIfInvalidVAT(true);
      (address&&address!=="")? setIfInvalidAddress(false):setIfInvalidAddress(true);
      (city&&city!=="")? setIfInvalidCity(false):setIfInvalidCity(true);
      (province&&province!=="")? setIfInvalidProvince(false):setIfInvalidProvince(true);
      (zipcode&&zipcode!=="")? setIfInvalidZip(false):setIfInvalidZip(true);
      contacts.length===0? setIfInvalidContact(true):setIfInvalidContact(false);
      files.length===0? setIfInvalidFile(true):setIfInvalidFile(false);
      return false;
    }
    else {
      return true;
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

        "schedule": {
          schedule25: "",
          schedule30: "",
          scheduleMediobanca: "",
          scheduleSondrio: "",
          scheduleU: "",
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
    dispatch(addRequest(params));
  }



  function primaryButtonAction() {
    if (validateField()) {
      saveRequest()
    }
  }

  function secondaryButtonAction() {
    if (validateField()) {
      submitRequest("CREATE_REQUEST")
    }
  }


  function uploadFile(file) {
    setFiles(files.concat(file))
  }


  function deleteFile(evt, {uuid}) {
    let arr=[];
    for (var i=0; i<files.length; i++) {
      if (files[i].lastModified.toString()!==uuid) {
        arr.push(files[i])
      }
    }
    setFiles(arr)
  }


  return (
    <>
      <Menu userRole={userRole} />
      <br /><br /><br />
      <Breadcrumb noTrailingSlash aria-label="Page navigation">
        <BreadcrumbItem>
          <Link href={"./welcome"}>V-TServices Vendor Management Portal</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={"./request"}>Request</Link>
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
        <>
          <PurchaseTypeList purchaseType={purchaseType} displayForm={displayForm} />
          <br />
          <TextInput
            id="status"
            labelText={<strong>Status:</strong>}
            value={"New"}
          />
          <br />
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
                  labelText={<strong>Primary supplier company name:<span className="required-css-class">*</span></strong>}
                >
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
                  onChange={(e) => {onChangeCheck(e.target.value, setSubcontractor, setIfInvalidSubcontractor)}}
                  defaultValue={subcontractor}
                  hideLabel={companyList&&companyList.length!==0? false:true}
                  type={companyList&&companyList.length!==0? "text":"hidden"}

                />
                <br />

              </>
            ):(<><label><span className="required-css-class">{noCompany}</span></label><br /><br /></>)):(<></>)}
          <TextInput
            id="vatnumber"
            invalid={ifInvalidVAT}
            invalidText="A valid value is required"
            labelText={<strong>VAT Number:<span className="required-css-class">*</span></strong>}
            onChange={(e) => {onChangeCheck(e.target.value, setVATNumber, setIfInvalidVAT)}}
            defaultValue={vatnumber}
          />

          <br />
          <label className="bx--label"><strong>Business Continuity:<span className="required-css-class">*</span></strong></label>
          <Toggle
            id="businesscontinuity"
            labelA="NO"
            labelB="YES"
            onToggle={(toggle) => {setBusinessContinuity(toggle)}}
            defaultToggled={businesscontinuity}
          />
          <br />
          <TextInput
            id="address"
            invalid={ifInvalidAddress}
            invalidText="A valid value is required"
            labelText={<strong>Address:<span className="required-css-class">*</span></strong>}
            onChange={(e) => {onChangeCheck(e.target.value, setAddress, setIfInvalidAddress)}}
            defaultValue={address}
          />
          <br />
          <TextInput
            id="city"
            invalid={ifInvalidCity}
            invalidText="A valid value is required"
            labelText={<strong>City:<span className="required-css-class">*</span></strong>}
            onChange={(e) => {onChangeCheck(e.target.value, setCity, setIfInvalidCity)}}
            defaultValue={city}
          />
          <br />
          <TextInput
            id="province"
            invalid={ifInvalidProvince}
            invalidText="A valid value is required"
            labelText={<strong>Province:<span className="required-css-class">*</span></strong>}
            onChange={(e) => {onChangeCheck(e.target.value, setProvice, setIfInvalidProvince)}}
            defaultValue={province}
          />
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
          <br />  <br />
          <hr /><br /><br />
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
            labelText={"Browse"}
            role="button"
            onChange={(e) => {uploadFile(e.target.files[0])}}
          />
          <br /><br />
          <label>
            {files.map(
              ({uuid, name, size, lastModified, ...rest}) => (
                <FileUploaderItem
                  key={lastModified}
                  uuid={lastModified.toString()}
                  name={name}
                  size={size}
                  status="edit"
                  onDelete={(evt, {uuid}) => deleteFile(evt, {uuid})}
                  {...rest}
                />
              )
            )}
          </label>
          {ifInvalidFile? (
            <span className="bx--form-requirement">At lease one file is required</span>
          ):(<></>)}
          <br /><br />
          <hr /><br /> <br />
          <TextArea
            cols={50}
            id="comments"
            labelText={<strong>Comments</strong>}
            rows={4}
            defaultValue={comment}
            onChange={(e) => {setComment(e.target.value)}}
          />
          <br />
          <br /><br /><hr /><br /> <br />
          <Button onClick={() => {primaryButtonAction()}}>Save</Button>
          <label>              </label>
          <Button onClick={() => {secondaryButtonAction()}}>Submit</Button>
          <Loading
            active={ifLoading}
            small={false}
            withOverlay={true}
          />
        </>
      )
      }
    </>
  )
};
export default NewRequestForm;