import "./HomeContent.scss";
import BlogShow from "./BlogShow";
import Nothing from "../../UI/Nothing/Nothing";
import SearchIcon from "../../Assets/SearchIcon.png";
import Input from "../../UI/Input/Input";

const HomeContent = ({ trending, browse, featured, onChangeHandler }) => {
  return (
    <div className="home-content">
      <div className="trending">
        <h4>TRENDING</h4>
        {trending.length > 1 ? (
          trending.map((blogData, index) => (
            <BlogShow key={index} category="trending" blogData={blogData} />
          ))
        ) : (
          <Nothing />
        )}
      </div>
      <div className="featured">
        {featured.length >= 1 ? (
          featured.map((blogData, index) => (
            <BlogShow key={index} category="featured" blogData={blogData} />
          ))
        ) : (
          <Nothing />
        )}
      </div>
      <div className="browse">
        <div className="browse-bar">
          <h4>BROWSE</h4>
          <Input
            onChange={(event) => {
              onChangeHandler(event);
            }}
            icon={SearchIcon}
            placeholder="SEARCH..."
          />
        </div>

        <div className="browse-container">
          {browse.length >= 1 ? (
            browse.map((blogData, index) => (
              <BlogShow key={index} category="browse" blogData={blogData} />
            ))
          ) : (
            <Nothing />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
