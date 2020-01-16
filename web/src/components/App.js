import React, {useState, useEffect} from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Form from './Form'
import DevItem from './DevItem'
import '../scss/App.scss'
import api from '../services/api'

function App() {
  const [devs, setDevs] = useState([])

  function fetchDevs() {
    api.get('/devs')
          .then(response => {
            setDevs(response.data)
          })
          .catch(error => {
            console.log(error)
          })
  }

  useEffect(() => {
    fetchDevs()
  }, [])

  function addDev(dev) {
    setDevs([...devs, dev])
  }

  function deleteDev(dev) {
    const {github_username} = dev

    api.post('/devs/delete', {
      github_username
    }).then(response => {
      if (response.data.status) {
        fetchDevs()
      }
    }).catch(error => console.log(error))
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col md="12">
            <h1 className="text-center text-primary font-weight-bold">DevRadar</h1>  
          </Col>
          <Col md="5">
            <Form addDev={addDev} />
          </Col>
          <Col md="7">
            <div className="DevsWrapper">
              {devs.map(dev => (
                <DevItem key={dev._id} dev={dev} deleteDev={deleteDev} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
