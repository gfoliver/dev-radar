import React, { useState, useEffect } from 'react'
import { FormGroup, FormControl, Button, FormLabel, Row, Col } from 'react-bootstrap'
import api from '../services/api'

export default function Form({addDev}) {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords

                setLatitude(latitude)
                setLongitude(longitude)
            }
        )
    })

    const [username, setUsername] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        if (! username || !techs) {
            alert('Missing Fields !')
            return false;
        }

        api.post('/devs', {
            github_username: username,
            techs,
            latitude,
            longitude
        }).then(response => {
            if (response.data.status) {
                setUsername('')
                setTechs('')
                setLatitude('')
                setLongitude('')
                addDev(response.data.dev)
            }
            else {
                alert(response.data.message)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="Form">
            <h4 className="text-center mb-4">Register</h4>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel htmlFor="username">Github Username</FormLabel>
                    <FormControl 
                        type="text" 
                        id="username"
                        required 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="techs">Techs</FormLabel>
                    <FormControl 
                    type="text" 
                    id="techs"
                    required
                    value={techs} 
                    onChange={e => setTechs(e.target.value)}  
                />
                </FormGroup>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <FormLabel htmlFor="latitude">Latitude</FormLabel>
                            <FormControl 
                                type="number" 
                                id="latitude" 
                                value={latitude} 
                                onChange={e => setLatitude(e.target.value)} 
                            />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <FormGroup>
                            <FormLabel htmlFor="longitude">Longitude</FormLabel>
                            <FormControl 
                                type="number" 
                                id="longitude"
                                value={longitude} 
                                onChange={e => setLongitude(e.target.value)}  
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button variant="primary" type="submit">Submit</Button>
            </form>
        </div>
    )
}