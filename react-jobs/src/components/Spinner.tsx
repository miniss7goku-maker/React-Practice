import React from 'react'
import {ClipLoader} from 'react-spinners'
import type { CSSProperties } from 'react'
const override:CSSProperties ={
    display:'block',
    margin:'100px auto'
}
interface SpinnerProps {
  loading: boolean
}
const Spinner = ({loading = true}:SpinnerProps)=> {
  return (
    <ClipLoader color ='#4338ca'
    loading ={loading}
    cssOverride={override}
    size={150}
    />
  )
}

export default Spinner