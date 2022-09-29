import React, { useState } from 'react';
import {
  DataTable,
  Pagination,
  Loading,
} from 'carbon-components-react';
import { View16 } from '@carbon/icons-react'
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
} = DataTable;
const headers = [
  {
    key: 'companyName',
    header: 'Company Name',
  },
  {
    key: 'purchaseType',
    header: 'Purchase Type',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'schedule25',
    header: 'Schedule 25'
  },
  {
    key: 'schedule30',
    header: 'Schedule 30'
  },
  {
    key: 'scheduleSondrio',
    header: 'Schedule Sondrio'
  },
  {
    key: 'scheduleU',
    header: 'Schedule U'
  },
  {
    key: 'scheduleMediobanca',
    header: 'Schedule Mediobanca'
  }
];

const ActiveRequestContainer = ({ history, userRole, data }) => {

  // initial state & function
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [ifLoading] = useState(false);

  /*LIST OF FUNCTIOND START */


  //split data
  const splitData = (list, pageNumber, pageItems) => {
    let totalList = 0;
    if (pageNumber === 1 || list.length <= 10) {
      totalList = pageItems;
      pageNumber = 1;
    } else {
      totalList = pageItems * pageNumber;
    }
    return list.slice((pageNumber - 1) * pageItems, totalList);
  }

  function cellValue(e) {
    if (e === "V_TS_INTERNAL") {
      return "V-TS Internal";
    }
    else if (e === "CUSTOMER") {
      return "Customer";
    }
    else {
      return e;
    }
  }

  //Edit record
  const ViewRow = (id) => {
    history.push({ pathname: "/" + userRole + "/requestview/" + id });
  };

  // format data
  const getDataItem = rows => (
    rows.map(row => ({
      ...row,
      id: row.id,
      companyName: row.companyName ? row.companyName : "",
      purchaseType: row.purchaseType ? row.purchaseType : "",
      status: row.status ? row.status : "",
      schedule25: row.schedule && row.schedule.schedule25 ? row.schedule.schedule25 : "",
      schedule30: row.schedule && row.schedule.schedule30 ? row.schedule.schedule30 : "",
      scheduleSondrio: row.schedule && row.schedule.scheduleSondrio ? row.schedule.scheduleSondrio : "",
      scheduleU: row.schedule && row.schedule.scheduleU ? row.schedule.scheduleU : "",
      scheduleMediobanca: row.schedule && row.schedule.scheduleMediobanca ? row.schedule.scheduleMediobanca : "",
    }))
  )

  /*LIST OF FUNCTIOND END */

  return (
    <>
      {
        data ? (
          <DataTable
            rows={getDataItem(JSON.parse(JSON.stringify(data).replace(/requestId/g, "id")))}
            headers={headers}
            isSortable
            render={({ rows, headers, getHeaderProps }) => {
              rows = splitData(
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
                            <TableHeader {...getHeaderProps({ header })}>
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
                            <TableCell><View16 onClick={() => ViewRow(row.id)} /></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Pagination
                    onChange={({ page, pageSize }) => {
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
        ) : (<div>
          <LoadingPage />
        </div>)
      }
    </>
  )
}
export default ActiveRequestContainer;