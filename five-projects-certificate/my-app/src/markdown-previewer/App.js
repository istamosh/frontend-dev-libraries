import React, { useState, useEffect } from "react";
import $ from "jquery";
// import { connect, Provider } from "react-redux";
import "./styles/style.css";
import { marked } from "https://cdnjs.cloudflare.com/ajax/libs/marked/13.0.0/lib/marked.esm.js";
import Prism from "prismjs";
import { createStore, applyMiddleware } from "redux";
import { useDebounce } from "use-debounce";
import logger from "redux-logger";

const reduxOperation = (state, action) => {
  switch (action.type) {
    case "EXEC":
      return action.text;
    default:
      return state;
  }
};
const saveCurrentState = (text) => ({ type: "EXEC", text });
const store = createStore(reduxOperation, applyMiddleware(logger));

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
      // handle tab indentation textarea
      $("#editor")
        .on("keydown", function (e) {
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
        })
        .addClass("form-control font-monospace lh-sm text-nowrap shadow");
      $(".editor-area label").addClass(
        "form-label m-0 ms-2 d-block text-truncate text-white lead fs-6"
      );
      $(".editor-area h1").addClass("text-nowrap text-center");
      $("#preview").addClass("border border-1 rounded p-2 bg-body shadow");
    });

    this.setState({
      text: "# This is Heading 1\n## This is Heading 2\n### This is Heading 3\n| Syntax      | Description | Test Text     |\n| :---        |    :----:   |          ---: |\n| Header      | Title       | Here's this   |\n| Paragraph   | Text        | And more      |\n\n[My Github](https://istamosh.github.io/) \n\n`This is an Inline Code`\n ```html\n<div>\n\t<div>\n\t\t<p>Hello world! This is Code Block</p>\n\t</div>\n</div>\n```\n1. First item\n2. Second item\n3. Third item \n \n> This is a Blockquote \n> and this is another blockquote! \n \n![This is an Image of a kitten](https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg) \n \n**This is a Bold Text**\n <br> And this is for line breaks <br> `<br> tag`",
    });
    // setTimeout(() => {
    //   store.dispatch(saveCurrentState(this.state.text));
    // }, 1500)
  }
  // do every update
  componentDidUpdate() {
    Prism.highlightAll();

    $("#preview table").addClass(
      "table table-dark table-striped table-hover table-sm"
    );
    $("#preview img").addClass("mw-100");
    $("#preview h1").addClass("border-bottom border-5 rounded-bottom");
    $("#preview h2").addClass("border-bottom border-3 rounded-bottom");
    $("#preview h3").addClass("border-bottom border-1 rounded-bottom");
    $("#preview p a").attr("target", "_blank");

    store.dispatch(saveCurrentState(this.state.text));
  }
  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
    // useDebounce(store.dispatch(e.target.value), 3000);
  }
  render() {
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
      <div className="editor-area">
        <h1>.md Previewer</h1>
        <label>
          Write your Markdown text here <span className="arrow">&#8628;</span>
        </label>
        <textarea
          spellCheck="false"
          name="editor1"
          id="editor"
          onChange={props.record}
          value={props.text}
          style={{ resize: "none" }}
        ></textarea>
      </div>
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

const UseStatePresentation = () => {
  const [text, setText] = useState("");

  function handleChange(e) {
    setText(e.target.value);
  }
  // need component lifecycle workaround
  useEffect(() => {
    first;

    return () => {
      second;
    };
  }, [third]);

  return (
    <div id="main">
      <div className="editor-area">
        <h1>.md Previewer</h1>
        <label>
          Write your Markdown text here <span className="arrow">&#8628;</span>
        </label>
        <textarea
          spellCheck="false"
          name="editor1"
          id="editor"
          onChange={handleChange}
          value={text}
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <div
        id="preview"
        dangerouslySetInnerHTML={{
          __html: marked(text, { breaks: true }),
          // .replace(/&gt;+/g, ">"),
        }}
      ></div>
    </div>
  );
};

export default Presentational;
