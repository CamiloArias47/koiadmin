import ProgressBar from '../../progress-bar'
export default function ProgressModal ({ progress }: { progress: string }): JSX.Element {
  return (
    <div>
        Subiendo imagen:
        <ProgressBar progress={ progress }/>
    </div>
  )
}
