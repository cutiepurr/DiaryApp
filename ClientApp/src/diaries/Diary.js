﻿import React, { useState, useEffect } from "react";
import { timestampParser } from "../timestampParser";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../authentication/Profile";

const Diary = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState("");
  const [diary, setDiary] = useState([]);
  const [countPagination, setCountPagination] = useState(0);
  const [startPagination, setStartPagination] = useState(0);
  const countPerPagination = 10;

  useEffect(() => {
    getAccessTokenSilently().then(res => setToken(res))
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch(`api/Diary/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setCountPagination(Math.ceil(data / countPerPagination));
      });
  }, [token, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch(`api/Diary?start=${startPagination}&count=${countPerPagination}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setDiary(data);
      });
  }, [startPagination, token, isAuthenticated]);

  const diaryIndex = diary.map((entry) => (
    <Card key={entry.id} className="mt-3 entry-card">
      <CardBody className="row">
        <CardTitle tag="h5" className="col col-sm-9">
          {entry.title} (#{entry.id})
        </CardTitle>
        <div className="col col-sm-3 text-end">
          {timestampParser(entry.createdTimestamp)}
        </div>
        <a className="stretched-link" href={`diary/${entry.id}`}></a>
      </CardBody>
    </Card>
  ));

  const paginationItems = Array.from({ length: countPagination }, (_, i) => (
    <PaginationItem key={i} active={startPagination == i}>
      <PaginationLink onClick={() => setStartPagination(i)}>
        {i + 1}
      </PaginationLink>
    </PaginationItem>
  ));

  return ( isAuthenticated &&
    <>
      <div>
        <Button
          type="button"
          color="primary"
          className="float-end"
          onClick={() => {
            window.location.href = "/diary/new";
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </Button>
        <h1>All Entries</h1>
      </div>
      {diary != null ? diaryIndex : <h3>Loading...</h3>}
      <Pagination className="mt-3">
        <PaginationItem>
          <PaginationLink first onClick={() => setStartPagination(0)} />
        </PaginationItem>
        <PaginationItem disabled={startPagination == 0}>
          <PaginationLink
            previous
            onClick={() =>
              setStartPagination((startPagination) => startPagination - 1)
            }
          />
        </PaginationItem>
        {paginationItems}
        <PaginationItem disabled={startPagination == countPagination - 1}>
          <PaginationLink
            next
            onClick={() =>
              setStartPagination((startPagination) => startPagination + 1)
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            last
            onClick={() => setStartPagination(countPagination - 1)}
          />
        </PaginationItem>
      </Pagination>
    </>
  );
};

export default Diary;
