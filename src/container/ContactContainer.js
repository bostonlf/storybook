import React, {useState} from 'react';
import {DataTable, Pagination, Select, SelectItem, Modal, TextInput, Button} from 'carbon-components-react';
import {Edit16} from '@carbon/icons-react'
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


const ContactContainer=({contacts, setContacts}) => {

  // initial state & function
  const [pageNumber, setPageNumber]=useState(1);
  const [pageSize, setPageSize]=useState(5);
  const [ifDeleteModalOpen, setIfDeleteModalOpen]=useState(false);
  const [ifCreateModalOpen, setIfCreateModalOpen]=useState(false);
  const [ifNewRecord, setIfNewRecord]=useState(false);

  const [options, setOptions]=useState(null);
  const [contactType, setContactType]=useState("");
  const [email, setEmail]=useState("");
  const [name, setName]=useState("");
  const [note, setNote]=useState("");
  const [surname, setSurname]=useState("");
  const [telephone, setTelephone]=useState("");

  // Validation state
  const [ifValidContactType, setIfValidContactType]=useState(false);
  const [ifValidEmail, setIfValidEmail]=useState(false);
  const [ifValidName, setIfValidName]=useState(false);
  const [ifValidNote, setIfValidNote]=useState(false);
  const [ifValidSurname, setIfValidSurname]=useState(false);
  const [ifValidTelephone, setIfValidTelephone]=useState(false);


    /*LIST OF FUNCTIOND BEGIN */

    function newContact() {
      setContactType("")
      setName("")
      setSurname("")
      setEmail("")
      setTelephone("")
      setNote("")
      setIfCreateModalOpen(true)
      setIfNewRecord(true)
    }

  function validateContact() {
    if (contactType===""||email===""||name===""||surname==="") {
      contactType===""? setIfValidContactType(true):setIfValidContactType(false);
      email===""? setIfValidEmail(true):setIfValidEmail(false);
      name===""? setIfValidName(true):setIfValidName(false);
      //note===""? setIfValidNote(true):setIfValidNote(false);
      surname===""? setIfValidSurname(true):setIfValidSurname(false);
      //telephone===""? setIfValidTelephone(true):setIfValidTelephone(false);
    }
    else {
      saveContact()
    }
  }

  function saveContact() {
    var params={
      options: ifNewRecord? ((Date.now()).toString()):options,
      contactType: contactType,
      email: email,
      name: name,
      note: note,
      surname: surname,
      telephone: telephone,
    }
    let arr=[]
    if (ifNewRecord) {
      arr=contacts.concat(params)
    }
    else {
      for (var j=0; j<contacts.length; j++) {
        if (contacts[j].options===params.options) {
          arr.push(params)
        }
        else {
          arr.push(contacts[j])
        }
      }
    }
    setContacts(arr)
    setIfCreateModalOpen(false)
  }

  //Edit record
  const EditRow=(id) => {
    for (var i=0; i<contacts.length; i++) {
      if (id===contacts[i].options) {
        setOptions(contacts[i].options)
        setContactType(contacts[i].contactType)
        setName(contacts[i].name)
        setSurname(contacts[i].surname)
        setEmail(contacts[i].email)
        setTelephone(contacts[i].telephone)
        setNote(contacts[i].note)
        setIfCreateModalOpen(true)
        setIfNewRecord(false)
      }
    }
  };


  //delete selected record
  function deleteSelectedRow(selectedRow, rows) {
    let arr=[];
    for (var i=0; i<selectedRow.length; i++) {
      for (var j=0; j<contacts.length; j++) {
        if (contacts[j].options===selectedRow[i].id) {
          arr.push(rows[j])
        }
      }
    }
    var finalarray=contacts.filter(el => !arr.includes(el))
    setContacts(finalarray)
    setIfDeleteModalOpen(false)
  }

  function closeDeleteModal() {
    setIfDeleteModalOpen(false)
  }

  function closeCreateModal() {
    setIfCreateModalOpen(false)
  }

  function onChangeCheck(e, text, setValue, setValid) {
    setValue(e)
    if (e===text) {
      setValid(true)
    }
    else {
      setValid(false)
    }
  }

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

  /*LIST OF FUNCTIOND END */
  return (
    contacts? (
      <DataTable
        rows={JSON.parse(JSON.stringify(contacts).replace(/options/g, "id"))}
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
                <Modal
                  aria-label="create/edit contact modal"
                  onRequestSubmit={() => validateContact()}
                  onSecondarySubmit={() => {closeCreateModal()}}
                  onRequestClose={() => {closeCreateModal()}}
                  open={ifCreateModalOpen}
                  primaryButtonDisabled={false}
                  primaryButtonText="Yes"
                  secondaryButtonText="Cancel"
                >
                  <Select
                    id="type"
                    value={contactType}
                    onChange={(e) => {onChangeCheck(e.target.value,"", setContactType, setIfValidContactType)}}
                    invalid={ifValidContactType}
                    invalidText="A valid value is required"
                    labelText={<strong>Contact type:<span className="required-css-class">*</span></strong>}
                  >
                    <SelectItem text="Please select" value="" />
                    <SelectItem text="Data Privacy focal point" value="DATA_PRIVACY_FOCAL_POINT" />
                    <SelectItem text="Commercial focal point" value="COMMERCIAL_FOCAL_POINT" />
                    <SelectItem text="Legal focal point" value="LEGAL_FOCAL_POINT" />
                  </Select>
                  <br />
                  <TextInput
                    id="name"
                    invalid={ifValidName}
                    invalidText="A valid value is required"
                    labelText={<strong>Name:<span className="required-css-class">*</span></strong>}
                    value={name}
                    onChange={(e) => {onChangeCheck(e.target.value,"", setName, setIfValidName)}}
                  />
                  <br />
                  <TextInput
                    id="surname"
                    invalid={ifValidSurname}
                    invalidText="A valid value is required"
                    labelText={<strong>Surname:<span className="required-css-class">*</span></strong>}
                    value={surname}
                    onChange={(e) => {onChangeCheck(e.target.value,"", setSurname, setIfValidSurname)}}
                  />
                  <br />
                  <TextInput
                    id="email"
                    invalid={ifValidEmail}
                    invalidText="A valid value is required"
                    labelText={<strong>Email:<span className="required-css-class">*</span></strong>}
                    value={email}
                    onChange={(e) => {onChangeCheck(e.target.value,"", setEmail, setIfValidEmail)}}
                  />
                  <br />
                  <TextInput
                    id="telephone"
                    invalid={ifValidTelephone}
                    invalidText="A valid value is required"
                    labelText={<strong>Telephone:</strong>}
                    value={telephone}
                    onChange={(e) => {setTelephone(e.target.value)}}
                  />
                  <br />
                  <TextInput
                    id="note"
                    invalid={ifValidNote}
                    invalidText="A valid value is required"
                    labelText={<strong>Note:</strong>}
                    value={note}
                    onChange={(e) => {setNote(e.target.value)}}
                  />
                </Modal>
                <TableToolbar>
                  <Button onClick={() => {newContact()}}>Create</Button>
                  <TableBatchActions {...getBatchActionProps()} >
                    <Button onClick={() => setIfDeleteModalOpen(true)}>Delete</Button>
                    <Modal
                      aria-label="delete contact modal"
                      modalHeading="Warning"
                      onRequestSubmit={() => deleteSelectedRow(selectedRows, contacts)}
                      onSecondarySubmit={() => {closeDeleteModal()}}
                      onRequestClose={() => {closeDeleteModal()}}
                      open={ifDeleteModalOpen}
                      danger
                      primaryButtonDisabled={false}
                      primaryButtonText="Yes"
                      secondaryButtonText="Cancel" >
                      <p className="bx--modal-content__text">
                        Are you sure to delected the selected item(s)?</p>
                    </Modal>
                    <Modal aria-label="none"></Modal>
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
                pageSizes={[5, 10, 20]}
                totalItems={contacts.length}
              />
            </>)
        }
        }
      />
    ):(<></>)
  )
}

export default React.memo(ContactContainer);