import React, {useEffect, useState} from 'react';
import {DataTable, Modal, Button, Loading, } from 'carbon-components-react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {Download16} from '@carbon/icons-react'
import LoadingPage from '../components/LoadingPage';
import {fetchFile, deleteFile, getFileLink} from '../actions/act_file';
const {
  TableContainer,
  TableToolbar,
  TableBatchActions,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableSelectAll,
  TableSelectRow,
}=DataTable;

const headers=[
  {
    key: 'fileName',
    header: 'File Name',
  },
  {
    key: 'size',
    header: 'Size(Byte)',
  },
];


const FileContainer=({requestId, setFiles}) => {


  const data=useSelector(state => state.file.payload, shallowEqual);
  const ifReload=useSelector(state => state.file.ifReload, shallowEqual);
  const ifRefresh=useSelector(state => state.file.ifRefresh, shallowEqual);

  const [ifFileModalOpen, setIfFileModalOpen]=useState(false);
  const [ifLoading, setIfLoading]=useState(false);

  const dispatch=useDispatch();
  
  /*LIST OF useEffect BEGIN */

  useEffect(() => {
    dispatch(fetchFile(requestId));
  }, [dispatch, requestId, ifReload]);

  useEffect(() => {
    if (data) {
      if (data.length===0) {
        setFiles(false)
      }
      else {
        setFiles(true)
      }
    }
  }, [data, setFiles]);

  useEffect(() => {
    setIfLoading(false)
  }, [ifRefresh]);

    /*LIST OF useEffect END */

  /*LIST OF FUNCTIOND BEGIN */

  //download file
  function downloadfile(row) {
    setIfLoading(true)
    dispatch(getFileLink(requestId, row.id, row.cells[0].value))
  }

  //delete selected record
  function deleteSelectedRow(selectedRow) {
    for (var i=0; i<selectedRow.length; i++) {
      dispatch(deleteFile(requestId, selectedRow[i].id))
    }
    setIfFileModalOpen(false)
  }

  function closeFileModal() {
    setIfFileModalOpen(false)
  }

  /*LIST OF FUNCTIOND END */

  return (
    data? (
      data.length!==0? (
        <DataTable
          rows={JSON.parse(JSON.stringify(data).replace(/key/g, "id"))}
          headers={headers}
          isSortable
          render={({rows, headers, getHeaderProps, getSelectionProps, getBatchActionProps, selectedRows}) => {
            return (
              <>
                <TableContainer title="">
                  <TableToolbar>
                    <TableBatchActions {...getBatchActionProps()} >
                      <Button onClick={() => setIfFileModalOpen(true)}>Delete</Button>
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
                        <TableHeader>
                            Download
                          </TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableSelectRow {...getSelectionProps({row})} />
                          {row.cells.map(cell => (
                            <TableCell key={cell.id}>{cell.value} </TableCell>
                          ))}
                          <TableCell onClick={() => {downloadfile(row)}}>
                            <Download16 />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {ifLoading? (
                  <Loading
                    active={ifLoading}
                    small={false}
                    withOverlay={true}
                  />):(<></>)}
                <Modal
                  aria-label="delete contact modal"
                  modalHeading="Warning"
                  onRequestSubmit={() => deleteSelectedRow(selectedRows)}
                  onSecondarySubmit={() => {closeFileModal()}}
                  onRequestClose={() => {closeFileModal()}}
                  open={ifFileModalOpen}
                  danger
                  primaryButtonDisabled={false}
                  primaryButtonText="Yes"
                  secondaryButtonText="Cancel">
                  <p className="bx--modal-content__text">
                    Are you sure to delected the selected item(s)?</p>
                </Modal>
                <Modal aria-label="none"></Modal>
              </>)
          }
          }
        />
      ):(<></>)
    ):(<><LoadingPage /></>)
  )
}
export default React.memo(FileContainer);