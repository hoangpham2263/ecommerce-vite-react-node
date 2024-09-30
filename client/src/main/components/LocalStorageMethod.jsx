const LocalStorageGetInfo = () => {
  return JSON.parse(localStorage.getItem('infoAccountLogin'))?.userPresent
}

export { LocalStorageGetInfo }
