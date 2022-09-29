import React, {useEffect, useState} from 'react';
import {DataTable, Loading, } from 'carbon-components-react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {Download16} from '@carbon/icons-react'
import LoadingPage from '../components/LoadingPage';
import {fetchFile, getFileLink} from '../actions/act_file';
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
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


const ViewFileContainer=({requestId, setFiles}) => {


  const data=useSelector(state => state.file.payload, shallowEqual);
  const ifReload=useSelector(state => state.file.ifReload, shallowEqual);
  const ifRefresh=useSelector(state => state.file.ifRefresh, shallowEqual);

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

  /*LIST OF FUNCTIOND END */

  return (
    data? (
      data.length!==0? (
        <DataTable
          rows={JSON.parse(JSON.stringify(data).replace(/key/g, "id"))}
          headers={headers}
          render={({rows, headers, getHeaderProps}) => {
            return (
              <>
                <TableContainer title="">
                  <Table>
                    <TableHead>
                      <TableRow>
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
              </>)
          }
          }
        />
      ):(<></>)
    ):(<><LoadingPage /></>)
  )
}
export default React.memo(ViewFileContainer);