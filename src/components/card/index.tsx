import styles from './card.module.css'
export default function Card ({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <div className={styles.card}>
      { children }
    </div>
  )
}
