import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'



import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
        <App />
    </ChakraProvider>
  </React.StrictMode>,
)

/*

fix when add item, item added twice
Add function,
update function,
delete function
sort by each category
search
one month, one year

npm install @chakra-ui/react @chakra-ui/icons

npm install react-chartjs-2 chart.js

npm install axios

npm install chart.js react-chartjs-2


cd expenseTrackerd
npm install
npm run dev

export
edit last one
filter and search*/