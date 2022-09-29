import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {
  TextInput,
  DataTable,
  Pagination,
  Modal,
  Loading,
  Select, 
  SelectItem,
  Button
} from 'carbon-components-react';
import {Edit16} from '@carbon/icons-react'
import {fetchRecipient, batchRecipient} from '../actions/act_recipient';
import LoadingPage from '../components/LoadingPage';
import CustomerGroupList from '../components/CustomerGroupList';

const {
  TableContainer,
  TableToolbar,
  TableBatchActions,
  Table,
  TableHead,
  TableExpandHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
}=DataTable;
const headers=[
  {
    key: 'id',
    header: 'Recipient ID',
  },
  {
    key: 'recipientName',
    header: 'Service recipient',
  },
  {
    key: 'customerGroup',
    header: 'Customer group',
  },
  {
    key: 'country',
    header: 'Country',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const RecipientContainer=({history, userRole}) => {

  // initial state & function
  const [pageNumber, setPageNumber]=useState(1);
  const [pageSize, setPageSize]=useState(10);
  const [ifLoading, setIfLoading]=useState(false);
  const [params, setParams]=useState(" ");

  const [recipient, setRecipient]=useState(null);

  const [customerGroup, setCustomerGroup]= useState(" ")
  const [status, setStatusValue]= useState(" ")


  const [message, setMessage]=useState(null);
  const [disableList, setDisableList]=useState(null);
  const [activeList, setActiveList]=useState(null);

  const [ifActiveModalOpen, setIfActiveModalOpen]=useState(false);
  const [ifDisableModalOpen, setIfDisableModalOpen]=useState(false);

  const data=useSelector(state => state.recipient.payload, shallowEqual);
  const ifRefresh=useSelector(state => state.recipient.ifRefresh, shallowEqual);
  //dispatch data
  const dispatch=useDispatch();
  useEffect(() => {
    if (params) {
      dispatch(fetchRecipient(params));
      setIfLoading(false)

    }
  }, [ifRefresh, params, dispatch]);


  useEffect(() => {
    if (disableList&&disableList.length>0) {

      var params={
        "active": false,
        "recipientIds": disableList
      }
      dispatch(batchRecipient(params));
    }
  }, [disableList, dispatch]);

  useEffect(() => {
    if (activeList&&activeList.length>0) {

      var params={
        "active": true,
        "recipientIds": activeList
      }
      dispatch(batchRecipient(params));
    }
  }, [activeList, dispatch]);

  /*LIST OF FUNCTIOND START */

  //Edit record
  const EditRow=(id) => {
    history.push({pathname: "/"+userRole+"/recipientedit/"+id});
  };



  //split data
  const splitData=(list, pageNumber, pageItems) => {
    let totalList=0;
    if (pageNumber===1||list.length<=5) {
      totalList=pageItems;
      pageNumber=1;
    } else {
      totalList=pageItems*pageNumber;
    }
    return list.slice((pageNumber-1)*pageItems, totalList);
  }



  function searchRecipient() {
   
    let searchParams="";
    
    if (recipient) {
      searchParams=searchParams+(searchParams?"&":"")+"recipientName="+recipient
    }

    if (customerGroup) {
      searchParams=searchParams+(searchParams?"&":"")+"customerGroup="+customerGroup
    }

    if (status) {
      searchParams=searchParams+(searchParams?"&":"")+"status="+status
    }
    
    setParams(searchParams?"?"+searchParams:" ")
  }
  function clearSearch() {
    setRecipient(null)
    setCustomerGroup(" ")
    setStatusValue(" ");
  }

  function changeCustomerGroup(e) {
    setCustomerGroup(e)
  }

  function changeStatusValue(e) {
    setStatusValue(e)
  }

  function disableRequest(row) {
    var invalidArray=[];
    var validArray=[];
    for (var i=0; i<row.length; i++) {
      if (row[i].cells[4].value==="Active") {
        validArray.push(row[i].id)
      }
      else {
        invalidArray.push(row[i].id)
        setMessage("Recipient " +invalidArray+ " can not be deactivated.")
      }
    }
    setIfDisableModalOpen(false)
    if (invalidArray.length===0) {
      setDisableList(validArray)
    }
  }

  function activeRequest(row) {
    var invalidArray=[];
    var validArray=[];
    for (var i=0; i<row.length; i++) {
      if (row[i].cells[4].value==="Inactive") {
        validArray.push(row[i].id)
      }
      else {
        invalidArray.push(row[i].id)
        setMessage("Recipient " +invalidArray+ " can not be activated.")
      }
    }
    setIfActiveModalOpen(false)
    if (invalidArray.length===0) {
      setActiveList(validArray)
    }

  }

  /*LIST OF FUNCTIOND END */
  return (
    <>
 
      <TextInput
        id="recipient"
        labelText={<strong>Service recipient:</strong>}
        onChange={(e) => {setRecipient(e.target.value)}}
        value={recipient?recipient:""}
      />
      <br />
      <CustomerGroupList customerGroup={customerGroup} changeCustomerGroup={changeCustomerGroup} mandatoryField="no"/>
        <br />
        <div>
      <Select
        id="status"
        value={status}
        onChange={(e) => {changeStatusValue(e.target.value)}}
        labelText={<strong>Status:</strong>}
      >
        <SelectItem text="Please select" value="Please select" />
        <SelectItem text="Active" value="ACTIVE" />
        <SelectItem text="Inactive" value="INACTIVE" />
      </Select>
    </div>
      <br />

      <Button onClick={() => {searchRecipient()}}>Search</Button>
      <label>              </label>
      <Button onClick={() => {clearSearch()}}>Clear&nbsp; </Button>
      <br /><br /><hr /><br />
      {message?(
        <>
        <br />
        <label>{message}</label>
        <br />
        <br />
        </>
      ):(<></>)}
      {
        data? (
          <DataTable
            rows={JSON.parse(JSON.stringify(data).replace(/recipientId/g, "id"))}
            headers={headers}
            isSortable
            render={({rows, headers, getHeaderProps, getSelectionProps, getBatchActionProps, selectedRows}) => {
              rows=splitData(
                rows,
                pageNumber,
                pageSize,
              )
              return (
                <>
                  <TableContainer title="">
                    <TableToolbar>
                    <TableBatchActions {...getBatchActionProps()} >
                        <Button onClick={() => {setIfDisableModalOpen(true); setMessage(null)}}>Deactivate</Button>
                        <Button onClick={() => {setIfActiveModalOpen(true); setMessage(null)}}>Reactivate</Button>
                        <Modal
                          aria-label="deactivate"
                          modalHeading="Warning"
                          onRequestSubmit={() => disableRequest(selectedRows)}
                          onSecondarySubmit={() => {setIfDisableModalOpen(false)}}
                          onRequestClose={() => {setIfDisableModalOpen(false)}}
                          open={ifDisableModalOpen}
                          danger
                          primaryButtonDisabled={false}
                          primaryButtonText="Yes"
                          secondaryButtonText="Cancel"
                        >
                          <p className="bx--modal-content__text">
                            Are you sure to deactivate the selected item(s)?</p>
                        </Modal>
                        <Modal
                          aria-label="activate"
                          modalHeading="Warning"
                          onRequestSubmit={() => activeRequest(selectedRows)}
                          onSecondarySubmit={() => {setIfActiveModalOpen(false)}}
                          onRequestClose={() => {setIfActiveModalOpen(false)}}
                          open={ifActiveModalOpen}
                          danger
                          primaryButtonDisabled={false}
                          primaryButtonText="Yes"
                          secondaryButtonText="Cancel"
                        >
                          <p className="bx--modal-content__text">
                            Are you sure to activate the selected item(s)?</p>
                        </Modal>
                        <Modal aria-label="n/a"></Modal>
                      </TableBatchActions>
                    </TableToolbar>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableSelectAll {...getSelectionProps()} />
                          {headers.map(header => (
                            <TableHeader {...getHeaderProps({header})}>
                              {header.header}
                            </TableHeader>
                          ))}
                          <TableExpandHeader />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (

                          <TableRow key={row.id}>
                            <TableSelectRow {...getSelectionProps({row})} />
                            {row.cells.map(cell => (
                              <TableCell key={cell.id}>{cell.value} </TableCell>
                            ))}
                            <TableCell><Edit16 onClick={() => EditRow(row.id)} /></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Pagination
                    onChange={({page, pageSize}) => {
                      setPageNumber(page)
                      setPageSize(pageSize)
                    }}
                    pageSizes={[10, 20, 30]}
                    totalItems={data.length}
                  />
                  <Loading
                    active={ifLoading}
                    small={false}
                    withOverlay={true}
                  />
                </>)
            }
            }
          />
        ):(<div>
          <LoadingPage />
        </div>)
      }
    </>
  )
}
export default React.memo(RecipientContainer);