import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import Menu from './components/Menu';

// Modules
import Page404 from './modules/Page404';

const App = () => {

  return (
    <>
      <Menu />
      <Content>
        <Routes>
          <Route path="/" element={<Page404 />} />
        </Routes>
      </Content>
    </>
  );
}

export default App;
