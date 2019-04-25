type TProps = {
  onClick?: React.MouseEventHandler<SVGElement>
  size?: number | string
  style?: React.CSSProperties
}

export default ({ onClick, size = 24, style }: TProps) => (
  <svg onClick={onClick}
       style={style}
       width={size}
       height={size}
       viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>)