import { PropsWithChildren } from "react"

import styles from "./container.module.css"

const Container = (props: PropsWithChildren) => {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}

export default Container
