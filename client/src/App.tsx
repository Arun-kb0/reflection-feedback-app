import { Button } from '@material-tailwind/react'
import React from 'react'


const App = () => {
  return (
    <div className='bg-black min-h-screen flex justify-center '>
      <h1 className='text-white'>App</h1>
      <div>
        <Button> click </Button>
      </div>
    </div>
  )
}

export default App