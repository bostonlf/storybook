import React  from 'react';
import {DataTable} from 'carbon-components-react';
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
    key: 'operator',
    header: 'Name',
  },
  {
    key: 'action',
    header: 'Action',
  },
  {
    key: 'comment',
    header: 'Comment',
  },
  {
    key: 'operationDate',
    header: 'Date',
  },
];

const HistoryContainer=({historyLog}) => {

  return (
      <DataTable
        rows={JSON.parse(JSON.stringify(historyLog).replace(/handlingEventId/g, "id"))}
        headers={headers}
        render={({rows, headers, getHeaderProps}) => {
          return (
            <>
            <br /><br /><hr /><br /><br />
              <TableContainer title="Action History">
                <Table>
                  <TableHead>
                    <TableRow>
                      {headers.map(header => (
                        <TableHeader {...getHeaderProps({header})}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.cells.map(cell =>
                              <TableCell key={cell.id}>{cell.value?cell.value:""}
                              </TableCell>
                            )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>)
        }
        }
      />
  )
}
export default React.memo(HistoryContainer);