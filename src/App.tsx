import React, { Component } from 'react';
import axios from 'axios'
import * as firebase from 'firebase/app'
import 'firebase/storage'
import 'custom-env'

// function App (props) {
//   const [artifact, setArtifact] = useState({})

//   const firebaseConfig = {
//     apiKey: "AIzaSyCSOcIEV7IgvCf-tfUIKRuz4yVOLnhE1co",
//     authDomain: "pennmuseumtest.firebaseapp.com",
//     databaseURL: "https://pennmuseumtest.firebaseio.com",
//     projectId: "pennmuseumtest",
//     storageBucket: "pennmuseumtest.appspot.com",
//   }


//   if (!firebase.app.length) {
//     firebase.initializeApp(firebaseConfig)
//   }
 
//   // componentDidMount = async() => {
//   //   await this.getArtifact('123')
//   // }

//   const getArtifact = async (id:string) => {
//     const path = process.env.REACT_APP_APIURL
//     const url = path + id

//     const res = await axios.get(url).then(res => {
//       return res
//     }).then(res => {
//       setArtifact({
//         response: res
//       })
//     })
    
//     return <div>hi</div>

//   }


//   console.log(artifact)

//   return (
//     <>
//       <h1>HI</h1>
//       <button onClick = {async () => getArtifact('123')}> hi</button>
//     </>
//   )
// }

// export default App;


class App extends Component<{}, any> {
  constructor(props) {
    super(props)
    this.state = {
      artifact: ""
    }

    const firebaseConfig = {
      apiKey: "AIzaSyCSOcIEV7IgvCf-tfUIKRuz4yVOLnhE1co",
      authDomain: "pennmuseumtest.firebaseapp.com",
      databaseURL: "https://pennmuseumtest.firebaseio.com",
      projectId: "pennmuseumtest",
      storageBucket: "pennmuseumtest.appspot.com",
    }

    if (!firebase.app.length) {
      firebase.initializeApp(firebaseConfig)
    }

  }

  async componentDidMount() {
    const artifact = await this.getArtifact('123')
    console.log("ARTIFACT " + artifact)
    this.setState({artifact})

  }

  getArtifact = async (id: string) => {
    const path = process.env.REACT_APP_APIURL
    const url = path + id
    console.log(url)

    const res = await axios.get(url).then(res => {
      console.log(res['data']['id'])
      this.setState({artifact: res['data']['id']})
      return res['data']['id']
    })

    return res
  }

  render(){
    
    const { artifact } = this.state
    console.log("1293i1293i2190i321 " + artifact)

    return (
      <button>{ artifact }</button>
    )
  }
}

export default App;