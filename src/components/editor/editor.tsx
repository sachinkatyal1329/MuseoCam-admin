import React, { Component } from 'react'
import axios from 'axios'


class Editor extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state =  {
            objId: undefined,
            description: undefined,
        }
    }

    editForm = async (e) => {
        e.preventDefault()
        await axios.put("http://localhost:5000/artifact", 
            {
                objId: this.state.objId,
                description: this.state.description
            }
        )
    }

    deleteArtifact = async (e) => {
        console.log(this.state.objId)
        const res = await axios.delete('http://localhost:5000/artifact/',  { 
            data: {
                 objId: this.state.objId
                } 
        })
        console.log(res)
    }

    render() {
        return(
            
            <>
                <h1>EDITOR</h1>
                <form onSubmit = {this.editForm}>
                    <input onChange = {(e) => this.setState({objId: e.target.value})} type = "text" name = "objectID" required/>
                    <input onChange = {(e) => this.setState({description: e.target.value})} type = "text" name = "info"/>
                    <button type = "submit">Edit</button>
                </form>
                <button onClick = {this.deleteArtifact}>DELETE</button>
            </>
        )
    }

}

export default Editor