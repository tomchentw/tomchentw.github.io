import _ from "lodash";
import cx from "classnames";
import React from "react";
import { compose, lifecycle } from "recompose";

const enhance = compose(
  lifecycle({
    componentWillMount() {
      this.setState({ data: [] });
    },
    componentDidMount() {
      fetch("https://api.github.com/users/tomchentw/repos?per_page=100")
        .then(r => r.json())
        .then(data =>
          _.reverse(_.sortBy(_.filter(data, it => !it.fork), "pushed_at"))
        )
        .then(data => this.setState({ data }));
    }
  })
);

const Index = ({ data }) => [
  // Forked from: https://github.com/cheeaun/cheeaun.github.com/blob/master/index.html
  <h1 key="header">
    <a href="https://github.com/tomchentw">
      <span id="projects-info">
        <b className="stars">{_.sumBy(data, "watchers")}</b>{" "}
        <b className="forks">{_.sumBy(data, "forks")}</b>
      </span>tomchentw{" "}
      <span id="projects-count">{data.length} repositories</span>
    </a>
  </h1>,
  <ul key="list" id="repos-list">
    {data.map(
      ({ fork, watchers, forks, html_url, language, name, description }) => (
        <li key={name} className={cx({ fork })}>
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            <span className="info">
              <b className="language">{language}</b>
              <b className="stars">{watchers}</b>
              <b className="forks">{forks}</b>
            </span>
            <b>{name}</b>
            <span className="desc">{description}</span>
          </a>
        </li>
      )
    )}
  </ul>
];

export default enhance(Index);
