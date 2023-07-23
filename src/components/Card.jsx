import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '@picocss/pico';
const Card = ({ youtube, twitter, instagram, image, name, id, description }) => {
  const goToYouTube = () => {
    window.open(`https://www.youtube.com/${youtube}`, '_blank');
  };
  const goToTwitter = () => {
    window.open(`https://www.twitter.com/${twitter}`, '_blank');
  };
  const goToInstagram = () => {
    window.open(`https://www.instagram.com/${instagram}`, '_blank');
  };
  return (
    <div style={{backgroundImage: `url(${image})`,border: '2px solid #3f4b59', backgroundSize:"cover",backgroundPositionY:"20%",backgroundRepeat:"no-repeat",borderRadius:"4px",margin:"10px",width:"40%",height:"340px"}}>
      <article style={{height:"100%",backgroundColor:"linear-gradient(rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.9) 100%)", margin: "0px", display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "repeat(2, 1fr)", overflow: "hidden"}}>
        <div style={{gridArea: '1 / 1 / 2 / 2',height: '100%',paddingTop: '40px'}}
          className="card-header-name"
        >
          <h3>{name}</h3>

          {youtube !== null && youtube !== '' ? (
            <span
              style={{
                cursor: 'pointer',
                fontSize: '1.5em',
                marginRight: '13px',
              }}
              className="fa-brands fa-youtube"
              onClick={goToYouTube}
            ></span>
          ) : null}

          {twitter !== null && twitter !== '' ? (
            <span
              style={{
                cursor: 'pointer',
                fontSize: '1.5em',
                marginRight: '13px',
              }}
              className="fa-brands fa-twitter"
              onClick={goToTwitter}
            ></span>
          ) : null}

          {instagram !== null && instagram !== '' ? (
            <span
              style={{
                cursor: 'pointer',
                fontSize: '1.5em',
                marginRight: '13px',
              }}
              className="fa-brands fa-instagram"
              onClick={goToInstagram}
            ></span>
          ) : null}
        </div>

        <div
          style={{
            paddingTop: '40px',
            fontSize: '20px',
            gridArea: '1 / 2 / 2 / 3',
            textAlign: 'right',
            height: '100%',
          }}
          className="card-header-edit"
        >
          <Link
            to={'/' + id}
            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
          >
            <i className="fa-solid fa-circle-info"></i>
          </Link>
          <Link
            to={'/edit/' + id}
            onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
          >
            <i className="fa-solid fa-pen"></i>
          </Link>
        </div>

        <div
          style={{
            paddingTop: '20px',
            width: '100%',
            gridColumn: 'span 2',
            margin: '0px',
          }}
          className="card-description"
        >
          <p
            style={{
              fontSize: '0.8em',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </p>
        </div>
      </article>
    </div>
  );
};
Card.propTypes = {
  name: PropTypes.string.isRequired,
  youtube: PropTypes.string,
  twitter: PropTypes.string,
  instagram: PropTypes.string,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  link: PropTypes.string,
};
Card.defaultProps = {
  image: './assets/NoImage.jpg',
};
export default Card;