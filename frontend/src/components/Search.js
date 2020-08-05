import React from "react";
import axios from "axios";
import "./Search.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      dt: [],
      value: 0,
      tablevalue:0,
      invalidvalue:0
    };
  }

  call = () => {


    var b = [];
    var self = this;
    // http://localhost:5000/data
    axios
      .get("/data")
      .then((response) => {
        // handle success
        var a = JSON.stringify(response);
        a.toLowerCase();
       // console.log(a);
        
        var separators = [
          " ",
          "\\\\n",
          "\\.",
          "\\\\",
          "\\/",
          "\\'",
          ",",
          "\\-",
          "\\_",

          "\\*",
          "\\(",
          "\\)",
          "/",
          "[",
          "]",
          ":",
          '\\"',
          "}",
          "{",
          "@",
          "\\?",
          "\\;",
          "[0-9]",
          ">",
          "<",
        ];
       // console.log(separators.join("|"));
        b = a.split(new RegExp(separators.join("|"), "g"));
        //After spliting value
        //console.log(b);

        var ob = []
        //making hashmap objec of words frequency
        for (var i = 0; i < b.length; i++) {
          if (!(b[i] in ob && b[i] !== "")) {
            ob[b[i]] = 1;
          } else {
            ob[b[i]] = ob[b[i]] + 1;
          }
        }

       // console.log(ob);
        //sorting according to their frequency

        var final = Object.entries(ob).sort((a, b) => b[1] - a[1]);
        //console.log("my final result:", final);
        var result = [];
        if(this.state.value<final.length){
        for (i = 0; i < this.state.value; i++) {
          result[i] = final[i];
        }

        self.setState({
          dt: result,
          tablevalue:1,
          invalidvalue:0
        });
        //console.log(self.state.dt);
      }
      else{
        self.setState({
          tablevalue:0,
          invalidvalue:1
        })
      }
      })
      
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  inputHandler = (e) => {
    this.setState({
      value: e.target.value,
    });

    console.log(this.state.value);
  };

  render() {

    return (
      <div className="bd">
        <center>
          <div>
            <input
              className="searchbar"
              type="text"
              placeholder="Enter the number..... "
              onChange={this.inputHandler}
            />

            <button className="bts" onClick={() => this.call()}>
              submit
            </button>
          </div>
        </center>
       {
         this.state.tablevalue===1?
        <center>
          <div className="tb">
            <TableContainer component={Paper} className="container">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow className="tablehead">
                    <TableCell className="tablehead">Words</TableCell>
                    <TableCell className="tablehead" align="right">
                      Frequency
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.dt.map((row) => (
                    <TableRow key={row[0]}>
                      <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell>
                      <TableCell align="right">{row[1]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </center> : ""
  }
  {
    this.state.invalidvalue===1?

<center>
  <div className="invalidinput">
  <p>Invalid Input</p>
  </div>

</center> :""

  }
      </div>
    );
  }
}

export default Search;
