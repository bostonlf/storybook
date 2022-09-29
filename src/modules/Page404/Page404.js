import React from 'react';
// import Menu from '../../components/Menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  Accordion,
  AccordionItem,
  Grid,
  Row,
  Column,
  AspectRatio,
  ComboBox,
  TextInput,
  Dropdown,
  Button
} from 'carbon-components-react';
import UserContainer from '../../container/UserContainer';

const Page404=({userRole}) => {
  return (
    <>
  <div className="maincontent">
    <h4>Welcome to Kyndryl WSE
      </h4>
      <Breadcrumb>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
    <BreadcrumbItem>Breadcrumb 4</BreadcrumbItem>
  </Breadcrumb>
    <br />
    <br />
    <br />

    <Button>Primary</Button>
<Button kind="secondary">Secondary</Button>
<Button kind="tertiary">Tertiary</Button>
<Button kind="danger">Danger</Button>
<Button kind="danger--tertiary">Danger Tertiary</Button>
<Button kind="danger--ghost">Danger Ghost</Button>
<Button kind="ghost">Ghost</Button>
<br />
    <br />
<UserContainer  />
<br />
<Accordion>
    <AccordionItem title="Section 1 title">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </AccordionItem>
    </Accordion>
    <br />
    <Grid>
      <Row>
        <Column>
          <AspectRatio ratio="1x1">Content</AspectRatio>
        </Column>
        <Column>
          <AspectRatio ratio="1x1">Content</AspectRatio>
        </Column>
        <Column>
          <AspectRatio ratio="1x1">Content</AspectRatio>
        </Column>
        <Column>
          <AspectRatio ratio="1x1">Content</AspectRatio>
        </Column>
      </Row>
    </Grid>
    <br />
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={["1","2"]}
      itemToString={() => (console.log("a"))}
      placeholder="Filter..."
      titleText="ComboBox title"
      helperText="Combobox helper text"
    />
    <br />
    <TextInput
        helperText="Optional helper text"
        id="test2"
        required
        invalidText="A valid value is required"
        labelText="Text input label"
        placeholder="Placeholder text"
      />
      <br />
      <Dropdown
      id="default"
      titleText="Dropdown label"
      helperText="This is some helper text"
      label="Dropdown menu options"
      items={["1","2","3"]}
      itemToString={(item) => (item ? item.text : '')}
      onChange={()=>(console.log("1"))}
    />
    </div>
  </>
      );
    };
export default Page404;