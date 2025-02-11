import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='px-1 py-1 rounded-sm text-slate-900  flex items-start justify-center mx-0 overflow-hidden'
    >
        <div className='overflow-y-auto w-full' style={{minHeight:"calc(100vh - 100px)"}}>{children}</div>
    </div>
  )
}

export default Layout