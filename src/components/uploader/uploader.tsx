import React, { Component } from 'react'
import axios from 'axios'
import { storage } from '../firebase/firebaseConfig'

class Uploader extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            objId: this.props.objId,
            images: new Array(20),
            imagesURL: new Array(20),
            storageRef: storage.ref(),
            image: undefined,
            description: undefined
        }
    }


    uploadImages = (event) => {
        const { images, storageRef, objId } = this.state

        event.preventDefault()
        console.log(event.target)
        console.log(images)
        

        /*
                let requests = [1,2,3].map((item) => {
            return new Promise((resolve) => {
            asyncFunction(item, resolve);
            });
        })

        Promise.all(requests).then(() => console.log('done'));*/

        let idx = 0;
        const requests = images.map((elem) => {
            return new Promise((resolve) => {
                console.log(idx)
                if (images[idx]) { 
                    const image = images[idx]
                    const path = objId + '/' + idx + '.jpg' 
                    const fileRef = storageRef.child(path)
                    const task = fileRef.put(image)
                    task.then(snapshot => {
                        fileRef.getDownloadURL().then((res) => {
                            console.log(res)
                            const arr = this.state.imagesURL
                            arr[idx] = res
                            this.setState({image: res, imagesURL: arr})
                
                        })
                        console.log(snapshot)
                    })
                }
                idx++
                resolve()
            })
        })

        Promise.all(requests).then(async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            }
    
            await axios.post('http://localhost:5000/artifact', {objId: objId, imageUrl: this.state.imagesURL, description: this.state.description}, config).then(res => {
                console.log(res)
            }).catch(err => {
                console.log("Error uploading images:  " + err)
            })
        })
    }

    addImage = (event, idx) => {
        console.log(event)
        const image = event.target.files[0]
        const arr = this.state.images
        arr[idx] = image
        this.setState({
            images: arr
        })
    }

    addDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return(
            <>
                <form onSubmit = {this.uploadImages}>
                    <h1>UPLOAD</h1>
                    <input onChange = {this.addDescription} type = 'text' required /> <br/>
                    <input onChange = {(e) => this.addImage(e, 0)} type = 'file' accept="image/x-png, image/jpeg" required/> <br/>
                    <input onChange = {(e) => this.addImage(e, 1)} type = 'file' accept="image/x-png, image/jpeg" required/> <br/>
                    {/* <input type = 'file' required/> <br/> */}
                    {/* <input type = 'file' required/> <br/> */}
                    <button type = 'submit' >Upload</button>
                </form>

                <img alt = ""  src = {this.state.image}/>
            </>
        )
    }

}

export default Uploader