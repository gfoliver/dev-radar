import React from 'react'
import { Button } from 'react-bootstrap'

export default function DevItem({dev, deleteDev}) {
    return (
        <div className="DevItem">
            <div className="buttonsWrapper">
                {/* <Button variant="light" className="edit">...</Button> */}
                <Button variant="danger" className="delete" onClick={()=> {deleteDev(dev)}}>X</Button>
            </div>
            <div className="info">
                <img src={dev.avatar_url} alt={dev.name} className="image"/>
                <div className="name">{dev.name || dev.github_username}</div>
                <div className="techs">{dev.techs.join(', ')}</div>
            </div>
            <div className="bio">{dev.bio}</div>
            <a href={`https://github.com/${dev.github_username}`} className="text-primary mt-auto">Github Profile</a>
        </div>
    )
}