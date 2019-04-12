import React from "react";




const SearchCard = (props) => {

    const handleClick = (e) =>{
        // console.log('e.target', e.target)
        // if(e.target.getAttribute('name')) console.log('yeS')
        props.handleClick(props.id)   
    }

    return (
        <>
  <div class="card" onClick={handleClick}>
    <div class="image">
      <img src={props.image} style={{"width":"100%", "height":"100%","objectFit":"contain"}}/>
    </div>
    <div class="content">
      <div class="header"> {props.name}</div>

      <div class="description">
        {props.bio}
      </div>
    </div>
    <div class="extra content">
      <span class="right floated">

        Joined:  {props.joined}
      </span>   
      <span>
        <i class="user icon"></i>
        {props.supporters}
      </span>
      
    </div>
    <div class="ui bottom attached button" name="support">
      <i class="add icon"></i>
      Support
    </div>

  </div>


        </>
    )

}

export default SearchCard;