import SearchIcon from '../icons/SearchIcon'

export default () => <div style={{
  padding: '20px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}}>

  <SearchIcon size={200} fill={'#666'}/>
  <div style={{ fontSize: 30 }}>Nothing Playing</div>
  <div style={{ paddingTop: 6 }}>Start typing to find a song ...</div>
</div>