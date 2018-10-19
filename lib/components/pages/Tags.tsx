import * as React from 'react'
import TagBranch from './TagBranch'

import { withRouter } from 'next/router'

const Tags = (props) => {

  return <div><TagBranch parent={props.router.query.id || 'root'}/></div>
}

export default withRouter(Tags)