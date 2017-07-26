'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import simpleProject from './components/simpleProject'
import oneProject from './components/oneProject'
import manyBirds from './components/manyBirds'
import separating from './components/separating'
import flocking from './components/flocking'
import flowField from './components/flowField'
import store from './store'

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route exact path="/" component={oneProject}></Route>
      <Route exact path="/1" component={simpleProject}></Route>
      <Route exact path="/2" component={manyBirds}></Route>
      <Route exact path="/3" component={separating}></Route>
      <Route exact path="/4" component={flocking}></Route>
      <Route exact path="/5" component={flowField}></Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
