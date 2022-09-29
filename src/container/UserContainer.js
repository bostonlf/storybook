import React, {useState} from 'react';
// import { useDispatch} from 'react-redux';
import {DataTable, Pagination, Modal, Loading, Button} from 'carbon-components-react';
import {Edit16} from '@carbon/icons-react'
// import {fetchUser, deleteUser} from '../actions/act_user';
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
    key: 'customerId',
    header: 'User',
  },
  {
    key: 'roleCodes',
    header: 'Role',
  },
];
const data =[
  {
    id: 0,
    customerId: 'customerId',
    roleCodes: '22',
    header: 'User',
  },
  {
    id: 1,
    customerId: 'custome22rId',
    roleCodes: '22',
    header: 'Role',
  },
];

const UserContainer=({history, userRole}) => {
  // initial state & function
  const [pageNumber, setPageNumber]=useState(1);
  const [pageSize, setPageSize]=useState(10);
  
  // const [ifLoading, setIfLoading]=useState(false);
  const [ifDeleteModalOpen, setIfDeleteModalOpen]=useState(false);

  // const data=useSelector(state => state.user.payload, shallowEqual);
  // const ifRefresh=useSelector(state => state.user.ifRefresh, shallowEqual);

  // const dispatch=useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUser());
  //   setIfLoading(false)
  // }, [ifRefresh, dispatch]);


  /*LIST OF FUNCTIOND START */

  //Edit record
  const EditRow=(id) => {
    history.push({pathname: "/"+userRole+"/useredit/"+id});
  };

  //delete selected record
  const deleteSelectedRow=row => {
    // for (var i=0; i<row.length; i++) {
    //   dispatch(deleteUser(row[i].id));
    // }
    // setIfDeleteModalOpen(false)
    // setIfLoading(true)
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

  function closeDeleteModal() {
    setIfDeleteModalOpen(false)
  }

  const getDataItem=rows => (
    rows.map(row => ({
      ...row,
      id: row.customerId,
    }))
  )

  /*LIST OF FUNCTIOND END */
  return (

    data? (
      <DataTable
        rows={getDataItem(data)}
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
                    <Button onClick={() => {setIfDeleteModalOpen(true)}}>Delete</Button>
                    <Modal
                      aria-label="delete user modal"
                      modalHeading="Warning"
                      onRequestSubmit={() => deleteSelectedRow(selectedRows)}
                      onSecondarySubmit={() => {closeDeleteModal()}}
                      onRequestClose={() => {closeDeleteModal()}}
                      open={ifDeleteModalOpen}
                      danger
                      primaryButtonDisabled={false}
                      primaryButtonText="Yes"
                      secondaryButtonText="Cancel">
                      <p className="bx--modal-content__text">
                        Are you sure to delecte the selected item(s)?</p>
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
                        {row.cells.map(cell =>
                          (typeof (cell.value)==='object')?
                            (
                              <TableCell key={cell.id}>
                                {cell.value.map(value => <div key={value}>{value}<br/></ div>)}
                              </TableCell>
                            ):(
                              <TableCell key={cell.id}>{cell.value}</TableCell>
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
                active={false}
                small={false}
                withOverlay={true}
              />
            </>)
        }
        }
      />
    ):(<>
      <LoadingPage />
    </>)
  )
}
export default React.memo(UserContainer);