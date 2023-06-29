import { useState, useRef } from 'react'
import InputWraper from './input-wraper'
import styles from './inputfield.module.css'
import { CloseIcon } from '../../icons'
interface inputFieldType {
  id: string
  name: string
  titlename: string
  type: string
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
  getTopics?: (topics: string[]) => void
  error?: string
}

export default function InputBtn (props: inputFieldType): JSX.Element {
  const [topics, setTopics] = useState<string[]>([])
  const inputTopics = useRef<HTMLInputElement>(null)
  const { titlename, getTopics, error, ...cleanProps } = props
  const { id } = props

  const handlerAdd = (): void => {
    if (inputTopics.current != null) {
      const newTopic = inputTopics.current.value
      if (newTopic.length > 0) {
        const exist = topics.find(topic => topic.toLocaleLowerCase() === newTopic.toLocaleLowerCase())
        if (exist === undefined) {
          setTopics(prevTopics => {
            const updatedTopics = [...prevTopics, newTopic]
            if (getTopics !== undefined) getTopics(updatedTopics)
            return updatedTopics
          })
        }
        inputTopics.current.value = ''
        inputTopics.current.focus()
      }
    }
  }

  const handlerKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handlerAdd()
    }
  }

  const handlerDelete = (delTopic: string): void => {
    const newTopics = topics.filter(topic => topic !== delTopic)
    setTopics(newTopics)
    if (getTopics !== undefined) getTopics(newTopics)
  }

  return (
    <div>
      <InputWraper id={id} titlename={titlename} error={error} >
        <>
          <input
              ref={inputTopics}
              className={styles.input__field}
              onKeyDown={handlerKeyPress}
              onSubmit={handlerKeyPress}
              {...cleanProps}
          />
          <button type='button' className={styles.input__btn} onClick={handlerAdd}>Agregar</button>
        </>
      </InputWraper>
      <div className={styles.topics}>
        {
          topics.map(topic => (
            <span key={topic} className={styles.topics__topic}>
              { topic }
              <button type="button" className={styles.topics__delete} onClick={() => { handlerDelete(topic) }}>
                <CloseIcon className={styles['close-icon']} width="12" />
              </button>
            </span>
          ))
        }
      </div>
    </div>
  )
}
