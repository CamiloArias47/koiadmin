interface imagepreviewType {
  pics?: string[]
  name?: string
}

export default function ImagePreview ({ pics = [], name = '' }: imagepreviewType): JSX.Element {
  return (
    <div className='preview'>
        {
          pics.map(pic => {
            return <button
                      key={pic}
                      className="preview__element active"
                    >
                        <img
                            src={pic}
                            alt={name}
                            width="42"
                            height="42"
                        />
                    </button>
          })
        }
    </div>
  )
}
