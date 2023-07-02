import ProgressBar from '../../progress-bar'
import { SuccessAnimation } from '../../../icons'
import styles from './progressmodal.module.css'
export default function ProgressModal ({ progress, finished }: { progress: string, finished?: boolean }): JSX.Element {
  const successAnimation = (finished !== undefined && finished)
    ? <div>
        <SuccessAnimation />
        <h2>¡Categoria Creada!</h2>
      </div>
    : <h3>Subiendo imagen</h3>

  return (
    <div>
      <div className={styles.modal__body}>
       { successAnimation }
      </div>
      <ProgressBar progress={ progress }/>
    </div>
  )
}
