import { useState, useRef } from 'react'
import InputWraper from './input-wraper'
import styles from './inputfield.module.css'
interface inputFieldType {
  id: string
  name: string
  titlename: string
  type: string
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
}

export default function InputBtn (props: inputFieldType): JSX.Element {
  const [topics, setTopics] = useState<string[]>([])
  const inputTopics = useRef<HTMLInputElement>(null)
  const { titlename, ...cleanProps } = props
  const { id } = props

  const handlerAdd = (): void => {
    if (inputTopics.current != null) {
      const newTopic = inputTopics.current.value
      if (newTopic.length > 0) {
        setTopics(prevTopics => [...prevTopics, newTopic])
        inputTopics.current.value = ''
      }
    }
  }

  const handlerKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    event.preventDefault()
    console.log({ key: event.key })
    if (event.key === 'Enter') handlerAdd()
  }

  return (
    <div>
      <InputWraper id={id} titlename={titlename}>
        <>
          <input
              ref={inputTopics}
              className={styles.input__field}
              onKeyUp={handlerKeyPress}
              onSubmit={handlerKeyPress}
              {...cleanProps}
          />
          <button type='button' className={styles.input__btn} onClick={handlerAdd}>add</button>
        </>
      </InputWraper>
      <div className={styles.topics}>
        {
          topics.map(topic => <span key={topic} className={styles.topics__topic}>{ topic }</span>)
        }
      </div>
    </div>
  )
}
