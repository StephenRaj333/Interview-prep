import React from 'react';

const Basics = () => {

    const H1Tag = React.createElement('h2',{className: 'text-3xl text-white'},'Hey Stephen !');
    const cloneElement = React.cloneElement(<h1>Hello World !</h1>,{className: 'title'},'Hello Dinasour !');
    return(
        <>
            <div className="container max-w-[500px] mx-auto"> 
                <h1>Hello World !</h1> 
                {cloneElement}
            </div>   
        </>
    )
}

export default Basics;