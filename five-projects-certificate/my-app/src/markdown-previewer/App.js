import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
// import { connect, Provider } from "react-redux";
import "./styles/style.css";
import { marked } from "https://cdnjs.cloudflare.com/ajax/libs/marked/13.0.0/lib/marked.esm.js";
import Prism from "prismjs";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
// import { useDebouncedCallback } from "use-debounce";
import logger from "redux-logger";

const reducer = (state = { data: "" }, action) => {
  switch (action.type) {
    case "EXEC":
      let newObj = Object.assign({}, state);
      newObj.data = action.text;
      return newObj;
    default:
      return state;
  }
};
const saveState = (text) => ({ type: "EXEC", text });
const store = createStore(reducer, applyMiddleware(logger));

const markdownListener = () => {
  Prism.highlightAll();

  $("#preview table").addClass(
    "table table-dark table-striped table-hover table-sm"
  );
  $("#preview img").addClass("mw-100");
  $("#preview h1").addClass("border-bottom border-5 rounded-bottom");
  $("#preview h2").addClass("border-bottom border-3 rounded-bottom");
  $("#preview h3").addClass("border-bottom border-1 rounded-bottom");
  $("#preview p a").attr("target", "_blank");
};

// custom debounce function
const debounce = (func, wait = 0) => {
  let timeoutID = null;

  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

const Previewer = () => {
  const [text, setText] = useState(
    "# This is Heading 1\n## This is Heading 2\n### This is Heading 3\n| Syntax      | Description | Test Text     |\n| :---        |    :----:   |          ---: |\n| Header      | Title       | Here's this   |\n| Paragraph   | Text        | And more      |\n\n[My Github](https://istamosh.github.io/) \n\n`This is an Inline Code`\n ```html\n<div>\n\t<div>\n\t\t<p>Hello world! This is Code Block</p>\n\t</div>\n</div>\n```\n1. First item\n2. Second item\n3. Third item \n \n> This is a Blockquote \n> and this is another blockquote! \n \n![This is an Image of a kitten](https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg) \n \n**This is a Bold Text**\n <br> And this is for line breaks <br> `<br> tag`"
  );
  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
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

              this.value =
                this.value.substring(0, start) +
                "\t" +
                this.value.substring(end);

              this.selectionStart = this.selectionEnd = start + 1;

              e.preventDefault();
            }
          })
          .on(
            "input",
            debounce(({ target }) => {
              store.dispatch(saveState(target.value));
              window.localStorage.setItem(
                "istamosh_markdown_previewer",
                JSON.stringify(store.getState())
              );
            }, 3000)
          )
          .addClass("form-control font-monospace lh-sm text-nowrap shadow");
        $(".editor-area label").addClass(
          "form-label m-0 ms-2 d-block text-truncate text-white lead fs-6"
        );
        $(".editor-area h1").addClass("text-nowrap text-center");
        $("#preview").addClass("border border-1 rounded p-2 bg-body shadow");
      });

      const storedData = window.localStorage.getItem(
        "istamosh_markdown_previewer"
      );
      if (storedData !== null) {
        setText(JSON.parse(storedData).data);
      }

      markdownListener();
      mounted.current = true;
    } else {
      markdownListener();
    }
  });

  function handleChange(e) {
    setText(e.target.value);
  }
  return (
    <div id="main">
      <div className="editor-area">
        <h1>.md Previewer</h1>
        <label>
          Write your{" "}
          <a
            id="markdown-link"
            href="https://www.markdowntutorial.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Markdown
          </a>{" "}
          text here <span className="arrow">&#8628;</span>
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
        }}
      ></div>
    </div>
  );
};

export default Previewer;
