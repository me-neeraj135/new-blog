/** @format */
import { NavLink } from "react-router-dom";
function Post(props) {
  let {
    author,
    title,
    createdAt,
    description,
    taglist,
    favoritesCount,
    key,
    slug,
  } = props.article;

  return (
    <article key={key} className="pst">
      <header className="flex align-center justify-between">
        <div className="flex align-center">
          <NavLink>
            <figure className="pstFgr bdRadius ">
              <img
                className="full-width bdRadius"
                src={author.image}
                alt={author.username}
              />
            </figure>
          </NavLink>

          <div className="pstUsrNm">
            <NavLink>
              <p>{author.username}</p>
            </NavLink>
            <time>{createdAt}</time>
          </div>
        </div>
        <div className="pstLk">
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
