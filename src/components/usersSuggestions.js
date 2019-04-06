import React from 'react'

const Suggestions = (props) => {
    return (
        <>
        <div className="ui middle aligned divided list">
    
    <div className="centered content"> Active Users </div>
    
  <div className="item">
    <div className="right floated content">
      <div className="ui button">Add</div>
    </div>
    <img className="ui avatar image" src="/images/avatar2/small/lena.png "/>
    <div className="content">
      Lena
    </div>
  </div>
  <div className="item">
    <div className="right floated content">
      <div className="ui button">Add</div>
    </div>
    <img className="ui avatar image" src="/images/avatar2/small/lindsay.png" />
    <div className="content">
      Lindsay
    </div>
  </div>
  <div className="item">
    <div className="right floated content">
      <div className="ui button">Add</div>
    </div>
    <img className="ui avatar image" src="/images/avatar2/small/mark.png" />
    <div className="content">
      Mark
    </div>
  </div>
  <div className="item">
    <div className="right floated content">
      <div className="ui button">Add</div>
    </div>
    <img className="ui avatar image" src="/images/avatar2/small/molly.png" />
    <div className="content">
      Molly
    </div>
  </div>
</div>

        </>
    )
}

export default Suggestions;