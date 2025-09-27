import React from 'react'

function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto  px-4' >{children}</div>
  )
}

export default Container



/*

This is a reusable component which will be used in Header and Footer component to wrap their content inside it.
What children means here :-
In React, every component can receive a built-in prop called children.
It represents whatever you put inside the component’s opening and closing tags.

*/