function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = d.toUTCString()
  const cookie = `${cname}=${cvalue}; expires=${expires}; path=/;`
  console.log('setting cookuie', cookie)
  document.cookie = cookie
}


export { setCookie }