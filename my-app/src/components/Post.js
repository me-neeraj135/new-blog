/** @format */
import { NavLink } from "react-router-dom";
import axios from "axios";
import { localStorageKey, articleURL } from "../Apis/constant";

const token = localStorage[localStorageKey]
  ? JSON.parse(localStorage[localStorageKey])
  : ``;

function Post(props) {
  // console.log(props, `pp`);
  let {
    author,
    title,
    createdAt,
    description,
    taglist,
    favoritesCount,

    slug,
  } = props.article;

  return (
    <article key={slug} className="pst">
      <header className="flex align-center justify-between">
        <div className="flex align-center">
          <NavLink to="/profile">
            <figure className="pstFgr bdRadius ">
              <img
                className="full-width bdRadius"
                src={
                  author.image ||
                  `/images/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png`
                }
                alt={author.username}
              />
            </figure>
          </NavLink>

          <div className="pstUsrNm">
            <NavLink to="/profile">
              <p>{author.username}</p>
            </NavLink>
            <time>{createdAt}</time>
          </div>
        </div>
        <div
          className="pstLk"
          onClick={() => props.favoriteFunc(props.article, slug, token)}
        >
          <span>💗</span>
          <span>{favoritesCount}</span>
        </div>
      </header>
      <NavLink to={`/article/${slug}`}>
        <div className="pstTd">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </NavLink>
      <footer className="pstFtr flex justify-between align-center">
        <NavLink to={`/article/${slug}`}>read more</NavLink>

        <ul className="flex flex-wrap-yes align-center">
          {taglist.map(tag => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
      </footer>
    </article>
  );
}

export default Post;
