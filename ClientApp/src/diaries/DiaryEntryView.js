import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { Editor } from "@toast-ui/editor";
import { timestampParser } from "../timestampParser";
import { useAuth0 } from "@auth0/auth0-react";

const DiaryEntryPage = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [entry, setEntry] = useState({});
  const { id } = useParams();
  const [editor, setEditor] = useState(null);

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
        setEditor(
          Editor.factory({
            el: document.getElementById("content"),
            viewer: true,
            initialValue: data.content,
          })
        );
      });
  }, [token]);

  const deleteEntry = () => {
    fetch(`api/Diary/${id}`, {
      method: "DELETE",
      Authorization: `Bearer ${token}`,
    }).then((response) => {
      if (response.ok) window.location.href = "/";
    });
  };

  return (
    isAuthenticated && (
      <>
        <div>
          <a
            className="btn btn-primary float-end m-2"
            href={`diary/${entry.id}/edit`}
          >
            <i className="fa-solid fa-pen"></i> Edit
          </a>
        </div>
        <div>
          <h1>
            {entry.title} {entry.id != null && <span>(#{entry.id})</span>}
          </h1>
          <div>
            {entry.createdTimestamp != null &&
              timestampParser(entry.createdTimestamp)}
          </div>
        </div>
        <hr />
        <div id="content"></div>
        <div>
          <a
            className="btn btn-primary float-end m-2"
            href={`diary/${entry.id}/edit`}
          >
            <i className="fa-solid fa-pen"></i>
          </a>
          <Button
            className="float-end m-2"
            color="danger"
            onClick={deleteEntry}
          >
            <i className="fa-solid fa-trash"></i>
          </Button>
        </div>
      </>
    )
  );
};

export { DiaryEntryPage };
