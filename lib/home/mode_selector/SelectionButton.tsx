import React from 'react'

type TProps = {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}

export default ({ icon, label, onClick }: TProps) => <div className='root'
                                                          onClick={onClick}>

  { /*language=CSS*/}
  <style jsx>{`
      .root {
          background-color: #FFF;
          box-shadow: 1px 1px 1px #bbb;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border: solid 3px #999;
          border-radius: 20px;
          width: 317px;
          height: 270px;
          cursor: pointer;
      }

      .root:hover {
          background-color: aliceblue;
      }
  `}</style>
  {icon}
  <div style={{ paddingTop: 16, fontWeight: 'bold' }}>{label}</div>
</div>

