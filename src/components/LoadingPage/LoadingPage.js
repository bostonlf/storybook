import React  from 'react';
import {Loading} from "carbon-components-react";

const LoadingPage = ()=>{
    return (
      <Loading
        active
        description="Loading"
        small={true}
        withOverlay={false}
      />
    )
}

export default LoadingPage;