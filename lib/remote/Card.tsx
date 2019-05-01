export default ({
  children,
  style
}: {
  style?: React.CSSProperties
  children: React.ReactNode
}) => (
  <div className="root" style={style}>
    {/*language=CSS*/}
    <style jsx>
      {`
        .root {
          flex: 1;
          margin-bottom: 24px;
          background-color: #fff;
          padding: 24px;
          border-radius: 4px;
          border: solid 1px #ccc;
        }

        @media only screen and (max-width: 905px) {
          .root {
            margin-bottom: 16px;
            padding: 16px;
            border-top: solid 1px #ccc;
            border-left: none;
            border-right: none;
            border-bottom: solid 1px #ccc;
          }
        }
      `}
    </style>
    {children}
  </div>
)
