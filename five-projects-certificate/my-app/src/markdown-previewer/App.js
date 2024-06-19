import React from "react";
// import { legacy_createStore as createStore } from "redux";
import $ from "jquery";
// import { connect, Provider } from "react-redux";
import "./styles/style.css";
import { marked } from "https://cdnjs.cloudflare.com/ajax/libs/marked/13.0.0/lib/marked.esm.js";
import Prism from "prismjs";

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
      $("#main").addClass(
        "d-flex justify-content-center align-items-center flex-column"
      );
    });
    // handle tab indentation textarea
    $("#editor").on("keydown", function (e) {
      if (e.keyCode === 9) {
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        this.value =
          this.value.substring(0, start) + "\t" + this.value.substring(end);

        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + 1;

        // prevent focus lose
        e.preventDefault();
      }
    });
    this.setState({
      text: "# This is Heading 1\n## This is Heading 2\n### This is Heading 3\n| Syntax      | Description | Test Text     |\n| :---        |    :----:   |          ---: |\n| Header      | Title       | Here's this   |\n| Paragraph   | Text        | And more      |\n\n[My Github](https://istamosh.github.io/) \n\n`This is Inline Code`\n ```html\n<div>\n\t<div>\n\t\t<p>Hello world! This is Code Block</p>\n\t</div>\n</div>\n```\n1. First item\n2. Second item\n3. Third item \n \n> This is a Blockquote \n> and this is another blockquote! \n \n![This is an Image of a kitten](https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg) \n \n**This is a Bold Text**\n <br> And this is for line breaks <br> `<br> tag`",
    });
  }
  // do every update
  componentDidUpdate() {
    Prism.highlightAll();
    $("#preview table").addClass(
      "table table-dark table-striped table-hover table-sm"
    );
  }
  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }
  render() {
    // const parse = marked.parse(this.state.text).replace(/&gt;+/g, ">");
    return (
      <>
        <Html text={this.state.text} record={this.handleChange} />
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
        value={props.text}
      ></textarea>
      <div
        id="preview"
        dangerouslySetInnerHTML={{
          __html: marked(props.text, { breaks: true }),
          // .replace(/&gt;+/g, ">"),
        }}
      ></div>
    </div>
  );
};

export default Presentational;
