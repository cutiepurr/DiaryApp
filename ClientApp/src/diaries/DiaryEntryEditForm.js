import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Input, Label } from "reactstrap";
import { Editor } from "@toast-ui/editor";
import { useAuth0 } from "@auth0/auth0-react";

const DiaryEntryEditForm = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [entry, setEntry] = useState({});
  const [editor, setEditor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getAccessTokenSilently().then((res) => setToken(res));
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetch(`api/Diary/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setEntry(data);
        document.getElementById("title-input").value = data.title;
        document.getElementById("createdTimestamp").valueAsDate = new Date(
          data.createdTimestamp
        );
        setEditor(
          new Editor({
            el: document.getElementById("content-input"),
            initialEditType: "markdown",
            previewStyle: "vertical",
            initialValue: data.content,
          })
        );
      });
  }, [token]);

  const redirectToView = () => (window.location.href = `diary/${id}`);

  const submitForm = (e) => {
    e.preventDefault();
    entry.title = document.getElementById("title-input").value;
    entry.content = editor.getMarkdown();
    fetch(`api/Diary/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(entry),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) redirectToView();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editForm = (
    <Form onSubmit={submitForm}>
      <h1>Edit Entry (#{id})</h1>
      <Label for="title-input">Title</Label>
      <Input id="title-input" name="title-input" placeholder="Title" />
      <Label for="createdTimestamp">Created</Label>
      <Input
        id="createdTimestamp"
        name="createdTimestamp"
        type="date"
        disabled
      />
      <Label for="content-input">Content</Label>
      <div id="content-input"></div>
      <div>
        <Button
          className="m-2 float-end"
          type="button"
          color="danger"
          onClick={redirectToView}
        >
          Cancel
        </Button>
        <Button className="m-2 float-end" type="submit" color="primary">
          Submit
        </Button>
      </div>
    </Form>
  );

  return (
    isAuthenticated && <>{entry != null ? editForm : <h3>Loading...</h3>}</>
  );
};

export { DiaryEntryEditForm };
