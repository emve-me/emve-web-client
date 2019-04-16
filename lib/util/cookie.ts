function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = d.toUTCString()
  const cookie = `${cname}=${cvalue}; expires=${expires}; path=/;`
  document.cookie = cookie
}

function getCookie(cname: string, cookieHeader: string) {
  const m: Record<string, string> = {}
  cookieHeader.split(';').map(item => item.trim().split('=')).forEach(item => m[item[0]] = item[1])
  const value = m[cname]
  console.log(cname, value, typeof value, value.trim().length === 0, 'should return null', value && value.trim().length === 0)

  if (!value) {
return null
  }

    if (value.trim().length === 0) {

      return null
    }
  

  return value
}

function deleteCookie(cname: string) {
  const d = new Date()
  d.setTime(0)
  const expires = d.toUTCString()
  const cookie = `${cname}=; expires=${expires}; path=/;`
  document.cookie = cookie
}

export { setCookie, getCookie, deleteCookie }