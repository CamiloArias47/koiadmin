interface pageLayoutTypes {
  header?: JSX.Element | string
  body?: JSX.Element | string
  aux?: JSX.Element | string
}

export default function PageLayout ({ header = '', body = '', aux = '' }: pageLayoutTypes): JSX.Element {
  return (
       <div className="page-container">
        <div className="page-container__main">
          <div className="page-container__header">
              {header}
          </div>
          <div className="page-container__body">
              {body}
          </div>
        </div>
        <div className="page-container__aux">
            {aux}
        </div>
      </div>
  )
}
