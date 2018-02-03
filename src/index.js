import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import styles from './style.scss'




const App = () => (
  <div className='main'>
    <h1>Hello Webpack with sass</h1>
    <h3>Using theme {THEME}</h3>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))