import React, {useEffect, useState} from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Link,
  TextArea,
  Loading,
  TextInput,
  FileUploaderButton,
  Button
} from 'carbon-components-react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {addRecipient} from '../../actions/act_recipient';
import ErrorPage from '../../components/ErrorPage';
import Menu from '../../components/Menu';
import CountryList from '../../components/CountryList';
import CustomerGroupList from '../../components/CustomerGroupList';
import FileContainer from '../../container/FileContainer';
import {addFile} from '../../actions/act_file';
import HistoryContainerBasic from '../../container/HistoryContainerBasic';

const NewRecipientForm=({history, userRole}) => {
  
  const data = useSelector(state => state.recipient.selected, shallowEqual);
  const ifRedirect=useSelector(state => state.recipient.ifRedirect, shallowEqual);
  const ifConnect=useSelector(state => state.recipient.ifConnect, shallowEqual);


  const [recipient, setRecipient]=useState("");
  const [customerGroup, setCustomerGroup]= useState("")
  const [country, setCountry]= useState("")
  const [status, setRecipientStatus]= useState("")
  const [comment, setComment]=useState(" ")
  const [file, setFile]=useState(null)
  const [files, setFiles]=useState(true)
  const [recipientId, setRecipientId]=useState()
  const [historyLog, setHistoryLog]=useState([])

  const [ifLoading, setIfLoading]=useState(false);


  const [ifInvalidRecipient, setIfInvalidRecipient]=useState(false);
  const [ifInvalidCustomerGroup, setIfInvalidCustomerGroup]=useState(false);
  const [ifInvalidCountry, setIfInvalidCountry]=useState(false);
  const [uploadButtonDisplay, setUploadButtonDisplay]=useState(false)

  const dispatch = useDispatch();

  
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
  function uploadFile() {
    
    dispatch(addFile(recipientId, file));
    setFile(null)
  }

  useEffect(() => {
    if (file) {
      setUploadButtonDisplay(true)
    }
    else {
      setUploadButtonDisplay(false)
    }
  }, [file]);


  function saveRecipient(recipientStatus) {
 
    var params={
      comment:comment,
      country: country,
      customerGroup: customerGroup,
      recipientName: recipient,
      recipientId:recipientId,
      status:recipientStatus?recipientStatus:"ACTIVE"
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

      if (files===false) {
        setFiles(false)
      }
      else {
        setFiles(true)
      }
    }
  }

  useEffect(() => {
    if (data) {
      setRecipient(data.content.recipientName);
      setCustomerGroup(data.content.customerGroup);
      setCountry(data.content.country);
      setRecipientId(data.content.recipientId);
      setRecipientStatus(data.content.status);

      let historyLogArr = data.content.actions;
      for(let i =0; i <historyLogArr.length; i++){
        historyLogArr[i].id=i+"";
      }
      setHistoryLog(data.content.actions);
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
            <Link href={"../welcome"}>V-TServices Vendor Management Portal</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={"../recipient"}>Service recipient</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="landing-page__heading">Create/Edit a Service recipient</h1>
        <br /><hr /><br />
        <TextInput
            id="status"
            labelText={<strong>Status:</strong>}
            value={status} 
          />
          <br/>
        <TextInput
          id="recipient"
          defaultValue={recipient}
          invalid={ifInvalidRecipient}
          invalidText="A valid value is required"
          onBlur={(e) => {setRecipient(e.target.value)}}
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
              onChange={(e) => {setFile(e.target.files[0])}}
            />
            <br /><br /><br />
            {uploadButtonDisplay? (
              <>
                <Button
                  onClick={() => {uploadFile()}}
                  kind="secondary"
                  size="small">
                  Upload
              </Button>
                <br /><br /></>):(<></>)}
            <FileContainer requestId={recipientId} setFiles={setFiles} />
            <br /><br />
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
        <Button onClick={() => {saveRecipient(status)}}>Save</Button>
        
             {recipientId && (status === "ACTIVE")? (
              <><label>              </label>
                <Button onClick={() => {saveRecipient("INACTIVE")}}>Deactivate</Button>
              </>
            ):(<></>)}

            {recipientId && (status === "INACTIVE")? (
              <><label>              </label>
                <Button onClick={() => {saveRecipient("ACTIVE")}}>Reactivate</Button>
              </>
            ):(<></>)}

        
          {historyLog.length!==0? (
              <HistoryContainerBasic historyLog={historyLog} />
            ):(<></>)}

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