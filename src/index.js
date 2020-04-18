import React from 'react';
import ReactDom from 'react-dom';
import App from './routes/App'

const container = document.getElementById('root')

ReactDom.render(<div>
    <App></App>
</div>, container)