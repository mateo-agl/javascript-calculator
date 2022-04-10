import React from "react";
import { Buttons } from "./components/Buttons.jsx";
import { Display } from "./components/Display.jsx";
import "./app.css";

export class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        output: "",
        input: 0,
        num: "",
        btns: [
          ["clear", "C"],
          ["divide", "/"],
          ["multiply", "*"],
          ["subtract", "-"],
          ["nine", 9],
          ["eight", 8],
          ["seven", 7],
          ["add", "+"],
          ["six", 6],
          ["five", 5],
          ["four", 4],
          ["three", 3],
          ["two", 2],
          ["one", 1],
          ["equals", "="],
          ["decimal", "."],
          ["zero", 0]
        ]
      }
      
      this.handleNums = this.handleNums.bind(this);
      this.Ops = this.Ops.bind(this);
      this.handleClear = this.handleClear.bind(this);
      this.handleResult = this.handleResult.bind(this);
    }
    
    handleResult() {
      if(/\D$/.test(this.state.output)) {
        this.setState({
          output: eval(this.state.output + this.state.input),
          input: eval(this.state.output + this.state.input),
          num: eval(this.state.output + this.state.input)
        })
      } else {
        this.setState({
          output: eval(this.state.output),
          input: eval(this.state.output),
          num: eval(this.state.output)
        })
      }
    }
    
    handleNums(e) {
      const stateNum = this.state.num;
      const newNum = e.target.textContent;
      const sum = stateNum + newNum;
      const regex = /^\d+$|^\d+\.\d+$|^\.\d+$|^\d+\.$/;
      if(this.state.output === 0) {
        this.setState({
          output: Number(this.state.output + newNum),
          input: sum,
          num: sum
        })
      } else if(sum === "00") {
        this.setState({
          output: this.state.output,
          input: stateNum,
          num: stateNum,
        })
      } else if(sum === ".") {
        this.setState({
          output: this.state.output + "0.",
          input: "0.",
          num: "0.",
        })
      } else {
        this.setState({
          output: regex.test(sum) ? this.state.output + newNum : this.state.output,
          input: regex.test(sum) ? sum : stateNum,
          num: regex.test(sum) ? sum : stateNum,
        })
      }
    }
    
    Ops(e) {
      let output = this.state.output;
      let regex = /\D+$/;
      let newOp = e.target.textContent;
      if(regex.test(output)) {
        let stateOp = output.match(regex);
        if(stateOp[0].length === 1 && newOp === "-") {
          this.setState({
            output: output + newOp,
            input: 0,
            num: "",
          })
        } else if(stateOp[0].length === 2) {
          this.setState({
            output: output.slice(0, output.length - 2) + newOp,
            input: 0,
            num: "",
          })
        } else {
          this.setState({
            output: output.slice(0, output.length - 1) + newOp,
            input: 0,
            num: "",
          })
        }
      } else {
        this.setState({
          output: output + newOp,
          input: 0,
          num: "",
        })
      }
    }
    
    handleClear(e) {
      this.setState({
        output: "",
        input: 0,
        num: "",
      })
    }
    
    render() {
      return (
        <div id="container">
          <Display operacion={this.state}/>
          <Buttons
            btns={this.state.btns}
            nums={this.handleNums}
            ops={this.Ops}
            clear={this.handleClear}
            result={this.handleResult}/>
        </div>
      )
    }
};