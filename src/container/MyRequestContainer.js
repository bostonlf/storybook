import React, {useState} from 'react';
import {
  DataTable,
  Pagination,
  Loading,
} from 'carbon-components-react';
import {Edit16} from '@carbon/icons-react'
import LoadingPage from '../components/LoadingPage';
const {
  TableContainer,
  TableToolbar,
  Table,
  TableHead,
  TableExpandHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
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

const MyRequestContainer=({history, userRole, data}) => {

  // initial state & function
  const [pageNumber, setPageNumber]=useState(1);
  const [pageSize, setPageSize]=useState(10);

  const [ifLoading]=useState(false);




  /*LIST OF FUNCTIOND START */

  //Edit record
  const EditRow=(id) => {
    history.push({pathname: "/"+userRole+"/requestedit/"+id});
  };


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
      {
        data? (
          <DataTable
            rows={JSON.parse(JSON.stringify(data).replace(/requestId/g, "id"))}
            headers={headers}
            isSortable
            render={({rows, headers, getHeaderProps}) => {
              rows=splitData(
                rows,
                pageNumber,
                pageSize,
              )
              return (
                <>
                  <TableContainer>
                  <TableToolbar></TableToolbar>
                    <Table>
                      <TableHead>
                        <TableRow>
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
                            {row.cells.map(cell => (
                              <TableCell key={cell.id}>{cellValue(cell.value)}</TableCell>
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
export default MyRequestContainer;