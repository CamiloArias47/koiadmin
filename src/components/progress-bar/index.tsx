import styles from './progressbar.module.css'
export default function ProgressBar ({ progress }: { progress: string }): JSX.Element {
  return (
    <div className={styles['progress-bar']}>
      <div className={styles['progress-bar__progress']} style={{ width: progress + '%' }}></div>
    </div>
  )
}
