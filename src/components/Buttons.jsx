export const Buttons = (props) => (
    <div id="btn-container">
      {props.btns.map(b => 
      <button id={b[0]} 
        className="btn-pad" 
        onClick={typeof b[1] === "number" || b[1] === "." ?
                 props.nums : b[1] === "C" ?
                 props.clear : b[1] === "=" ?
                 props.result : props.ops}>
        {b[1]}
      </button>)
       }
    </div>
);