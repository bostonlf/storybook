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
    key: 'comment',
    header: 'Comment',
  },
  {
    key: 'operateDate',
    header: 'Date',
  },
];

const HistoryContainerBasic=({historyLog}) => {

  return (
      <DataTable
        rows={historyLog}
        headers={headers}
        isSortable
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
                              <TableCell key={cell.id}>{cell.value}
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
export default React.memo(HistoryContainerBasic);