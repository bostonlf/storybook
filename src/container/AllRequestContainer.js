import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  DataTable,
  Pagination,
  Modal,
  Loading,
  Button
} from 'carbon-components-react';
import {Edit16} from '@carbon/icons-react'
import {forwardRequest} from '../actions/act_request';
import LoadingPage from '../components/LoadingPage';
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
    header: 'Request ID',
  },
  {
    key: 'purchaseType',
    header: 'Purchase Type',
  },
  {
    key: 'companyName',
    header: 'Company Name',
  },
  {
    key: 'vatNumber',
    header: 'VAT Number',
  },
  {
    key: 'status',
    header: 'Status',
  },
];

const AllRequestContainer=({history, userRole, data}) => {

  // initial state & function
  const [pageNumber, setPageNumber]=useState(1);
  const [pageSize, setPageSize]=useState(10);

  const [message, setMessage]=useState(null);
  const [disableList, setDisableList]=useState(null);
  const [activeList, setActiveList]=useState(null);

  const [ifActiveModalOpen, setIfActiveModalOpen]=useState(false);
  const [ifDisableModalOpen, setIfDisableModalOpen]=useState(false);
  const [ifLoading]=useState(false);


  const dispatch=useDispatch();

  useEffect(() => {
    if (disableList&&disableList.length>0) {

      var params={
        "operation": "DISABLE",
        "requestIds": disableList
      }
      dispatch(forwardRequest(params));
    }
  }, [disableList, dispatch]);

  useEffect(() => {
    if (activeList&&activeList.length>0) {

      var params={
        "operation": "ENABLE",
        "requestIds": activeList
      }
      dispatch(forwardRequest(params));
    }
  }, [activeList, dispatch]);

  /*LIST OF FUNCTIOND START */

  //Edit record
  const EditRow=(id) => {
    history.push({pathname: "/"+userRole+"/requestedit/"+id});
  };

 
  function disableRequest(row) {
    var invalidArray=[];
    var validArray=[];
    for (var i=0; i<row.length; i++) {
      if (row[i].cells[4].value==="Approved by exception"||row[i].cells[4].value==="Approved by customer") {
        validArray.push(row[i].id)
      }
      else {
        invalidArray.push(row[i].id)
        setMessage("Request " +invalidArray+ " can not be deactivated")
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
      if (row[i].cells[4].value==="Approved by exception inactive"||row[i].cells[4].value==="Approved by customer inactive") {
        validArray.push(row[i].id)
      }
      else {
        invalidArray.push(row[i].id)
        setMessage("Request " +invalidArray+ " can not be activated")
      }
    }
    setIfActiveModalOpen(false)
    if (invalidArray.length===0) {
      setActiveList(validArray)
    }

  }


  //split data
  const splitData=(list, pageNumber, pageItems) => {
    let totalList=0;
    if (pageNumber===1||list.length<=10) {
      totalList=pageItems;
      pageNumber=1;
    } else {
      totalList=pageItems*pageNumber;
    }
    return list.slice((pageNumber-1)*pageItems, totalList);
  }

  function cellValue(e) {
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


  /*LIST OF FUNCTIOND END */

  return (
    <>
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
            rows={JSON.parse(JSON.stringify(data).replace(/requestId/g, "id"))}
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
                  <TableContainer>

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
                              <TableCell key={cell.id}>{cellValue(cell.value)} </TableCell>
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
export default AllRequestContainer;