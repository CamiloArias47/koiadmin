import styles from './progressbar.module.css'
export default function ProgressBar (): JSX.Element {
  return (
    <div className={styles['progress-bar']}>
      <div className={styles['progress-bar__progress']} style={{ width: '80' }}></div>
    </div>
  )
}
