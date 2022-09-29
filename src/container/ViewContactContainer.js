import React from 'react';
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
    key: 'contactType',
    header: 'Contact type',
  },
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'surname',
    header: 'Surname',
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'telephone',
    header: 'Tel.',
  },
  {
    key: 'note',
    header: 'Note',
  },
];


const ViewContactContainer=({contacts}) => {

  // initial state & function

  // Validation state

    /*LIST OF FUNCTIOND BEGIN */

  


  function cellValue(e) {
    if (e==="DATA_PRIVACY_FOCAL_POINT") {
      return "Data Privacy focal point";
    }
    else if (e==="COMMERCIAL_FOCAL_POINT") {
      return "Commercial focal point";
    }
    else if (e==="LEGAL_FOCAL_POINT") {
      return "Legal focal point";
    }
    else {
      return e;
    }
  }


  /*LIST OF FUNCTIOND END */
  return (
    contacts? (
      <DataTable
        rows={JSON.parse(JSON.stringify(contacts).replace(/options/g, "id"))}
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.cells.map(cell => (
                          <TableCell key={cell.id}>{cellValue(cell.value)} </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>)
        }
        }
      />
    ):(<></>)
  )
}

export default React.memo(ViewContactContainer);