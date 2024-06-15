import React from "react";
// import { legacy_createStore as createStore } from "redux";
import $ from "jquery";
// import { connect, Provider } from "react-redux";
// import "./styles/style.css";
import { marked } from "https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/lib/marked.esm.js";

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    $(document).ready(function () {
      $("#main")
        .addClass("d-flex justify-content-center align-items-center")
        .css({
          width: "50vw",
          height: "50vh",
          margin: "0 auto",
        });
      //   $("#editor").val(
      //     ```
      //         # This is Heading 1
      //         ## This is Heading 2
      //         ### This is Heading 3
      //         [My Github](https://istamosh.github.io/)
      //         \'This is Inline Code\'
      //         \`\`\`<div>
      //         <div>
      //         <p>Hello world! This is Code Block</p>
      //         </div>
      //         </div> \`\`\`
      //         1. First item
      //         2. Second item
      //         3. Third item
      //         > This is a Blockquote
      //         ![This is an Image](https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg)
      //         **This is a Bold Text**
      //         ```
      //   );
    });
  }
  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }
  render() {
    const parse = marked.parse(this.state.text);
    return (
      <>
        <Html record={this.handleChange} html={parse} />
      </>
    );
  }
}

const Html = (props) => {
  return (
    <div id="main">
      <textarea
        spellCheck="false"
        name="editor1"
        id="editor"
        onChange={props.record}
      ></textarea>
      <div id="preview" dangerouslySetInnerHTML={{ __html: props.html }}></div>
    </div>
  );
};

export default Presentational;
