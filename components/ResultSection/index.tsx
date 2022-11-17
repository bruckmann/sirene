import styles from './ResultSection.module.css';

type Props = {
  predictionResult: string;
}


const ResultSection = ({ predictionResult }: Props) => {
  return (
    <div className={styles.resultContainer}>
      <h1 className={styles.resultTitle}>Result:</h1>
      <h2 className={styles.result}>{predictionResult}</h2>
    </div>
  )
}


export { ResultSection }
