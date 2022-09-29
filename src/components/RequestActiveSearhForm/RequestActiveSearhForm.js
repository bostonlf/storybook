import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import {
    TextInput,
    Select, SelectItem,
    Button,Loading
} from 'carbon-components-react';
import { fetchActiveRequest } from '../../actions/act_request';
import { exportVendor, exportVendorChain } from '../../actions/act_export';
import ActiveRequestContainer from '../../container/ActiveRequestContainer';

const RequestActiveSearchForm = ({ history, userRole }) => {

    // initial state & function
    const [params, setParams] = useState(" ");

    const [companyName, setCompanyName] = useState(null);
    const [contactType, setContactType] = useState(null);
    const [contactSurname, setContactSurname] = useState(null);

    const data = useSelector(state => state.request.activepayload, shallowEqual);
    const ifRefresh = useSelector(state => state.request.ifRefresh, shallowEqual);
    const ifExportRefresh = useSelector(state => state.exportData.ifRefresh, shallowEqual);

    const dispatch = useDispatch();

    const [ifLoading, setIfLoading] = useState(false);

    useEffect(() => {
        if (params) {
            console.log(params);
            dispatch(fetchActiveRequest(params));
        }
    }, [ifRefresh, params, dispatch]);


    useEffect(() => {
        setIfLoading(false)
      }, [ifExportRefresh]);

    /*LIST OF FUNCTIOND START */

    function searchRequest() {
        let searchParams = "";
        if (companyName) {
            searchParams = searchParams + (searchParams ? "&" : "") + "companyName=" + companyName
        }
        if (contactSurname) {
            searchParams = searchParams + (searchParams ? "&" : "") + "surname=" + contactSurname
        }
        if (contactType) {
            searchParams = searchParams + (searchParams ? "&" : "") + "contactType=" + contactType
        }
        setParams(searchParams ? "?" + searchParams : " ")
    }

    function clearSearch() {
        setCompanyName(null)
        setContactSurname(null)
        setContactType(null)
    }

    function exportData() {
        setIfLoading(true)
        dispatch(exportVendor("Supplier List.xlsx"))
    }

    function exportDataChain() {
        setIfLoading(true)
        dispatch(exportVendorChain("Supplier Chain.xlsx"))
    }

    /*LIST OF FUNCTIOND END */

    return (

        <>
            <br /><hr /><br />
            <TextInput
                id="companyname"
                labelText={<strong>Company Name:</strong>}
                onChange={(e) => { setCompanyName(e.target.value) }}
                value={companyName ? companyName : ""}
            />
            <br />
            <Select
                id="type"
                value={contactType}
                onChange={(e) => { setContactType(e.target.value) }}
                labelText={<strong>Contact type:</strong>}
            >
                <SelectItem text="Please select" value="" />
                <SelectItem text="Data Privacy focal point" value="DATA_PRIVACY_FOCAL_POINT" />
                <SelectItem text="Commercial focal point" value="COMMERCIAL_FOCAL_POINT" />
                <SelectItem text="Legal focal point" value="LEGAL_FOCAL_POINT" />
            </Select>

            <br />
            <TextInput
                id="contactsurname"
                labelText={<strong>Contact Surname:</strong>}
                onChange={(e) => { setContactSurname(e.target.value) }}
                value={contactSurname ? contactSurname : ""}
            />
            <br />
            <Button onClick={() => { searchRequest() }}>Search</Button>
            <label>              </label>
            <Button onClick={() => { clearSearch() }}>Clear&nbsp; </Button>
            {ifLoading ? (
                <Loading
                    active={ifLoading}
                    small={false}
                    withOverlay={true}
                />) : (<></>)}
            {userRole === "Supplier_Manager" ? (
                <>
                    <label>              </label>
                    <Button onClick={() => { exportData() }}>Export Supplier list&nbsp; </Button>
                    <label>              </label>
                    <Button onClick={() => { exportDataChain() }}>Export Supplier chain&nbsp; </Button>
                </>
            ) : (<></>)}
            <br /><br /><hr /><br />
            <ActiveRequestContainer history={history} data={data} userRole={userRole} />
        </>
    )
}
export default RequestActiveSearchForm;