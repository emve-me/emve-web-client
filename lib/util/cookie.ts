function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = d.toUTCString()
  const cookie = `${cname}=${cvalue}; expires=${expires}; path=/;`
  document.cookie = cookie
}

function getCookie(cname: string, cookieHeader: string) {
  const m = {}
  cookieHeader.split(';').map(item => item.trim().split('=')).forEach(item => m[item[0]] = item[1])
  return m[cname]
}

export { setCookie, getCookie }