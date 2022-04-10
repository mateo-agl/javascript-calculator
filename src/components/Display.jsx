export const Display = (props) => (
    <div id="cont">
      <div id="result">
        {props.operacion.output}
      </div>
      <div id="display">
        {props.operacion.input}
      </div>
    </div>
);