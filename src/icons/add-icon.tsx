export default function AddIcon (props: any): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" {...props}>
        <g fill="none" fillRule="evenodd">
        <path d="M0 0h22v22H0z" />
        <g fill="currentColor" transform="translate(2 2)">
            <rect width={2} height={18} x={8} rx={1} />
            <path d="M18 9a1 1 0 0 1-1 1H1a1 1 0 0 1 0-2h16a1 1 0 0 1 1 1Z" />
        </g>
        </g>
    </svg>
  )
}
