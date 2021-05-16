import React from 'react';
import { myData } from './gallery'
import './App.css';

class App extends React.Component {

    constructor(props) {
      super(props)
    
      this.state = {
         appname:'myGallery',
         filterData:[],
         show:false,
         search:'',
         myType:'',
      }
    }

    componentDidMount(){
      this.setState({
        myType:'all'
      })
    }

    handleChange = (e) =>{
      this.setState({
        search:e.target.value,
        show:false
      })
    }

    handleClick = (types) => {
      switch (types) {
        case 'all':
          this.setState({
            filterData: myData,
            show:true,
            myType:types,
          })
        break;
        case 'new':
          this.setState({
            filterData: myData.filter((filData) => filData.tag === types),
            show:true,
            myType:types,
          })
          break;
        case 'free':
            this.setState({
              filterData: myData.filter((filData) => filData.tag === types),
              show:true,
              myType:types,
            })
            break;
        case 'pro':
            this.setState({
              filterData: myData.filter((filData) => filData.tag === types),
              show:true,
              myType:types
            })
            break;
        default:
          break;
      }
    }

    // handleSort = (type) =>{
    //   this.setState({
    //     filterData: myData.sort((a,b) => a.price > b.price ? 1:-1).filter((data) => data.tag === type)
    //   })
    // }
    

    render(){
      const {appname, filterData, show, search, myType} = this.state;
      
      const searchData = myData.filter((filData) => {
        return filData.tag.toLowerCase().includes(search.toLowerCase());
      })
      return(
        <>
          <h3 style={{textAlign:"center"}}>{appname.toUpperCase()}</h3>
          <div className="myImage_btn">
            <button  className={ myType === 'all'? 'active':''} onClick={() => this.handleClick("all")} >All</button>
            <button className={ myType === 'new'? 'active':''} onClick={() => this.handleClick("new")}>New</button>
            <button className={ myType === 'free'? 'active':''} onClick={() => this.handleClick("free")}>Free</button>
            <button className={ myType === 'pro'? 'active':''} onClick={() => this.handleClick("pro")}>Pro</button>
          </div>
          <div className="myImage_search">
            <input type="text" placeholder={`${myData.length} images availablle search here...`} onChange={(e) => this.handleChange(e)} />
            {/* <button onClick={() => this.handleSort("pro")}>Sort by Low price</button> */}
          </div>

          <div className="image_error">
            {searchData.length === 0 ? <h3>You search <span style={{color:"blue"}}>{search}</span> not available</h3>: null}
          </div>
          {show ?
          <div className="img_main">
            {filterData.map((data) => {
            return(
              <div key={data.id} className="image_show">
                <img src={`images/${data.imgName}`} alt="no" />
                <div className="image_tag">
                  <span>{data.tag}</span>
                  {/* <span>{data.price}</span> */}
                </div>
              </div>
            )
            })}
          </div>
          :
          <div className="img_main">
            {searchData.map((data) => {
            return(
              <div key={data.id} className="image_show">
                <img src={`images/${data.imgName}`} alt="no" />
                <div className="image_tag">
                  <span>{data.tag}</span>
                  {/* <span>{data.price}</span> */}
                </div>
              </div>
            )
            })}
          </div>
          }
        </>
      )
    }
}

export default App;