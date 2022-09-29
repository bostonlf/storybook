import React, {useEffect, useState} from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  TextArea,
  Loading,
  TextInput,
  FileUploaderButton,
  FileUploaderItem,
  Button
} from 'carbon-components-react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {addRecipient} from '../../actions/act_recipient';
import ErrorPage from '../../components/ErrorPage';
import Menu from '../../components/Menu';
import CountryList from '../../components/CountryList';
import CustomerGroupList from '../../components/CustomerGroupList';
import {addFiles} from '../../actions/act_file';

const NewRecipientForm=({history, userRole}) => {
  
  const data=useSelector(state => state.recipient.selected, shallowEqual);
  const ifRedirect=useSelector(state => state.recipient.ifRedirect, shallowEqual);
  const ifConnect=useSelector(state => state.recipient.ifConnect, shallowEqual);
  const newRecipientId =useSelector(state => state.recipient.newRecipientId, shallowEqual);


  const [recipient, setRecipient]=useState("");
  const [customerGroup, setCustomerGroup]= useState("Please select")
  const [country, setCountry]= useState("Please select")
  const [comment, setComment]=useState(" ")

  const [files, setFiles]=useState([])

  const [ifLoading, setIfLoading]=useState(false);


  const [ifInvalidRecipient, setIfInvalidRecipient]=useState(false);
  const [ifInvalidCustomerGroup, setIfInvalidCustomerGroup]=useState(false);
  const [ifInvalidCountry, setIfInvalidCountry]=useState(false);


  const dispatch=useDispatch();

  
  function changeCountry(e) {
    setCountry(e)
    if (e==="Please select") {
      setIfInvalidCountry(true)
    }
    else {
      setIfInvalidCountry(false)
    }
  }

  function changeCustomerGroup(e) {
    setCustomerGroup(e)
    if (e==="Please select") {
      setIfInvalidCustomerGroup(true)
    }
    else {
      setIfInvalidCustomerGroup(false)
    }
  }

    // add file to request
  useEffect(() => {
    if (newRecipientId!==null && files.length >0) {
      dispatch(addFiles(newRecipientId, files));
      
    }
  }, [newRecipientId, dispatch, files]);
  
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

  function saveRecipient() {
 
    var params={
      comment:comment,
      country: country,
      customerGroup: customerGroup,
      recipientId:"",
      recipientName: recipient,
      status:"ACTIVE"
    }

    if (recipient && (customerGroup && customerGroup !=="Please select") && (country && country !=="Please select")) {
      setIfLoading(true)
      setIfInvalidRecipient(false)
      setIfInvalidCustomerGroup(false)
      setIfInvalidCountry(false)
      dispatch(addRecipient(params));
    }
    else {
      
      recipient?setIfInvalidRecipient(false):setIfInvalidRecipient(true);
      (customerGroup && customerGroup!=="Please select")?setIfInvalidCustomerGroup(false):setIfInvalidCustomerGroup(true);
      (country && country!=="Please select")?setIfInvalidCountry(false):setIfInvalidCountry(true);
    }

  }

  useEffect(() => {
    if (data) {
      setRecipient(data.content.recipient);
      setCustomerGroup(data.content.customerGroup);
      setCountry(data.content.countryId);
    }

    if (ifRedirect) {
      history.push("/"+userRole+"/recipient");
      setIfLoading(false)
    }
  }, [ifRedirect, data, history, userRole]);


  
  return (
    ifConnect? (
      <>          <Menu userRole={userRole} />
      <br /><br /><br />
            <Breadcrumb noTrailingSlash aria-label="Page navigation">
          <BreadcrumbItem>
            <Link href={"./welcome"}>V-TServices Vendor Management Portal</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={"./recipient"}>Service recipient</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="landing-page__heading">Create/Edit a Service recipient</h1>
        <br /><hr /><br />
        <TextInput
            id="status"
            labelText={<strong>Status:</strong>}
            value={"ACTIVE"} 
          />
          <br/>
        <TextInput
          id="recipient"
          defaultValue={recipient}
          invalid={ifInvalidRecipient}
          invalidText="A valid value is required"
          onChange={(e) => {setRecipient(e.target.value)}}
          type="text"
          labelText={<strong>Service recipient:<span className="required-css-class">*</span></strong>}
        />
        <br />
        

        <CustomerGroupList customerGroup={customerGroup} changeCustomerGroup={changeCustomerGroup} ifInvalidCustomerGroup={ifInvalidCustomerGroup} mandatoryField="yes"/>
        <br />
        <CountryList country={country} changeCountry={changeCountry} ifInvalidCountry={ifInvalidCountry} />
                  <br />
                  <br />
                  <br />

                  <strong>Attachment:</strong>
          <br /><br />
         
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
          <br /><br />
          <br /><br />
         

        <TextArea
            cols={50}
            id="comment"
            labelText={<strong>Comments</strong>}
            rows={4}
            defaultValue={comment}
            onChange={(e) => {setComment(e.target.value)}}
          />
        <br /><hr /><br />
        <Button
          onClick={() => {saveRecipient()}}>Save</Button>
        <Loading
          active={ifLoading}
          small={false}
          withOverlay={true}
        />
      </>
    ):(
        <ErrorPage />
      )
  )
};
export default NewRecipientForm;