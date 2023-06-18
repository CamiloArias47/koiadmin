import styles from './card.module.css'
export default function Card ({ className = '', children }: { className?: string, children: JSX.Element }): JSX.Element {
  return (
    <div className={styles.card + ' ' + className}>
      { children }
    </div>
  )
}
