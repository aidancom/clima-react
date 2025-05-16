import { type ReactNode } from 'react'
import styles from './Error.module.css'

type ErrorProp = {
  children: ReactNode
}

const Error = ({children}: ErrorProp) => {
  return (
    <p className={styles.error}>
      {children}
    </p>
  )
}

export default Error
