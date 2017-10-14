import _ from "lodash";
import cx from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { compose, lifecycle } from "recompose";
import Header from "../Header";

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

const demoRepositories = ["react-google-maps"];

const Item = ({ watchers, forks, language, name, description }) => [
  <span key="info" className="info">
    <b className="language">{language}</b>
    <b className="stars">{watchers}</b>
    <b className="forks">{forks}</b>
  </span>,
  <b key="name">{name}</b>,
  <span key="desc" className="desc">
    {description}
  </span>
];

const Index = ({ data }) => [
  // Forked from: https://github.com/cheeaun/cheeaun.github.com/blob/master/index.html
  <Header
    key="header"
    watchers={_.sumBy(data, "watchers")}
    forks={_.sumBy(data, "forks")}
    repositories={data.length}
  />,
  <ul key="list" id="repos-list">
    {data.map(
      ({ fork, watchers, forks, html_url, language, name, description }) => (
        <li
          key={name}
          className={cx({ fork, demo: _.includes(demoRepositories, name) })}
        >
          {_.includes(demoRepositories, name) ? (
            <Link to={`/demos/${name}`}>
              <Item
                watchers={watchers}
                forks={forks}
                language={language}
                name={name}
                description={description}
              />
            </Link>
          ) : (
            <a href={html_url} target="_blank" rel="noopener noreferrer">
              <Item
                watchers={watchers}
                forks={forks}
                language={language}
                name={name}
                description={description}
              />
            </a>
          )}
        </li>
      )
    )}
  </ul>
];

export default enhance(Index);
